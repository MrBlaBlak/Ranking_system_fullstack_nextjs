import {z} from "zod";

export const gamerSchema = z.object({
    id: z.number(),
    name: z.string(),
    mmr: z.number(),
    server: z.string(),
    lastTen: z.string(),
})
export const matchGamerSchema = z.object({
    id: z.number(),
    gamer_id: z.number(),
    match_id: z.number(),
    team_id: z.number(),
})