import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { JsonTelemetryPayloadSchema } from '@/zod/zodSchemas'; // Upewnij się co do ścieżki!

const prisma = new PrismaClient();

// 1. FUNKCJA POMOCNICZA DO OBLICZANIA MMR DLA POJEDYNCZEGO GRACZA
function calculatePlayerMMR(
    currentMmr: number,
    lastTenStr: string,
    myTeamScore: number,
    enemyTeamScore: number,
    outcome: 'win' | 'loss' | 'draw',
    suddenDeath: boolean
): { newMmr: number; newLastTen: string } {

    // Jeśli remis, historia i MMR pozostają bez zmian (zgodnie ze starym kodem)
    if (outcome === 'draw') {
        return { newMmr: currentMmr, newLastTen: lastTenStr };
    }

    // Obliczanie "streaka" z lastTen (zliczanie jedynek)
    let streak = 0;
    let countDown = parseInt(lastTenStr || '0', 2);
    for (let a = 0; a < 10; a++) {
        if ((countDown & 1) === 1) streak++;
        countDown >>>= 1;
    }

    let points = 0;

    // A. BAZOWE PUNKTY ZA STREAK (Zgodne z Twoim algorytmem)
    if (outcome === 'win') {
        if (streak === 7 || streak === 8) points = 1.2;
        else if (streak >= 9) points = 1.5;
        else points = 1.0;
    } else if (outcome === 'loss') {
        if (streak === 2 || streak === 3) points = -1.2;
        else if (streak <= 1) points = -1.5;
        else points = -1.0;
    }

    // B. PUNKTY ZA PRZEWAGĘ FLAG (Flag advantage)
    if (outcome === 'win') {
        points += ((myTeamScore - enemyTeamScore) / 5.0) - 0.2;
    } else if (outcome === 'loss') {
        points += ((myTeamScore - enemyTeamScore) / 5.0) + 0.2;
    }

    // C. NADPISANIE W PRZYPADKU SUDDEN DEATH
    let newLastTen = lastTenStr;
    if (suddenDeath) {
        points = outcome === 'win' ? 0.5 : -0.5;
        // W sudden death historia 'lastTen' nie jest aktualizowana
    } else {
        // Aktualizacja lastTen za pomocą operacji bitowych
        let currentNum = parseInt(lastTenStr || '0', 2);
        if (outcome === 'win') {
            newLastTen = ((currentNum >> 1) | 512).toString(2).padStart(10, '0');
        } else {
            newLastTen = (currentNum >> 1).toString(2).padStart(10, '0');
        }
    }

    const newMmr = Math.round((currentMmr + points) * 10) / 10;
    return { newMmr, newLastTen };
}

