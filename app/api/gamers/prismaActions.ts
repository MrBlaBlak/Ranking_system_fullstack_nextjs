'use server'
import prisma from "@/prisma/client"
import {Gamer, Prisma} from "@prisma/client";

export interface TitanFrequencyStats {
    gamer_id: string;
    max_titan: string;
}
export interface MapStats {
    name: string;
    total_wins: number;
    total_losses: number;
    map: string;
}
export interface ElimsStats {
    name: string;
    total_kills_on_map: number;
    times_map_was_played: number;
    max_kills_on_map: number;
    map: string;
}
export interface CapsStats {
    name: string;
    total_caps_on_map: number;
    times_map_was_played: number;
    max_caps_on_map: number;
    map: string;
}
export interface TitanStats {
    name: string;
    total_wins: number;
    total_losses: number;
    titan: string;
}

export async function findMostFrequentTitanForGamer(): Promise<TitanFrequencyStats[]> {
    // 1. Pobieramy graczy tylko ze statystykami z meczów
    const gamers = await prisma.gamer.findMany({
        include: {
            matchStats: true, // Wystarczy tylko to, bo pole `titan` tu jest!
        },
    });

    const titanFrequencyStats: TitanFrequencyStats[] = [];

    // 2. Przetwarzamy dane
    gamers.forEach(gamer => {
        const titanCounts: Record<string, number> = {};

        // Iterujemy po statystykach meczowych
        gamer.matchStats.forEach(matchStat => {
            const titan = matchStat.titan;

            // Ignorujemy brak tytana i tytana "none"
            if (titan && titan !== 'none') {
                if (!titanCounts[titan]) {
                    titanCounts[titan] = 0;
                }
                titanCounts[titan]++;
            }
        });

        let maxTitan: string | undefined = undefined;
        let maxCount = 0;

        // Szukamy najczęściej wybieranego tytana
        for (const titan in titanCounts) {
            if (titanCounts[titan] > maxCount) {
                maxCount = titanCounts[titan];
                maxTitan = titan;
            }
        }

        // 3. Jeśli gracz w ogóle grał jakimś tytanem, dodajemy go do tablicy
        if (maxTitan) {
            titanFrequencyStats.push({
                gamer_id: gamer.id,
                max_titan: maxTitan,
            });
        }
    });

    return titanFrequencyStats;
}

export async function getMapStats(): Promise<MapStats[]> {
    // 1. Pobieramy graczy z relacją do statystyk, meczu (mapa) i drużyny (wynik)
    const gamers = await prisma.gamer.findMany({
        include: {
            matchStats: {
                include: {
                    match: true,
                    team: true,
                },
            },
        },
    });

    const mapStats: MapStats[] = [];

    // 2. Przetwarzamy pobrane dane
    gamers.forEach(gamer => {
        const mapStatsMap: Record<string, { total_wins: number; total_losses: number }> = {};

        gamer.matchStats.forEach(matchStat => {
            const match = matchStat.match;
            const team = matchStat.team;

            if (match && team) {
                const map = match.map;
                const result = team.result;

                if (!mapStatsMap[map]) {
                    mapStatsMap[map] = { total_wins: 0, total_losses: 0 };
                }

                // Sprawdzamy ładnego enuma zamiast starych jedynek i zer
                if (result === 'win') {
                    mapStatsMap[map].total_wins += 1;
                } else if (result === 'loss') {
                    mapStatsMap[map].total_losses += 1;
                }
                // Remisy ('draw') są tutaj po prostu ignorowane, tak jak w starym kodzie
            }
        });

        // 3. Budujemy finalną tablicę pod frontend
        for (const map in mapStatsMap) {
            mapStats.push({
                name: gamer.name,
                map,
                total_wins: mapStatsMap[map].total_wins,
                total_losses: mapStatsMap[map].total_losses,
            });
        }
    });

    return mapStats;
}

export async function getElimsStats(): Promise<ElimsStats[]> {
    // 1. Pobieramy graczy wraz z relacjami do statystyk i przypisanych meczów
    const gamers = await prisma.gamer.findMany({
        include: {
            matchStats: {
                include: {
                    match: true, // Potrzebujemy tego, żeby wyciągnąć nazwę mapy
                },
            },
        },
    });

    const elimsStats: ElimsStats[] = [];

    // 2. Przetwarzamy dane
    gamers.forEach(gamer => {
        const mapStatsMap: Record<string, { total_kills_on_map: number; times_map_was_played: number; max_kills_on_map: number }> = {};

        // Iterujemy po statystykach meczowych (nowy PlayerMatchStat)
        gamer.matchStats.forEach(matchStat => {
            const match = matchStat.match;

            if (match) {
                const map = match.map; // np. "boomtown"

                if (!mapStatsMap[map]) {
                    mapStatsMap[map] = { total_kills_on_map: 0, times_map_was_played: 0, max_kills_on_map: 0 };
                }

                // Zliczamy zabójstwa pobierane prosto z matchStat
                mapStatsMap[map].total_kills_on_map += matchStat.kills;
                mapStatsMap[map].times_map_was_played += 1;

                // Aktualizujemy rekordową ilość zabójstw na danej mapie
                if (matchStat.kills > mapStatsMap[map].max_kills_on_map) {
                    mapStatsMap[map].max_kills_on_map = matchStat.kills;
                }
            }
        });

        // 3. Budujemy finalną tablicę pod frontend
        for (const map in mapStatsMap) {
            elimsStats.push({
                name: gamer.name,
                map,
                total_kills_on_map: mapStatsMap[map].total_kills_on_map,
                times_map_was_played: mapStatsMap[map].times_map_was_played,
                max_kills_on_map: mapStatsMap[map].max_kills_on_map,
            });
        }
    });

    // 4. Sortujemy alfabetycznie po nicku
    elimsStats.sort((a, b) => a.name.localeCompare(b.name));

    return elimsStats;
}


