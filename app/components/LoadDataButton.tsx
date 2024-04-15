'use client';
import React, {useState, useEffect} from 'react';

import {setStatsData} from '../api/stats/route'

type Props = {
    isDisabled : boolean,
    setDataLoadedTrue: Function
};
const LoadDataButton: React.FC<Props> = ({isDisabled , setDataLoadedTrue}) => {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const handleClick = () => {
        if (!isDisabled ) {
            setStatsData(); // Wywołujemy funkcję do ładowania danych tylko jeśli przycisk nie jest zablokowany
            setDataLoadedTrue();
            setAlertVisible(true);
        }
    };


    return (
        <>
            <button
                className="btn btn-outline btn-accent btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300"
                onClick={handleClick}
                disabled={isDisabled}
            >
                Load Stats Data
            </button>
            <div role="alert" className={"alert alert-success " + (isAlertVisible ? 'show' : 'hidden')}>
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