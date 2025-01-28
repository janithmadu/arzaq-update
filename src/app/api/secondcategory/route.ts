import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const prisma = new PrismaClient();

  if(request){
    const req = await request.json();
    
    

    if (!req.subcategoryPrams) {
      return new Response("Category is required", { status: 400 });
    } else {
      try {
        const Secondcategories = await prisma.secondcategory.findMany({
          where: {
            subcategory:{
              slug:req.subcategoryPrams
            }
          }
        });



        
  
        return new Response(JSON.stringify(Secondcategories), { status: 200 });
      } catch (error) {
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


export async function GET(request: Request) {
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');
    const prisma = new PrismaClient();
    if (!categoryId) {
        return new Response(JSON.stringify({ error: 'categoryId is required' }), { status: 400 });
    }
    

    try {
        const result = await prisma.secondcategory.findMany({
            where: {
                subcategory_id:Number(categoryId),
            },
        });

  
        

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error retrieving subcategories' }), { status: 500 });
    }
    finally {
      await prisma.$disconnect();
    }
}