import React from 'react';
import {gamers} from "@prisma/client";
import {FormValues, GamerMatchStats} from './TableSection'
import {Titan_Name} from "@prisma/client";

type Props = {
    nr: number,
    team: gamers[],
    formValues: FormValues,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
    mmrDifferences: {[key: string]: number},
}
const TeamScore = ({nr, team, formValues, handleInputChange, mmrDifferences}: Props) => {
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
                            {Object.keys(Titan_Name).filter(titanName => titanName !== "none").map((titanName) => (
                                <option key={titanName} value={titanName}>
                                    {titanName}
                                </option>
                            ))}
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