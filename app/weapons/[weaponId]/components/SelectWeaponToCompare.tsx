import React from 'react';
import {weapons} from "@prisma/client";
type Props = {
    weaponToCompare: number, 
    setWeaponToCompare: Function,
    weaponsData: weapons[]
};
const SelectWeaponToCompare = ({weaponToCompare, setWeaponToCompare, weaponsData}: Props) => {
    return (
        <select
            id="compareWeapon"
            value={weaponToCompare}
            className="select mt-10 select-bordered max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
            onChange={(e) => setWeaponToCompare(+e.target.value)}
        >
            <option value="" style={{display: "none"}}>-Compare Weapon-</option>
            {weaponsData.map(weapon => (<option key={weapon.id} value={weapon.id}>{weapon.name}</option>))}
        </select>
    )
};
export default SelectWeaponToCompare;