import React, {MouseEventHandler} from 'react';

type Props = {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    finishedTalking: boolean,
    setNeedHelp: React.Dispatch<React.SetStateAction<boolean>>,
    setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>,
};

const ButtonsSection = ({setIsModalOpen, finishedTalking, setNeedHelp, setIsWaiting}: Props) => {
    const handleClick = () => {
        setNeedHelp(true);
        setIsWaiting(false);
    }

    return (
        <>
            {finishedTalking && <>
                <button className="btn btn-outline btn-success min-w-20" onClick={handleClick}>Yes</button>
                <button className="btn btn-outline btn-error min-w-20">No</button>
            </>}
            <button className="btn btn-outline min-w-20" onClick={() => setIsModalOpen(false)}>Close</button>
        </>
    )
};
export default ButtonsSection;