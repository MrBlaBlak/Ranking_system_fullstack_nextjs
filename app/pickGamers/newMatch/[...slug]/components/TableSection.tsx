'use client'
import React, {useEffect, useState} from 'react';
import {gamers} from '@prisma/client'
import updatePlayers from '../utils/updatePlayers'
import {getRandomMap, getRandomStats} from '../utils/randomValues'
import calculateMMR from '../utils/calculateMMR'
import Alert from './Alert'
import TeamScore from './TeamScore'
import MapSelect from './MapSelect'
import SuddenDeathCheckbox from './SuddenDeathCheckbox'
import SuddenDeathWhoWonRadioButton from "./SuddenDeathWhoWonRadioButton";
import ButtonsSection from './ButtonsSection'
import {useImmer} from "use-immer";
import {FormValues, GamerMatchStats} from "@/zod/zodSchemas";
import Guide from "@/app/components/shared/Guide";
import {textsSubmitMatch} from "@/public/data/guideTexts";

type Props = {
    t1: gamers[],
    t2: gamers[],
    server: string
}

const TableSection = ({t1, t2, server}: Props) => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mmrDifferences, setMMRDifferences] = useState<{ [key: string]: number }>({});
    const [isDrawAlert, setIsDrawAlert] = useState(false);
    const [suddenDeathErrorAlert, setSuddenDeathErrorAlert] = useState(false);
    const [isDraw, setIsDraw] = useState(false);
    const [team1, setTeam1State] = useState(t1);
    const [team2, setTeam2State] = useState(t2);
    const [formValues, setFormValues] = useImmer<FormValues>({
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
                setFormValues((draft) => {
                    draft.suddenDeath = false;
                    draft.suddenDeathWhoWon = ''
                })
            }
            return isDraw;
        });

    }, [formValues.team1Stats, formValues.team2Stats, formValues.suddenDeath, formValues.suddenDeathWhoWon])

    const handleGetRandomStats = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setFormValues((draft) => {

            draft.team1Stats = draft.team1Stats.map(stats => ({
                ...stats,
                ...getRandomStats(),
            }));

            draft.team2Stats = draft.team2Stats.map(stats => ({
                ...stats,
                ...getRandomStats(),
            }));
            draft.mapPlayed = getRandomMap().mapPlayed;

        });
    }

    const enableSDWinner = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((draft) => {
            draft.suddenDeath = e.target.checked;
            draft.suddenDeathWhoWon = e.target.checked ? draft.suddenDeathWhoWon : ''
        });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((draft) => {
            draft.suddenDeathWhoWon = e.target.value
        });
    };
    const updateTeams = (newTeam1: gamers[], newTeam2: gamers[]) => {
            setTeam1State(() => newTeam1)
            setTeam2State(() => newTeam2)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //checking if SD conditions are met
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

        //starting the data submitting process
        setIsSubmitting(true);
        const [pointsTeam1, pointsTeam2, newTeam1, newTeam2] = calculateMMR(formValues, team1, team2);
        await updatePlayers(formValues, newTeam1, newTeam2);
        setIsSubmitting(false); //end submitting

        //updating teams and setting mrrDiffs
        updateTeams(newTeam1, newTeam2);
        const mmrDiffs: { [key: string]: number } = {};
        team1.forEach((player, index) => {
            mmrDiffs[player.id] = pointsTeam1[index];
        });
        team2.forEach((player, index) => {
            mmrDiffs[player.id] = pointsTeam2[index];
        });
        setMMRDifferences(mmrDiffs);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        const [team, index, field] = name.split('-');

        setFormValues(draft => {
            draft[team] = (draft[team] as GamerMatchStats[]).map((player: GamerMatchStats, i: number) =>
                i === parseInt(index)
                    ? {...player, [field]: value}
                    : player
            )
        });
    };
    const handleMapChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormValues(draft => {
                draft[name] = value;
            }
        );
    };
    return (
        <div
            className="relative top-0 sm:top-8 -translate-x-1/2 left-1/2  p-4 rounded-lg max-w-fit bg-base-200">
            <div className="flex flex-row">
                <form onSubmit={handleSubmit}>
                    <table className="border-separate border-spacing-x-2 border-spacing-y-1">
                        <TeamScore nr={1} team={team1} formValues={formValues} handleInputChange={handleInputChange}
                                   mmrDifferences={mmrDifferences}/>
                        <TeamScore nr={2} team={team2} formValues={formValues} handleInputChange={handleInputChange}
                                   mmrDifferences={mmrDifferences}/>
                        <tbody>
                        <MapSelect formValues={formValues} handleMapChange={handleMapChange}/>
                        <tr>
                            <SuddenDeathCheckbox formValues={formValues} isDraw={isDraw}
                                                 enableSDWinner={enableSDWinner}/>
                            <SuddenDeathWhoWonRadioButton nr={1} formValues={formValues}
                                                          handleRadioChange={handleRadioChange}/>
                            <SuddenDeathWhoWonRadioButton nr={2} formValues={formValues}
                                                          handleRadioChange={handleRadioChange}/>
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
                <div className="hidden xs:display">
                    <Guide texts={textsSubmitMatch}/>
                </div>
            </div>
        </div>
    );
}

export default TableSection;
