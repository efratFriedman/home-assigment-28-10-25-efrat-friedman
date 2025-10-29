"use client";

import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import useWishlistStore from "@/store/useWishListStore";
import Link from "next/link";
import CartModal from "@/components/CartModal/CartModal";
import styles from "./Header.module.css";
import { AiOutlineHeart } from "react-icons/ai"; // לב ריק

export default function Header() {
  const cartCount = useCartStore((state) => state.cartCount);
  const wishlistCount = useWishlistStore((state) => state.wishlist.length);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/imgs/logo.png" alt="Logo" style={{ height: "40px" }} />
        </div>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/products/men">Mens</Link>
          <Link href="/products/women">Womens</Link>
          <Link href="/products/jewelery">Jewelery</Link>
          <Link href="/products/electronics">Electronics</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>

        <div className={styles.actions}>
          <div className={styles.icons}>
            <Link href="/wishlist" className={styles.wishlist}>
              <AiOutlineHeart size={22} color="black" />
            </Link>

            <div
              className={styles.cart}
              onClick={() => setIsCartOpen(true)}
            >
              🛒 {cartCount} items
            </div>
          </div>
        </div>
      </header>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
