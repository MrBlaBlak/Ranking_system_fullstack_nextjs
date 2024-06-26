
import React from 'react';
import BackgroundImage from '../components/BackgroundImage'
import prisma from '@/prisma/client';
import StoreWrapperForGamersList from './components/StoreWrapperForGamersList'
import Gamer from "@/app/model/Gamer";

async function Page() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    return (
        <>
            <BackgroundImage/>
            <div className="relative left-8  sm:left-20 md:left-32 lg:left-40 xl:left-1/4 p-4 ">
                    <StoreWrapperForGamersList gamers={gamers}/>
            </div>
        </>
    );
}
;

export default Page;

