import React from 'react';
import {FormValues} from './DisplayTeams'
import {titanOptions, mapOptions} from './mapsAndTitans'
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
                        {mapOptions.map((map) => <option key={map.value} value={map.value}>{map.value}</option>)}
                    </select>
                </td>
            </tr>
        </>
    );
}

export default MapSelect;