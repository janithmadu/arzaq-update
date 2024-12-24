import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();

  
  
  const prisma = new PrismaClient();

  const result = await prisma.postad.findUnique({
    where: {
      id: Number(data.id), // Replace adId with the actual ad ID you're querying
    },
    include: {
      category: true,
      subcategory: true,
      postad_features: true,
      postad_options: true,
      postad_photos: true,
      user: {
        // Include the related user based on userId
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          verifiedSeller: true,
          member: true,
          avatarUrl: true,
          userexid: true,
        },
      },
    },
  });

  return NextResponse.json(result,{status:200});
};
