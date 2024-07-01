'use server'
import prisma from "@/prisma/client"
import Weapon from '@/app/model/Weapon'

export async function getWeaponsStats()   {
    return await prisma.weapons.findMany();
}