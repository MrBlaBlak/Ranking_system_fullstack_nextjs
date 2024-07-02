import React from 'react';
import {getWeaponStats} from '@/app/api/weapons/routeDump'
import Weapon from '@/app/model/Weapon'
import GetWeaponImage from '../components/GetWeaponImage'
import {Rubik_Mono_One} from "next/font/google";
import Chart from "./components/Chart"
type Props = {
    params: { weaponId: string }
};
const inter = Rubik_Mono_One({weight: "400", preload: false,});
async function Page({params: {weaponId}}: Props) {
    const weaponData = await getWeaponStats(+weaponId);
    if (weaponData === null) {
        throw new Error('Weapon not found');
    }
    const weapon: Weapon = weaponData;

    return (
        <>
            <div className="flex m-10">
                <div className="flex flex-col text-center">
                    <h1 className={`text-white text-5xl  ${inter.className}`}>{weapon.name}{" "}{weapon.weapon_class}</h1>
                    <GetWeaponImage height={300} weapon={weapon.name}/>
                </div>
                <Chart weapon={weapon}/>

            </div>
        </>
    )
};
export default Page;