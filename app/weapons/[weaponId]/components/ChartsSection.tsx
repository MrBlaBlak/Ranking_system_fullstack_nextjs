'use client'
import React, {useState} from 'react';
import Charts from './Charts'
import Weapon from '@/app/model/Weapon'
import {calculateDamageBreakpoints, calculateTTKBreakpoints} from '../utils/calculateBreakpoints'
import GetWeaponImage from '../../components/GetWeaponImage'
import {Rubik_Mono_One} from "next/font/google";
const inter = Rubik_Mono_One({weight: "400", preload: false,});
type Props = {
    weaponId: number,
    weaponsData: Weapon[],
};
const ChartsSection = ({weaponId, weaponsData}: Props) => {
    const weaponData = weaponsData.find(weapon => weapon.id === +weaponId)
    if (weaponData === undefined) {
        throw new Error('Weapon not found');
    }
    const weapon: Weapon = weaponData;
    const [health, setHealth] = useState(125);
    
    const damageBreakpoints = calculateDamageBreakpoints(weapon, health);
    const ttkBreakpoints = calculateTTKBreakpoints(weapon, health);


    return (
        <div className="flex m-10">
            <div className="flex flex-col text-center">
                <h1 className={`text-white text-5xl  ${inter.className}`}>{weapon.name}{" "}{weapon.weapon_class}</h1>
                <div className=" flex justify-center">
                    <GetWeaponImage height={200} weapon={weapon.name}/>
                </div>
                <div>
                    <Charts damageBreakpoints={damageBreakpoints} ttkBreakpoints={ttkBreakpoints}/>
                    <label htmlFor="hp" className="ml-10 mr-2">HP</label>
                    <select
                        id="hp"
                        value={health}
                        className="select select-bordered max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
                        onChange={(e) => setHealth(+e.target.value)}
                    >
                        <option>100</option>
                        <option>120</option>
                        <option>125</option>
                        <option>140</option>
                    </select>
                </div>
            </div>

        </div>)
};
export default ChartsSection;