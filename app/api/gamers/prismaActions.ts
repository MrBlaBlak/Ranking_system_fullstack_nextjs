'use server'
import prisma from "@/prisma/client"
import {Titan_Name, Map_Name} from "@prisma/client";
import Match from "@/app/model/Match";
import Team from "@/app/model/Team";
import MatchGamer from "@/app/model/MatchGamer";
import KillsAndCaps from "@/app/model/KillsAndCaps";
import Gamer from "@/app/model/Gamer";

interface TitanFrequencyStats {
    gamer_id: number;
    max_titan: string;
}
interface MapStats {
    name: string;
    total_wins: number;
    total_losses: number;
    map: string;
}
interface ElimsStats {
    name: string;
    total_kills_on_map: number;
    times_map_was_played: number;
    max_kills_on_map: number;
    map: string;
}
interface CapsStats {
    name: string;
    total_caps_on_map: number;
    times_map_was_played: number;
    max_caps_on_map: number;
    map: string;
}
interface TitanStats {
    name: string;
    total_wins: number;
    total_losses: number;
    titan: string;
}
export async function findMostFrequentTitanForGamer(): Promise<TitanFrequencyStats[]> {
    // Fetch data with relations
    const gamers = await prisma.gamers.findMany({
        include: {
            match_gamer: {
                include: {
                    kills_and_caps: true,
                },
            },
        },
    });

    const titanFrequencyStats: TitanFrequencyStats[] = [];

    gamers.forEach(gamer => {
        const titanCounts: Record<Titan_Name, number> = {} as Record<Titan_Name, number>;

        gamer.match_gamer.forEach(matchGamer => {
            const killAndCap = matchGamer.kills_and_caps;
            if (killAndCap && killAndCap.titan && killAndCap.titan !== 'none') {
                if (!titanCounts[killAndCap.titan]) {
                    titanCounts[killAndCap.titan] = 0;
                }
                titanCounts[killAndCap.titan]++;
            }
        });

        let maxTitan: Titan_Name | undefined = undefined;
        let maxCount = 0;

        for (const titan in titanCounts) {
            if (titanCounts[titan as Titan_Name] > maxCount) {
                maxCount = titanCounts[titan as Titan_Name];
                maxTitan = titan as Titan_Name;
            }
        }
        if (maxTitan) {
            titanFrequencyStats.push({
                gamer_id: gamer.id,
                max_titan: maxTitan,
            });
        }
    });

    return titanFrequencyStats;
}
// export async function findMostFrequentTitanForGamer(){
//     //find most frequently used titan for every gamer
//     const titanStats: TitanFrequencyStats[] = await prisma.$queryRaw`SELECT t.gamer_id, MAX(t.max_titan) AS max_titan
//                                          FROM (SELECT mg.gamer_id,
//                                                       k.titan AS   max_titan,
//                                                       ROW_NUMBER() OVER (PARTITION BY mg.gamer_id ORDER BY COUNT(k.titan) DESC) AS row_num
//                                                FROM match_gamer mg
//                                                         JOIN kills_and_caps k ON mg.id = k.match_gamer_id
//                                                WHERE k.titan != 7
//                                                GROUP BY mg.gamer_id, k.titan) AS t
//                                          WHERE t.row_num = 1
//                                          GROUP BY t.gamer_id`;
//     return titanStats
// }
export async function getMapStats(): Promise<MapStats[]> {
    const gamers = await prisma.gamers.findMany({
        include: {
            match_gamer: {
                include: {
                    matches: true,
                    teams: true,
                },
            },
        },
    });
    // Process the data to calculate total wins and losses per gamer per map
    const mapStats: MapStats[] = [];

    gamers.forEach(gamer => {
        const mapStatsMap: Record<string, { total_wins: number; total_losses: number }> = {};

        gamer.match_gamer.forEach(matchGamer => {
            if (matchGamer.matches && matchGamer.teams) {
                const map = matchGamer.matches.map;
                const winOrLoose = matchGamer.teams.win_or_loose;

                if (!mapStatsMap[map]) {
                    mapStatsMap[map] = { total_wins: 0, total_losses: 0 };
                }

                if (winOrLoose === 1) {
                    mapStatsMap[map].total_wins += 1;
                } else if (winOrLoose === 0) {
                    mapStatsMap[map].total_losses += 1;
                }
            }
        });

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
// export async function getMapStats() {
//     const mapStats: MapStats[] = await prisma.$queryRaw`SELECT g.name,
//                                                                SUM(CASE WHEN t.win_or_loose = 1 THEN 1 ELSE 0 END) AS total_wins,
//                                                                SUM(CASE WHEN t.win_or_loose = 0 THEN 1 ELSE 0 END) AS total_losses,
//                                                                m.map
//                                                         FROM gamers g
//                                                                  LEFT JOIN match_gamer mg ON g.id = mg.gamer_id
//                                                                  LEFT JOIN matches m ON mg.match_id = m.id
//                                                                  LEFT JOIN teams t ON mg.team_id = t.id
//                                                         GROUP BY g.name, m.map`;
//     return mapStats;
// }
export async function getElimsStats(): Promise<ElimsStats[]> {
    // Fetch data with relations
    const gamers = await prisma.gamers.findMany({
        include: {
            match_gamer: {
                include: {
                    matches: true,
                    kills_and_caps: true,
                },
            },
        },
    });

    const elimsStats: ElimsStats[] = [];

    gamers.forEach(gamer => {
        const mapStatsMap: Record<string, { total_kills_on_map: number; times_map_was_played: number; max_kills_on_map: number }> = {};

        gamer.match_gamer.forEach(matchGamer => {
            const match = matchGamer.matches;
            const killAndCap = matchGamer.kills_and_caps;

            if (match && killAndCap) {
                const map = match.map;

                if (!mapStatsMap[map]) {
                    mapStatsMap[map] = { total_kills_on_map: 0, times_map_was_played: 0, max_kills_on_map: 0 };
                }

                mapStatsMap[map].total_kills_on_map += killAndCap.kills;
                mapStatsMap[map].times_map_was_played += 1;
                if (killAndCap.kills > mapStatsMap[map].max_kills_on_map) {
                    mapStatsMap[map].max_kills_on_map = killAndCap.kills;
                }
            }
        });

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

    elimsStats.sort((a, b) => a.name.localeCompare(b.name));

    return elimsStats;
}
// export async function getElimsStats() {
//     const elimsStats: ElimsStats[] = await prisma.$queryRaw`SELECT g.name, SUM(kc.kills) as total_kills_on_map, COUNT(m.map) as times_map_was_played, MAX(kc.kills) as max_kills_on_map, m.map
//             FROM gamers g
//             LEFT JOIN match_gamer mg ON g.id = mg.gamer_id
//             LEFT JOIN matches m ON mg.match_id = m.id
//             LEFT JOIN kills_and_caps kc ON kc.match_gamer_id = mg.id
//             GROUP BY g.name, m.map ORDER BY g.name`
//     return elimsStats
// }
export async function getCapsStats(): Promise<CapsStats[]> {
    // Fetch data with relations
    const gamers = await prisma.gamers.findMany({
        include: {
            match_gamer: {
                include: {
                    matches: true,
                    kills_and_caps: true,
                },
            },
        },
    });

    const capsStats: CapsStats[] = [];

    gamers.forEach(gamer => {
        const mapStatsMap: Record<string, { total_caps_on_map: number; times_map_was_played: number; max_caps_on_map: number }> = {};

        gamer.match_gamer.forEach(matchGamer => {
            const match = matchGamer.matches;
            const killAndCap = matchGamer.kills_and_caps;

            if (match && killAndCap) {
                const map = match.map;

                if (!mapStatsMap[map]) {
                    mapStatsMap[map] = { total_caps_on_map: 0, times_map_was_played: 0, max_caps_on_map: 0 };
                }

                mapStatsMap[map].total_caps_on_map += killAndCap.caps;
                mapStatsMap[map].times_map_was_played += 1;
                if (killAndCap.caps > mapStatsMap[map].max_caps_on_map) {
                    mapStatsMap[map].max_caps_on_map = killAndCap.caps;
                }
            }
        });

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

    // Sorting the results by gamer name
    capsStats.sort((a, b) => a.name.localeCompare(b.name));

    return capsStats;
}
// export async function getCapsStats() {
//     const capsStats: CapsStats[] = await prisma.$queryRaw`SELECT g.name, SUM(kc.caps) as total_caps_on_map, COUNT(m.map) as times_map_was_played, MAX(kc.caps) as max_caps_on_map, m.map
//                                                           FROM gamers g
//                                                                    LEFT JOIN match_gamer mg ON g.id = mg.gamer_id
//                                                                    LEFT JOIN matches m ON mg.match_id = m.id
//                                                                    LEFT JOIN kills_and_caps kc ON kc.match_gamer_id = mg.id
//                                                           GROUP BY g.name, m.map
//                                                           ORDER BY g.name`
//     return capsStats;
// }
export async function getTitanStats(): Promise<TitanStats[]> {
    // Fetch data with relations
    const gamers = await prisma.gamers.findMany({
        include: {
            match_gamer: {
                include: {
                    matches: true,
                    kills_and_caps: true,
                    teams: true,
                },
            },
        },
    });

    const titanStats: TitanStats[] = [];

    gamers.forEach(gamer => {
        const titanStatsMap: Record<string, { total_wins: number; total_losses: number }> = {};

        gamer.match_gamer.forEach(matchGamer => {
            const team = matchGamer.teams;
            const killAndCap = matchGamer.kills_and_caps;

            if (team && killAndCap && killAndCap.titan !== 'none') {
                const titan = killAndCap.titan;

                if (!titanStatsMap[titan as Titan_Name]) {
                    titanStatsMap[titan as Titan_Name] = { total_wins: 0, total_losses: 0 };
                }

                if (team.win_or_loose === 1) {
                    titanStatsMap[titan as Titan_Name].total_wins += 1;
                } else if (team.win_or_loose === 0) {
                    titanStatsMap[titan as Titan_Name].total_losses += 1;
                }
            }
        });

        for (const titan in titanStatsMap) {
            titanStats.push({
                name: gamer.name,
                titan: titan as Titan_Name,
                total_wins: titanStatsMap[titan].total_wins,
                total_losses: titanStatsMap[titan].total_losses,
            });
        }
    });

    // Sorting the results by gamer name
    titanStats.sort((a, b) => a.name.localeCompare(b.name));

    return titanStats;
}
// export async function getTitanStats() {
//     const titanStats: TitanStats[] = await prisma.$queryRaw`SELECT g.name,
//                                                                    SUM(CASE WHEN t.win_or_loose = 1 THEN 1 ELSE 0 END) AS total_wins,
//                                                                    SUM(CASE WHEN t.win_or_loose = 0 THEN 1 ELSE 0 END) AS total_losses,
//                                                                    kc.titan
//                                                             FROM gamers g
//                                                                      LEFT JOIN match_gamer mg ON g.id = mg.gamer_id
//                                                                      LEFT JOIN matches m ON mg.match_id = m.id
//                                                                      LEFT JOIN kills_and_caps kc ON kc.match_gamer_id = mg.id
//                                                                      LEFT JOIN teams t ON mg.team_id = t.id
//                                                             GROUP BY g.name, kc.titan
//                                                             ORDER BY g.name`
//     return titanStats
// }
export async function updateGamer(gamer: Gamer) {

    return await prisma.gamers.update({
        where: {
            id: gamer.id
        },
        data: gamer
    });
}

export async function postMatch(match: Match){

    return await prisma.matches.create({
        data: match
    })
}
export async function postTeam(team: Team){

    return await prisma.teams.create({
        data: team
    })
}
export async function postMatchGamer(matchGamer: MatchGamer){
    return await prisma.match_gamer.create({
        data: matchGamer
    })
}
export async function postKillsAndCaps(killsAndCaps: KillsAndCaps){
    const newKillsAndCaps = await prisma.kills_and_caps.create({
        data: killsAndCaps
    })
    return killsAndCaps
}
export async function postGamer(gamer: Gamer){
    const newGamer = await prisma.gamers.create({
        data: gamer
    })
    return gamer
}
