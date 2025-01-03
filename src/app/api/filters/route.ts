import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const data = await request.json();
    console.log(data);

    const subcategoryId = data.subcategories; // Ensure this is correctly passed
    const secondcategoryId = data.secondCategory;
    const categoryId = data.category; // Corrected to match schema field name
    const subOptions = data.subOptions; // Should be an array or single value
    const minPrice = parseFloat(data.minPrice) || 0;
    const maxPrice = parseFloat(data.maxPrice) || 0;
    const limit = parseInt(data.limit) || 10;
    const page = parseInt(data.page) || 1;

    
    const skip = (page - 1) * limit;

    // Build where conditions dynamically
    const where: Record<string, any> = {
      payment: true,
    };

    if (subcategoryId) where.subcategory = { slug: subcategoryId };
    if (categoryId) where.category = { slug: categoryId };
    if (secondcategoryId) where.secondcategory = { slug: secondcategoryId };
    

    // Handle postad_options dynamically
    if (subOptions && Array.isArray(subOptions) && subOptions.length > 0) {
      where.postad_options = {
        some: {
          optionValue: { in: subOptions }, // Filters ads with any matching option value
        },
      };
    } else if (subOptions) {
      where.postad_options = {
        some: {
          optionValue: subOptions, // Filters ads with a single matching option value
        },
      };
    }

    if (minPrice > 0 || maxPrice > 0) {
      where.price = {
        ...(minPrice ? { gte: minPrice } : {}),
        ...(maxPrice ? { lte: maxPrice } : {}),
      };
    }

    const result = await prisma.postad.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        subcategory: true,
        postad_photos: true,
        secondcategory:true
      },
    });

    const resultCount = await prisma.postad.count({ where });

    
    

    return NextResponse.json({ result, resultCount });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
