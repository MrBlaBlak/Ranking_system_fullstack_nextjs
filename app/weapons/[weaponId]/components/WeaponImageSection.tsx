import React from 'react';
import GetWeaponImage from '../../components/GetWeaponImage'
import {Rubik_Mono_One} from "next/font/google";
import Weapon from '@/app/model/Weapon'

type Props = {weapon: Weapon};

const inter = Rubik_Mono_One({weight: "400", preload: false,});

const WeaponImageSection = ({weapon}: Props) => {
    return (<>
        <h1 className={`text-white text-5xl  ${inter.className}`}>{weapon.name}{" "}{weapon.weapon_class}</h1>
        <div className="flex justify-center">
            <GetWeaponImage height={200} weapon={weapon.name}/>
        </div>
    </>)
};
export default WeaponImageSection;