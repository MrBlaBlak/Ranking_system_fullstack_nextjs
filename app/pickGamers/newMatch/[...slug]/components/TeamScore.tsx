import React from 'react';
import Gamer from '@/app/model/Gamer'
import {FormValues, GamerMatchStats} from './DisplayTeams'
import {titanOptions} from './mapsAndTitans'

type Props = {
    nr: number,
    team: Gamer[],
    formValues: FormValues,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}
const TeamScore = ({nr, team, formValues, handleInputChange}: Props) => {
    const teamStatsKey = `team${nr}Stats` as keyof FormValues;
    const teamStats = formValues[teamStatsKey] as GamerMatchStats[];
    return (
        <>
            <thead>
            <tr>
                <th>Team{nr}</th>
            </tr>
            </thead>
            <tbody>
            {team.map((gamer, index) => (
                <tr key={gamer.id}>
                    <td>{gamer.name}</td>
                    <td>{gamer.mmr}</td>
                    <td>
                        <input className="input input-bordered input-xs w-full max-w-xs"
                               name={`team${nr}Stats-${index}-elims`}
                               value={teamStats[index].elims}
                               onChange={handleInputChange}
                               type="number" placeholder="Elims" min="0" max="99" required/>
                    </td>
                    <td>
                        <input className="input input-bordered input-xs w-full max-w-xs"
                               name={`team${nr}Stats-${index}-flags`}
                               value={teamStats[index].flags}
                               onChange={handleInputChange}
                               type="number" placeholder="Flags" min="0" max="6" required/>
                    </td>
                    <td>
                        <select className="select select-bordered select-xs w-full max-w-xs"
                                name={`team${nr}Stats-${index}-titans`}
                                value={teamStats[index].titans}
                                onChange={handleInputChange} required>
                            <option value="" style={{display: "none"}}>-Pick Titan-</option>
                            {titanOptions.map((titan) => <option key={titan.value}
                                                                 value={titan.value}>{titan.value}</option>)}
                        </select>
                    </td>
                    <td>
                        <input type="hidden" name={`team${nr}Stats-${index}-gamersId`} value={gamer.id}/>
                    </td>
                </tr>
            ))}
            </tbody>
        </>
    );
}

export default TeamScore;