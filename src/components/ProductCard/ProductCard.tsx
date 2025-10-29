"use client";

import styles from "@/components/ProductCard/ProductCard.module.css";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import useWishlistStore from "@/store/useWishListStore";
import CardProps from "@/types/CardProps";
import { useRouter } from "next/navigation";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";



export default function ProductCard({ id, title, price, description, category, image }: CardProps) {
  const router = useRouter();

  const { products, addItem } = useCartStore();
  const productInCart = products.find((p) => p.id === id);
  const quantity = productInCart?.quantity || 0;

  const setSelectedProduct = useProductStore((state) => state.setSelectedProduct);

  const inWishlist = useWishlistStore((state) => state.wishlist.some((p) => p.id === id));
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  const toggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (inWishlist) removeFromWishlist(id);
    else addToWishlist({ id, title, price, description, category, image, quantity: 1 });
  };

  const handleCardClick = () => {
    setSelectedProduct({ id, title, price, description, category, image, quantity: 1 });
    router.push(`/products/${category}/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: "pointer", position: "relative" }}>
      
      <div style={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
        <button type="button" className={styles.wishlistButton} onClick={toggleWishlist}>
          {inWishlist ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </button>
      </div>

      <div className={styles.image}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.category}>{category}</p>
      <p className={styles.price}>${price}</p>
      <p className={styles.description}>{description}</p>

      <button
        type="button"
        className={styles.addButton}
        onClick={(e) => {
          e.stopPropagation();
          addItem({ id, title, description, price, category, image, quantity: 1 });
        }}
      >
        {quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
      </button>
    </div>
  );
}
