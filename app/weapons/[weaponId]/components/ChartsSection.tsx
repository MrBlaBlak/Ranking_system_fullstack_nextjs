'use client'
import React, {useState} from 'react';
import Charts from './Charts'
import Weapon from '@/app/model/Weapon'
import {calculateDamageBreakpoints, calculateTTKBreakpoints} from '../utils/calculateBreakpoints'
import SelectHp from './SelectHp'
import WeaponImageSection from './WeaponImageSection'

type Props = {
    weaponId: number,
    weaponsData: Weapon[],
};
const ChartsSection = ({weaponId, weaponsData}: Props) => {
    const weaponData = weaponsData.find(weapon => weapon.id === weaponId)
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
                <WeaponImageSection weapon={weapon}/>
                <div>
                    <Charts damageBreakpoints={damageBreakpoints} ttkBreakpoints={ttkBreakpoints}/>
                    <SelectHp health={health} setHealth={setHealth}/>
                </div>
            </div>
        </div>)
};
export default ChartsSection;