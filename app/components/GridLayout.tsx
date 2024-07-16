import React from 'react';
import Navbar from "@/app/components/Navbar";
import WeaponLink from "@/app/components/WeaponLink";
import Guide from "@/app/components/Guide";

type Props = {};
const GridLayout = ({}: Props) => {
    return (
        <nav className="relative flex justify-center pt-20 max-h-screen">
            <div className="flex flex-row gap-x-10 gap-y-10 ">
                <Navbar/>
                <WeaponLink/>
                <Guide/>
            </div>
        </nav>
    )
};
export default GridLayout;