// app/api/ad-views/[adId]/route.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { adId: string } }) {
    console.log(params.adId);
    
    const adId = parseInt(params.adId);

   
   

    try {
        // Check if an entry for this ad exists in the ad_views table
        const existingView = await prisma.ad_views.findFirst({
            where: { postadId: adId },
        });

        if (existingView) {
            // If the ad view entry exists, increment the view count
            await prisma.ad_views.update({
                where: { id: existingView.id }, // Use the unique `id` field
                data: {
                    viewCount: {
                        increment: 1,
                    },
                    updatedAt: new Date(),
                },
            });
        } else {
            // If no entry exists for this ad, create a new one with viewCount = 1
            await prisma.ad_views.create({
                data: {
                    postadId: adId,
                    viewCount: 1,
                },
            });
        }

        return new Response(JSON.stringify({ message: 'View count updated successfully' }), {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Failed to update view count', error }), {
            status: 500,
        });
    }
    finally {
        await prisma.$disconnect();
      }
}
