class Match{
    id?: number;
    map: MapName;
    server: string;
    created: Date;

    constructor(id: number | undefined, map: MapName, server: string, created: Date) {
        this.id = id;
        this.map = map;
        this.server = server;
        this.created = created;
    }
}

// Enumeracja dla Map_Name
enum MapName {
    Boomtown = 'boomtown',
    Exo = 'exo',
    Eden = 'eden',
    Drydock = 'drydock',
    Angel = 'angel',
    Colony = 'colony',
    Glitch = 'glitch',
    None = 'none',
}
export default Match;