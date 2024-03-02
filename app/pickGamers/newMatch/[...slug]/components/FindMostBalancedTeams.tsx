'use server'
import {Gamer} from '../../../components/PickGamersBar'
const calculatePerfectBalance = (gamers: Gamer[]): number => {
    
    return gamers.reduce((sum, gamer) => sum + gamer.mmr, 0) / 2;
};
const findMostBalancedTeams = (gamers: Gamer[]): [Gamer[], Gamer[]] => {
    const perfectBalance = calculatePerfectBalance(gamers);
    let bestScoreSoFar = 0;
    let smallestDiff = 1000;
    let bestTeam1: Gamer[] = [];
    let bestTeam2: Gamer[] = [];

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