import React from 'react';
import prisma from '@/prisma/client';
import Gamer from '../../model/Gamer';
import { getMapStats } from '../../api/gamers/routeDump';
import GetMap from '../GetMapImage'
import Link from 'next/link'
interface MapStats {
    name: string;
    total_wins: number;
    total_losses: number;
    map: string;
}


interface MapStatsDTO {
    gamerName: string;
    mapStats: Record<string, { wins: number; losses: number; winPercent: number }>;
}

async function Page() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    const mapStats: MapStats[] = await getMapStats();

    const gamerStatsList: MapStatsDTO[] = [];

    const mapOrder: string[] = ["boomtown", "exo", "eden", "drydock", "angel", "colony", "glitch"];

    for (const stats of mapStats) {
        const { name: gamerName, total_wins: mapWins, total_losses: mapLosses, map } = stats;
        const mapWinPercent: number = Math.round((mapWins * 1.0 / (+mapWins + +mapLosses)) * 100);

        // Check if the gamer is already in the list
        const existingGamerStats: MapStatsDTO | undefined = gamerStatsList.find(
            (gamerStats) => gamerStats.gamerName === gamerName
        );

        if (existingGamerStats) {
            // If yes, update the map data
            existingGamerStats.mapStats[map] = { wins: mapWins, losses: mapLosses, winPercent: mapWinPercent };
        } else {
            // If no, create a new entry for the gamer
            const newGamerStats: MapStatsDTO = {
                gamerName,
                mapStats: { [map]: { wins: mapWins, losses: mapLosses, winPercent: mapWinPercent } },
            };
            gamerStatsList.push(newGamerStats);
        }
    }

    return (
        <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm ">
                <thead className="sticky top-0 " data-theme="dark">
                <tr className="border-none">
                    <th>
                        <Link href="/"
                              className="btn btn-outline hover:text-gray-300 transition duration-300">Go back</Link>
                    </th>
                    {mapOrder.map((map) => (
                        <>
                            <th  colSpan={3} key={`${map}_Header`} >
                                        <GetMap map={map}/>
                            </th>
                        </>
                    ))}
                </tr>
                <tr className="">
                    <th>Player</th>
                    {mapOrder.map((map) => (
                        <>
                            <th key={`${map}_Wins`}>Wins</th>
                            <th key={`${map}_Losses`}>Losses</th>
                            <th key={`${map}_WinPercent`}>Win%</th>
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
                                <td key={`${map}_Wins`}>{gamerStats.mapStats[map] ? gamerStats.mapStats[map].wins : 0}</td>
                                <td key={`${map}_Losses`}>{gamerStats.mapStats[map] ? gamerStats.mapStats[map].losses : 0}</td>
                                <td key={`${map}_WinPercent`}>{gamerStats.mapStats[map] ? gamerStats.mapStats[map].winPercent : 0}%</td>
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

