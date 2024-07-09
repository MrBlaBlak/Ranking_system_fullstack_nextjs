import React from 'react';
import {FormValues} from './DisplayTeams'
import {Map_Name} from "@prisma/client";

type Props = {
    formValues: FormValues,
    handleMapChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
const MapSelect = ({formValues, handleMapChange}: Props) => {
    return (
        <>
            <tr>
                <th>Map</th>
            </tr>
            <tr>
                <td>
                    <select className="select select-bordered select-xs w-full max-w-xs"
                            name="mapPlayed"
                            value={formValues.mapPlayed}
                            onChange={handleMapChange} required>
                        <option value="" style={{display: "none"}}>-Pick Map-</option>
                        {Object.keys(Map_Name).map((mapName) => (
                            <option key={mapName} value={mapName}>
                                {mapName}
                            </option>
                        ))}
                    </select>
                </td>
            </tr>
        </>
    );
}

export default MapSelect;