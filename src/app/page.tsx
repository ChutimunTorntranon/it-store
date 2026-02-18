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
import { Car } from "lucide-react";

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="container mx-auto py-10 px-4">
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">อุปกรณ์คอมพิวเตอร์</h1>
        <p className="text-lg text-muted-foreground">
          เลือก สินค้า IT คณุภาพสูง พร้อมบริการจัดสเปคให้
        </p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
                  <span className="text-slate-400">No Image</span>
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {product.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {product.price.toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}
                  </p>
                </CardContent>
              </div>
              <CardFooter className="pt-0">
                <Button className="w-full" variant="outline" size="sm">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-20 border-2 border-dashed rounded-xl">
            <p className="text-muted-foreground">ไม่มีสินค้าในขณะนี้</p>
          </div>
        )}
      </div>
    </div>
  );
}
