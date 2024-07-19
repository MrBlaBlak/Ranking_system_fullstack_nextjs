'use client'
import React, {useState} from 'react';
import ChatBubble from "@/app/components/modal/ChatBubble";
import {useAppSelector} from "@/app/redux/hooks";
import {motion} from "framer-motion"

import HelpButton from "@/app/components/shared/HelpButton";

type Props = {texts: string[]};

const Guide = ({texts}: Props) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0); // Initial state: no active button
    const { needHelp} = useAppSelector((state) => state.modal);

    const renderText = (text: string) => {
        if (text.includes("\\n")) {
            return text.split("\\n").map((line, index) => (
                <span className="text-xs sm:text-sm md:text-base" key={index}>
                    {line}
                    <br/>
                </span>
            ));
        }
        return <span className="text-xs sm:text-sm md:text-base">{text}</span>;
    };
    return (
        <>
            {needHelp ? (
                <motion.div initial={{opacity: 0}}
                            whileInView={{opacity: 1}} className="max-w-96">
                    <ChatBubble>
                        {activeButtonIndex !== null ? renderText(texts[activeButtonIndex]) : "Select a button to see the text"}
                    </ChatBubble>
                    <div className="join flex justify-end">
                        {texts.map((_, index) => (
                            <button
                                key={index}
                                className={`join-item btn btn-xs ${activeButtonIndex === index ? 'btn-active' : ''}`}
                                onClick={() => setActiveButtonIndex(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <HelpButton/>
            )}
        </>
    );
};

export default Guide;