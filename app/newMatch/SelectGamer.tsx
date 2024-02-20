import React from 'react';
import prisma from '@/prisma/client';

interface Gamer {
    id: number;
    lastTen: string;
    mmr: number;
    name: string;
    server: string;
}

interface Gamers {
    gamers: Gamer[];
}

async function SelectGamer() {
    const gamers = await getGamers();
    const gamersTable: Gamers [] = new Array(10).fill({});

    const gamersJSX = gamersTable.map((elem,index) =>
            (
                <select key={index} className="select select-ghost select-bordered w-full max-w-xs flex flex-col space-y-4 text-white">
                    <option disabled selected>PickGamer</option>
                    {
                        gamers.map((gamer) =>
                            (<option key={gamer.id}>{gamer.name}</option>))
                    }
                </select>
            )
    );

    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                {gamersJSX}
            </div>
        </nav>
    );
}

async function getGamers() {
    const gamers = await prisma.gamers.findMany();
    return gamers;
}

export default SelectGamer;
// const gamersJSX = gamers.map(
//     (gamer) =>
//         (
//             <select className="select select-ghost select-bordered w-full max-w-xs absolute ">
//                 <option disabled selected>PickGamer</option>
//                 <option key={gamer.id}>{gamer.name}</option>
//             </select>
//         )
// );