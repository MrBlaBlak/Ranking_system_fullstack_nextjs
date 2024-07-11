import React from 'react';
import Image from "next/image";
import AvatarImage from '@/public/images/avatar.jpg'
type Props = {};
const Avatar = ({}: Props) => {
    return (
        <>
            <div className="chat-image avatar">
                <div className="w-16 rounded-full">
                    <Image alt="AvatarImage" src={AvatarImage}></Image>
                </div>
            </div>
        </>)
};
export default Avatar;