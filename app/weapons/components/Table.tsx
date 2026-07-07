import React from 'react';
import Link from 'next/link'
import GetWeaponImage from './GetWeaponImage'
import weaponStats from '@/public/data/weapons.json';
import {Weapon} from "@prisma/client";
type Props = {
};
const Table = ({}: Props) => {
    const weaponProperties = Object.keys({
        id: 0,
        name: '',
        weaponClass: '',
        nearDamage: 0,
        midDamage: 0,
        farDamage: 0,
        nearDistance: 0,
        midDistance: 0,
        farDistance: 0,
        fireRate: 0
    }).filter(prop => prop !== 'id');
    return (
        <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm ">
                <thead className="sticky top-0 " data-theme="dark">
                <tr className="border-none">
                    <th className="flex justify-center items-center gap-10" >
                        <Link href="/"
                              className="btn btn-outline hover:text-gray-300 transition duration-300">Go back</Link>
                        <span className="">Click image for charts</span>
                    </th>

                    {weaponProperties.map((property) => (
                        <th key={property}>{property}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {weaponStats.map((weaponStat) => (
                    <tr key={weaponStat.id}>
                        <td className="flex justify-center">
                            <Link href={`/weapons/${weaponStat.id}`}>
                                <GetWeaponImage weapon={weaponStat.name} height={100} className="hover-image"/>
                            </Link>
                        </td>
                        {weaponProperties.map((property) => (
                            <td key={property}>{weaponStat[property as keyof Weapon]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Table;