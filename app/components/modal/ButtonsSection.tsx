import React from 'react';
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {setIsModalOpen, setIsWaiting, setNeedHelp} from "@/app/redux/modalSlice";
import {AppDispatch} from "@/app/redux/store";

type Props = {};

const ButtonsSection = ({}: Props) => {

    const dispatch = useAppDispatch<AppDispatch>();
    const {finishedTalking} = useAppSelector((state) => state.modal);

    const handleClick = (isNeedingForHelp: boolean, rejected?: string) => {
        if (typeof rejected === "string") {
            localStorage.setItem("rejected", rejected)
        }
        dispatch(setNeedHelp(isNeedingForHelp));
        dispatch(setIsWaiting(false));
    }
    return (
        <>
            {finishedTalking && <>
                <button className="btn btn-outline btn-success min-w-20" onClick={() => handleClick(true)}>Yes</button>
                <button className="btn btn-outline btn-error min-w-20" onClick={() => handleClick(false, "yes")}>No
                </button>
            </>}
            <button className="btn btn-outline min-w-20" onClick={() => dispatch(setIsModalOpen(false))}>Close</button>
        </>
    )
};
export default ButtonsSection;