'use server'
import prisma from "@/prisma/client"

export async function getWeaponsStats()   {
    return await prisma.weapon.findMany();
}
export async function getWeaponStats(weaponId: number)   {
    return await prisma.weapon.findUnique({
        where: {
            id: weaponId,
        }});
}