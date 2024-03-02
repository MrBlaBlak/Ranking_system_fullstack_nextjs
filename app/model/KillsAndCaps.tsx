class KillsAndCaps {
     id?: number;
     kills: number;
     caps: number;
     titan: TitanName;

    constructor(id: number | undefined, kills: number, caps: number, titan: TitanName) {
        this.id = id;
        this.kills = kills;
        this.caps = caps;
        this.titan = titan;
    }
}
export enum TitanName {
    Ion = "ion",
    Tone = "tone",
    Ronin = "ronin",
    Northstar = "northstar",
    Monarch = "monarch",
    Legion = "legion",
    Scorch = "scorch",
    None = "none",
}
export default KillsAndCaps;