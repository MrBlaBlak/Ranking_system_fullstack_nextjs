
import {checkIfGamersExist, setGamersData} from '../api/stats/route'
import React, {useState, useEffect} from 'react';
type Props = {
    isDisabled: boolean,
    setGamersLoaded: Function
};
const LoadGamersButton: React.FC<Props> = ({isDisabled, setGamersLoaded}) => {
    const [isAlertVisible, setAlertVisible] = useState(false);
    const handleClick = () => {
        if (!isDisabled) {
            setGamersData();
            setGamersLoaded();
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
                Load Gamers
            </button>
            <div role="alert" className={"alert alert-success " + (isAlertVisible ? 'show' : 'hidden')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Gamers data loaded successfully! You can start a new match now</span>
            </div>
        </>
    );
}

export default LoadGamersButton;