import {z} from "zod";

export const GamerSchema = z.object({
    id: z.string(),
    name: z.string(),
    server: z.string(),
    lastTen: z.string(),
    mmr: z.number(),
});

export const JsonTitanDropSchema = z.object({
    titan: z.string(), // przyjmuje surowy string z JSON, parujesz go w kodzie
    matchTimeSec: z.number().int(),
    diedMatchTimeSec: z.number().int(),
});

export const JsonPlayerSchema = z.object({
    uid: z.string(),
    name: z.string(),
    team: z.number().int(),
    outcome: z.enum(["win", "loss", "draw"]),
    captures: z.number().int(),
    returns: z.number().int(),
    kills: z.number().int(),
    titanDamage: z.number().int(),
    pilotDamage: z.number().int(),
    deaths: z.number().int(),
    assists: z.number().int(),
    titanKills: z.number().int(),
    unconnectedTime: z.number().int(),
    afkTime: z.number().int(),
    titanDrops: z.array(JsonTitanDropSchema).optional().default([]),
    weaponDamage: z.record(z.string(), z.number().int()).optional().default({}),
    weaponKills: z.record(z.string(), z.number().int()).optional().default({}),
    pilotKills: z.number().int(),
    killsAsPilot: z.number().int(),
    killsAsTitan: z.number().int(),
    killStreakMax: z.number().int(),
    maxSpeed: z.number().int(),
    avgSpeed: z.number().int(),
    groundSec: z.number().int(),
    airSec: z.number().int(),
    wallrunSec: z.number().int(),
    wallhangSec: z.number().int(),
    flagPickups: z.number().int(),
    flagDrops: z.number().int(),
    flagCaptureRuns: z.number().int(),
    flagCarrySec: z.number().int(),
});

export const JsonCaptureLogSchema = z.object({
    uid: z.string(),
    name: z.string(),
    team: z.number().int(),
    matchTimeSec: z.number().int(),
    carrySec: z.number().int(),
});

export const JsonFirstBloodSchema = z.object({
    uid: z.string(),
    name: z.string(),
    victimUid: z.string(),
    victimName: z.string(),
    matchTimeSec: z.number().int(),
});

export const JsonMatchSchema = z.object({
    map: z.string(),
    mapDisplayName: z.string(),
    gamemode: z.string(),
    scoreLimit: z.number().int(),
    timeLimit: z.number().int(),
    suddenDeath: z.boolean(),
    halftimeMatchTimeSec: z.number().int().nullable().optional(),
    durationSec: z.number().int(),
    startTimeUnix: z.number().int(),
    endTimeUnix: z.number().int(),
});

export const JsonResultSchema = z.object({
    winningTeam: z.number().int(),
    teams: z.record(
        z.string(),
        z.object({
            name: z.string(),
            score: z.number().int(),
        })
    ),
});

export const JsonTelemetryPayloadSchema = z.object({
    schemaVersion: z.number().int(),
    match: JsonMatchSchema,
    result: JsonResultSchema,
    players: z.array(JsonPlayerSchema),
    firstBlood: JsonFirstBloodSchema.nullable().optional(),
    captureLog: z.array(JsonCaptureLogSchema).optional().default([]),
});

export type JsonMatch = z.infer<typeof JsonMatchSchema>;
export type JsonResult = z.infer<typeof JsonResultSchema>;
export type JsonPlayer = z.infer<typeof JsonPlayerSchema>;
export type JsonTelemetryPayload = z.infer<typeof JsonTelemetryPayloadSchema>;

export const GamerMatchStatsSchema = z.object({
    elims: z.string(),
    flags: z.string(),
    titans: z.string(),
    gamersId: z.string(),
});
export type GamerMatchStats = z.infer<typeof GamerMatchStatsSchema>

export const FormSchema = z.object({
    team1Stats: z.array(GamerMatchStatsSchema),
    team2Stats: z.array(GamerMatchStatsSchema),
    mapPlayed: z.string(),
    suddenDeath: z.boolean(),
    suddenDeathWhoWon: z.string(),
    server: z.string(),
}).catchall(z.union([z.array(GamerMatchStatsSchema), z.string(), z.boolean()]));
export type FormValues = z.infer<typeof FormSchema>



export const MapNameSchema = z.enum([
    "boomtown", "exo", "eden", "drydock", "angel", "colony", "glitch", "none"
]);
export const TitanNameSchema = z.enum([
    "ion", "tone", "ronin", "northstar", "monarch", "legion", "scorch", "none"
]);