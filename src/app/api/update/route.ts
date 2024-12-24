import { client } from "@/lib/sanity";
import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma, PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
  const id = await request.json();
  const prisma = new PrismaClient();


 
  
  try {
    // Patch the document with the specified ID and set payment to true

    const { getAccessToken } = getKindeServerSession();
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }



    // const result = await client.patch(id.AdID).set({ payment: true }).commit();

    const result = await prisma.postad.update({
      where: {
        id: Number(id.AdID),
      },
      data: {
        payment: true,
      },
    });

    return NextResponse.json({
      message: "Payment status updated successfully",
      result,
      status: true,
    });
  } catch (error) {
    
    
    return NextResponse.json(
      { message: "Failed to update payment status", error },
      { status: 500 }
    );
  }
}

