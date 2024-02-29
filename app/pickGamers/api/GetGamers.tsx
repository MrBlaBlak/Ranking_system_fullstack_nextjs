
import prisma from '../../../prisma/client';
import React from 'react';

async function GetGamers() {
    const gamers = await fetchGamers();
    return (
        gamers
    );
}
async function fetchGamers() {
    const gamers = await prisma.gamers.findMany();
    return gamers;
}
export default GetGamers;