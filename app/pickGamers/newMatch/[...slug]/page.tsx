import React from 'react';
import DisplayTeams from './components/DisplayTeams'
import Gamer from "@/app/model/Gamer";
import prisma from '@/prisma/client';
import BackgroundImage from '@/app/components/BackgroundImage'
import findMostBalancedTeams from './utils/findMostBalancedTeams'

interface Props {
    params: { slug: string[] }
}

async function NewMatchPage({params: {slug}}: Props) {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    const selectedGamers: Gamer[] = [];
    let localServer = "EU"
    slug.forEach((name,index) => {
        if(index===slug.length-1) {
            localServer = name;
        }
        const matchingGamer: Gamer | undefined = gamers.find((gamer) => gamer.name === name);
        if (matchingGamer) {
            selectedGamers.push(matchingGamer);
        }
    });
    const [localTeam1, localTeam2] = findMostBalancedTeams(selectedGamers, localServer);

    return (
        <>
            <BackgroundImage/>
                <div className="relative left-2 top-2 sm:left-8 sm:top-8 md:left-32 lg:left-40 xl:left-60 p-4 rounded-lg max-w-xl bg-base-200">
                    <DisplayTeams pickedGamers={slug} gamers={gamers} t1={localTeam1} t2={localTeam2}
                                  server={localServer}/>
                </div>
        </>

    );
}

export default NewMatchPage;