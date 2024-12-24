import { PrismaClient } from "@prisma/client"; // Update with your actual prisma path
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const categories = await prisma.categories.findMany({
    take: 4, // Fetch only 4 categories
  });

  
  if (categories.length === 0) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }
  
  return NextResponse.json(categories, { status: 200 });
}
