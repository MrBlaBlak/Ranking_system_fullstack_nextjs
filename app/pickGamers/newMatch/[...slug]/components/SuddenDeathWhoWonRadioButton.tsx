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
                className="radio radio-xs"
                type="radio"
                id={`team${nr}WinRadio`}
                name="suddenDeathWhoWon"
                value={`team${nr}`}
                disabled={!formValues.suddenDeath}
                onChange={handleRadioChange}
                checked={formValues.suddenDeathWhoWon === `team${nr}`}
            />{' '}
            Team{nr} Win
        </td>)
};
export default SuddenDeathWhoWonRadioButton;