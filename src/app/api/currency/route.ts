import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();
  try {
    const getCurrancy = await prisma.currency.findMany();
    return NextResponse.json(getCurrancy, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
