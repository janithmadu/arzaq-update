import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.subcategory.findMany();

    if (result.length === 0) {
      return new NextResponse("No subcategories found", { status: 404 });
    }

    return NextResponse.json({ success: true, res: result });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error retrieving subcategories" }),
      { status: 500 }
    );
  }
}