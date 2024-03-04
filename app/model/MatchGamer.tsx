class MatchGamer{
    id?: number;
    gamer_id: number;
    match_id: number;
    team_id: number;
    constructor(id: number | undefined, gamer_id?: number, match_id?: number, team_id?: number) {
        this.id = id;
        this.gamer_id = gamer_id || 0;
        this.match_id= match_id || 0;
        this.team_id = team_id || 0;
    }
}
export default MatchGamer