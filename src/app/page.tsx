import { PrismaClient } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Link } from "lucide-react";
import ProductList from "@/components/ProductList";

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          อุปกรณ์คอมพิวเตอร์
        </h1>
        <p className="text-lg text-muted-foreground">
          เลือก สินค้า IT คณุภาพสูง พร้อมบริการจัดสเปคให้
        </p>
      </section>
      <ProductList initialProducts={products} />
      <Link href="/pc-builder" className="block mb-12">
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center flex flex-col md:flex-row itemscenter justify-between hover:shadow-2xl transition-all group
      "
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">จัดสเปคกันเลย</h2>
            <p className="text-lg opacity-90">
              บริการจัดสเปคคอมพิวเตอร์ตามความต้องการของคุณ
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 justify-center">
            <Button variant="outline" size="lg" className="gap-2">
              <Car className="h-5 w-5" />
              เริ่มจัดสเปค
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
