import React from 'react';

type Props = {
    health: number,
    setHealth: Function
};
const SelectHp = ({health, setHealth}: Props) => {
    return (
        <>
            <label htmlFor="hp" className="ml-10 mr-2">HP</label>
            <select
                id="hp"
                value={health}
                className="select select-bordered max-w-36 sm:max-w-40 md:max-w-44 lg:max-w-60 select-sm md:select-md"
                onChange={(e) => setHealth(+e.target.value)}
            >
                <option>100</option>
                <option>120</option>
                <option>125</option>
                <option>140</option>
            </select>
        </>
    )
};
export default SelectHp;