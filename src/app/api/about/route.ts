import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
    const prisma = new PrismaClient();
    
    try {
        const getAbout = await prisma.aboutUs.findMany();
        
        return NextResponse.json(getAbout, { status: 200 });
        
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
        
        
    }finally{
        await prisma.$disconnect
    }

}