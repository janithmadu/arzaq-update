import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();
  try {
    const logodata = await prisma.store.findFirst({
      select: {
        id: true,
        logo: true,
        name: true,
      },
    });

    if (!logodata) {
      return NextResponse.json({ status: 404, message: "Logo data not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Logo data found",
      logodata,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server Error", error });
  } finally {
    await prisma.$disconnect();
  }
};
