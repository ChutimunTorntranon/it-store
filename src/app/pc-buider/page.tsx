"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Product } from "@prisma/client";
import ProductSelectModal from "@/components/ProductSelectModal";
const specSteps = [
 { id: "cpu", name: "เลือก CPU", icon: "🧠", dbCategory: "CPU" },
  { id: "mb", name: "เลือก Mainboard", icon: "🔌", dbCategory: "Mainboard" },
  { id: "gpu", name: "เลือก Graphic Card", icon: "🎮", dbCategory: "GPU" },
  { id: "ram", name: "เลือก Memory (RAM)", icon: "⚡", dbCategory: "RAM" },
  { id: "psu", name: "เลือก Power Supply", icon: "🔋", dbCategory: "PSU" },
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

  const handleOpenModal = (categoryId: string) => {
    const category = specSteps.find((s) => s.id === categoryId)?.dbCategory || "";
    setActiveCategory(categoryId);
    setIsModalOpen(true);
  };

 return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center tracking-tight text-slate-900">
        Set Spec For You
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* รายการเลือกอุปกรณ์ */}
        <div className="lg:col-span-4 space-y-3">
          {specSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center justify-between p-3 border rounded-xl bg-white shadow-sm hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-lg text-2xl shadow-inner">
                  {step.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{step.name}</p>
                  <p className="font-semibold text-sm text-slate-700">
                    {selectedItems[step.id]?.name || "ยังไม่ได้เลือก"}
                  </p>
                  {selectedItems[step.id] && (
                    <p className="text-xs font-bold text-blue-600">
                      ฿{selectedItems[step.id]?.price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {selectedItems[step.id] ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => setSelectedItems({ ...selectedItems, [step.id]: null })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  onClick={() => handleOpenModal(step.id)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* ราคารวมและสรุปผล */}
        <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-8 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
          <div className="text-center space-y-2">
            <p className="text-slate-500 font-medium">ราคารวมสุทธิทั้งหมด</p>
            <h2 className="text-7xl font-black text-slate-900 tracking-tighter">
              <span className="text-4xl mr-1 text-slate-400 font-normal">฿</span>
              {totalPrice.toLocaleString()}
            </h2>
            <div className="pt-6">
              <Button
                size="lg"
                className="w-full md:w-80 bg-blue-600 hover:bg-blue-700 text-lg font-bold h-14 shadow-xl shadow-blue-200 rounded-2xl transition-all active:scale-95"
                disabled={totalPrice === 0}
              >
                ยืนยันการสั่งซื้อสเปคนี้
              </Button>
            </div>
          </div>

          {/* Visual Summary: เรียงตาม specSteps เพื่อลำดับที่แน่นอน */}
          <div className="grid grid-cols-5 gap-3 mt-12">
            {specSteps.map((step) => (
              <div
                key={step.id}
                title={step.name}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                  selectedItems[step.id] 
                  ? "border-blue-500 bg-blue-50 text-blue-600 shadow-sm" 
                  : "border-slate-200 bg-white text-slate-300"
                }`}
              >
                {selectedItems[step.id] ? "✅" : step.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* เรียกใช้งาน Modal */}
      <ProductSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={specSteps.find(s => s.id === activeCategory)?.dbCategory || ""}
        onSelect={(product) =>
          setSelectedItems({ ...selectedItems, [activeCategory]: product })
        }
      />
    </div>
  );
}
