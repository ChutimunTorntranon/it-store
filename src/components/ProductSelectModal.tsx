"use client";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
// import { ScrollArea } from "radix-ui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSelect: (product: Product) => void;
}

export default function ProductSelectModel({
  isOpen,
  onClose,
  category,
  onSelect,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && category) {
      setLoading(true);
      fetch(`/api/products?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        });
    }
  }, [isOpen, category]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            เลือกสินค้าในหมวด {category.toUpperCase()}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] mt-4 pr-4">
          {loading ? (
            <p className="text-center py-10">กำลังโหลดข้อมูล...</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50"
                >
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-blue-600">
                      ฿{product.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      onSelect(product);
                      onClose();
                    }}
                  >
                    เลือกรายการนี้
                  </Button>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-center py-10 text-muted-foreground">
                  ไม่พบสินค้าในหมวดหมู่นี้
                </p>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
