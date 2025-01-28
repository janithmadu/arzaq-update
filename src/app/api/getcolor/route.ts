import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();
  try {
    const getColor = await prisma.colorSettingsNew.findMany();
    return new Response(JSON.stringify(getColor), { status: 200 });
  } catch (error) {

    return new Response("Error Happend", { status: 500 });
  }
};
