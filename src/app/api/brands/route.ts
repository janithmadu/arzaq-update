import { Prisma, PrismaClient } from "@prisma/client";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("categoryId");
  const prisma = new PrismaClient();
  if (!categoryId) {
    return new Response(JSON.stringify({ error: "categoryId is required" }), {
      status: 400,
    });
  }

  try {
    const brands = await prisma.brand.findMany({
      where: {
        subcategory_id: Number(categoryId),
      },
    });

  

  
    

    return new Response(JSON.stringify(brands), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error retrieving subcategories" }),
      { status: 500 }
    );
  }
}
