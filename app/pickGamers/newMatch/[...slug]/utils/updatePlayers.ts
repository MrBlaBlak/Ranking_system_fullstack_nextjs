'use server'
import Gamer from '@/app/model/Gamer';
import Match from '@/app/model/Match'
import Team from '@/app/model/Team'
import MatchGamer from '@/app/model/MatchGamer'
import KillsAndCaps from '@/app/model/KillsAndCaps'
import {MapName} from '@/app/model/Match'
import {TitanName} from "@/app/model/KillsAndCaps";
import {FormValues} from '../components/DisplayTeams'
import {postMatch} from "@/app/api/gamers/prismaActions"
import {postTeam} from "@/app/api/gamers/prismaActions"
import {postMatchGamer} from "@/app/api/gamers/prismaActions"
import {postKillsAndCaps} from "@/app/api/gamers/prismaActions"
import {updateGamer} from "@/app/api/gamers/prismaActions"
import {applyServerHandicap} from "./findMostBalancedTeams"
import calculateMMR from './calculateMMR'

export default async function updatePlayers(formValues: FormValues, team1: Gamer[], team2: Gamer[]) {
    
    const server = formValues.server;
    const suddenDeathWhoWon = formValues.suddenDeathWhoWon;
    const team1Stats = formValues.team1Stats;
    const team2Stats = formValues.team2Stats;
    const mapPlayed = formValues.mapPlayed;
    let team1flagsTotal = 0;
    let team2flagsTotal = 0;
    let whoWon = 0;
    
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
    const matchForDB: Match = new Match(undefined, MapName[mapPlayed as keyof typeof MapName], server, new Date());
    const newMatch = await postMatch(matchForDB);
    

    const team1forDB: Team = new Team();
    const team2forDB: Team = new Team();
    team1forDB.flag_advantage = team1flagsTotal - team2flagsTotal;
    team2forDB.flag_advantage = team2flagsTotal - team1flagsTotal;
    if (whoWon == 1) {
        team1forDB.win_or_loose = 1;
        team2forDB.win_or_loose = 0;
    }
    if (whoWon == 2) {
        team1forDB.win_or_loose = 0;
        team2forDB.win_or_loose = 1;
    }
    const newTeam1 = await postTeam(team1forDB);
    const newTeam2 = await postTeam(team2forDB);
    
    const [team1New, team2New] = calculateMMR(formValues, team1, team2);
    
    for (let i=0;i<5;i++){
        team1New[i].mmr = Math.round((team1[i].mmr  + applyServerHandicap(server, team1[i].server)) * 10) / 10;
        team2New[i].mmr = Math.round((team2[i].mmr  + applyServerHandicap(server, team2[i].server)) * 10) / 10;
    }

    for (let i = 0; i < 5; i++) {
        // Update gamers in both teams
        await Promise.all([updateGamer(team1New[i]), updateGamer(team2New[i])]);

        // Create match gamers for both teams
        const [newMatchGamer1, newMatchGamer2] = await Promise.all([
            postMatchGamer(new MatchGamer(undefined, team1New[i].id, newMatch.id, newTeam1.id)),
            postMatchGamer(new MatchGamer(undefined, team2New[i].id, newMatch.id, newTeam2.id))
        ]);

        // Create kills and caps for both teams
        await Promise.all([
            postKillsAndCaps(new KillsAndCaps(undefined, +team1Stats[i].elims, +team1Stats[i].flags, TitanName[team1Stats[i].titans as keyof typeof TitanName], newMatchGamer1.id)),
            postKillsAndCaps(new KillsAndCaps(undefined, +team2Stats[i].elims, +team2Stats[i].flags, TitanName[team2Stats[i].titans as keyof typeof TitanName], newMatchGamer2.id))
        ]);
    }


}

