'use client'
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import LoadDataButton from './LoadDataButton'
import LoadGamersButton from './LoadGamersButton'
import {checkIfDataExist, checkIfGamersExist} from '../api/stats/prismaActions';


function Navbar() {
    const [isDataLoaded, setDataLoaded] = useState(true);
    const [isGamersDataLoaded, setGamersDataLoaded] = useState(true);
    const [isGamersDataNotLoaded, setGamersDataNotLoaded] = useState(true);
    const setDataLoadedTrue = () => {
        setDataLoaded(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            const gamersExists = await checkIfGamersExist();
            setGamersDataLoaded(gamersExists);
            setGamersDataNotLoaded(!gamersExists)
            if (gamersExists) {
                const dataExists = await checkIfDataExist();
                setDataLoaded(dataExists);
            }
        };
        fetchData();
    }, [isGamersDataLoaded]);

    return (
            <ul className="flex flex-col space-y-4">
                <Link href="/pickGamers"
                      className={"btn btn-neutral btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 hover:text-gray-300 transition duration-300 " + (isGamersDataNotLoaded ? 'btn-disabled' : '')}>Start
                    a new Match</Link>
                <Link href="/stats/leaderboard"
                      className="btn btn-neutral  btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 hover:text-gray-300 transition duration-300">Leaderboard</Link>
                <Link href="/stats/mapsStats"
                      className="btn btn-neutral btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 hover:text-gray-300 transition duration-300">Maps
                    Stats</Link>
                <Link href="/stats/elimsStats"
                      className="btn btn-neutral btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 hover:text-gray-300 transition duration-300">Elimination
                    Stats</Link>
                <Link href="/stats/capsStats"
                      className="btn btn-neutral btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 hover:text-gray-300 transition duration-300">Flag
                    Capture Stats</Link>
                <Link href="/stats/titanStats"
                      className="btn btn-neutral btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60  hover:text-gray-300 transition duration-300">Titan
                    Stats</Link>
                {!isDataLoaded && <LoadDataButton isDisabled={isDataLoaded} setDataLoadedTrue={setDataLoadedTrue}/>}
                {!isGamersDataLoaded &&
                    <LoadGamersButton isDisabled={isGamersDataLoaded} setGamersLoaded={setGamersDataLoaded}/>}
            </ul>
    );
}

export default Navbar;