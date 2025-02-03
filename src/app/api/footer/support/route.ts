import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.footerSupport.findMany();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
