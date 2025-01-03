
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async ()=>{

    const logodata = await prisma.store.findFirst({
        select:{
            id:true,
            logo:true,
            name:true

        }
    })

     if(!logodata){
        return NextResponse.json({ status: 404, message: "Logo data not found" }) 
     }
     
     return NextResponse.json({ status: 200, message: "Logo data found", logodata})
}