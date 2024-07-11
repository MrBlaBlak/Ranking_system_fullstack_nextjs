'use client'
import React, {useEffect, useState} from 'react';


type Props = {
    textList: string[];
    period: number;
    typingSpeed?: number;
    deletingSpeed?: number;
    setFinishedTalking: React.Dispatch<React.SetStateAction<boolean>>;

}

const TypingEffect = ({
                          textList,
                          period,
                          typingSpeed = 20,
                          deletingSpeed = 40,
                          setFinishedTalking,

                      }: Props) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(typingSpeed);
    useEffect(() => {

        const handleTyping = () => {
            const i = loopNum % textList.length;
            const fullTxt = textList[i];

            if (isDeleting) {
                setText(fullTxt.substring(0, text.length - 1));
                setDelta(deletingSpeed);
            } else {
                setText(fullTxt.substring(0, text.length + 1));
                setDelta(typingSpeed);
            }

            if (!isDeleting && text === fullTxt) {
                if (loopNum === textList.length - 1 || textList.length === 1) {
                    setFinishedTalking(true);
                    return;
                }
                setIsDeleting(true);
                setDelta(period);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setDelta(period/4);
            }
        };

        const ticker = setTimeout(handleTyping, delta);

        return () => clearTimeout(ticker);
    }, [text, isDeleting, loopNum, delta, period, textList, typingSpeed, deletingSpeed]);

    return (
        <span>{text}</span>
    );
};

export default TypingEffect;