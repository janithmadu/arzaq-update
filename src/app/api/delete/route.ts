import { client } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { id } = await request.json();
  const prisma = new PrismaClient();

  try {
  
    const post = await prisma.postad.findUnique({ where: { id:id } });
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
    else{
      const delteFavories =  await prisma.ad_views.deleteMany({where:{postadId:id}})
      const deleteAds = await prisma.postad.delete({ where: { id:id } });
      console.log(deleteAds);
      
      return new Response('Post deleted', { status: 200 });
    }
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: "Failed to delete ad", error: error },
      { status: 500 }
    );
  }
  finally {
    await prisma.$disconnect();
  }
}
