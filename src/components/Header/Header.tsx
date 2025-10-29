"use client";

import { useState } from "react";
import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartModal from "@/components/CartModal/CartModal";
import styles from "./Header.module.css";
import { AiOutlineHeart } from "react-icons/ai";

export default function Header() {
  const cartCount = useCartStore((state) => state.cartCount);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products/men", label: "Mens" },
    { href: "/products/women", label: "Womens" },
    { href: "/products/jewelery", label: "Jewelery" },
    { href: "/products/electronics", label: "Electronics" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/imgs/logo.png" alt="Logo" style={{ height: "40px", cursor: "pointer" }} />
          </Link>
        </div>

        <nav className={styles.nav}>
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <div className={styles.icons}>
            <Link href="/wishlist" className={styles.wishlist}>
              <AiOutlineHeart size={22} color="black" />
            </Link>

            <div className={styles.cart} onClick={() => setIsCartOpen(true)}>
              🛒 {cartCount} items
            </div>
          </div>
        </div>
      </header>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </>
  );
}
