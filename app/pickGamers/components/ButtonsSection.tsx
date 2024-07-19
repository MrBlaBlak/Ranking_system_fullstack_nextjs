'use client'
import React from 'react';
import {disableSelectedOption} from "@/app/redux/selectedOptionsSlice";
import Link from "next/link";
import {useAppDispatch} from "@/app/redux/hooks";
import {AppDispatch} from "@/app/redux/store";
import {gamers} from '@prisma/client'
import {textsPickGamers} from "@/public/data/guideTexts";
import Guide from "@/app/components/Guide";

type Props = { gamers: gamers[] };
const ButtonsSection = ({gamers}: Props) => {
    const dispatch = useAppDispatch<AppDispatch>();

    const handleRandomSelect = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const randomPlayers = [...gamers]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10)
            .map(gamer => gamer.name);

        randomPlayers.forEach((value, index) => {
            dispatch(disableSelectedOption({index, value}));
        });
    };
    return (

        <div className="flex flex-col gap-y-1 ml-2 sm:ml-20">
            <Guide texts={textsPickGamers}/>
            <button type="submit"
                    className="btn btn-success max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm md:btn-md  hover:text-gray-300 transition duration-300 ">
                Create Teams
            </button>
            <button type="button"
                    onClick={handleRandomSelect}
                    className="btn btn-primary max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm md:btn-md hover:text-gray-300 transition duration-300 ">
                Randomize Players
            </button>
            <Link href="/"
                  className="btn btn-neutral max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm sm:btn-sm md:btn-md  hover:text-gray-300 transition duration-300 ">
                Go Back
            </Link>
        </div>
    )
};
export default ButtonsSection;