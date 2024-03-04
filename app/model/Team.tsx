class Team {
    id?: number;
    win_or_loose: number;
    flag_advantage: number;

    constructor(id?: number| undefined, win_or_loose?: number, flag_advantage?: number) {
        this.id = id;
        this.win_or_loose = win_or_loose || 0;
        this.flag_advantage = flag_advantage || 0;
    }

}
export default Team;