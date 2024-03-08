'use server'
import React from 'react';
import Gamer from '../../../../model/Gamer';
import Match from '../../../../model/Match'
import Team from '../../../../model/Team'
import MatchGamer from '../../../../model/MatchGamer'
import KillsAndCaps from '../../../../model/KillsAndCaps'
import {MapName} from '../../../../model/Match'
import {TitanName} from "../../../../model/KillsAndCaps";
import {FormValues} from './DisplayTeams'
import {GamerMatchStats} from "./DisplayTeams";
import {postMatch} from "@/app/api/gamers/route"
import {postTeam} from "@/app/api/gamers/route"
import {postMatchGamer} from "@/app/api/gamers/route"
import {postKillsAndCaps} from "@/app/api/gamers/route"
import {postGamer} from "@/app/api/gamers/route"
import {updateGamer} from "@/app/api/gamers/route"
import {applyServerHandicap} from "./findMostBalancedTeams"
// FormValues = {
//     team1: Team[];
//     team2: Team[];
//     mapPlayed: string;
//     suddenDeath: boolean;
//     suddenDeathWhoWon: string;
//     server: string;
//     [key: string]: Team[] | string | boolean;
// };
export default async function CalculateMMR(formValues: FormValues, team1: Gamer[], team2: Gamer[]) {

    // console.log(await GET())
    const server = formValues.server;
    // console.log(server);
    const suddenDeath = formValues.suddenDeath;
    const suddenDeathWhoWon = formValues.suddenDeathWhoWon;
    const team1Stats = formValues.team1Stats;
    const team2Stats = formValues.team2Stats;
    const mapPlayed = formValues.mapPlayed;
    // console.log(formValues);

    let team1flagsTotal = 0;
    let team2flagsTotal = 0;
    let whoWon = 0;
    let streak = 0;
    let streak2 = 0;

    // Calculate total flags for each team
    for (let i = 0; i < 5; i++) {
        team1flagsTotal += +(team1Stats[i].flags);
        team2flagsTotal += +(team2Stats[i].flags);
    }

    // Determine the winner based on flag count
    if (team1flagsTotal > team2flagsTotal) {
        whoWon = 1;
    } else if (team1flagsTotal < team2flagsTotal) {
        whoWon = 2;
    } else {
        if (!suddenDeathWhoWon) {
            // res.status(200).json({team1: team1gamers, team2: team2gamers, server});
            return;
        } else if (suddenDeathWhoWon === 'team1') {
            whoWon = 1;
        } else if (suddenDeathWhoWon === 'team2') {
            whoWon = 2;
        }
    }
    const matchForDB: Match = new Match(undefined, MapName[mapPlayed as keyof typeof MapName] , server, new Date());
    const newMatch = await postMatch(matchForDB);
    //add teams to database
    const team1forDB:Team = new Team();
    const team2forDB:Team = new Team();
    team1forDB.flag_advantage=team1flagsTotal - team2flagsTotal;
    team2forDB.flag_advantage=team2flagsTotal - team1flagsTotal;
    if (whoWon == 1) {
        team1forDB.win_or_loose=1;
        team2forDB.win_or_loose=0;
    }
    if (whoWon == 2) {
        team1forDB.win_or_loose=0;
        team2forDB.win_or_loose=1;
    }
    const newTeam1 = await postTeam(team1forDB);
    const newTeam2 = await postTeam(team2forDB);

    for (let i = 0; i < 5; i++) {
        let countDown = parseInt(team1[i].lastTen, 2);
        let countDown2 = parseInt(team2[i].lastTen, 2);

        for (let a = 0; a < 10; a++) {
            if ((countDown & 1) === 1) streak++;
            countDown >>>= 1;
            if ((countDown2 & 1) === 1) streak2++;
            countDown2 >>>= 1;
        }

        //apply bonus from last 10 winrate
        let points = 0;
        let points2 = 0;

        if ((streak === 7 || streak === 8) && whoWon === 1) points = 1.2;
        else if ((streak === 2 || streak === 3) && whoWon === 2) points = -1.2;
        else if (streak > 1 && whoWon === 2) points = -1;
        else if (streak >= 9 && whoWon === 1) points = 1.5;
        else if (streak <= 1 && whoWon === 2) points = -1.5;
        else if (streak < 9 && whoWon === 1) points = 1;

        if ((streak2 === 7 || streak2 === 8) && whoWon === 2) points2 = 1.2;
        else if ((streak2 === 2 || streak2 === 3) && whoWon === 1) points2 = -1.2;
        else if (streak2 > 1 && whoWon === 1) points2 = -1;
        else if (streak2 >= 9 && whoWon === 2) points2 = 1.5;
        else if (streak2 <= 1 && whoWon === 1) points2 = -1.5;
        else if (streak2 < 9 && whoWon === 2) points2 = 1;

        //apply bonus from flag advantage
        if (whoWon === 1) {
            points += (team1forDB.flag_advantage / 5.0) - 0.2;
            points2 += (team2forDB.flag_advantage / 5.0) + 0.2;
            //change score if suddenDeath
            if (suddenDeath) {
                points = 0.5;
                points2 = -0.5;
                //update last ten; suddenDeath result is not counted neither as win or loss for last 10
            } else {
                team1[i].lastTen = (parseInt(team1[i].lastTen, 2) >> 1 | 512).toString(2);
                team2[i].lastTen = (parseInt(team2[i].lastTen, 2) >> 1).toString(2);
            }
        }

        if (whoWon === 2) {
            points2 += team2forDB.flag_advantage  / 5.0 - 0.2;
            points += team1forDB.flag_advantage / 5.0 + 0.2;
            //change score if suddenDeath
            if (suddenDeath) {
                points = -0.5;
                points2 = 0.5;
                //update last ten; suddenDeath result is not counted neither as win or loss for last 10
            } else {
                team1[i].lastTen = (parseInt(team1[i].lastTen, 2) >> 1).toString(2);
                team2[i].lastTen = (parseInt(team2[i].lastTen, 2) >> 1 | 512).toString(2);
            }
        }

        team1[i].mmr = Math.round((team1[i].mmr + points + applyServerHandicap(team1[i].server, server)) * 10) / 10;
        team2[i].mmr = Math.round((team2[i].mmr + points2 + applyServerHandicap(team2[i].server, server)) * 10) / 10;

        await updateGamer(team1[i]);
        await updateGamer(team2[i]);
        
        streak = 0;
        streak2 = 0;
        
    }
    for (let i = 0; i < 5; i++) {
        const matchGamer1:MatchGamer = new MatchGamer(undefined, team1[i].id, newMatch.id, newTeam1.id);
        const matchGamer2:MatchGamer = new MatchGamer(undefined, team2[i].id, newMatch.id, newTeam2.id);

        const newMatchGamer1 = await postMatchGamer(matchGamer1);
        const newMatchGamer2 = await postMatchGamer(matchGamer2);

        const killsAndCaps1:KillsAndCaps = new KillsAndCaps(undefined, +team1Stats[i].elims, +team1Stats[i].flags, TitanName[team1Stats[i].titans as keyof typeof TitanName], newMatchGamer1.id);
        const killsAndCaps2:KillsAndCaps = new KillsAndCaps(undefined, +team2Stats[i].elims, +team2Stats[i].flags, TitanName[team2Stats[i].titans as keyof typeof TitanName], newMatchGamer2.id);
        await postKillsAndCaps(killsAndCaps1);
        await postKillsAndCaps(killsAndCaps2);
    }

}

