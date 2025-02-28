// /app/api/category/price/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Update with your actual prisma path

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const categoryId = await request.json();

    if (!categoryId) {
      return NextResponse.json(
        { error: "categoryId is required" },
        { status: 400 }
      );
    }

    // Fetch category price from database using Prisma
    const category = await prisma.categories.findUnique({
      where: { id: categoryId.ID },
      select: { price: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Respond with the category price
    return NextResponse.json({ price: category.price }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const category = await prisma.categories.findMany({
      select: {
        ad_count: true,
        created_at: true,
        description_ar: true,
        description_en: true,
        id: true,
        image_url: true,
        position: true,
        postads: {
          include:{
            ad_views:true,
            category:true,
            favorites:true,
            postad_features:true,
            postad_options:true,
            postad_photos:true,
            subcategory:true,
            user:true
          }
        },
        price: true,
        slug: true,
        subcategory: true,
        title_ar: true,
        title_en: true,
        updated_at: true,
        _count: true,
      },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
