class MatchGamer{
    id?: number;
    gamerId: number;
    matchId: number;
    teamId: number;
    constructor(id: number | undefined, gamerId: number, matchId: number, teamId: number) {
        this.id = id;
        this.gamerId = gamerId;
        this.matchId= matchId;
        this.teamId = teamId;
    }
}
export default MatchGamer