import React from 'react';
import prisma from '@/prisma/client';
import Gamer from '../../model/Gamer';
import { getMapStats } from '../../api/gamers/route';

interface MapStats {
    name: string;
    total_wins: number;
    total_losses: number;
    map: string;
}

interface MapOption {
    value: string;
}

interface MapStatsDTO {
    gamerName: string;
    mapWins: Record<string, number>;
    mapLosses: Record<string, number>;
    mapWinPercent: Record<string, number>;
}

async function Page() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    const mapStats: MapStats[] = await getMapStats();

    const gamerStatsList: MapStatsDTO[] = [];

    const mapOrder: string[] = ["boomtown", "exo", "eden", "drydock", "angel", "colony", "glitch"];

    for (const stats of mapStats) {
        const { name: gamerName, total_wins: mapWins, total_losses: mapLosses, map } = stats;
        const mapWinPercent: number = Math.round(mapWins * 1.0 / (mapWins + mapLosses) * 100);

        // Check if the gamer is already in the list
        const existingGamerStats: MapStatsDTO | undefined = gamerStatsList.find(
            (gamerStats) => gamerStats.gamerName === gamerName
        );

        if (existingGamerStats) {
            // If yes, update the map data
            existingGamerStats.mapWins[map] = mapWins;
            existingGamerStats.mapLosses[map] = mapLosses;
            existingGamerStats.mapWinPercent[map] = mapWinPercent;
        } else {
            // If no, create a new entry for the gamer
            const newGamerStats: MapStatsDTO = {
                gamerName,
                mapWins: { [map]: mapWins },
                mapLosses: { [map]: mapLosses },
                mapWinPercent: { [map]: mapWinPercent },
            };
            gamerStatsList.push(newGamerStats);
        }
    }

    return (
        <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm table-pin-rows ">
                <thead>
                <tr>
                    <th>Gamer Name</th>
                    {mapOrder.map((map) => (
                        <>
                            <th key={`${map}_Wins`}>{`${map} Wins`}</th>
                            <th key={`${map}_Losses`}>{`${map} Losses`}</th>
                            <th key={`${map}_WinPercent`}>{`${map} Win%`}</th>
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
                                <td key={`${map}_Wins`}>{gamerStats.mapWins[map] || 0}</td>
                                <td key={`${map}_Losses`}>{gamerStats.mapLosses[map] || 0}</td>
                                <td key={`${map}_WinPercent`}>{gamerStats.mapWinPercent[map] || 0}%</td>
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