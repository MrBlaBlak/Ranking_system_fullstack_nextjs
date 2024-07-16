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
            <div className="relative left-8  sm:left-20 md:left-32 lg:left-40 xl:left-1/4 p-4 ">
                    <PickGamersBar gamers={gamers}/>
            </div>
        </>
    );
}


export default Page;

