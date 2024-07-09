'use client'
import {gamers} from "@prisma/client";
import React from 'react';
import {disableSelectedOption} from '@/app/redux/actions';
import {State} from '@/app/redux/reducers';
import {useAppDispatch, useAppSelector} from '@/app/redux/hooks'
import Link from 'next/link'
type Props = {
    gamers: gamers[]
};
const GamersList: React.FC<Props> = ({gamers}) => {
    
    const dispatch = useAppDispatch();
    const selectedOptions = useAppSelector((state: State) => state.selectedOptions);
    const handleSelectChange = (index: number, value: string) => {
        dispatch(disableSelectedOption(index, value));
    };
    const handleRandomSelect = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const randomPlayers = [...gamers]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10)
            .map(gamer => gamer.name);
        console.log(randomPlayers)
        randomPlayers.forEach((player, index) => {
            dispatch(disableSelectedOption(index, player));
        });
    };
    const gamersTable: string [] = new Array(10).fill({});
    return (
        <>

                {gamersTable.map((elem, index) => (
                        <select key={index}
                                value={selectedOptions[index]}
                                className="select max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
                                onChange={(e) => handleSelectChange(index, e.target.value)}
                                required
                        >
                            <option value="" style={{display: "none"} }>-Player {index + 1}-</option>
                            {
                                gamers.map((gamer) =>
                                    (<option key={gamer.id}
                                             disabled={selectedOptions.includes(gamer.name)}
                                             value={gamer.name}
                                             style={{
                                                 color: selectedOptions.includes(gamer.name) ? '#666' : 'inherit',
                                             }}
                                    >
                                        {gamer.name}
                                    </option>))
                            }
                        </select>
                    )
                )}
            <select className="select my-1 max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
                    required
            >
                <option value="" style={{display: "none"} }>-Server-</option>
                <option value="EU">EU</option>
                <option value="NY">NY</option>
            </select>
            <button type="submit"
                    className="btn btn-success max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm md:btn-md  hover:text-gray-300 transition duration-300 mb-1">
                Create teams
            </button>
            <button type="button"
                    onClick={handleRandomSelect}
                    className="btn btn-primary max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm md:btn-md hover:text-gray-300 transition duration-300 mb-1">
                Randomize Players
            </button>
            <Link href="/"
                  className="btn btn-neutral max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm sm:btn-sm md:btn-md  hover:text-gray-300 transition duration-300 ">
                Go back
            </Link>
        </>
    );
}

export default GamersList;