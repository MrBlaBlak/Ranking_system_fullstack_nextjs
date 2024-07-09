import React from 'react';
import Wrapper from "./components/Wrapper"
import weaponJson from '@/public/data/weapons.json';
type Props = {
    params: { weaponId: string }
};

function Page({params: {weaponId}}: Props) {

    return (
            <Wrapper weaponId={+weaponId} weaponsData={weaponJson}/>
    )
}
export default Page;

