'use client'
import React, {useState} from 'react';
import ChatBubble from "@/app/components/modal/ChatBubble";
import {useAppSelector} from "@/app/redux/hooks";
import { motion } from "framer-motion"
import {texts} from "@/public/data/guideTexts"
type Props = {};

const Guide = ({}: Props) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0); // Initial state: no active button
    const {isModalOpen, finishedTalking} = useAppSelector((state) => state.modal);


    const renderText = (text: string) => {
        if (text.includes("\\n")) {
            return text.split("\\n").map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ));
        }
        return <span>{text}</span>;
    };
    return (
        <>
            {(!isModalOpen && finishedTalking) ? (
                <motion.div  initial={{ opacity: 0 }}
                             whileInView={{ opacity: 1 }} className="w-96 ml-20">
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
                <div className="w-96 ml-20"></div>
            )}
        </>
    );
};

export default Guide;