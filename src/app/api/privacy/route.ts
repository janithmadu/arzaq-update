import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const GET = async () => {
  const prisma = new PrismaClient();

  try {
    const getPrivacy = await prisma.privacyPolicy.findFirst();
    return NextResponse.json(getPrivacy, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
  }
};
