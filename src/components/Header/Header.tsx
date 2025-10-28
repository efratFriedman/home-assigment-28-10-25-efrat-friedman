"use client";

import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import styles from "@/components/Header/Header.module.css"
export default function Header() {
    const cartCount = useCartStore((state) => state.cartCount);

    return (<>
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src="/imgs/logo.png" alt="Shop Logo" className={styles.logoIcon} />
            </div>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/products/mens">Mens</Link>
                <Link href="/products/womens">Womens</Link>
                <Link href="/products/jewelery">Jewelery</Link>
                <Link href="/products/electronics">Electronics</Link>
                <Link href="/contact">Contact Us</Link>
                 <Link href="/checkout">Check out</Link>
            </nav>

            <div className={styles.cart}>
                🛒 Cart: {cartCount} items
            </div>
        </header>
    </>)
}