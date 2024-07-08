'use client'
import React, {useState} from 'react';
import ChartsTogether from './ChartsTogether'
import Weapon from '@/app/model/Weapon'
import {calculateDamageBreakpoints, calculateTTKBreakpoints, mergeBreakpoints} from '../utils/calculateBreakpoints'
import SelectHp from './SelectHp'
import WeaponImageSection from './WeaponImageSection'
type Props = {

    weaponsData: Weapon[],
    weaponsIdToCompare: number[]
};
const ChartsSectionTogether = ({weaponsData, weaponsIdToCompare}: Props) => {
    const [health, setHealth] = useState(125);
    const damageBreakpoints: {x:number, y:number}[][] =[];
    const ttkBreakpoints: {x:number, y:number}[][] =[];
    const weapons: Weapon[]=[]
    weaponsIdToCompare.forEach(weaponId => {
        const weaponData = weaponsData.find(weapon => weapon.id === weaponId)
        if (weaponData === undefined) {
            throw new Error('Weapon not found');
        }
        weapons.push(weaponData);
        damageBreakpoints.push(calculateDamageBreakpoints(weaponData, health));
        ttkBreakpoints.push(calculateTTKBreakpoints(weaponData, health))
    })

    const damageBreakpointsCombined=mergeBreakpoints(damageBreakpoints[0], damageBreakpoints[1]);
    const ttKBreakpointsCombined=mergeBreakpoints(ttkBreakpoints[0], ttkBreakpoints[1]);

    return (<>
        <div className="flex m-10">
            <div className="flex flex-col text-center">
                {weapons.map((weapon) => (
                    <WeaponImageSection key={weapon.id} weapon={weapon}/>
                ))}
                <div>
                    <ChartsTogether damageBreakpoints={damageBreakpointsCombined} ttkBreakpoints={ttKBreakpointsCombined}/>
                    <SelectHp health={health} setHealth={setHealth}/>
                </div>
            </div>

        </div>
    </>)
};
export default ChartsSectionTogether;