import React from 'react';
import Link from "next/link";
import Image from "next/image";
import WingmanImage from "@/public/images/weapons/Wingman.webp";
import {Rubik_Mono_One} from "next/font/google";

const inter = Rubik_Mono_One({weight: "400", preload: false,});
type Props = {};
const WeaponLink = ({}: Props) => {
    return (<div className="flex flex-col text-center items-center">
        <Link href="/weapons" className="hover-image">
            <Image className="h-min "
                   width={100}
                   src={WingmanImage}
                   alt="WingmanPhoto"
            ></Image>
            <p className={`text-white  ${inter.className}`}>Weapons</p>
        </Link>
    </div>)
};
export default WeaponLink;
