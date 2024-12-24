import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const id = await request.json();
  const prisma = new PrismaClient();

    
  try {
    const result = await prisma.favorites.create({
      data: {
        userId:id.userIdNew,
        postadId: id.id,
      },
    });

    return NextResponse.json({
      message: "You've Favorited This Ad!",
      result,
      status: true,
    });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: "Oops! Something Went Wrong", error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();

  const id = await request.json();

  const favorites = await prisma.favorites.findMany({
    where: {
      userId: id.userID,
    },
  });
  return NextResponse.json({ message: "Favorites Page",data:favorites, status: true });
}

export async function DELETE(request: NextRequest) {
  const id = await request.json();
  const prisma = new PrismaClient();


  

  try {
    const result = await prisma.favorites.delete({
      where: {
        userId: id.userIdNew,
        id: id.Fvdata,
      },
    });

    return NextResponse.json({
      message: "You've Remove This Ad from Favorite!",
      result,
      status: true,
    });
  } catch (error) {
  
    
    return NextResponse.json(
      { message: "Oops! Something Went Wrong", error },
      { status: 500 }
    );
  }

  
}
