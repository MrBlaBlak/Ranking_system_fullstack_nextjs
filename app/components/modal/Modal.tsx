'use client'
import React from 'react';
import ChatBubble from "@/app/components/modal/ChatBubble";
import ButtonsSection from "@/app/components/modal/ButtonsSection";
import {useAppSelector} from "@/app/redux/hooks";
import TypingEffect from "@/app/components/modal/TypingEffect";


type Props = {};
const Modal = ({}: Props) => {

    const { isModalOpen } = useAppSelector((state) => state.modal);
    const textList = [["Welcome to Titanfall 2 ranking system.", "I can be your guide on this page.", "Do you need my help?"],["Alright lets go then"]]
    return (<>
        {/* Modal and Overlay */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-80"></div>
                <dialog open className="modal-box relative z-10">
                    <ChatBubble>
                        <TypingEffect
                            textList={textList}
                            period={2000}
                            typingSpeed={20}
                            deletingSpeed={20}
                        />
                    </ChatBubble>
                    <div className="modal-action gap-x-2 ">
                        <ButtonsSection />
                    </div>
                </dialog>
            </div>
        )}
    </>)
};
export default Modal;