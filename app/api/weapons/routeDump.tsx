'use server'
import prisma from "@/prisma/client"
import Weapon from '@/app/model/Weapon'

export async function getWeaponsStats()   {
    return await prisma.weapons.findMany();
}
export async function getWeaponStats(weaponId: number)   {
    return await await prisma.weapons.findUnique({
        where: {
            id: weaponId,
        }});
}