import BackgroundImage from '@/app/components/shared/BackgroundImage'
import Stars from "@/app/components/shared/Stars";
import Modal from "@/app/components/modal/Modal"
import GridLayout from "@/app/components/GridLayout";
import React from "react";

export default function Home() {

    return (
        <>
            <Stars/>
            <BackgroundImage/>
            <Modal/>
            <GridLayout/>
        </>


    )
}
