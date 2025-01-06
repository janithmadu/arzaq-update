import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();

  try {
    const footerdata = await prisma.footer.findFirst({
      select: {
        address: true,
        email: true,
        phoneNumber: true,
        SocialMedia: true,
      },
    });

    if (!footerdata) {
      return NextResponse.json({
        status: 404,
        message: "Footer data not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Footer data found",
      footerdata,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server Error", error });
  } finally {
    await prisma.$disconnect();
  }
};
