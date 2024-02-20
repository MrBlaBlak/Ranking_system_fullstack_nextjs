import React from 'react';
import prisma from '@/prisma/client';

async function GamersList() {
    const gamers = await getGamers();
    return (
        <>
            {
                gamers.map((gamer) =>
                    (<option key={gamer.id}>{gamer.name}</option>))
            }
        </>
    );
}
async function getGamers() {
    const gamers = await prisma.gamers.findMany();
    return gamers;
}

export default GamersList;