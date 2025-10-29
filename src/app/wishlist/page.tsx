"use client";

import useWishlistStore from "@/store/useWishListStore";
import styles from "./WishlistPage.module.css";
import { useRouter } from "next/navigation";
import { AiFillHeart } from "react-icons/ai";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const router = useRouter();

  if (wishlist.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your wishlist is empty 💔</h2>
        <button onClick={() => router.push("/")}>Go Shopping</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Wishlist</h1>
      <div className={styles.grid}>
        {wishlist.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
              onClick={() =>
                router.push(`/products/${product.category}/${product.id}`)
              }
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <button
              type="button"
              className={styles.wishlistButton}
              onClick={() => removeFromWishlist(product.id)}
              title="Remove from wishlist"
            >
              <AiFillHeart color="red" size={26} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
