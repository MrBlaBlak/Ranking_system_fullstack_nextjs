'use client'
import React, {useState} from 'react';
import GetMap from '../../GetMapImage';
import Link from 'next/link';
interface ElimsStats {
    name: string;
    total_kills_on_map: number;
    times_map_was_played: number;
    max_kills_on_map: number;
    map: string;
}
type Prop = {
    resultsKills: ElimsStats[];
}
interface ElimsStatsDTO {
    gamerName: string;
    mapStats: Record<string, { totalKills: number; totalGames: number; maxKills: number; averageKills: number }>;
}
type StatKey = 'totalKills' | 'totalGames' | 'maxKills' | 'averageKills';
 function Table({resultsKills}: Prop) {

    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


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

    const handleSort = (column: string) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newSortOrder);
    };

    const sortedGamerStatsList = [...gamerStatsList].sort((a, b) => {
        if (sortColumn) {
            const [map, stat] = sortColumn.split('_');
            const statKey = stat as StatKey;
            const aValue = a.mapStats[map]?.[statKey] || 0;
            const bValue = b.mapStats[map]?.[statKey] || 0;
            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
    });

    return (
        <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm">
                <thead className="sticky top-0 " data-theme="dark">
                <tr className="border-none">
                    <th>
                        <Link href="/" className="btn btn-outline hover:text-gray-300 transition duration-300">Go back</Link>
                    </th>
                    {mapOrder.map((map) => (
                        <th colSpan={3} key={`${map}_Header`}>
                            <GetMap map={map} />
                        </th>
                    ))}
                </tr>
                <tr className="">
                    <th onClick={() => handleSort('gamerName')}>Player</th>
                    {mapOrder.map((map) => (
                        <React.Fragment key={map}>
                            <th onClick={() => handleSort(`${map}_averageKills`)}>Average</th>
                            <th onClick={() => handleSort(`${map}_maxKills`)}>Max Kills</th>
                            <th onClick={() => handleSort(`${map}_totalGames`)}>Total Games</th>
                        </React.Fragment>
                    ))}
                </tr>
                </thead>
                <tbody>
                {sortedGamerStatsList.map((gamerStats) => (
                    <tr key={gamerStats.gamerName}>
                        <td>{gamerStats.gamerName}</td>
                        {mapOrder.map((map) => (
                            <React.Fragment key={map}>
                                <td>{gamerStats.mapStats[map]?.averageKills || 0}</td>
                                <td>{gamerStats.mapStats[map]?.maxKills || 0}</td>
                                <td>{gamerStats.mapStats[map]?.totalGames || 0}</td>
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}export default Table;