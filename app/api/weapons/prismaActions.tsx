'use server'
import prisma from "@/prisma/client"

export async function getWeaponsStats()   {
    return await prisma.weapons.findMany();
}
export async function getWeaponStats(weaponId: number)   {
    return await prisma.weapons.findUnique({
        where: {
            id: weaponId,
        }});
}