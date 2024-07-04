import React from 'react';
import {getWeaponStats} from '@/app/api/weapons/routeDump'
import Weapon from '@/app/model/Weapon'
import GetWeaponImage from '../components/GetWeaponImage'
import {promises as fs} from 'fs';
import ChartsSectionWrapper from "./components/ChartsSectionWrapper"

type Props = {
    params: { weaponId: string }
};


async function Page({params: {weaponId}}: Props) {
    const file = await fs.readFile(process.cwd() + '/public/data/weapons.json', 'utf8');
    const weaponsData: Weapon[] = JSON.parse(file);
    
    return (
            <ChartsSectionWrapper weaponId={+weaponId} weaponsData={weaponsData}/>
    )
};
export default Page;

