"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Product } from "@prisma/client";
import ProductSelectModal from "@/components/ProductSelectModal";
const specSteps = [
  { id: "cpu", name: "เลือก CPU", icon: "🧠" },
  { id: "mb", name: "เลือก Mainboard", icon: "🔌" },
  { id: "gpu", name: "เลือก Graphic Card", icon: "🎮" },
  { id: "ram", name: "เลือก Memory (RAM)", icon: "⚡" },
  { id: "psu", name: "เลือก Power Supply", icon: "🔋" },
];

export default function PCBuildPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, Product | null>
  >({
    cpu: null,
    mb: null,
    gpu: null,
    ram: null,
    psu: null,
  });
  const totalPrice = Object.values(selectedItems).reduce((sum, item) => {
    return sum + (item?.price || 0);
  }, 0);

  const handleOpenModal = (category: string) => {
    setActiveCategory(category);
    setIsModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    const stepId =
      specSteps.find((step) => step.name.includes(product.category))?.id ||
      activeCategory.toLowerCase();
    setSelectedItems({ ...selectedItems, [activeCategory]: product });
  };
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Set Spec For you</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          {specSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-md text-xl">
                  {step.icon}
                </div>
                <div className="">
                  <p className="text-xs text-muted-foreground">{step.name}</p>
                  <p className="font-semibold text-sm">
                    {selectedItems[step.id]?.name || "ยังไม่ได้เลือก"}
                  </p>
                  {selectedItems[step.id] && (
                    <p className="text-xs text-blue-600 font-bold">
                      ฿{selectedItems[step.id]?.price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              {selectedItems[step.id] ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() =>
                    setSelectedItems({ ...selectedItems, [step.id]: null })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => handleOpenModal(step.id)}
                >
                  ...
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="lg:col-span-8 bg-slate-50 rounded-2xl p-8 border-2 border-dashed flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 font-medium">ราคารวมทั้งหมด</p>
            <h2 className="text-6xl font-black text-blue-600 my-4">
              ฿{totalPrice.toLocaleString()}
            </h2>
            <Button
              size="lg"
              className="w-full md:w-64 bg-orange-500 hover:bg-orange-600 text-lg font-bold"
            >
              สั่งซื้อสเปคนี้
            </Button>
          </div>

          {/* พื้นที่โชว์ไอคอนอุปกรณ์ที่เลือกแล้ว (Visual Summary) */}
          <div className="grid grid-cols-5 gap-4 mt-12">
            {Object.entries(selectedItems).map(([key, item]) => (
              <div
                key={key}
                className={`w-16 h-16 rounded-lg flex items-center justify-center border-2 ${item ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
              >
                {item ? "✅" : "❓"}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={activeCategory.toUpperCase()}
        onSelect={(product) =>
          setSelectedItems({ ...selectedItems, [activeCategory]: product })
        }
      />
    </div>
  );
}
