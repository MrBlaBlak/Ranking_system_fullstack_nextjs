import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client"
import Match from '../../model/Match'
import Gamer from '../../model/Gamer';
import Team from '../../model/Team'
import MatchGamer from '../../model/MatchGamer'
import KillsAndCaps from '../../model/KillsAndCaps'
interface TitanStats {
    gamer_id: number;
    max_titan: string;
}
interface MapStats {
    name: string;
    total_wins: number;
    total_losses: number;
    map: string;
}
export async function findMostFrequentTitanForGamer(){
    //find most frequently used titan for every gamer
    const titanStats: TitanStats[] = await prisma.$queryRaw`SELECT t.gamer_id, MAX(t.max_titan) AS max_titan
                                         FROM (SELECT mg.gamer_id,
                                                      k.titan AS   max_titan,
                                                      ROW_NUMBER() OVER (PARTITION BY mg.gamer_id ORDER BY COUNT(k.titan) DESC) AS row_num
                                               FROM match_gamer mg
                                                        JOIN kills_and_caps k ON mg.id = k.match_gamer_id
                                               WHERE k.titan != 7
                                               GROUP BY mg.gamer_id, k.titan) AS t
                                         WHERE t.row_num = 1
                                         GROUP BY t.gamer_id`;
    return titanStats
}
export async function getMapStats() {
    const mapStats: MapStats[] = await prisma.$queryRaw`SELECT g.name,
                                                               SUM(CASE WHEN t.win_or_loose = 1 THEN 1 ELSE 0 END) AS total_wins,
                                                               SUM(CASE WHEN t.win_or_loose = 0 THEN 1 ELSE 0 END) AS total_losses,
                                                               m.map
                                                        FROM gamers g
                                                                 LEFT JOIN match_gamer mg ON g.id = mg.gamer_id
                                                                 LEFT JOIN matches m ON mg.match_id = m.id
                                                                 LEFT JOIN teams t ON mg.team_id = t.id
                                                        GROUP BY g.name, m.map`;
    return mapStats;
}
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
