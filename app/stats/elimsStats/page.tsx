import React from 'react';
import prisma from '@/prisma/client';
import Gamer from '../../model/Gamer';
import { getElimsStats } from '../../api/gamers/routeDump';
import GetMap from '../GetMapImage'
import Link from 'next/link'
interface ElimsStats {
    name: string;
    total_kills_on_map: number;
    times_map_was_played: number;
    max_kills_on_map: number;
    map: string;
}

interface ElimsStatsDTO {
    gamerName: string;
    mapStats: Record<string, { totalKills: number; totalGames: number; maxKills: number; averageKills: number }>;
}

async function Page() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    const resultsKills: ElimsStats[] = await getElimsStats();
    const mapOrder: string[] = ["boomtown", "exo", "eden", "drydock", "angel", "colony", "glitch"];

    const gamerStatsList: ElimsStatsDTO[] = [];

    for (const result of resultsKills) {
        const { name: gamerName, total_kills_on_map, times_map_was_played, max_kills_on_map, map } = result;
        const averageKills = times_map_was_played > 0 ? Math.round((total_kills_on_map / Number(times_map_was_played)) * 100) / 100 : 0;
        const existingGamerStats: ElimsStatsDTO | undefined = gamerStatsList.find(
            (gamerStats) => gamerStats.gamerName === gamerName
        );
        if (existingGamerStats) {
            existingGamerStats.mapStats[map] = {
                totalKills: total_kills_on_map,
                totalGames: Number(times_map_was_played),
                maxKills: max_kills_on_map,
                averageKills,
            };
        } else {
            const newGamerStats: ElimsStatsDTO = {
                gamerName,
                mapStats: {
                    [map]: {
                        totalKills: total_kills_on_map,
                        totalGames: Number(times_map_was_played),
                        maxKills: max_kills_on_map,
                        averageKills,
                    },
                },
            };
            gamerStatsList.push(newGamerStats);
        }
    }

    return (
        <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm">
                <thead className="sticky top-0 " data-theme="dark">
                <tr className="border-none">
                    <th>
                        <Link href="/"
                              className="btn btn-outline hover:text-gray-300 transition duration-300">Go back</Link>
                    </th>
                    {mapOrder.map((map) => (
                        <>
                            <th colSpan={3} key={`${map}_Header`}>
                                <GetMap map={map}/>
                            </th>
                        </>
                    ))}
                </tr>
                <tr className="">
                    <th>Player</th>
                    {mapOrder.map((map) => (
                        <>
                            <th key={`${map}_AverageKills`}>Average</th>
                            <th key={`${map}_MaxKills`}>Max Kills</th>
                            <th key={`${map}_TotalGames`}>Total Games</th>
                        </>
                    ))}
                </tr>
                </thead>
                <tbody>
                {gamerStatsList.map((gamerStats) => (
                    <tr key={gamerStats.gamerName}>
                        <td>{gamerStats.gamerName}</td>
                        {mapOrder.map((map) => (
                            <>
                                <td key={`${map}_AverageKills`}>{gamerStats.mapStats[map]?.averageKills || 0}</td>
                                <td key={`${map}_MaxKills`}>{gamerStats.mapStats[map]?.maxKills || 0}</td>
                                <td key={`${map}_TotalGames`}>{gamerStats.mapStats[map]?.totalGames || 0}</td>
                            </>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Page;