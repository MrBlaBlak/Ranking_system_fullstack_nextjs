'use client'
import React from 'react';
import Navbar from "@/app/components/Navbar";
import WeaponLink from "@/app/components/WeaponLink";
import Guide from "@/app/components/Guide";
import {motion} from "framer-motion"
import {useAppSelector} from "@/app/redux/hooks";
import {textsMain} from "@/public/data/guideTexts"

type Props = {};
const AnimationWrapper = ({}: Props) => {
    const {isModalOpen} = useAppSelector((state) => state.modal);
    return (
        <>
            {!isModalOpen &&
                <motion.div initial={{opacity: 0}}
                            whileInView={{opacity: 1}}>
                    <nav className="relative flex justify-center pt-20 max-h-screen">
                        <div className="flex flex-row gap-x-10 gap-y-10 ">
                            <Navbar/>
                            <WeaponLink/>
                            <Guide texts={textsMain}/>
                        </div>
                    </nav>
                </motion.div>
            }
        </>
    )
};
export default AnimationWrapper;