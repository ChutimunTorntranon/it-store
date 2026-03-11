import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(request: Request){
    try{
        const body = await request.json();
        const product = await prisma.product.create({
            data:{
                name: body.name,
                brand: body.brand,
                category: body.category,
                price:body.price,
                socket: body.socket|| null,
                image:body.image,
            }
        })
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({error: "Failed to add product"}, {status: 500})
    }
}