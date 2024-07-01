'use server'
import prisma from "@/prisma/client"
import Weapon from '@/app/model/Weapon'

export async function getWeaponsStats()   {
    const weaponsStats: Weapon[] = await prisma.weapons.findMany();
    console.log(weaponsStats)
}