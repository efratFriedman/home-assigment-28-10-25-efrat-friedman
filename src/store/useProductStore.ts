import { Product } from "@/types/Product";
import ProductState from "@/types/ProductState";
import { create } from "zustand";
import { persist } from "zustand/middleware";





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
