"use client";

import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import CartModal from "@/components/CartModal/CartModal";
import styles from "./Header.module.css";

export default function Header() {
  const cartCount = useCartStore((state) => state.cartCount);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/imgs/logo.png" alt="Logo" style={{ height: "40px" }} />
        </div>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/products/men's clothing">Mens</Link>
          <Link href="/products/women's clothing">Womens</Link>
          <Link href="/products/jewelery">Jewelery</Link>
          <Link href="/products/electronics">Electronics</Link>
          <Link href="/contact">Contact Us</Link>
          {/* <Link href="/checkout">Check out</Link> */}
        </nav>

        <div
          className={styles.cart}
          style={{ cursor: "pointer" }}
          onClick={() => setIsCartOpen(true)}
        >
          🛒 Cart: {cartCount} items
        </div>
      </header>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
