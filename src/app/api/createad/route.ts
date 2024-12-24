import { client } from "@/lib/sanity";
import { FormType, SchemaAdPostForm } from "@/lib/schemas";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

interface Option {
  optionKey: string;
  optionValue: string;
}

export async function POST(reqest: Request) {
  const addata = await reqest.json();
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
    mobileNumbe,
    description,
    country,
    state,
    options,
    images,
    featurs,
    model,
  } = addata;
  const categoryData = JSON.parse(category);
  const OptionJson = options.map((data: Option) => JSON.parse(data as any));

  const newPostAd = await prisma.postad.create({
    data: {
      adName: name,
      category: { connect: { id: Number(categoryData.id) } }, // Connect category by ID
      subcategory: { connect: { id: Number(subcategory) } }, // Connect subcategory by ID
      brand: brands,
      model: model,
      condition: conditions,
      currency: Currency,
      authenticity: authenticity,
      price: price,
      negotiable: true,
      description: description,
      phoneNumber: mobileNumbe,
      country: country,
      state: state,
      user: { connect: { userexid: user.id } }, // Connect user by ID
      payment: false,
      postad_features: {
        create: featurs,
      },
      postad_options: {
        create: OptionJson.map(
          (option: { optionKey: string; optionValue: string }) => ({
            optionKey: option.optionKey,
            optionValue: option.optionValue,
          })
        ),
      },
      postad_photos: {
        create: images.map((image: { photoUrl: string; altText: string }) => ({
          photoUrl: image.photoUrl,
          altText: image.altText,
        })),
      },
    },
  });

  
  

  return NextResponse.json({ success: true, res: newPostAd });





}
const prisma = new PrismaClient();
export async function GET(reqest: Request) {
  const ads = await prisma.postad.findMany({
    include: {
      postad_features: true, // Include features
      postad_options: true,  // Include options
      postad_photos: true,   // Include photos
    },
  });



}
