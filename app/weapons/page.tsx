import React from 'react';
import {getWeaponsStats} from '../api/weapons/routeDump'
import Weapon from '../model/Weapon'
import Table from './components/Table'
type Props = {};
async function Page ({}: Props)  {
    const weaponsStats: Weapon[] = await getWeaponsStats();
    return (
        <Table weaponStats={weaponsStats}/>
    )
};
export default Page;
