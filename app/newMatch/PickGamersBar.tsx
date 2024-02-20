import React from 'react';
import GamersList from './GamersList'
interface Gamer {
    id: number;
    lastTen: string;
    mmr: number;
    name: string;
    server: string;
}

interface Gamers {
    gamers: Gamer[];
}

async function PickGamersBar() {
    const gamersTable: Gamers [] = new Array(10).fill({});
    const asyncGamersList: JSX.Element = await GamersList();
    const gamersJSX = gamersTable.map((elem,index) =>
            (
                <select key={index} className="select select-ghost select-bordered w-full max-w-xs flex flex-col space-y-4 text-white">
                    <option disabled selected>PickGamer</option>
                    {asyncGamersList}
                </select>
            )
    );

    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                {gamersJSX}
            </div>
        </nav>
    );
}



export default PickGamersBar;
