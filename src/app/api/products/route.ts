import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const socket = searchParams.get("socket");
  const products = await prisma.product.findMany({
    where: {
      category: category || undefined,
      ...(socket && { socket: socket }),
    }
});
    return NextResponse.json(products);
}