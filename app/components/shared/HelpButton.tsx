'use client'
import React from 'react';
import {setNeedHelp} from "@/app/redux/modalSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {AppDispatch} from "@/app/redux/store";

type Props = {};
const HelpButton = ({}: Props) => {
    const dispatch = useAppDispatch<AppDispatch>();
    const {needHelp} = useAppSelector((state) => state.modal);
    return (
        <button className="btn btn-base-200 max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 btn-sm md:btn-md hover:text-gray-300 transition duration-300 " onClick={() => dispatch(setNeedHelp(!needHelp))}>
            <div className="flex items-center"><div className="text-5xl text-white rounded-full bg-neutral ">&nbsp;?&nbsp;</div>&nbsp;Help</div>
        </button>
    )
};
export default HelpButton;