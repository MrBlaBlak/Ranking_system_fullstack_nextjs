class KillsAndCaps {
    id?: number;
    kills: number;
    caps: number;
    titan: TitanName;
    match_gamer_id: number;

    constructor(id: number | undefined, kills: number, caps: number, titan: TitanName, match_gamer_id: number) {
        this.id = id;
        this.kills = kills;
        this.caps = caps;
        this.titan = titan;
        this.match_gamer_id = match_gamer_id;
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