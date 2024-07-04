'use client'
import React, {ReactNode, useState} from 'react';
import Weapon from '@/app/model/Weapon'
import ChartsSection from "../components/ChartsSection"

type Props = {
    weaponId: number,
    weaponsData: Weapon[],
};
const ChartsSectionWrapper = ({weaponId, weaponsData}: Props) => {
    const [weaponToCompare, setWeaponToCompare] = useState(0)

    return (
        <>

            <div className="flex flex-wrap justify-center">
                <select
                    id="compareWeapon"
                    value={weaponToCompare}
                    className="select mt-10 select-bordered max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
                    onChange={(e) => setWeaponToCompare(+e.target.value)}
                >
                    <option value="" style={{display: "none"}}>-Compare Weapon-</option>
                    {weaponsData.map(weapon => (<option key={weapon.id} value={weapon.id}>{weapon.name}</option>))}
                </select>
                <ChartsSection weaponId={weaponId} weaponsData={weaponsData}/>
                {weaponToCompare !== 0 && <ChartsSection weaponId={weaponToCompare} weaponsData={weaponsData}/>}
            </div>
        </>
    )
};
export default ChartsSectionWrapper;