import React from 'react';
import prisma from '@/prisma/client';
import Gamer from '../../model/Gamer';
import { getTitanStats } from '../../api/gamers/routeDump';
import GetTitan from '../GetTitanImage'
import Link from 'next/link'
interface TitanStatsDTO {
    gamerName: string;
    titanStats: Record<string, { wins: number; losses: number; winPercent: number }>;
}
interface TitanStats {
    name: string;
    total_wins: number;
    total_losses: number;
    titan: string;
}
async function Page() {

    const gamers: Gamer[] = await prisma.gamers.findMany();
    const titanStats: TitanStats[] = await getTitanStats();

    const gamerStatsList: TitanStatsDTO[] = [];

    const titanOrder: string[] = ["ion", "tone", "monarch", "northstar", "ronin", "legion", "scorch"];

    for (const stats of titanStats) {
        const { name: gamerName, total_wins: titanWins, total_losses: titanLosses, titan } = stats;
        const titanWinPercent: number = Math.round((titanWins * 1.0 / (+titanWins + +titanLosses)) * 100);

        // Check if the gamer is already in the list
        const existingGamerStats: TitanStatsDTO | undefined = gamerStatsList.find(
            (gamerStats) => gamerStats.gamerName === gamerName
        );

        if (existingGamerStats) {
            // If yes, update the map data
            existingGamerStats.titanStats[titan] = { wins: titanWins, losses: titanLosses, winPercent: titanWinPercent };
        } else {
            // If no, create a new entry for the gamer
            const newGamerStats: TitanStatsDTO = {
                gamerName,
                titanStats: { [titan]: { wins: titanWins, losses: titanLosses, winPercent: titanWinPercent } },
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
                    {titanOrder.map((titan) => (
                        <>
                            <th className="px-20" colSpan={3} key={`${titan}_Header`} >
                                <GetTitan titan={titan}/>
                            </th>
                        </>
                    ))}
                </tr>
                <tr className="">
                    <th>Player</th>
                    {titanOrder.map((map) => (
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
                        {titanOrder.map((titan) => (
                            <>
                                <td key={`${titan}_Wins`}>{gamerStats.titanStats[titan] ? gamerStats.titanStats[titan].wins : 0}</td>
                                <td key={`${titan}_Losses`}>{gamerStats.titanStats[titan] ? gamerStats.titanStats[titan].losses : 0}</td>
                                <td key={`${titan}_WinPercent`}>{gamerStats.titanStats[titan] ? gamerStats.titanStats[titan].winPercent : 0}%</td>
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
export const dynamic = 'force-dynamic'