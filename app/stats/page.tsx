import React from 'react';
import BackgroundImage from '../components/BackgroundImage'
import {findMostFrequentTitanForGamer} from '../api/gamers/route'
import Gamer from '../model/Gamer'
import prisma from '@/prisma/client'
interface TitanStats {
    gamer_id: number;
    max_titan: string;
}
async function Page() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    const titanStats: TitanStats[] = await findMostFrequentTitanForGamer()
     // findMostFrequentTitanForGamer().then((result)=>console.log(result)).catch((e)=>console.log(e));
    const gamerTitanMap: Map<number, string> = new Map();
    titanStats.forEach((result) => {
        gamerTitanMap.set(result.gamer_id, result.max_titan);
    });
    return (
        <>
            <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm table-pin-rows ">
                <thead>
                <tr>

                    <th>Rank</th>
                    <th>Name</th>
                    <th>MMR</th>
                    <th>Server</th>
                    <th>Last 10</th>
                    <th>Most played Titan</th>
                </tr>
                </thead>
                <tbody>
                {gamers.map((gamer, index) => (
                    <tr key={gamer.id}>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="@/public/images/Bronze_Badge.png" alt="badge" />
                                    </div>
                                </div>
                            </div>{index+1}</td>

                        <td>{gamer.name}</td>
                        <td>{gamer.mmr}</td>
                        <td>{gamer.server}</td>
                        <td>{gamer.lastTen}</td>
                        <td>{gamerTitanMap.get(gamer.id!) || '-'}</td>
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

