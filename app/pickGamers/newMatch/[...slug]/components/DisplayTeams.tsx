'use client'
import React, {useState, useEffect, MouseEventHandler} from 'react';
import Gamer from '@/app/model/Gamer';
import updatePlayers from './updatePlayers'
import {getRandomStats, getRandomMap} from './randomValues'
import calculateMMR from './calculateMMR'
import Link from 'next/link'
import Alert from './Alert'
import TeamScore from './TeamScore'
import MapSelect from './MapSelect'
import SuddenDeathCheckbox from './SuddenDeathCheckbox'
import SuddenDeathWhoWonRadioButton from "./SuddenDeathWhoWonRadioButton";

type Props = {
    pickedGamers: string[],
    gamers: Gamer[],
    t1: Gamer[],
    t2: Gamer[],
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

const DisplayTeams = ({pickedGamers, gamers, t1, t2, server}: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDrawAlert, setIsDrawAlert] = useState(false);
    const [suddenDeathErrorAlert, setSuddenDeathErrorAlert] = useState(false);
    const [isDraw, setIsDraw] = useState(false);
    const [team1, setTeam1State] = useState(t1);
    const [team2, setTeam2State] = useState(t2);
    const [formValues, setFormValues] = useState<FormValues>({
        team1Stats: Array.from({length: 5}, (_, index) => ({
            elims: "",
            flags: "",
            titans: "",
            gamersId: team1[index].id.toString(),
        })),
        team2Stats: Array.from({length: 5}, (_, index) => ({
            elims: "",
            flags: "",
            titans: "",
            gamersId: team2[index].id.toString(),
        })),
        mapPlayed: '',
        suddenDeath: false,
        suddenDeathWhoWon: '',
        server: server,
    });
    useEffect(() => {
        const team1Flags = formValues.team1Stats.reduce((acc, player) => acc + Number(player.flags), 0);
        const team2Flags = formValues.team2Stats.reduce((acc, player) => acc + Number(player.flags), 0);
        const isDraw = team1Flags === team2Flags;
        setIsDraw(() => {
            if (!isDraw) {
                setFormValues((prevState) => ({
                    ...prevState,
                    suddenDeath: false,
                    suddenDeathWhoWon: ''
                }))
            }
            return isDraw;
        });

    }, [formValues.team1Stats, formValues.team2Stats, formValues.suddenDeath, formValues.suddenDeathWhoWon])

    const handleGetRandomStats = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        setFormValues((prevState) => ({
            ...prevState,
            team1Stats: prevState.team1Stats.map(stats => ({
                ...stats,
                ...getRandomStats(),
            })),

            team2Stats: prevState.team2Stats.map(stats => ({
                ...stats,
                ...getRandomStats(),
            })),
            ...getRandomMap()

        }));
    }
    const updateTeams = (newTeam1: Gamer[], newTeam2: Gamer[]) => {
        for (let i = 0; i < 5; i++) {
            setTeam1State((prevState: Gamer[]) => {
                return newTeam1
            })
            setTeam2State((prevState: Gamer[]) => {
                return newTeam2
            })
        }

    }
    const enableSDWinner = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevState) => ({
            ...prevState,
            suddenDeath: e.target.checked,
            suddenDeathWhoWon: e.target.checked ? prevState.suddenDeathWhoWon : ''
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            suddenDeathWhoWon: e.target.value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const team1Flags = formValues.team1Stats.reduce((acc, player) => acc + Number(player.flags), 0);
        const team2Flags = formValues.team2Stats.reduce((acc, player) => acc + Number(player.flags), 0);
        if (formValues.suddenDeath && formValues.suddenDeathWhoWon === '') {
            setSuddenDeathErrorAlert(true);
        } else {
            setSuddenDeathErrorAlert(false);
        }
        if (!formValues.suddenDeath || isDrawAlert === true) {
            setIsDrawAlert(team1Flags === team2Flags);
        }

        setIsSubmitting(true);
        await updatePlayers({...formValues}, [...team1], [...team2]);
        const [newTeam1, newTeam2] = calculateMMR({...formValues}, [...team1], [...team2]);
        updateTeams(newTeam1, newTeam2);
        setIsSubmitting(false);
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
        <form onSubmit={handleSubmit}>
            <table>
                <TeamScore nr={1} team={team1} formValues={formValues} handleInputChange={handleInputChange}/>
                <TeamScore nr={2} team={team2} formValues={formValues} handleInputChange={handleInputChange}/>
                <tbody>
                <MapSelect formValues={formValues} handleMapChange={handleMapChange}/>
                <tr>
                    <SuddenDeathCheckbox formValues={formValues} isDraw={isDraw} enableSDWinner={enableSDWinner}/>
                    <SuddenDeathWhoWonRadioButton nr={1} formValues={formValues} handleRadioChange={handleRadioChange}/>
                </tr>
                <tr>
                    <td>
                        <input type="hidden" name="server" value={server}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <button disabled={isSubmitting}
                    type="submit"
                    className="btn btn-outline btn-success btn-xs  sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 pr-5">Submit
                {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
            </button>
            <div className="w-5 inline-block"></div>
            <Link href="/pickGamers"
                  className="btn btn-outline btn-error btn-xs sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 ">Go
                back
            </Link>
            <div className="w-5 inline-block"></div>
            <button type="button"
                    onClick={handleGetRandomStats}
                    className="btn btn-outline btn-accent btn-xs  sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 pr-5">Get
                Random
            </button>
            {isDrawAlert &&
                <Alert text="This match is a draw."/>
            }
            {suddenDeathErrorAlert &&
                <Alert text="You need to check SuddenDeathWinner."/>
            }

        </form>

    );
}

export default DisplayTeams;
