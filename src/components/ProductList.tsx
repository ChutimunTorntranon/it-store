"use client"

import { useState } from "react";
import { Product } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge"; 
import CategoryFilter from "./CategoryFilter";

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Logic filter products by category
    const filteredProducts = selectedCategory === "All" 
    ? initialProducts 
    : initialProducts.filter(p => p.category === selectedCategory)
    console.log(filteredProducts)

    return (
        <>
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
                <Card key={product.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                   <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
               <span className="text-slate-400">Image</span>
               <Badge className="absolute top-2 left-2">{product.category}</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">฿{product.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">เพิ่มลงตะกร้า</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        </>
    )
}