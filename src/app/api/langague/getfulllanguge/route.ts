import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const translations = await prisma.translation.findMany();
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
