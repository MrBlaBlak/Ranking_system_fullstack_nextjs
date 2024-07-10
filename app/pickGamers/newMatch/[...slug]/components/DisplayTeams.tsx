'use client'
import React, {useState, useEffect} from 'react';
import {gamers} from '@prisma/client'
import updatePlayers from '../utils/updatePlayers'
import {getRandomStats, getRandomMap} from '../utils/randomValues'
import calculateMMR from '../utils/calculateMMR'
import Alert from './Alert'
import TeamScore from './TeamScore'
import MapSelect from './MapSelect'
import SuddenDeathCheckbox from './SuddenDeathCheckbox'
import SuddenDeathWhoWonRadioButton from "./SuddenDeathWhoWonRadioButton";
import ButtonsSection from './ButtonsSection'

type Props = {
    pickedGamers: string[],
    gamers: gamers[],
    t1: gamers[],
    t2: gamers[],
    server: string
}
export type GamerMatchStats = {
    elims: string;
    flags: string;
    titans: string;
    gamersId: string;
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

const DisplayTeams = ({t1, t2, server}: Props) => {

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
    const updateTeams = (newTeam1: gamers[], newTeam2: gamers[]) => {
        for (let i = 0; i < 5; i++) {
            setTeam1State((prevState: gamers[]) => {
                return newTeam1
            })
            setTeam2State((prevState: gamers[]) => {
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
        if (!formValues.suddenDeath || isDrawAlert) {
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
            <table className="border-separate border-spacing-x-2 border-spacing-y-1">
                <TeamScore nr={1} team={team1} formValues={formValues} handleInputChange={handleInputChange}/>
                <TeamScore nr={2} team={team2} formValues={formValues} handleInputChange={handleInputChange}/>
                <tbody>
                <MapSelect formValues={formValues} handleMapChange={handleMapChange}/>
                <tr>
                    <SuddenDeathCheckbox formValues={formValues} isDraw={isDraw} enableSDWinner={enableSDWinner}/>
                    <SuddenDeathWhoWonRadioButton nr={1} formValues={formValues} handleRadioChange={handleRadioChange}/>
                    <SuddenDeathWhoWonRadioButton nr={2} formValues={formValues} handleRadioChange={handleRadioChange}/>
                </tr>
                <tr>
                    <td>
                        <input type="hidden" name="server" value={server}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <ButtonsSection isSubmitting={isSubmitting} handleGetRandomStats={handleGetRandomStats}/>
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
