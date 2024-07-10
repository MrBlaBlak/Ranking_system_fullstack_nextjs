import React from 'react';
import {FormValues} from "./DisplayTeams";

type Props = {
    nr: number
    formValues: FormValues,
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};
const SuddenDeathWhoWonRadioButton = ({nr, formValues, handleRadioChange}: Props) => {
    return (
        <td>
            <input
                className="radio radio-xs bg-zinc-700"
                type="radio"
                id={`team${nr}WinRadio`}
                name="suddenDeathWhoWon"
                value={`team${nr}`}
                disabled={!formValues.suddenDeath}
                onChange={handleRadioChange}
                checked={formValues.suddenDeathWhoWon === `team${nr}`}
            />{' '}
            <label htmlFor={`team${nr}WinRadio`}>Team{nr}Win</label>
        </td>)
};
export default SuddenDeathWhoWonRadioButton;