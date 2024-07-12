'use client'
import React from 'react';
import ChatBubble from "@/app/components/modal/ChatBubble";
import ButtonsSection from "@/app/components/modal/ButtonsSection";
import {setIsModalOpen} from '@/app/redux/modalSlice';
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks";
import {AppDispatch} from "@/app/redux/store";

type Props = {};
const Modal = ({}: Props) => {

    const dispatch = useAppDispatch<AppDispatch>();
    const { isModalOpen } = useAppSelector((state) => state.modal);
    const textList = [["Welcome to Titanfall 2 ranking system.", "I can be your guide on this page.", "Do you need my help?"],["Alright lets go then"]]
    return (<>
        {/* Button to open the modal */}
        <button className=" btn btn-error" onClick={() => dispatch(setIsModalOpen(true))}>Open Modal</button>
        {/* Modal and Overlay */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-80"></div>
                <dialog open className="modal-box relative z-10">
                    <ChatBubble textList={textList} />
                    <div className="modal-action gap-x-2 ">
                        <ButtonsSection />
                    </div>
                </dialog>
            </div>
        )}
    </>)
};
export default Modal;