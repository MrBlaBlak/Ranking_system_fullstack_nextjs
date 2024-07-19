'use client';
import React from 'react';
import {gamers} from '@prisma/client'
import GamersList from './GamersList';
import {useRouter} from 'next/navigation'
import ButtonsSection from "@/app/pickGamers/components/ButtonsSection";

type Props = {
    gamers: gamers[]
};
//uncontrolled version of the form
const PickGamersBar: React.FC<Props> = ({gamers}) => {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emptyArray: string[] = new Array(e.currentTarget.length).fill({});
        const formElementsArray = emptyArray.map((element, index) => (e.currentTarget[index] as HTMLInputElement).value)
        const slugUrl = `/pickGamers/newMatch/${formElementsArray.join("/")}`;
        router.push(slugUrl)
    }
    return (
        <div className="relative left-8 sm:left-20 md:left-32 lg:left-40 xl:left-1/4 p-4 ">
            <form className="flex flex-row gap-y-10" onSubmit={handleSubmit}>
                <GamersList gamers={gamers}></GamersList>
                <ButtonsSection gamers={gamers}/>
            </form>
        </div>
    );
}
export default PickGamersBar;