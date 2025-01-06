import { Prisma, PrismaClient } from "@prisma/client";
export async function POST(request: Request) {
  const prisma = new PrismaClient();

  if(request){
    const req = await request.json();

    if (!req.category) {
      return new Response("Category is required", { status: 400 });
    } else {
      try {
        const subcategories = await prisma.categories.findMany({
          where: {
            slug: req.category,
          },
          include: {
            subcategory:{
              include:{
                brand:true,
                categories:true,
                commercial:true,
                model:true,
                optionsubcategory:true,
                postads:true,
                secondcategory:true
              }
            },
          },
        });

        
  
        return new Response(JSON.stringify(subcategories), { status: 200 });
      } catch (error) {
        console.log(error);
        
        return new Response(
          JSON.stringify({ error: "Error retrieving subcategories" }),
          { status: 500 }
        );
      }
      finally {
        await prisma.$disconnect();
      }
    }
  }else{
    return new Response("Category is required", { status: 400 });
  }
  
}
