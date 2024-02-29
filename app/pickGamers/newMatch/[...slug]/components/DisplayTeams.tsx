'use client'
import React, { useState, useEffect } from 'react';
import {Gamer} from '../../../components/PickGamersBar';
import {titanOptions, mapOptions} from './MapsAndTitans'
interface Props {
    pickedGamers: string[],
    gamers: Gamer[],
    team1: Gamer[],
    team2: Gamer[],
    server: string
}
const DisplayTeams = ({pickedGamers, gamers, team1, team2, server}: Props) => {

    const [suddenDeathWhoWon, setSuddenDeathWhoWon] = useState('');
    const [suddenDeath, setSuddenDeath] = useState(false);
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuddenDeathWhoWon(e.currentTarget.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Tutaj dodaj logikę obsługi submita
    };
    const enableSDWinner =  (e: React.ChangeEvent<HTMLInputElement>) =>{
        if (e.target.checked) {
            setSuddenDeath(true);
        } else {
            setSuddenDeath(false)
        }
    };
    return (
        <form >
            <table>
                <thead>
                <tr>
                    <th>Team1</th>
                </tr>
                </thead>
                <tbody>
                {team1.map((gamer) => (
                    <tr key={gamer.id}>
                        <td>{gamer.name}</td>
                        <td>{gamer.mmr}</td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs" type="number" name="team1elims" placeholder="Elims" min="0" max="99" required />
                        </td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs" type="number" name="team1flags" placeholder="Flags" min="0" max="6" required />
                        </td>
                        <td>

                            <select className="select select-bordered select-xs w-full max-w-xs" name="team1titans" required>
                                <option value="" style={{display: "none"} }>-Pick Titan-</option>
                                {titanOptions.map((titan)=> <option key={titan.value} value={titan.value}>{titan.label}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="hidden" name="team1gamersId" value={gamer.id} />
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
                {team2.map((gamer) => (
                    <tr key={gamer.id}>
                        <td>{gamer.name}</td>
                        <td>{gamer.mmr}</td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs" type="number" name="team2elims" placeholder="Elims" min="0" max="99" required />
                        </td>
                        <td>
                            <input className="input input-bordered input-xs w-full max-w-xs" type="number" name="team2flags" placeholder="Flags" min="0" max="6" required />
                        </td>
                        <td>
                            <select className="select select-bordered select-xs w-full max-w-xs" name="team2titans" required>
                                <option value="" style={{display: "none"} }>-Pick Titan-</option>
                                {titanOptions.map((titan)=> <option key={titan.value} value={titan.value}>{titan.label}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type="hidden" name="team2gamersId" value={gamer.id} />
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
                        <select className="select select-bordered select-xs w-full max-w-xs" id="map" name="mapPlayed" required>
                            <option value="" style={{display: "none"} }>-Pick Map-</option>
                            {mapOptions.map((map)=> <option key={map.value} value={map.value}>{map.label}</option>)}
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input className="checkbox checkbox-xs" onChange={enableSDWinner}  type="checkbox" id="suddenDeath" name="suddenDeath" /> Sudden Death
                    </td>
                    <td>
                        <input
                            className="radio radio-xs"
                            type="radio"
                            id="team1WinRadio"
                            name="suddenDeathWhoWon"
                            value="team1"
                            disabled={!suddenDeath}
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
                            disabled={!suddenDeath}
                            onChange={handleRadioChange}
                        />{' '}
                        Team2 Win
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="hidden" name="server" value={server} />
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