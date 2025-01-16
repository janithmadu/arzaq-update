import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const GET = async () => {
  const prisma = new PrismaClient();

  try {
    const getContact = await prisma.contact.findFirst();
    return NextResponse.json(getContact, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
  }
};
