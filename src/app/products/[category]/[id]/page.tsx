"use client";

import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import useWishlistStore from "@/store/useWishListStore";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "./ProductPage.module.css";
import { Product } from "@/types/Product";

export default function ProductPage() {
  const router = useRouter();

  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const addItem = useCartStore((state) => state.addItem);
  const cartProducts = useCartStore((state) => state.products);

  const inWishlist = useWishlistStore((state) =>
    state.wishlist.some((p) => p.id === selectedProduct?.id)
  );
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  const [product, setProduct] = useState<Product | null>(selectedProduct);

  useEffect(() => {
    if (!product && selectedProduct) setProduct(selectedProduct);
  }, [selectedProduct, product]);

  if (!product) return <p>Loading...</p>;

  const productInCart = cartProducts.find((p) => p.id === product.id);
  const quantity = productInCart?.quantity || 0;

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist({ ...product, quantity: 1 });
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => router.back()}>
        ← Back to {product.category}
      </button>

      <div className={styles.card}>
        <img src={product.image} alt={product.title} className={styles.productImage} />

        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.categoryName}>{product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>PRICE: {product.price}$</p>

          <div className={styles.cartControls} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              className={styles.addButton}
              onClick={(e) => {
                e.stopPropagation();
                addItem({ ...product, quantity: 1 });
              }}
            >
              {quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
            </button>

            <button
              type="button"
              className={styles.wishlistButton}
              onClick={toggleWishlist}
            >
              {inWishlist ? <AiFillHeart color="red" size={24} /> : <AiOutlineHeart size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
