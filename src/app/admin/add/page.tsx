"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fromData = new FormData(e.currentTarget);
    const data = {
      name: fromData.get("name"),
      brand: fromData.get("brand"),
      category: fromData.get("category"),
      price: fromData.get("price"),
      socket: fromData.get("socket"),
      image: fromData.get("image") || "https://via.placeholder.com/400",
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to add product", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="conatiner mx-auto py-10 px-4 max-w-2xl">
      <Link
        href="/admin"
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" size={16} />
        Back to Admin
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
        </CardHeader>
      </Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อสินค้า (Model Name)</Label>
            <Input
              id="name"
              name="name"
              placeholder="เช่น Core i9-14900K"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">ยี่ห้อ (Brand)</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Intel, ASUS, etc."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">ราคา (บาท)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>หมวดหมู่</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CPU">CPU</SelectItem>
                  <SelectItem value="Mainboard">Mainboard</SelectItem>
                  <SelectItem value="GPU">Graphic Card</SelectItem>
                  <SelectItem value="RAM">Memory (RAM)</SelectItem>
                  <SelectItem value="PSU">Power Supply</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="socket">Socket (ถ้ามี)</Label>
              <Input id="socket" name="socket" placeholder="LGA1700, AM5..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" name="image" placeholder="https://..." />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 h-12 text-lg"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "บันทึกข้อมูลสินค้า"
            )}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}
