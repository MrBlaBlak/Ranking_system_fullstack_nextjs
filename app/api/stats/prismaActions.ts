'use server';
import prisma from "@/prisma/client"
import gamersJson from '@/public/data/gamers.json';

import { readFile } from "fs/promises";
import path from "path";
import {JsonTelemetryPayloadSchema} from "@/zod/zodSchemas";

export async function setStatsData() {
    try {
        const filePath = path.join(__dirname, "matchData.json");
        const fileContent = await readFile(filePath, "utf-8");
        const rawJson = JSON.parse(fileContent);
        const validationResult = JsonTelemetryPayloadSchema.safeParse(rawJson);

        if (!validationResult.success) {
            console.error("Błąd struktury pliku JSON! Baza danych bezpieczna.");
            console.error(JSON.stringify(validationResult.error.format(), null, 2));
            return;
        }

        const matchData = validationResult.data;

        // 1. GŁÓWNY ZAPIS MECZU (Tym razem tworzymy sam mecz, bez drużyn!)
        const createdMatch = await prisma.match.create({
            data: {
                map: matchData.match.mapDisplayName.toLowerCase() as any,
                gamemode: matchData.match.gamemode,
                suddenDeath: matchData.match.suddenDeath,
                halftimeMatchTimeSec: matchData.match.halftimeMatchTimeSec,
                durationSec: matchData.match.durationSec,
                startTimeUnix: BigInt(matchData.match.startTimeUnix),
                server: "EU1",
            }
        });

        // 2. TWORZENIE DRUŻYN I BUDOWANIE "ŚCIĄGI" W PAMIĘCI
        // Ten obiekt przypisze JSON-owe ID (np. 2) do ID z bazy (np. 101)
        const teamIdMap: Record<number, number> = {};

        for (const [teamIdStr, team] of Object.entries(matchData.result.teams)) {
            const teamCode = parseInt(teamIdStr); // 2 lub 3
            const isWinner = matchData.result.winningTeam === teamCode;

            let teamResult: "win" | "loss" | "draw" = "loss";
            if (matchData.result.winningTeam === 0) {
                teamResult = "draw";
            } else if (isWinner) {
                teamResult = "win";
            }
            // Tworzymy drużynę przypisaną do nowo powstałego meczu
            const createdTeam = await prisma.teamMatchStat.create({
                data: {
                    matchId: createdMatch.id,
                    score: team.score,
                    result: teamResult,
                }
            });

            // MAGIA: Zapisujemy w słowniku powiązanie.
            // Jeśli JSON mówi "2", to wiemy, że w bazie to np. ID 101
            teamIdMap[teamCode] = createdTeam.id;
        }

        // 3. PRZETWARZANIE GRACZY
        for (const player of matchData.players) {

            // A. Wyciągamy właściwe ID drużyny z naszej ściągi!
            // Jeśli gracz ma player.team = 3, wyciągamy ID bazy dla klucza 3.
            const dbTeamId = teamIdMap[player.team];

            if (!dbTeamId) continue; // Zabezpieczenie, jakby plik był uszkodzony

            // B. Wyliczenie tytana
            let mostPlayedTitan = "none";
            if (player.titanDrops && player.titanDrops.length > 0) {
                const titanTimes: { [key: string]: number } = {};
                player.titanDrops.forEach(drop => {
                    const duration = drop.diedMatchTimeSec - drop.matchTimeSec;
                    titanTimes[drop.titan] = (titanTimes[drop.titan] || 0) + duration;
                });
                mostPlayedTitan = Object.keys(titanTimes).reduce((a, b) => titanTimes[a] > titanTimes[b] ? a : b);
            }

            // C. Statystyki broni
            const weaponNames = Array.from(new Set([
                ...Object.keys(player.weaponDamage || {}),
                ...Object.keys(player.weaponKills || {})
            ]));

            const weaponStatsCreate = weaponNames.map(wName => ({
                weaponName: wName,
                damage: player.weaponDamage?.[wName] || 0,
                kills: player.weaponKills?.[wName] || 0
            }));

            // D. Zapis gracza z użyciem dbTeamId
            await prisma.gamer.upsert({
                where: { id: player.uid },
                update: {}, // Jeśli istnieje, nic nie zmieniaj
                create: {
                    id: player.uid,
                    name: player.name,
                    server: "EU1",
                    lastTen: '1010101010',
                    mmr: 575.0
                }
            });

            await prisma.playerMatchStat.create({
                data: {
                    matchId: createdMatch.id,
                    teamMatchId: dbTeamId,
                    gamerId: player.uid, // <- TUTAJ: przekazujesz surowe ID zamiast obiektu 'gamer'

                    // Statystyki bojowe
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
                    titan: mostPlayedTitan as any,

                    // Obiektywy i ruch
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

                    // Zgrupowane relacje (te mogą zostać jako create, bo nie mają surowych odpowiedników ID w tym modelu)
                    titanDrops: {
                        create: player.titanDrops?.map(drop  => ({
                            titan: drop.titan as any,
                            matchTimeSec: drop.matchTimeSec,
                            diedMatchTimeSec: drop.diedMatchTimeSec
                        })) || []
                    },
                    weaponStats: {
                        create: weaponStatsCreate
                    }
                }
            });
        }

        console.log(`Mecz ${createdMatch.id} pomyślnie zapisany w bazie, bez ruszania schematu!`);
    } catch (error) {
        console.error("Błąd podczas parsowania i zapisu meczu:", error);
    }
}

export async function setGamersData() {
    try {
        await prisma.gamer.createMany({
            data: gamersJson,
        });
    } catch (error) {
        console.error("Error creating data:", error);
    }
}
// export async function setWeaponsData() {
//     try {
//         await prisma.weapons.createMany({
//             data: weaponsJson,
//         });
//     } catch (error) {
//         console.error("Error creating data:", error);
//     }
// }
export async function checkIfDataExist() {
    try {
        const count = await prisma.playerMatchStat.count();
        return count > 0;
    } catch (error) {
        console.error('Error checking data existence:', error);
        return false;
    }
}

export async function checkIfGamersExist() {
    try {
        const count = await prisma.gamer.count();
        return count > 0;
    } catch (error) {
        console.error('Error checking data existence:', error);
        return false;
    }
}
