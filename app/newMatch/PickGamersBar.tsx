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



    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                <form>
                    <StoreWrapperForGamersList gamers={gamers} />
                    <button type="submit" className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Create teams</button>
                </form>
            </div>
        </nav>
    );
}
export default PickGamersBar;
