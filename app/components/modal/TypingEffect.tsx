'use client'
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {AppDispatch} from "@/app/redux/store";
import {setCounter, setFinishedTalking, setIsModalOpen, setIsWaiting} from "@/app/redux/modalSlice";


type Props = {
    textList: string[][];
    period: number;
    typingSpeed?: number;
    deletingSpeed?: number;
}

const TypingEffect = ({
                          textList,
                          period,
                          typingSpeed = 20,
                          deletingSpeed = 40,
                      }: Props) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(typingSpeed);
    const dispatch = useAppDispatch<AppDispatch>();
    const {isWaiting, counter} = useAppSelector(state => state.modal)
    useEffect(() => {

        const handleTyping = () => {
            if (!isWaiting) {
                const i = loopNum % textList[counter].length;
                const fullTxt = textList[counter][i];
                if (isDeleting) {
                    setText(fullTxt.substring(0, text.length - 1));
                    setDelta(deletingSpeed);
                } else {
                    setText(fullTxt.substring(0, text.length + 1));
                    setDelta(typingSpeed);
                }
                if (!isDeleting && text === fullTxt) {
                    if ((loopNum === textList[counter].length - 1) && (textList.length - 1 !== counter)) {
                        dispatch(setFinishedTalking(true));
                        setIsDeleting(true);
                        dispatch(setIsWaiting(true));
                        return;
                    }
                    setIsDeleting(true);
                    setDelta(period);
                } else if (isDeleting && text === '') {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                    setDelta(period / 4);
                    if ((loopNum === textList[counter].length - 1)) {
                        dispatch(setCounter(1))
                        setLoopNum(0)
                    }
                    if ((loopNum === textList[counter].length - 1) && (textList.length - 1 === counter)) {
                        dispatch(setCounter(0))
                        dispatch(setIsWaiting(false))
                        dispatch(setIsModalOpen(false))
                    }

                }
            }
        };
        const ticker = setTimeout(handleTyping, delta);
        return () => clearTimeout(ticker);
    }, [text, isDeleting, textList]);

    return (
        <span>{text}</span>
    );
};

export default TypingEffect;