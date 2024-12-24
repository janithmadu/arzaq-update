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
    const options = await prisma.option.findMany({
        where: {
          optionsubcategory: {
            some: {
              subcategory_id: Number(categoryId), // Match the specific subcategory ID
            },
          },
        },
        include: {
          optionsubcategory: true, // Include related subcategories
          optionvalue: true, // Include related option values
        },
      });

      

    return new Response(JSON.stringify(options), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error retrieving subcategories" }),
      { status: 500 }
    );
  }
}
