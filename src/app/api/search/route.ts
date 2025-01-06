import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    // Parse the search query from the request body
    const { searchText } = await request.json();
   
    // Validate input
    if (!searchText || searchText.trim() === "") {
      return NextResponse.json({ error: "Search text is required" }, { status: 400 });
    }

    // Perform the search query
    const results = await prisma.postad.findMany({
      where: {
        OR: [
          { adName: { contains: searchText.toLowerCase() } },
          { brand: { contains: searchText.toLowerCase() } },
          { model: { contains: searchText.toLowerCase() } },
          { description: { contains: searchText.toLowerCase() } },
          { country: { contains: searchText.toLowerCase() } },
          { state: { contains: searchText.toLowerCase() } },
          { location: { contains: searchText.toLowerCase() } },
        ],
      },
      select:{
        adName:true,
        authenticity:true,
        brand:true,
        category:true,
        country:true,
        id:true,
        condition:true,
        description:true,
        currency:true,
        location:true,
        model:true,
        phoneNumber:true,
        negotiable:true,
        postad_photos:true,
        price:true,
        state:true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Respond with search results
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Search query failed:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
  finally {
    await prisma.$disconnect();
  }
}
