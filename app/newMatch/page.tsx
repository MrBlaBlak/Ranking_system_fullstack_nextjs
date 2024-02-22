import React from 'react';
import prisma from '@/prisma/client';
import BackgroundImage from '../components/BackgroundImage'

import PickGamersBar from "./PickGamersBar"

interface Gamer {
    id: number;
    lastTen: string;
    mmr: number;
    name: string;
    server: string;
}

interface PageProps {
    gamers: Gamer[];
}

async function Page() {
    //workaround for importing async components 'GamersList' cannot be used as a JSX component. Its return type 'Promise<Element>' is not a valid JSX element.
    // const asyncPickGamersBar: JSX.Element = await PickGamersBar();
    return (
        <>
                <BackgroundImage/>
            {/* @ts-expect-error Server Component */}
                <PickGamersBar/>
        </>
    );
}
;

export default Page;

