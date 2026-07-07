import React from 'react';
import BackgroundImage from '../components/shared/BackgroundImage'
import prisma from '@/prisma/client';
import PickGamersBar from './components/PickGamersBar'
import {Gamer} from "@prisma/client";
import Stars from '@/app/components/shared/Stars'


async function Page() {
    const gamers: Gamer[] = await prisma.gamer.findMany();
    return (
        <>
            <div className="h-dvh overflow-scroll">
                <Stars/>
                <BackgroundImage/>
                <PickGamersBar gamers={gamers}/>
            </div>
        </>
    );
}


export default Page;

