class Team {
    id?: number;
    winOrLoose: number;
    flagAdvantage: number;

    constructor(id: number| undefined, winOrLoose: number, flagAdvantage: number) {
        this.id = id;
        this.winOrLoose = winOrLoose;
        this.flagAdvantage = flagAdvantage;
    }
}
export default Team;