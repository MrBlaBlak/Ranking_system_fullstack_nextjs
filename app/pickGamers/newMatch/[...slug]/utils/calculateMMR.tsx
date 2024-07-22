import {FormSchema} from '@/zod/zodSchemas'
import {gamers} from '@prisma/client'
import {Updater} from "use-immer";
const calculateMmr = (formValues: unknown, team1: gamers[], team2: gamers[], setTeam1State: Updater<gamers[]>, setTeam2State:  Updater<gamers[]>): [number[], number[]] => {
    const validatedForm = FormSchema.safeParse(formValues);
    if(!validatedForm.success){
        console.error(validatedForm.error)
        return [[0,0,0,0,0], [0,0,0,0,0]];
    }
    const suddenDeath = validatedForm.data.suddenDeath;
    const suddenDeathWhoWon = validatedForm.data.suddenDeathWhoWon;
    const team1Stats = validatedForm.data.team1Stats;
    const team2Stats = validatedForm.data.team2Stats;
    let team1flagsTotal = 0;
    let team2flagsTotal = 0;
    let whoWon = 0;
    let streak = 0;
    let streak2 = 0;
    const points1Array  = [];
    const points2Array  = [];

    for (let i = 0; i < 5; i++) {
        team1flagsTotal += +(team1Stats[i].flags);
        team2flagsTotal += +(team2Stats[i].flags);
    }

    if (team1flagsTotal > team2flagsTotal) {
        whoWon = 1;
    } else if (team1flagsTotal < team2flagsTotal) {
        whoWon = 2;
    } else {
        if (!suddenDeathWhoWon) {
             return [[0,0,0,0,0], [0,0,0,0,0]]
        } else if (suddenDeathWhoWon === 'team1') {
            whoWon = 1;
        } else if (suddenDeathWhoWon === 'team2') {
            whoWon = 2;
        }
    }
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
            points += ((team1flagsTotal - team2flagsTotal) / 5.0) - 0.2;
            points2 += ((team2flagsTotal - team1flagsTotal) / 5.0) + 0.2;
          
            //change score if suddenDeath
            if (suddenDeath) {
                points = 0.5;
                points2 = -0.5;
                //update last ten; suddenDeath result is not counted neither as win or loss for last 10
            } else {
                setTeam1State(draft => {
                    draft[i].lastTen = (parseInt(draft[i].lastTen, 2) >> 1 | 512).toString(2)
                });
                setTeam2State(draft => {
                    draft[i].lastTen = (parseInt(draft[i].lastTen, 2) >> 1).toString(2)
                });
            }
        }

        if (whoWon === 2) {
            points2 += (team2flagsTotal - team1flagsTotal)  / 5.0 - 0.2;
            points += (team1flagsTotal - team2flagsTotal) / 5.0 + 0.2;
            
            //change score if suddenDeath
            if (suddenDeath) {
                points = -0.5;
                points2 = 0.5;
                //update last ten; suddenDeath result is not counted neither as win or loss for last 10
            } else {
                setTeam1State(draft => {
                    draft[i].lastTen = (parseInt(draft[i].lastTen, 2) >> 1).toString(2)
                });
                setTeam2State(draft => {
                    draft[i].lastTen = (parseInt(draft[i].lastTen, 2) >> 1 | 512).toString(2)
                });
            }
        }
       
        setTeam1State(draft => {
            draft[i].mmr = Math.round((draft[i].mmr + points) * 10) / 10
        });
        setTeam2State(draft => {
            draft[i].mmr = Math.round((draft[i].mmr + points2) * 10) / 10
        });
        points1Array.push(points)
        points2Array.push(points2)
        streak = 0;
        streak2 = 0;
    }
    return [points1Array, points2Array];
}
export default calculateMmr;