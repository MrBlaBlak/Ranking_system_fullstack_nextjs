'use client'
import React, {useState} from 'react';
import {Gamer} from '../../../components/PickGamersBar';
import {titanOptions, mapOptions} from './MapsAndTitans'
import CalculateMMR from './CalculateMMR'
import {getRandomStats} from './randomValues'

type Props = {
    pickedGamers: string[],
    gamers: Gamer[],
    team1: Gamer[],
    team2: Gamer[],
    server: string
}
export type GamerMatchStats = {
    elims: string;
    flags: string;
    titans: string;
    gamersId: string;
    // mmr: number;
    // handicap: number;
};
export type FormValues = {
    team1Stats: GamerMatchStats[];
    team2Stats: GamerMatchStats[];
    mapPlayed: string;
    suddenDeath: boolean;
    suddenDeathWhoWon: string;
    server: string;
    [key: string]: GamerMatchStats[] | string | boolean;
};

const DisplayTeams = ({pickedGamers, gamers, team1, team2, server}: Props) => {
    
    const [formValues, setFormValues] = useState<FormValues>({
        team1Stats: Array.from({ length: 5 }, (_, index) => ({
            ...getRandomStats(),
            gamersId: team1[index].id.toString(),
        })),
        team2Stats: Array.from({ length: 5 }, (_, index) => ({
            ...getRandomStats(),
            gamersId: team2[index].id.toString(),
        })),
        mapPlayed: '',
        suddenDeath: false,
        suddenDeathWhoWon: '',
        server: server,
    });
    const enableSDWinner = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFormValues((prevValues) => ({
                ...prevValues
                , suddenDeath: !prevValues.suddenDeath
            }));
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                suddenDeath: !prevValues.suddenDeath,
                suddenDeathWhoWon: ''
            }));
            const radioButtons = document.getElementsByName('suddenDeathWhoWon') as NodeListOf<HTMLInputElement>;
            radioButtons.forEach((button) => {
                button.checked = false;
            });
        }
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            suddenDeathWhoWon: e.target.value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Tutaj dodaj logikę obsługi submita
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        const [team, index, field] = name.split('-');

        setFormValues(prevValues => ({
            ...prevValues,
            [team]: (prevValues[team] as GamerMatchStats[]).map((player: GamerMatchStats, i: number) =>
                i === parseInt(index)
                    ? {...player, [field]: value}
                    : player
            ),
        }));
    };
    const handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormValues(prevValues => ({
                ...prevValues,
                [name]: value
            })
        );
    };

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            CalculateMMR(formValues, team1, team2)
        }}>
            <table>
                <thead>
                <tr>
                    <th>Team1</th>
                </tr>
                </thead>
                <tbody>
                {team1.map((gamer, index) => (
                    <tr key={gamer.id}>
                        <td>{gamer.name}</td>
                        <td>{gamer.mmr}</td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs"
                                   name={`team1Stats-${index}-elims`}
                                   value={formValues.team1Stats[index].elims}
                                   onChange={handleInputChange}
                                   type="number" placeholder="Elims" min="0" max="99" required/>
                        </td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs"
                                   name={`team1Stats-${index}-flags`}
                                   value={formValues.team1Stats[index].flags}
                                   onChange={handleInputChange}
                                   type="number" placeholder="Flags" min="0" max="6" required/>
                        </td>
                        <td>
                            <select className="select select-bordered select-xs w-full max-w-xs"
                                    name={`team1Stats-${index}-titans`}
                                    value={formValues.team1Stats[index].titans}
                                    onChange={handleInputChange} required>
                                <option value="" style={{display: "none"}}>-Pick Titan-</option>
                                {titanOptions.map((titan) => <option key={titan.value}
                                                                     value={titan.value}>{titan.value}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="hidden" name={`team1Stats-${index}-gamersId`} value={gamer.id}/>
                        </td>
                    </tr>
                ))}
                </tbody>
                <thead>
                <tr>
                    <th>Team2</th>
                </tr>
                </thead>
                <tbody>
                {team2.map((gamer, index) => (
                    <tr key={gamer.id}>
                        <td>{gamer.name}</td>
                        <td>{gamer.mmr}</td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs"
                                   name={`team2Stats-${index}-elims`}
                                   value={formValues.team2Stats[index].elims}
                                   onChange={handleInputChange}
                                   type="number" placeholder="Elims" min="0" max="99" required/>
                        </td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs"
                                   name={`team2Stats-${index}-flags`}
                                   value={formValues.team2Stats[index].flags}
                                   onChange={handleInputChange}
                                   type="number" placeholder="Flags" min="0" max="6" required/>
                        </td>
                        <td>
                            <select className="select select-bordered select-xs w-full max-w-xs"
                                    name={`team2Stats-${index}-titans`}
                                    value={formValues.team2Stats[index].titans}
                                    onChange={handleInputChange} required>
                                <option value="" style={{display: "none"}}>-Pick Titan-</option>
                                {titanOptions.map((titan) => <option key={titan.value}
                                                                     value={titan.value}>{titan.value}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="hidden" name={`team2Stats-${index}-gamersId`} value={gamer.id}/>
                        </td>
                    </tr>
                ))}
                </tbody>
                <tbody>
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

                <tr>
                    <td>
                        <input className="checkbox checkbox-xs" onChange={enableSDWinner} type="checkbox"
                               id="suddenDeath" name="suddenDeath"/> Sudden Death
                    </td>
                    <td>
                        <input
                            className="radio radio-xs"
                            type="radio"
                            id="team1WinRadio"
                            name="suddenDeathWhoWon"
                            value="team1"
                            disabled={!formValues.suddenDeath}
                            onChange={handleRadioChange}
                        />{' '}
                        Team1 Win
                    </td>
                    <td>
                        <input
                            className="radio radio-xs"
                            type="radio"
                            id="team2WinRadio"
                            name="suddenDeathWhoWon"
                            value="team2"
                            disabled={!formValues.suddenDeath}
                            onChange={handleRadioChange}
                        />{' '}
                        Team2 Win
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="hidden" name="server" value={server}/>
                    </td>

                </tr>
                </tbody>
            </table>
            <button type="submit"
                    className="btn btn-outline btn-xs sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300">Submit
            </button>
        </form>
    );
}

export default DisplayTeams;