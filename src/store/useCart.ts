import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  removeItemByIndex: (index: number) => void; // ฟังก์ชันใหม่สำหรับลบโดย index
  totalItems: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => {
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newItems = [...state.items];
        newItems.splice(index, 1);
        return { items: newItems };
      }
      return { items: state.items };
    }),
  // ใน useCart.ts
  removeItemByIndex: (index: number) =>
    set((state) => {
      const newItems = [...state.items];
      newItems.splice(index, 1);
      return { items: newItems };
    }),
  totalItems: () => get().items.length,
}));