export async function getCapsStats(): Promise<CapsStats[]> {
    // 1. Pobieramy graczy wraz z ich statystykami i przypisanymi meczami
    const gamers = await prisma.gamer.findMany({
        include: {
            matchStats: {
                include: {
                    match: true, // Dzięki temu mamy dostęp do match.map
                },
            },
        },
    });

    const capsStats: CapsStats[] = [];

    // 2. Przetwarzamy pobrane dane
    gamers.forEach(gamer => {
        const mapStatsMap: Record<string, { total_caps_on_map: number; times_map_was_played: number; max_caps_on_map: number }> = {};

        // Iterujemy po nowej relacji matchStats
        gamer.matchStats.forEach(matchStat => {
            const match = matchStat.match;

            if (match) {
                const map = match.map; // Pobieramy nazwę mapy (np. "boomtown")

                if (!mapStatsMap[map]) {
                    mapStatsMap[map] = { total_caps_on_map: 0, times_map_was_played: 0, max_caps_on_map: 0 };
                }

                // field `captures` zastąpił stare `killAndCap.caps`
                mapStatsMap[map].total_caps_on_map += matchStat.captures;
                mapStatsMap[map].times_map_was_played += 1;

                if (matchStat.captures > mapStatsMap[map].max_caps_on_map) {
                    mapStatsMap[map].max_caps_on_map = matchStat.captures;
                }
            }
        });

        // 3. Budujemy finalną tablicę, której oczekuje Twój frontend
        for (const map in mapStatsMap) {
            capsStats.push({
                name: gamer.name,
                map,
                total_caps_on_map: mapStatsMap[map].total_caps_on_map,
                times_map_was_played: mapStatsMap[map].times_map_was_played,
                max_caps_on_map: mapStatsMap[map].max_caps_on_map,
            });
        }
    });

    // 4. Sortujemy po nicku gracza
    capsStats.sort((a, b) => a.name.localeCompare(b.name));

    return capsStats;
}

export async function getTitanStats(): Promise<TitanStats[]> {
    const gamers = await prisma.gamer.findMany({
        include: {
            matchStats: {
                include: {
                    team: true, // Z drużyny wyciągniemy 'win' lub 'loss'
                },
            },
        },
    });

    const titanStats: TitanStats[] = [];

    // 2. Przetwarzamy pobrane dane
    gamers.forEach(gamer => {
        const titanStatsMap: Record<string, { total_wins: number; total_losses: number }> = {};

        // Iterujemy po nowej tabeli PlayerMatchStat
        gamer.matchStats.forEach(matchStat => {
            const team = matchStat.team;
            const titan = matchStat.titan;

            // Sprawdzamy czy gracz miał jakiegokolwiek tytana w tym meczu (i czy nie był to 'none')
            if (team && titan && titan !== 'none') {
                if (!titanStatsMap[titan]) {
                    titanStatsMap[titan] = { total_wins: 0, total_losses: 0 };
                }

                // Zamiast starych 1 i 0 korzystamy z naszego pięknego enuma TeamResult
                if (team.result === 'win') {
                    titanStatsMap[titan].total_wins += 1;
                } else if (team.result === 'loss') {
                    titanStatsMap[titan].total_losses += 1;
                }
            }
        });

        for (const titan in titanStatsMap) {
            titanStats.push({
                name: gamer.name,
                titan,
                total_wins: titanStatsMap[titan].total_wins,
                total_losses: titanStatsMap[titan].total_losses,
            });
        }
    });

    titanStats.sort((a, b) => a.name.localeCompare(b.name));

    return titanStats;
}

export async function updateGamer(gamer: Gamer) {
    return prisma.gamer.update({
        where: {
            id: gamer.id
        },
        data: gamer
    });
}

export async function postMatch(match: Prisma.MatchCreateInput) {
    return prisma.match.create({
        data: match
    });
}

// 2. Zapis Drużyn (Zmieniona nazwa tabeli i typu)
export async function postTeam(team: Prisma.TeamMatchStatCreateInput) {
    return prisma.teamMatchStat.create({
        data: team
    });
}

// 3. Nowy, zjednoczony zapis statystyk gracza (Zastępuje postMatchGamer oraz postKillsAndCaps!)
export async function postPlayerMatchStat(playerStat: Prisma.PlayerMatchStatUncheckedCreateInput) {
    return prisma.playerMatchStat.create({
        data: playerStat
    });
}

// 4. Zapis Gracza (Zmieniona nazwa tabeli i typu z gamers -> Gamer)
export async function postGamer(gamer: Prisma.GamerCreateInput) {
    return prisma.gamer.create({
        data: gamer
    });
}
