'use client'
import React, {ReactNode, useState} from 'react';
import Weapon from '@/app/model/Weapon'
import ChartsSection from "./ChartsSection"
import ChartsSectionTogether from './ChartsSectionTogether'
import SelectWeaponToCompare from './SelectWeaponToCompare'
import CheckboxShowcaseTogether from './CheckboxShowcaseTogether'
import Link from 'next/link'
type Props = {
    weaponId: number,
    weaponsData: Weapon[],
};
const Wrapper = ({weaponId, weaponsData}: Props) => {
    const [weaponToCompare, setWeaponToCompare] = useState(0)
    const [showcaseTogether, setShowcaseTogether] = useState(false);
    return (
        <>

            <div className="flex flex-wrap justify-center">
                <Link href="/weapons"
                      className="btn btn-outline mt-10 hover:text-gray-300 transition duration-300">Go back</Link>
                {!showcaseTogether &&
                    <>
                        <ChartsSection weaponId={weaponId} weaponsData={weaponsData}/>
                        {weaponToCompare !== 0 && <ChartsSection weaponId={weaponToCompare} weaponsData={weaponsData}/>}
                    </>
                }
                {showcaseTogether &&
                    <ChartsSectionTogether weaponsIdToCompare={[weaponId, weaponToCompare]} weaponsData={weaponsData}/>
                }

                <div className="flex flex-col gap-2">

                    <SelectWeaponToCompare weaponToCompare={weaponToCompare} setWeaponToCompare={setWeaponToCompare}
                                           weaponsData={weaponsData}/>
                    {weaponToCompare !== 0 && (
                        <CheckboxShowcaseTogether showcaseTogether={showcaseTogether}
                                                  setShowcaseTogether={setShowcaseTogether}/>
                    )}
                </div>

            </div>
        </>
    )
};
export default Wrapper;
