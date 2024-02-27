'use client';
import Link from 'next/link';
import React from 'react';
import {Gamer} from './PickGamersBar';
import StoreProvider from '../../api/StoreProvider';
import GamersList from './GamersList';
import findMostBalancedTeams from './FindMostBalancedTeams';

type Props = {
    gamers: Gamer[]
};

const StoreWrapperForGamersList: React.FC<Props> = ({gamers}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emptyArray: string[] = new Array(10).fill({});
        const formElementsArray = emptyArray.map((element, index) => (e.currentTarget[index] as HTMLInputElement).value)
        const selectedGamers: Gamer[] = [];
        formElementsArray.forEach((inputName) => {
            const matchingGamer: Gamer | undefined = gamers.find((gamer) => gamer.name === inputName);
            if (matchingGamer) {
                selectedGamers.push(matchingGamer);
            }
        });
        if (selectedGamers.length===10){
           const [team1, team2] = findMostBalancedTeams(selectedGamers);
            console.log(team1)
            console.log(team2)
        }

    }

    return (
        <>
            <StoreProvider>
                <form onSubmit={handleSubmit}>
                    <GamersList gamers={gamers}></GamersList>
                    <button type="submit"
                            className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Create
                        teams
                    </button>
                </form>
            </StoreProvider>
            <Link href='/'>asda</Link>
        </>
    );
}

export default StoreWrapperForGamersList;