// 2. GŁÓWNY ENDPOINT API
export async function POST(req: Request) {
    try {
        const rawJson = await req.json();

        // Walidacja danych Zodem
        const validationResult = JsonTelemetryPayloadSchema.safeParse(rawJson);
        if (!validationResult.success) {
            console.error("Błędny JSON:", validationResult.error.format());
            return NextResponse.json({ error: "Invalid JSON structure" }, { status: 400 });
        }

        const matchData = validationResult.data;

        // Zabezpieczenie przed zduplikowanym wgraniem tego samego meczu
        const existingMatch = await prisma.match.findFirst({
            where: { id: parseInt(matchData.matchID.replace(/\D/g,'').slice(0, 8)) || undefined } // lub inne mapowanie unikalnego ID
        });

        if (existingMatch) {
            return NextResponse.json({ message: "Match already exists in DB" }, { status: 200 });
        }

        // 1. ZAPIS MECZU W BAZIE
        const createdMatch = await prisma.match.create({
            data: {
                map: matchData.match.mapDisplayName.toLowerCase() as any,
                gamemode: matchData.match.gamemode,
                suddenDeath: matchData.match.suddenDeath,
                durationSec: matchData.match.durationSec,
                startTimeUnix: BigInt(matchData.match.startTimeUnix),
                server: "EU1", // Hardcoded lub wyciągane z JSON jeśli masz
            }
        });

        // 2. TWORZENIE DRUŻYN (Słownik mapujący np. { 2: dbId, 3: dbId })
        const teamIdMap: Record<number, number> = {};
        const teamScores: Record<number, number> = {};

        // Najpierw pobieramy wyniki drużyn, żeby potem łatwo liczyć MMR (myTeamScore, enemyTeamScore)
        for (const [teamIdStr, team] of Object.entries(matchData.result.teams)) {
            teamScores[parseInt(teamIdStr)] = team.score;
        }

        for (const [teamIdStr, team] of Object.entries(matchData.result.teams)) {
            const teamCode = parseInt(teamIdStr);
            let teamResult: "win" | "loss" | "draw" = "loss";

            if (matchData.result.winningTeam === 0) teamResult = "draw";
            else if (matchData.result.winningTeam === teamCode) teamResult = "win";

            const createdTeam = await prisma.teamMatchStat.create({
                data: {
                    matchId: createdMatch.id,
                    score: team.score,
                    result: teamResult,
                }
            });
            teamIdMap[teamCode] = createdTeam.id;
        }

        // 3. POBRANIE HISTORII GRACZY Z BAZY DO WYLICZENIA MMR
        const uids = matchData.players.map(p => p.uid);
        const existingGamers = await prisma.gamer.findMany({
            where: { id: { in: uids } }
        });

        // Zmiana tablicy na wygodną mapę { uid: GamerObject }
        const gamerMap = new Map(existingGamers.map(g => [g.id, g]));

        // 4. PRZETWARZANIE KAŻDEGO GRACZA
        for (const player of matchData.players) {
            const dbTeamId = teamIdMap[player.team];
            if (!dbTeamId) continue;

            // Ustalenie wyniku gracza
            const isDraw = matchData.result.winningTeam === 0;
            const outcome = isDraw ? 'draw' : (player.outcome === 'win' ? 'win' : 'loss');

            // Ustalenie punktacji drużyn
            const myTeamScore = teamScores[player.team] || 0;
            const enemyTeamScore = Object.keys(teamScores).reduce((acc, key) =>
                parseInt(key) !== player.team ? acc + teamScores[parseInt(key)] : acc, 0
            );

            // Wyciąganie obecnego gracza z bazy lub inicjalizacja nowych wartości
            const dbGamer = gamerMap.get(player.uid) || { mmr: 500, lastTen: '0000000000' };

            // OBLICZENIE NOWEGO MMR
            const { newMmr, newLastTen } = calculatePlayerMMR(
                dbGamer.mmr,
                dbGamer.lastTen,
                myTeamScore,
                enemyTeamScore,
                outcome,
                matchData.match.suddenDeath
            );

            // Zapis Gracza (Update MMR i lastTen)
            await prisma.gamer.upsert({
                where: { id: player.uid },
                update: {
                    name: player.name,
                    mmr: newMmr,
                    lastTen: newLastTen
                },
                create: {
                    id: player.uid,
                    name: player.name,
                    server: "EU1",
                    lastTen: newLastTen,
                    mmr: newMmr
                }
            });

            // Statystyki Broni
            const weaponNames = Array.from(new Set([
                ...Object.keys(player.weaponDamage || {}),
                ...Object.keys(player.weaponKills || {})
            ]));

            const weaponStatsCreate = weaponNames.map(wName => ({
                weaponName: wName,
                damage: player.weaponDamage?.[wName] || 0,
                kills: player.weaponKills?.[wName] || 0
            }));

            // Zapis Statystyk Meczowych
            await prisma.playerMatchStat.create({
                data: {
                    matchId: createdMatch.id,
                    teamMatchId: dbTeamId,
                    gamerId: player.uid,

                    kills: player.kills,
                    deaths: player.deaths,
                    assists: player.assists,
                    pilotKills: player.pilotKills,
                    titanKills: player.titanKills,
                    killsAsPilot: player.killsAsPilot,
                    killsAsTitan: player.killsAsTitan,
                    pilotDamage: player.pilotDamage,
                    titanDamage: player.titanDamage,
                    killStreakMax: player.killStreakMax,
                    titan: "none", // Tytany zniknęły z JSONa, więc ustawiamy na 'none'

                    captures: player.captures,
                    returns: player.returns,
                    flagPickups: player.flagPickups,
                    flagDrops: player.flagDrops,
                    flagCaptureRuns: player.flagCaptureRuns,
                    flagCarrySec: player.flagCarrySec,
                    maxSpeed: player.maxSpeed,
                    avgSpeed: player.avgSpeed,
                    groundSec: player.groundSec,
                    airSec: player.airSec,
                    wallrunSec: player.wallrunSec,
                    wallhangSec: player.wallhangSec,
                    unconnectedTime: player.unconnectedTime,
                    afkTime: player.afkTime,

                    weaponStats: {
                        create: weaponStatsCreate
                    }
                }
            });
        }

        return NextResponse.json({ message: "Mecz pomyślnie zwalidowany i zapisany!", matchId: createdMatch.id }, { status: 201 });

    } catch (error) {
        console.error("Critical error in POST /api/match:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}