import React from 'react';
import BackgroundImage from '../components/shared/BackgroundImage'
import prisma from '@/prisma/client';
import PickGamersBar from './components/PickGamersBar'
import {gamers} from "@prisma/client";
import Stars from '@/app/components/shared/Stars'


async function Page() {
    const gamers: gamers[] = await prisma.gamers.findMany();
    return (
        <>
            <Stars/>
            <BackgroundImage/>
            <PickGamersBar gamers={gamers}/>
        </>
    );
}


export default Page;

