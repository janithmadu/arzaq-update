import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export const POST =async (req:Request)=>{
    const prisma = new PrismaClient();
    const Id = req.json()


    
   
    try {
        const viewCount = await prisma.ad_views.findMany({
            where:{
                postadId:Number(Id)
            }
        })

        if(!viewCount){
            return new Response(JSON.stringify({ message: 'No Ads Fount' }), {
                status: 404,
            });
        }
        return new Response(JSON.stringify({ message: 'Ads Found',viewCount }), {
            status: 200,
        })
        
    } catch (error) {
        
    }
}