import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  const prisma = new PrismaClient();
  const Section:any = await req.json()

  

  try {
    const ads = await prisma.googleAds.findUnique({
      where:{
        Section:Section.section
      }
    });

    
    return NextResponse.json(ads, { status: 200 });
  } catch (error) {

    
    return NextResponse.json(error, { status: 500 });
  }
}
