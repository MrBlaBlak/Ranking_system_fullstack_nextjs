class Gamer {
    id?: number;
    name: string;
    mmr: number;
    server: string;
    lastTen: string;

    constructor(id: number | undefined, name: string, mmr: number, server: string, lastTen: string) {
        this.id = id;
        this.name = name;
        this.mmr = mmr;
        this.server = server;
        this.lastTen = lastTen;
    }
}
export default Gamer;