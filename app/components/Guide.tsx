'use client'
import React, {useState} from 'react';
import ChatBubble from "@/app/components/modal/ChatBubble";
import {useAppSelector} from "@/app/redux/hooks";

type Props = {};

const Guide = ({}: Props) => {
    const [activeButtonIndex, setActiveButtonIndex] = useState(0); // Initial state: no active button
    const {isModalOpen, finishedTalking} = useAppSelector((state) => state.modal);
    const texts = ["In Titanfall 2's \"Capture the Flag\" mode, two teams of five players each compete to capture more flags than their opponents. The game features powerful titans, colossal machines that can be summoned onto the battlefield periodically, adding an extra layer of strategy to the gameplay.",
        "After each match, the system collects player statistics, determines the winner, and assigns or deducts points accordingly. The system continuously monitors player statistics, allowing users to explore various insightful summaries, including:",
        "Eliminations and Flag Captures: \\n  • Detailed information on the number of eliminations and flag captures on specific maps, along with average and best performances.\\n  • Titan Effectiveness: Insights into players' efficiency when using different titans.",
        "Weapon Statistics: \\n Gain a comprehensive understanding of your arsenal. View detailed damage ranges for each weapon, allowing you to strategize your engagements effectively. Utilize interactive charts that display Time-to-Kill (TTK) based on weapon and range.",
        "I included some dummy data to get you started. Have fun experimenting with the program, checking out different stats, and creating your own matches. \\n \\n Good Luck!"];
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
                <div className="w-96 ml-20">
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
                </div>
            ) : (
                <div className="w-96 ml-20"></div>
            )}
        </>
    );
};

export default Guide;