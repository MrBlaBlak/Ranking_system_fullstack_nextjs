import React from 'react';
import {getWeaponStats} from '@/app/api/weapons/routeDump'
import Weapon from '@/app/model/Weapon'
import GetWeaponImage from '../components/GetWeaponImage'
import {promises as fs} from 'fs';
import ChartsSectionWrapper from "./components/ChartsSectionWrapper"
import weaponJson from '@/public/data/weapons.json';
type Props = {
    params: { weaponId: string }
};

function Page({params: {weaponId}}: Props) {

    return (
            <ChartsSectionWrapper weaponId={+weaponId} weaponsData={weaponJson}/>
    )
};
export default Page;

