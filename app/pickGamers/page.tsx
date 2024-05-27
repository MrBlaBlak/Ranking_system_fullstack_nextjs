
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
            <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col ">
                <div className="container mx-auto ">
                    <StoreWrapperForGamersList gamers={gamers}/>
                </div>
            </nav>
        </>
    );
}
;

export default Page;

