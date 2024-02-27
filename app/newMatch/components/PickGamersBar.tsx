import React from 'react';
import GamersList from './GamersList'
import prisma from '../../../prisma/client';
import StoreWrapperForGamersList from './StoreWrapperForGamersList'
import FindMostBalancedTeams from './FindMostBalancedTeams'
export interface Gamer {
    id: number;
    lastTen: string;
    mmr: number;
    name: string;
    server: string;
}


async function PickGamersBar() {
    const gamers: Gamer[] = await prisma.gamers.findMany();
    // const gamers2: Gamer[] = [
    //     { id: 1,  lastTen: 'asda', mmr: 631.5, name: 'Suddi', server: 'asdas' },
    //     { id: 2,  lastTen: 'asda', mmr: 622.4, name: 'fs', server: 'asdas' },
    //     { id: 3,  lastTen: 'asda', mmr: 611.8, name: 'sdfi', server: 'asdas' },
    //     { id: 4,  lastTen: 'asda', mmr: 632.2, name: 'Ssdfdi', server: 'asdas' },
    //     { id: 5,  lastTen: 'asda', mmr: 619.4, name: 'Suwerdi', server: 'asdas' },
    //     { id: 6,  lastTen: 'asda', mmr: 601.3, name: 'Swerdi', server: 'asdas' },
    //     { id: 7,  lastTen: 'asda', mmr: 588.4, name: '345uddi', server: 'asdas' },
    //     { id: 8,  lastTen: 'asda', mmr: 578.9, name: 'dfguddi', server: 'asdas' },
    //     { id: 9,  lastTen: 'asda', mmr: 590.4, name: '34g5di', server: 'asdas' },
    //     { id: 10,  lastTen: 'asda', mmr: 570.4, name: 'jhgdi', server: 'asdas' },
    // ];
    //
    // const { team1, team2 } = FindMostBalancedTeams(gamers2);

    // console.log('Team 1:', team1);
    // console.log('Team 2:', team2);
    // console.log("team1total", team1.reduce((accumulator, currentValue) => accumulator + currentValue.mmr, 0))
    // console.log("team2total", team2.reduce((accumulator, currentValue) => accumulator + currentValue.mmr, 0))

    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                    <StoreWrapperForGamersList gamers={gamers} />
            </div>
        </nav>
    );
}
export default PickGamersBar;
