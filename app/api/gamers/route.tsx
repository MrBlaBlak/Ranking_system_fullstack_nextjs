import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client"
import Match from '../../model/Match'

export async function GET() {
    
    const gamers = await prisma.gamers.findMany();
    return NextResponse.json(gamers);
}

export async function postMatch(match: Match){

    const newMatch = await prisma.matches.create({
        data: match
    })
    return newMatch
}
