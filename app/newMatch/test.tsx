import React from 'react';
import prisma from '@/prisma/client';
async function Test() {
    const gamers = await getGamers()
    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                <ul className="flex flex-col space-y-4 text-white">
                    {gamers.map((gamer) => (
                        <li key={gamer.id}>{gamer.name}</li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
async function getGamers() {
    const gamers = await prisma.gamers.findMany();
    return gamers;
}
export default Test;