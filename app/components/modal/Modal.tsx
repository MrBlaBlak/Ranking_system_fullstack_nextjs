'use client'
import React, {useState} from 'react';
import ChatBubble from "@/app/components/modal/ChatBubble";
import ButtonsSection from "@/app/components/modal/ButtonsSection";


type Props = {};
const Modal = ({}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [finishedTalking, setFinishedTalking] = useState(false);
    const [needHelp, setNeedHelp]= useState(false);
    const [counter, setCounter] = useState(0);
    const textList = [["Welcome to Titanfall 2 ranking system.", "I can be your guide on this page.", "Do you need my help?"],["Alright lets go then"]]
    return (<>
        {/* Button to open the modal */}
        <button className=" btn btn-error" onClick={() => setIsModalOpen(true)}>Open Modal</button>

        {/* Modal and Overlay */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black opacity-80"></div>
                <dialog open className="modal-box relative z-10">
                    <ChatBubble setFinishedTalking={setFinishedTalking} textList={textList[counter]} />
                    <div className="modal-action gap-x-2 ">
                        <ButtonsSection closeModal={() => setIsModalOpen(false)} finishedTalking={finishedTalking} setNeedHelp={setNeedHelp} setCounter={setCounter} />
                    </div>

                </dialog>
            </div>
        )}
    </>)
};
export default Modal;