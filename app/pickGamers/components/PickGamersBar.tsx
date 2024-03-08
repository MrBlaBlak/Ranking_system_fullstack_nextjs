import React from 'react';
import GamersList from './GamersList'
import prisma from '@/prisma/client';
import StoreWrapperForGamersList from './StoreWrapperForGamersList'
export interface Gamer {
    id: number;
    lastTen: string;
    mmr: number;
    name: string;
    server: string;
}
async function PickGamersBar() {
    
    const gamers: Gamer[] = await prisma.gamers.findMany();

    // console.log("team1total", team1.reduce((accumulator, currentValue) => accumulator + currentValue.mmr, 0))
    // console.log("team2total", team2.reduce((accumulator, currentValue) => accumulator + currentValue.mmr, 0))

    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                    <StoreWrapperForGamersList gamers={gamers} />
            </div>
        </nav>
    );
}
export default PickGamersBar;
