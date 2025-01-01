import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const dadta = await request.json();

    const prisma = new PrismaClient();

    const postAd = await prisma.postad.findUnique({
      where: {
        id: Number(dadta.AdID),
      },
    });

    if (postAd) {
      return NextResponse.json(postAd, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "PostAd not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const prisma = new PrismaClient();

    const result = await prisma.postad.findMany({
      where: {
        payment: true,
      },
      include: {
        postad_features: true,
        postad_options: true,
        postad_photos: true,
        category: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const resultCount = result.length;
    if (result) {
      return NextResponse.json({ result, resultCount }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "PostAd not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const addata = await request.json();
  const prisma = new PrismaClient();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const {
    name,
    category,
    subcategory,
    brands,
    conditions,
    Currency,
    price,
    authenticity,
    MobileNumbe,
    description,
    country,
    state,
    options,
    images,
    featurs,
    model,
    negotiable,
  } = addata;

  const OptionJson = options.map((data: any) => JSON.parse(data as any));

  try {
    const updatedPostAd = await prisma.postad.update({
      where: {
        id: addata.adid, // Specify the ID of the postad to update
      },
      data: {
        adName: name,
        price: price,
        categoryId: category,
        description: description,
        phoneNumber: MobileNumbe,
        location: "Updated Location",
        subcategoryId: subcategory,
        brand: brands,
        model: model,
        condition: conditions,
        currency: Currency,
        authenticity: authenticity,
        country: country,
        state: state,
        negotiable: negotiable,
        postad_features: {
          deleteMany: {}, // Remove existing features if needed
          create: featurs,
        },
        postad_options: {
          deleteMany: {}, // Remove existing options if needed
          create: OptionJson,
        },
        postad_photos: {
          deleteMany: {}, // Remove existing photos if needed
          create: images.map(
            (image: { photoUrl: string; altText: string }) => ({
              photoUrl: image.photoUrl,
              altText: image.altText,
            })
          ),
        },
      },
    });

 
  } catch (error) {
   
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json("test");
}
