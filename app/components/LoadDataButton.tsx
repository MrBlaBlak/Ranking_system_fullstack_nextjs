'use client';
import React, {useState} from 'react';

import {setStatsData} from '../api/stats/prismaActions'

type Props = {
    isDisabled : boolean,
    setDataLoadedTrue: Function
};
const LoadDataButton: React.FC<Props> = ({isDisabled , setDataLoadedTrue}) => {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const handleClick = () => {
        if (!isDisabled ) {
            setStatsData();
            setDataLoadedTrue();
            setAlertVisible(true);
        }
    };

    return (
        <>
            <button
                className="btn btn-neutral btn-md lg:btn-lg max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60  hover:text-gray-300 transition duration-300"
                onClick={handleClick}
                disabled={isDisabled}
            >
                Load Stats Data
            </button>
            <div role="alert" className={"alert alert-success max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 " + (isAlertVisible ? 'show' : 'hidden')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Data loaded successfully!</span>
            </div>
        </>
    );
}

export default LoadDataButton;