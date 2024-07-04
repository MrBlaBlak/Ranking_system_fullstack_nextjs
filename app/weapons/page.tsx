import React from 'react';
import Weapon from '../model/Weapon'
import Table from './components/Table'
import weaponJson from '@/public/data/weapons.json';
type Props = {};
 function Page ({}: Props)  {
    return (
        <Table weaponStats={weaponJson}/>
    )
};
export default Page;
