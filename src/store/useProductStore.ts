import { Product } from "@/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface ProductState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearProduct: () => void;
}

const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product: Product) => set({ selectedProduct: product }),
      clearProduct: () => set({ selectedProduct: null }),
    }),
    {
      name: "selected-product", 
    }
  )
);

export default useProductStore;
