import { Prisma, PrismaClient } from "@prisma/client";
export async function GET(request: Request) {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');
    const prisma = new PrismaClient();
  const result = await prisma.postad.findMany({
    where: {
      categoryId: Number(categoryId), // Filter by categoryId
      payment:true      
    },
    include: {
      category: true, // Optional: Include category details
      subcategory: true, // Optional: Include subcategory details
      user: true, // Optional: Include user details
      postad_photos: true, // Optional: Include photos
      postad_features: true, // Optional: Include features
      postad_options: true, // Optional: Include options
    },
  });

  return new Response(JSON.stringify(result), { status: 200 });

  
}