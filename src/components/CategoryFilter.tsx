"use client"

import { Button } from "./ui/button"

const categories = ["All", "CPU", "Mainboard", "GPU", "RAM", "PSU", "Case"]

interface CategoryFilterProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
                <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className="rounded-full"
        >{category}</Button>
            ))}
        </div>
    )
}