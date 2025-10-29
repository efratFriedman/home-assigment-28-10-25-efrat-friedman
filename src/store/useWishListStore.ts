import { create } from "zustand";
import { persist } from "zustand/middleware";
import WishlistState from "@/types/WishlistState";

const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      addToWishlist: (product) =>
        set((state) => ({ wishlist: [...state.wishlist, product] })),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((p) => p.id !== id),
        })),
      isInWishlist: (id) => get().wishlist.some((p) => p.id === id),
    }),
    {
      name: "wishlist-storage", 
    }
  )
);

export default useWishlistStore;
