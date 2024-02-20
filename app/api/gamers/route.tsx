import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client"


export async function GET() {
    
    const gamers = await prisma.gamers.findMany();
    return NextResponse.json(gamers);
}

