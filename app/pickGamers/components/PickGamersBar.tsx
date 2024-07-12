'use client';
import React from 'react';
import {gamers} from '@prisma/client'
import StoreProvider from '@/app/StoreProvider';
import GamersList from './GamersList';
import {useRouter} from 'next/navigation'

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
        const slugurl  = `/pickGamers/newMatch/${formElementsArray.join("/")}`;
        router.push(slugurl)
    }
    return (
                    <form className="flex flex-col gap-y-1" onSubmit={handleSubmit}>
                        <GamersList gamers={gamers}></GamersList>
                    </form>
    );
}
export default PickGamersBar;