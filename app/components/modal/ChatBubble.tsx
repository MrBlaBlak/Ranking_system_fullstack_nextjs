import React from 'react';
import Avatar from './Avatar'
import TypingEffect from "@/app/components/modal/TypingEffect";

type Props = {
    setFinishedTalking: React.Dispatch<React.SetStateAction<boolean>>,
    textList: string[],

};
const ChatBubble = ({setFinishedTalking, textList}: Props) => {
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
                        /></div>
            </div>
        </div>)
};
export default ChatBubble;
