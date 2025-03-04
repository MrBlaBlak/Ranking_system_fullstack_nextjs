'use client'
import {gamers} from "@prisma/client";
import React from 'react';
import {disableSelectedOption} from '@/app/redux/selectedOptionsSlice';
import {useAppDispatch, useAppSelector} from '@/app/redux/hooks'
import {AppDispatch} from "@/app/redux/store";

type Props = {
    gamers: gamers[]
};
const GamersList: React.FC<Props> = ({gamers}) => {
    const dispatch = useAppDispatch<AppDispatch>();
    const selectedOptions = useAppSelector((state) => state.selectedOptions.selectedOptions);

    const handleSelectChange = (index: number, value: string) => {
        dispatch(disableSelectedOption({index, value}));
    };

    const gamersTable: string [] = new Array(10).fill({});
    return (

        <div className="flex flex-col gap-y-1">
            {gamersTable.map((elem, index) => (
                    <select key={index}
                            id={`selectGamer${index}`}
                            value={selectedOptions[index]}
                            className="select max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-xs sm:select-sm md:select-sm lg:select-md"
                            onChange={(e) => handleSelectChange(index, e.target.value)}
                            required
                    >
                        <option value="" style={{display: "none"}}>-Player {index + 1}-</option>
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
            <select id="selectMap"
                    className="select my-1 max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
                    required
            >
                <option value="" style={{display: "none"}}>-Server-</option>
                <option value="EU">EU</option>
                <option value="NY">NY</option>
            </select>
        </div>

    );
}

export default GamersList;