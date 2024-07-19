'use server'
import {gamers, Map_Name, Titan_Name} from '@prisma/client'
import {FormValues} from '../components/TableSection'
import {postMatch} from "@/app/api/gamers/prismaActions"
import {postTeam} from "@/app/api/gamers/prismaActions"
import {postMatchGamer} from "@/app/api/gamers/prismaActions"
import {postKillsAndCaps} from "@/app/api/gamers/prismaActions"
import {updateGamer} from "@/app/api/gamers/prismaActions"
import {applyServerHandicap} from "./findMostBalancedTeams"

export default async function updatePlayers(formValues: FormValues, team1: gamers[], team2: gamers[]) {

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

    const newMatch = await postMatch({
        map: Map_Name[mapPlayed as keyof typeof Map_Name],
        server: server,
    });

    const team1forDBflag_advantage = team1flagsTotal - team2flagsTotal;
    const team2forDBflag_advantage = team2flagsTotal - team1flagsTotal;
    let team1forDBwin_or_loose = 0
    let team2forDBwin_or_loose = 0
    if (whoWon === 1) {
        team1forDBwin_or_loose = 1;
        team2forDBwin_or_loose = 0;
    }
    if (whoWon === 2) {
        team1forDBwin_or_loose = 0;
        team2forDBwin_or_loose = 1;
    }
    const newTeam1 = await postTeam({
        flag_advantage: team1forDBflag_advantage,
        win_or_loose: team1forDBwin_or_loose
    });
    const newTeam2 = await postTeam({
        flag_advantage: team2forDBflag_advantage,
        win_or_loose: team2forDBwin_or_loose
    });


    for (let i = 0; i < 5; i++) {
        team1[i].mmr = Math.round((team1[i].mmr + applyServerHandicap(server, team1[i].server)) * 10) / 10;
        team2[i].mmr = Math.round((team2[i].mmr + applyServerHandicap(server, team2[i].server)) * 10) / 10;
    }

    for (let i = 0; i < 5; i++) {
        // Update gamers in both teams
        await Promise.all([updateGamer(team1[i]), updateGamer(team2[i])]);

        // Create match gamers for both teams
        const [newMatchGamer1, newMatchGamer2] = await Promise.all([
            postMatchGamer({
                gamer_id: team1[i].id,
                match_id: newMatch.id,
                team_id: newTeam1.id}),
            postMatchGamer({
                gamer_id: team2[i].id,
                match_id: newMatch.id,
                team_id: newTeam2.id
            })
        ]);

        // Create kills and caps for both teams
        await Promise.all([
            postKillsAndCaps({
                caps: +team1Stats[i].flags,
                kills: +team1Stats[i].elims,
                titan: Titan_Name[team1Stats[i].titans as keyof typeof Titan_Name],
                match_gamer_id: newMatchGamer1.id
            }),
            postKillsAndCaps({
                caps: +team2Stats[i].flags,
                kills: +team2Stats[i].elims,
                titan: Titan_Name[team2Stats[i].titans as keyof typeof Titan_Name],
                match_gamer_id: newMatchGamer2.id})
        ]);
    }


}

