import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const products = await prisma.product.findMany({
    where: {
      category: category || undefined,
    }
});
    return NextResponse.json(products);
}