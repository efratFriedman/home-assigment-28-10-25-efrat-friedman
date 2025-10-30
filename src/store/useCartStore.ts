import CartState from "@/types/CartState";
import { Product } from "@/types/Product";
import { create } from "zustand";

const saveToLocalStorage = (products: Product[], cartCount: number) => {
  localStorage.setItem("cart", JSON.stringify({ products, cartCount }));
};

const useCartStore = create<CartState>((set) => ({
  products: [],
  cartCount: 0,
  sum: 0,


  setProducts: (products) => {
    const cartCount = products.reduce((sum, p) => sum + p.quantity, 0);
    saveToLocalStorage(products, cartCount);
    set({ products, cartCount });
  },

  addItem: (product) =>
    set((state) => {
      const existing = state.products.find((p) => p.id === product.id);
      let updatedProducts: Product[];

      if (existing) {
        updatedProducts = state.products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedProducts = [...state.products, { ...product, quantity: 1 }];
      }

      const cartCount = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
      saveToLocalStorage(updatedProducts, cartCount);
      set({ sum: updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0) });
      return { products: updatedProducts, cartCount };
    }),

  removeItem: (id) =>
    set((state) => {
      const updatedProducts = state.products
        .map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0);
      const cartCount = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
      saveToLocalStorage(updatedProducts, cartCount);
      set({ sum: updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0) });
      return { products: updatedProducts, cartCount };
    }),

  deleteItem: (id) =>
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== id);
      const cartCount = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
      saveToLocalStorage(updatedProducts, cartCount);
      set({ sum: updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0) });
      return { products: updatedProducts, cartCount };
    }),

  resetCart: () => {
    localStorage.removeItem("cart");
    set({ products: [], cartCount: 0, sum: 0 });
  },

}));

if (typeof window !== "undefined") {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    useCartStore.setState(JSON.parse(savedCart));
  }
}

export default useCartStore;
