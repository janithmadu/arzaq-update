import { CheckUserLog } from "@/app/[locale]/actions/ChekAuth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const prisma = new PrismaClient();

  const id = await request.json();

  console.log(id);
  

  if (!id.userIdNew || !id.id) {
    return NextResponse.json({ message: "Favorites Page", status: false })
  }

  const favoriteAd = await prisma.favorites.findFirst({
    where: {
      userId: id.userIdNew, // Replace with the actual userId
      postadId: id.id, // Replace with the actual postadId
    },
    include: {
      postad: true, // Include details of the ad
    },
  });

  if (favoriteAd) {
    return NextResponse.json({ message: "Favorites Page", data: favoriteAd, status: true })
  }

  return NextResponse.json({ message: "Favorites Page", status: false })

}