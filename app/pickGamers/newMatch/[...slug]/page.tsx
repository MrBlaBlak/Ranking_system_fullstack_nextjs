import React from 'react';
import TableSection from './components/TableSection'
import {gamers} from "@prisma/client";
import prisma from '@/prisma/client';
import BackgroundImage from '@/app/components/shared/BackgroundImage'
import findMostBalancedTeams from './utils/findMostBalancedTeams'
import Stars from '@/app/components/shared/Stars'

interface Props {
    params: { slug: string[] }
}

async function NewMatchPage({params: {slug}}: Props) {
    const gamers: gamers[] = await prisma.gamers.findMany();
    const selectedGamers: gamers[] = [];
    let localServer = "EU"
    slug.forEach((name, index) => {
        if (index === slug.length - 1) {
            localServer = name;
        }
        const matchingGamer: gamers | undefined = gamers.find((gamer) => gamer.name === name);
        if (matchingGamer) {
            selectedGamers.push(matchingGamer);
        }
    });
    const [localTeam1, localTeam2] = findMostBalancedTeams(selectedGamers, localServer);

    return (
        <>
            <Stars/>
            <BackgroundImage classProperties={"invisible lg:visible"}/>
            <TableSection pickedGamers={slug} gamers={gamers} t1={localTeam1} t2={localTeam2}
                          server={localServer}/>
        </>

    );
}

export default NewMatchPage;