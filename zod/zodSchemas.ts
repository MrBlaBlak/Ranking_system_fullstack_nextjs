import {z} from "zod";

export const gamerSchema = z.object({
    id: z.number(),
    name: z.string(),
    mmr: z.number(),
    server: z.string(),
    lastTen: z.string(),
})
export const MatchGamerSchema = z.object({
    id: z.number(),
    gamer_id: z.number(),
    match_id: z.number(),
    team_id: z.number(),
})
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