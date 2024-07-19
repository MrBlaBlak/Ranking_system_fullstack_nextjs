import React from 'react';
import {FormValues} from './TableSection'
type Props = {
    formValues: FormValues,
    isDraw: boolean,
    enableSDWinner: (e: React.ChangeEvent<HTMLInputElement>) => void
};
const SuddenDeathCheckbox = ({formValues, isDraw, enableSDWinner}: Props) => {
    return (
        <td>
            <input className="checkbox checkbox-xs" onChange={enableSDWinner} type="checkbox"
                   id="suddenDeath" name="suddenDeath" disabled={!isDraw}
                   checked={formValues.suddenDeath}/> <label htmlFor="suddenDeath">SuddenDeath</label>
        </td>
    )
};
export default SuddenDeathCheckbox;