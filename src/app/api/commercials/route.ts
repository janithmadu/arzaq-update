import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== "string") {
      return new NextResponse("Invalid slug", { status: 400 });
    }

    // Fetch all commercials if the slug is 'all'
    if (slug === "all") {
      const allCommercials = await prisma.commercial.findMany();
      if (allCommercials.length === 0) {
        return  NextResponse.json({
          success: false,
          status:404,
  
        })
      }
      return NextResponse.json({ success: true, res: allCommercials });
    }

    // Fetch commercials by subcategory slug
    const slugCommercials = await prisma.commercial.findMany({
      where: {
        subcategory: {
          slug: slug,
        },
      },
    });

    if (slugCommercials.length === 0) {
      return  NextResponse.json({
        success: false,
        status:404,

      })
    }

    return NextResponse.json({ success: true, res: slugCommercials });

  } catch (error) {
    console.error("Error fetching commercials: ", error);
    return new NextResponse("Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}