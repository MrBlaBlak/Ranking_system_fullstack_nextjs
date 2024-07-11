import React from 'react';
import Avatar from './Avatar'
import TypingEffect from "@/app/components/modal/TypingEffect";

type Props = {
    setFinishedTalking: React.Dispatch<React.SetStateAction<boolean>>,
    textList: string[],
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    isWaiting: boolean,
    setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};
const ChatBubble = ({setFinishedTalking, textList, setCounter, isWaiting, setIsWaiting, setIsModalOpen}: Props) => {
    return (
        <div>
            <div className="chat chat-end ">
                <Avatar/>
                <div className="chat-header p-1">
                    Jake
                </div>
                <div className="chat-bubble">
                    <TypingEffect
                        textList={textList}
                        period={2000}
                        typingSpeed={20}
                        deletingSpeed={20}
                        setFinishedTalking={setFinishedTalking}
                        setCounter={setCounter}
                        isWaiting={isWaiting}
                        setIsWaiting={setIsWaiting}
                        setIsModalOpen={setIsModalOpen}
                    /></div>
            </div>
        </div>)
};
export default ChatBubble;
