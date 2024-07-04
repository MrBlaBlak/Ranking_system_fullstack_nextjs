import {FormValues} from '../components/DisplayTeams'
import Gamer from '@/app/model/Gamer';
import {applyServerHandicap} from "./findMostBalancedTeams"
const calculateMmr = (formValues: FormValues, team1: Gamer[], team2: Gamer[]): [Gamer[], Gamer[]] => {
    const suddenDeath = formValues.suddenDeath;
    const suddenDeathWhoWon = formValues.suddenDeathWhoWon;
    const team1Stats = formValues.team1Stats;
    const team2Stats = formValues.team2Stats;
    let team1flagsTotal = 0;
    let team2flagsTotal = 0;
    let whoWon = 0;
    let streak = 0;
    let streak2 = 0;

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
            // res.status(200).json({team1: team1gamers, team2: team2gamers, server});
             return [team1, team2]
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
                team1[i].lastTen = (parseInt(team1[i].lastTen, 2) >> 1 | 512).toString(2);
                team2[i].lastTen = (parseInt(team2[i].lastTen, 2) >> 1).toString(2);
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
                team1[i].lastTen = (parseInt(team1[i].lastTen, 2) >> 1).toString(2);
                team2[i].lastTen = (parseInt(team2[i].lastTen, 2) >> 1 | 512).toString(2);
            }
        }
       
        team1[i].mmr = Math.round((team1[i].mmr + points ) * 10) / 10;
        team2[i].mmr = Math.round((team2[i].mmr + points2 ) * 10) / 10;


        streak = 0;
        streak2 = 0;

    }
    return [team1, team2];
}
export default calculateMmr;