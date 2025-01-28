import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(reqest: Request) {
  const prisma = new PrismaClient();

  try {
    const addata = await reqest.json();
;

    if(addata.id == addata.CldId){
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
  
      const deletefomrCloudnary = await cloudinary.uploader.destroy(
        addata.CldId
      );

      return NextResponse.json(deletefomrCloudnary, { status: 200 });
    }
    else{

      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
  
      const deletefomrCloudnary = await cloudinary.uploader.destroy(
        addata.CldId
      );
      
  
      const deleteFromDatabase = await prisma.postad_photos.delete({
        where: {
          id: parseInt(addata.id),
        },
      });
      return NextResponse.json(deleteFromDatabase, { status: 200 });
    }

    

    

   
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
