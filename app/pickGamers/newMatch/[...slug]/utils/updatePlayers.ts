'use server'

// Używamy nowych typów/enumów z wygenerowanego Prisma Client
import { Gamer } from '@prisma/client'
import { FormSchema } from "@/zod/zodSchemas";
import { applyServerHandicap } from "./findMostBalancedTeams"

// Zmienione importy na nowe akcje!
import {
    postMatch,
    postTeam,
    postPlayerMatchStat,
    updateGamer
} from "@/app/api/gamers/prismaActions"

export default async function updatePlayers(formValues: unknown, team1: Gamer[], team2: Gamer[]) {
    const validatedForm = FormSchema.safeParse(formValues);

    if (!validatedForm.success) {
        console.error(validatedForm.error)
        return;
    }

    const { server, suddenDeathWhoWon, team1Stats, team2Stats, mapPlayed } = validatedForm.data;

    let team1flagsTotal = 0;
    let team2flagsTotal = 0;
    let whoWon = 0;

    // Obliczamy sumę flag
    for (let i = 0; i < 5; i++) {
        team1flagsTotal += +(team1Stats[i].flags);
        team2flagsTotal += +(team2Stats[i].flags);
    }

    // Kto wygrał?
    if (team1flagsTotal > team2flagsTotal) {
        whoWon = 1;
    } else if (team1flagsTotal < team2flagsTotal) {
        whoWon = 2;
    } else {
        if (!suddenDeathWhoWon) {
            return;
        } else if (suddenDeathWhoWon === 'team1') {
            whoWon = 1;
        } else if (suddenDeathWhoWon === 'team2') {
            whoWon = 2;
        }
    }

    // 1. TWORZYMY MECZ (Musimy dodać domyślne wartości dla nowych pól wymaganych przez schemat JSON/Prisma)
    const newMatch = await postMatch({
        map: mapPlayed.toLowerCase() as any, // np. 'boomtown' rzutowane na Enum
        gamemode: "manual_entry", // Oznaczamy, że to mecz wprowadzony z ręki
        suddenDeath: suddenDeathWhoWon ? true : false,
        durationSec: 0, // Z ręki nie mamy czasu trwania
        startTimeUnix: BigInt(Math.floor(Date.now() / 1000)),
        server: server,
    });

    // Ustawiamy wynik (Enum "win" | "loss" | "draw") zamiast 1 i 0
    let team1Result: "win" | "loss" | "draw" = "draw";
    let team2Result: "win" | "loss" | "draw" = "draw";

    if (whoWon === 1) {
        team1Result = "win";
        team2Result = "loss";
    } else if (whoWon === 2) {
        team1Result = "loss";
        team2Result = "win";
    }

    // 2. TWORZYMY DRUŻYNY
    const newTeam1 = await postTeam({
        matchId: newMatch.id,
        score: team1flagsTotal - team2flagsTotal, // flag_advantage
        result: team1Result
    });

    const newTeam2 = await postTeam({
        matchId: newMatch.id,
        score: team2flagsTotal - team1flagsTotal, // flag_advantage
        result: team2Result
    });

    // 3. AKTUALIZUJEMY GRACZY I ZAPISUJEMY STATYSTYKI
    for (let i = 0; i < 5; i++) {
        // Aktualizacja MMR
        team1[i].mmr = Math.round((team1[i].mmr + applyServerHandicap(server, team1[i].server)) * 10) / 10;
        team2[i].mmr = Math.round((team2[i].mmr + applyServerHandicap(server, team2[i].server)) * 10) / 10;

        await Promise.all([updateGamer(team1[i]), updateGamer(team2[i])]);

        // Tworzymy gigantyczny rekord z zerami dla statystyk, których nie ma w ręcznym formularzu
        await Promise.all([
            postPlayerMatchStat({
                gamerId: team1[i].id, // To teraz string
                matchId: newMatch.id,
                teamMatchId: newTeam1.id,

                // Dane z formularza ręcznego
                kills: +team1Stats[i].elims,
                captures: +team1Stats[i].flags,
                titan: team1Stats[i].titans as any,

                // Domyślne ZERA dla reszty telemetrii (bo ręczny formularz ich nie ma)
                deaths: 0, assists: 0, pilotKills: 0, titanKills: 0,
                killsAsPilot: 0, killsAsTitan: 0, pilotDamage: 0, titanDamage: 0,
                killStreakMax: 0, returns: 0, flagPickups: 0, flagDrops: 0,
                flagCaptureRuns: 0, flagCarrySec: 0, maxSpeed: 0, avgSpeed: 0,
                groundSec: 0, airSec: 0, wallrunSec: 0, wallhangSec: 0,
                unconnectedTime: 0, afkTime: 0
            }),
            postPlayerMatchStat({
                gamerId: team2[i].id,
                matchId: newMatch.id,
                teamMatchId: newTeam2.id,

                // Dane z formularza ręcznego
                kills: +team2Stats[i].elims,
                captures: +team2Stats[i].flags,
                titan: team2Stats[i].titans as any,

                // Domyślne ZERA dla reszty telemetrii
                deaths: 0, assists: 0, pilotKills: 0, titanKills: 0,
                killsAsPilot: 0, killsAsTitan: 0, pilotDamage: 0, titanDamage: 0,
                killStreakMax: 0, returns: 0, flagPickups: 0, flagDrops: 0,
                flagCaptureRuns: 0, flagCarrySec: 0, maxSpeed: 0, avgSpeed: 0,
                groundSec: 0, airSec: 0, wallrunSec: 0, wallhangSec: 0,
                unconnectedTime: 0, afkTime: 0
            })
        ]);
    }
}