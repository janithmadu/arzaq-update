import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const GET = async () => {
  const prisma = new PrismaClient();

  try {
    const getTerms = await prisma.termsAndConditions.findFirst();
    return NextResponse.json(getTerms, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
  }
};
