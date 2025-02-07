import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export const revalidate = 1;
export const GET = async () => {
  const prisma = new PrismaClient();

  

  

  try {
    // const footerFromAdmin = await fetch("https://arzaq-admin.vercel.app/api/footer", {
    //   next: { revalidate: 0 },
    // });
    const footerdata = await prisma.footer.findFirst({
      select: {
        address: true,
        email: true,
        phoneNumber: true,
        SocialMedia: true,
      },
    });

    // const footerdata = await footerFromAdmin.json()

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
