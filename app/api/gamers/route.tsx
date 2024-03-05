import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client"
import Match from '../../model/Match'
import Gamer from '../../model/Gamer';
import Team from '../../model/Team'
import MatchGamer from '../../model/MatchGamer'
import KillsAndCaps from '../../model/KillsAndCaps'
export async function updateGamer(gamer: Gamer) {
    
    const updatedGamer = await prisma.gamers.update({
        where:{
            id: gamer.id
        },
        data:gamer
    });
    return updatedGamer;
}

export async function postMatch(match: Match){

    const newMatch = await prisma.matches.create({
        data: match
    })
    return newMatch
}
export async function postTeam(team: Team){

    const newTeam = await prisma.teams.create({
        data: team
    })
    return newTeam
}
export async function postMatchGamer(matchGamer: MatchGamer){
    const newMatchGamer = await prisma.match_gamer.create({
        data: matchGamer
    })
    return newMatchGamer
}
export async function postKillsAndCaps(killsAndCaps: KillsAndCaps){
    const newKillsAndCaps = await prisma.kills_and_caps.create({
        data: killsAndCaps
    })
    return killsAndCaps
}
export async function postGamer(gamer: Gamer){
    const newGamer = await prisma.gamers.create({
        data: gamer
    })
    return gamer
}
