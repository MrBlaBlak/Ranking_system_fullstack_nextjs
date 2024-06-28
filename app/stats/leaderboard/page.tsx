import React from 'react';
import {findMostFrequentTitanForGamer} from '@/app/api/gamers/routeDump'
import Gamer from '@/app/model/Gamer'
import prisma from '@/prisma/client'
import GetBadge from './GetBadgeImage'
import GetTitan from '../GetTitanImage'
import Link from 'next/link'

interface TitanStats {
    gamer_id: number;
    max_titan: string;
}

function formatLastTenResults(lastTen: string): string {
    const wins = (lastTen.match(/1/g) || []).length;
    const losses = 10 - wins
    return `${wins}:${losses}`;
}

async function Page() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    const titanStats: TitanStats[] = await findMostFrequentTitanForGamer()
    const gamerTitanMap: Map<number, string> = new Map();
    titanStats.forEach((result) => {
        gamerTitanMap.set(result.gamer_id, result.max_titan);
    });
    const sortedGamers = [...gamers].sort((a, b) => b.mmr - a.mmr);
    return (
        <>
            <div className="overflow-x-auto h-dvh">
                <table className="table table-zebra table-sm table-pin-rows ">
                    <thead>
                    <tr >
                        <th>Rank</th>
                        <th>Name</th>
                        <th>MMR</th>
                        <th>Most played Titan</th>
                        <th>Last 10</th>
                        <th>Server</th>
                        <td><Link href="/"
                                  className=" btn btn-outline hover:text-gray-300 transition duration-300 my-1">Go
                            back</Link></td>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedGamers.map((gamer, index) => (
                        <tr key={gamer.id}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <GetBadge mmr={gamer.mmr}/>
                                        </div>
                                    </div>
                                    {index + 1}
                                </div>
                            </td>

                            <td>{gamer.name}</td>
                            <td>{gamer.mmr}</td>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <GetTitan titan={gamerTitanMap.get(gamer.id!) || ''}/>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{formatLastTenResults(gamer.lastTen)}</td>
                            <td>{gamer.server}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
;
export default Page;
export const dynamic = 'force-dynamic'
