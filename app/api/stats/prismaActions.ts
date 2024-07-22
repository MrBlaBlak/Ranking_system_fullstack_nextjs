'use server';
import prisma from "@/prisma/client"
import weaponsJson from '@/public/data/weapons.json';
import gamersJson from '@/public/data/gamers.json';
import matchesJson from '@/public/data/matches.json';
import teamsJson from '@/public/data/teams.json';
import matchGamersJson from '@/public/data/matchGamers.json';
import killsAndCapsJson from '@/public/data/killsAndCaps.json';
import {Titan_Name, Map_Name} from ".prisma/client";
import {gamerSchema, MatchGamerSchema} from "@/zod/zodSchemas";
export async function setStatsData() {
    try {

        const mapNameConversion: { [key: string]: Map_Name } = Object.fromEntries(
            Object.entries(Map_Name).map(([key, value]) => [key, value])
        );
        const filteredMatchesJson = matchesJson.filter(match => mapNameConversion[match.map]); // Filter based on mapNameConversion

        const transformedMatchesJson = filteredMatchesJson.map(match => ({
            ...match,
            map: mapNameConversion[match.map], // Use mapNameConversion for map property
        }));
        console.log(transformedMatchesJson)
        await prisma.matches.createMany({
            data: transformedMatchesJson,
        });
        await prisma.teams.createMany({
            data: teamsJson,
        });
        await prisma.match_gamer.createMany({
            data: matchGamersJson,
        });

        const titanNameConversion: { [key: string]: Titan_Name } = Object.fromEntries(
            Object.entries(Titan_Name).map(([key, value]) => [key, value])
        );
        const filteredKillsAndCapsJson = killsAndCapsJson.filter(record => titanNameConversion[record.titan]);

        const transformedKillsAndCapsJson = filteredKillsAndCapsJson.map(record => ({
            ...record,
            titan: titanNameConversion[record.titan],
        }));
        await prisma.kills_and_caps.createMany({
            data: transformedKillsAndCapsJson,
        });
    } catch (error) {
        console.error("Error creating data:", error);
    }
}

export async function setGamersData() {
    try {
        await prisma.gamers.createMany({
            data: gamersJson,
        });
    } catch (error) {
        console.error("Error creating data:", error);
    }
}

export async function setWeaponsData() {
    try {
        await prisma.weapons.createMany({
            data: weaponsJson,
        });
    } catch (error) {
        console.error("Error creating data:", error);
    }
}

export async function checkIfDataExist() {
    try {
        const validatedResult = MatchGamerSchema.safeParse(await prisma.match_gamer.findFirst()) ;
        if(!validatedResult.success){
            console.error(validatedResult.error)
            return false;
        }
        return validatedResult.data !== null;
    } catch (error) {
        console.error('Error checking data existence:', error);
        return false;
    }
}

export async function checkIfGamersExist() {
    try {
        const validatedResult = gamerSchema.safeParse(await prisma.gamers.findFirst());
        if(!validatedResult.success){
            console.error(validatedResult.error)
            return false;
        }
        return validatedResult.data !== null;
    } catch (error) {
        console.error('Error checking data existence:', error);
        return false;
    }
}
