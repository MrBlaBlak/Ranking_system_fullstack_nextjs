'use server'
import {Gamer} from '../../../components/PickGamersBar'
const calculatePerfectBalance = (gamers: Gamer[]): number => {
    
    return gamers.reduce((sum, gamer) => sum + gamer.mmr, 0) / 2;
};
export const applyServerHandicap = (matchServer: string, gamerServer: string) => {
        let handicap=0;
        switch (gamerServer) {
            case "EU1": {
                if(matchServer ==="NY") handicap=5;
                else if(matchServer==="EU") handicap=0; break;
            }
            case "EU2": {
                if(matchServer==="NY") handicap=6;
                else if(matchServer==="EU") handicap=0; break;
            }
            case "EU3": {
                if(matchServer==="NY") handicap=7;
                else if(matchServer==="EU") handicap=0; break;
            }
            case "EU4": {
                if(matchServer==="NY") handicap=8;
                else if(matchServer==="EU") handicap=0; break;
            }
            case "EU5": {
                if(matchServer==="NY") handicap=10;
                else if(matchServer==="EU") handicap=5; break;
            }
            case "EU6": {
                if(matchServer==="NY") handicap=12;
                else if(matchServer==="EU") handicap=6; break;
            }
            case "NY1": {
                if(matchServer==="EU") handicap=5;
                else if(matchServer==="NY") handicap=0; break;
            }
            case "NY2": {
                if(matchServer==="EU") handicap=6;
                else if(matchServer==="NY") handicap=0; break;
            }
            case "NY3": {
                if(matchServer==="EU") handicap=7;
                else if(matchServer==="NY") handicap=0; break;
            }
            case "NY4": {
                if(matchServer==="EU") handicap=8;
                else if(matchServer==="NY") handicap=0; break;
            }
            case "NY5": {
                if(matchServer==="EU") handicap=10;
                else if(matchServer==="NY") handicap=5; break;
            }
            case "NY6": {
                if(matchServer==="EU") handicap=12;
                else if(matchServer==="NY") handicap=6; break;
            }
            default: {
                handicap=0;
            }

        }
        return handicap;

}
const findMostBalancedTeams = (gamers: Gamer[], gameServer:string): [Gamer[], Gamer[]] => {
    // console.log(gamers)
    // console.log(gameServer)
    const perfectBalance = calculatePerfectBalance(gamers);
    let bestScoreSoFar = 0;
    let smallestDiff = 1000;
    let bestTeam1: Gamer[] = [];
    let bestTeam2: Gamer[] = [];
    for (let i = 0; i < 10; i++) {
        gamers[i].mmr = gamers[i].mmr - applyServerHandicap(gameServer, gamers[i].server)
    }
    for (let i = 1; i < Math.pow(2, gamers.length); i++) {
        let mmrCounter = 0;
        let currentDiffFromPerfectBalance = 0;
        let testIf5 = 0;
        let team1: Gamer[] = [];
        let team2: Gamer[] = [];

        for (let a = 0; a < gamers.length; ++a) {
            if (((i >> a) & 1) === 1) {
                mmrCounter += gamers[a].mmr;
                team1.push(gamers[a]);
                testIf5++;
            } else {
                team2.push(gamers[a]);
            }
        }

        currentDiffFromPerfectBalance = Math.abs(mmrCounter - perfectBalance);

        if (currentDiffFromPerfectBalance < smallestDiff && testIf5 === 5) {
            bestScoreSoFar = mmrCounter;
            smallestDiff = currentDiffFromPerfectBalance;
            bestTeam1 = [...team1];
            bestTeam2 = [...team2];
        }
    }

    return [bestTeam1, bestTeam2 ];
}

export default findMostBalancedTeams;