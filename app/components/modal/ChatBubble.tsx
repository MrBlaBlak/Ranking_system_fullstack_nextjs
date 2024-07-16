import React from 'react';
import Avatar from './Avatar'

type Props = {
    children: React.ReactNode
};
const ChatBubble = ({children}: Props) => {
    return (
        <div>
            <div className="chat chat-end ">
                <Avatar/>
                <div className="chat-header p-1">
                    Jake
                </div>
                <div className="chat-bubble">
                    {children}</div>
            </div>
        </div>)
};
export default ChatBubble;
