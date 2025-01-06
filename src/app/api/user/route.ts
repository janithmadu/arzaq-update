import { GetUsers } from "@/app/[locale]/actions/usersAction";
import { client } from "@/lib/sanity";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await GetUsers(userId); // Call your server action

    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
  
}

export async function PATCH(req: Request) {
  const prisma = new PrismaClient();
  const addata = await req.json();
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  try {
    const updatedUser = await prisma.users.update({
      where: {
        userexid: user.id, // Replace with the user's ID you want to update
      },
      data: {
        name: addata.data.name,
        email: addata.data.email,
        avatarUrl: addata?.images,
      },
    });

   
  } catch (error) {
  
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(addata);
}
