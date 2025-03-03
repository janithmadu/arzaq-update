import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  const prisma = new PrismaClient();

  const lang = await request.json()
  if(lang.lang === "") return new Response("Invalid request", { status: 400 });
  
  

  try {
    const translations = await prisma.translation.findMany({
        where:{
            language: lang.lang
        }
    });
    return NextResponse.json({ translations }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch translations" },
      { status: 500 }
    );
  }
  finally{
    await prisma.$disconnect();
  }
}
