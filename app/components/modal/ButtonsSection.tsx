import React, {MouseEventHandler} from 'react';

type Props = {
    closeModal: MouseEventHandler<HTMLButtonElement>,
    finishedTalking: boolean,
    setNeedHelp: React.Dispatch<React.SetStateAction<boolean>>,
    setCounter: React.Dispatch<React.SetStateAction<number>>;
};

const ButtonsSection = ({closeModal, finishedTalking, setNeedHelp, setCounter}: Props) => {
    const handleClick = () => {
        setNeedHelp(true);
        setCounter(prevState => prevState + 1)
    }

    return (
        <>
            {finishedTalking && <>
                <button className="btn btn-outline btn-success min-w-20" onClick={handleClick}>Yes</button>
                <button className="btn btn-outline btn-error min-w-20">No</button>
            </>}
            <button className="btn btn-outline min-w-20" onClick={closeModal}>Close</button>
        </>
    )
};
export default ButtonsSection;