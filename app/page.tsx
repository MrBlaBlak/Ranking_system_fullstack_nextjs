import BackgroundImage from '@/app/components/shared/BackgroundImage'
import Stars from "@/app/components/shared/Stars";
import Modal from "@/app/components/modal/Modal"
import AnimationWrapper from "@/app/components/AnimationWrapper";
import React from "react";

export default function Home() {

    return (
        <>
            <Stars/>
            <BackgroundImage/>
            <Modal/>
            <AnimationWrapper/>
        </>


    )
}
