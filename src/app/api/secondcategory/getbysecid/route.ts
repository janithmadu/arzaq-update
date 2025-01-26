import { PrismaClient } from "@prisma/client";

export const GET = async (request: Request) => {
  const prisma = new PrismaClient();
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("categoryId");

  if (!categoryId) {
    return new Response(JSON.stringify({ error: "categoryId is required" }), {
      status: 400,
    });
  }

  try {
    const result = await prisma.secondcategory.findFirst({
      where: {
        subcategory_id: Number(categoryId),
      },
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error retrieving subcategories" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
