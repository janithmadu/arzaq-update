import { PrismaClient } from "@prisma/client"; // Update with your actual prisma path
import { NextResponse } from "next/server";

export async function GET() {
    const prisma = new PrismaClient();

    try {
        const adscount = await prisma.postad.count({
            where: {
                payment: true, 
            },
        });

        const verifyusers = await prisma.users.count({
            where: {
                verifiedSeller: true, 
            },
        });

        const CommercialAds = await prisma.commercial.count();


       
        return NextResponse.json({ status: 200,ads:adscount,verifiedUsers:verifyusers,CommercialAds:CommercialAds });

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }



}
