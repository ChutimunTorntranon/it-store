"use client";

import { useCart, CartItem } from "@/store/useCart";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartDrawer() {
  const { items, totalItems, removeItemByIndex } = useCart();

  const totalPrice = items.reduce(
    (sum: number, item: CartItem) => sum + item.price,
    0,
  );


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative gap-2 border-blue-200 hover:bg-blue-50 transition-all"
        >
          <ShoppingCart className="h-5 w-5 text-blue-600" />
          {/* Badge แสดงจำนวนสินค้า */}
          {totalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in">
              {totalItems()}
            </span>
          )}
          <span className="font-medium">ตะกร้า</span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-[400px] flex flex-col p-6">
        <SheetHeader className="space-y-1">
          <SheetTitle className="text-xl flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            สินค้าในตะกร้า ({totalItems()})
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        {/* ส่วนแสดงรายการสินค้า (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <ShoppingCart className="h-10 w-10 mb-2 opacity-20" />
              <p>ตะกร้ายังว่างอยู่นะ...</p>
            </div>
          ) : (
            items.map((item: CartItem, index: number) => (
              <div
                key={`${item.id}-${index}`} // ใช้ id คู่กับ index เพื่อความแม่นยำ
                className="flex gap-4 items-center bg-slate-50 p-3 rounded-lg border border-transparent hover:border-blue-100 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md bg-white border"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold truncate">
                    {item.name}
                  </h4>
                  <p className="text-sm text-blue-600 font-bold mt-1">
                    ฿{item.price.toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                  onClick={() => removeItemByIndex(index)} // ใช้ removeItemByIndex แทน removeItem
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* ส่วนสรุปราคา (แสดงเมื่อมีสินค้าเท่านั้น) */}
        {items.length > 0 && (
          <div className="pt-6 space-y-4">
            <Separator />
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-muted-foreground font-medium text-base">
                ราคาสุทธิ
              </span>
              <span className="text-blue-600 text-2xl">
                ฿{totalPrice.toLocaleString()}
              </span>
            </div>
            <SheetFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-semibold rounded-xl">
                ไปที่หน้าชำระเงิน
              </Button>
            </SheetFooter>
            <p className="text-center text-xs text-muted-foreground">
              เลือกสินค้าต่อ หรือไปที่หน้าชำระเงินเพื่อยืนยันคำสั่งซื้อ
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
