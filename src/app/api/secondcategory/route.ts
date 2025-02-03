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


