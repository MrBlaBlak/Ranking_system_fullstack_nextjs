import React from 'react';
import DisplayTeams from './components/DisplayTeams'
import {Gamer} from "../../components/PickGamersBar";
import prisma from '../../../../prisma/client';
import BackgroundImage from '../../../components/BackgroundImage'
import findMostBalancedTeams from './components/FindMostBalancedTeams'

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
            <nav className="absolute left-12 p-4 h-3/4 flex flex-col justify-center">
                <div className="container mx-auto ">
                    <DisplayTeams pickedGamers={slug} gamers={gamers} team1={localTeam1} team2={localTeam2}
                                  server={localServer}/>
                </div>
            </nav>
        </>

    );
}

export default NewMatchPage;