'use client';
import React from 'react';
import {Gamer} from './PickGamersBar';
import StoreProvider from '../../api/StoreProvider';
import GamersList from './GamersList';
import {useRouter} from 'next/navigation'
type Props = {
    gamers: Gamer[]
};
//uncontrolled version of the form
const StoreWrapperForGamersList: React.FC<Props> = ({gamers}) => {
    const router = useRouter();
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emptyArray: string[] = new Array(e.currentTarget.length).fill({});
        const formElementsArray = emptyArray.map((element, index) => (e.currentTarget[index] as HTMLInputElement).value)
        const slugurl  = `/pickGamers/newMatch/${formElementsArray.join("/")}`;
        router.push(slugurl)
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
        </>
    );
}
export default StoreWrapperForGamersList;