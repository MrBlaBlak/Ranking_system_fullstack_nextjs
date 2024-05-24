'use client'
import Gamer from '@/app/model/Gamer'
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {disableSelectedOption} from '@/app/redux/actions';
import {State} from '@/app/redux/reducers';
import {useAppDispatch, useAppSelector} from '@/app/redux/hooks'
import Link from 'next/link'
type Props = {
    gamers: Gamer[]
};
const GamersList: React.FC<Props> = ({gamers}) => {
    
    const dispatch = useAppDispatch();
    const selectedOptions = useAppSelector((state: State) => state.selectedOptions);
    const handleSelectChange = (index: number, value: string) => {
        dispatch(disableSelectedOption(index, value));
    };
    const gamersTable: string [] = new Array(10).fill({});
    return (
        <>

                {gamersTable.map((elem, index) => (
                        <select key={index}
                                className="select select-ghost select-bordered w-full max-w-xs sm:select-xs md:select-sm lg:select-md flex flex-col space-y-4 text-white"
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
            <select className="select select-ghost select-bordered max-w-xs sm:select-xs md:select-sm lg:select-md flex flex-col space-y-4 text-white"
                    required
            >
                <option value="" style={{display: "none"} }>-Server-</option>
                <option value="EU">EU</option>
                <option value="NY">NY</option>
            </select>
            <button type="submit"
                    className="btn btn-outline btn-success  btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Create
                teams
            </button>
            <div className="w-5 inline-block"></div>
            <Link href="/"
                  className="btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300 ">Go
                back</Link>
        </>
    );
}

export default GamersList;