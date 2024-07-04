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
    // const file = await fs.readFile(process.cwd() + '/public/data/weapons.json', 'utf8');
    // const weaponsData: Weapon[] = JSON.parse(file);
    const weaponsData: Weapon[] =
    [
        {
            "id": 1,
            "name": "CAR",
            "weapon_class": "SMG",
            "near_damage": 25,
            "mid_damage": 13,
            "far_damage": 10,
            "near_distance": 1000,
            "mid_distance": 1500,
            "far_distance": 3000,
            "fire_rate": 846
        },
        {
            "id": 2,
            "name": "R-97",
            "weapon_class": "SMG",
            "near_damage": 20,
            "mid_damage": 12,
            "far_damage": 10,
            "near_distance": 1000,
            "mid_distance": 1500,
            "far_distance": 3000,
            "fire_rate": 1080
        },
        {
            "id": 3,
            "name": "Alternator",
            "weapon_class": "SMG",
            "near_damage": 35,
            "mid_damage": 18,
            "far_damage": 14,
            "near_distance": 1000,
            "mid_distance": 1500,
            "far_distance": 3000,
            "fire_rate": 600
        },
        {
            "id": 4,
            "name": "Volt",
            "weapon_class": "SMG",
            "near_damage": 25,
            "mid_damage": 15,
            "far_damage": 12,
            "near_distance": 1000,
            "mid_distance": 1500,
            "far_distance": 3000,
            "fire_rate": 660
        },
        {
            "id": 5,
            "name": "R-101",
            "weapon_class": "Rifle",
            "near_damage": 25,
            "mid_damage": 17,
            "far_damage": 12,
            "near_distance": 1500,
            "mid_distance": 2000,
            "far_distance": 3500,
            "fire_rate": 810
        },
        {
            "id": 6,
            "name": "Flatline",
            "weapon_class": "Rifle",
            "near_damage": 30,
            "mid_damage": 20,
            "far_damage": 15,
            "near_distance": 1500,
            "mid_distance": 2000,
            "far_distance": 3500,
            "fire_rate": 600
        },
        {
            "id": 7,
            "name": "Hemlok",
            "weapon_class": "Rifle",
            "near_damage": 33,
            "mid_damage": 25,
            "far_damage": 20,
            "near_distance": 1500,
            "mid_distance": 2000,
            "far_distance": 3500,
            "fire_rate": 930
        },
        {
            "id": 8,
            "name": "G2",
            "weapon_class": "Rifle",
            "near_damage": 40,
            "mid_damage": 35,
            "far_damage": 35,
            "near_distance": 1500,
            "mid_distance": 2000,
            "far_distance": 3500,
            "fire_rate": 330
        },
        {
            "id": 9,
            "name": "Spitfire",
            "weapon_class": "LMG",
            "near_damage": 35,
            "mid_damage": 25,
            "far_damage": 18,
            "near_distance": 1800,
            "mid_distance": 2000,
            "far_distance": 3000,
            "fire_rate": 540
        }
    ]
    return (
            <ChartsSectionWrapper weaponId={+weaponId} weaponsData={weaponsData}/>
    )
};
export default Page;

