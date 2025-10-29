"use client";

import { useRouter, useParams } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import useProductStore from "@/store/useProductStore";
import { useEffect, useState } from "react";
import styles from "./ProductPage.module.css";
import { Product } from "@/types/Product";

export default function ProductPage() {
    const router = useRouter();
    const { category } = useParams() as { category: string };
    const selectedProduct = useProductStore((state) => state.selectedProduct);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const cartProducts = useCartStore((state) => state.products);

    const [product, setProduct] = useState<Product | null>(selectedProduct);

    useEffect(() => {
        if (!product && selectedProduct) setProduct(selectedProduct);
    }, [selectedProduct, product]);

    if (!product) return <p>Loading...</p>;

    const productInCart = cartProducts.find((p) => p.id === product.id);
    const quantity = productInCart?.quantity || 0;

    const handleAdd = () => addItem({ ...product, quantity: 1 });
    const handleRemove = () => removeItem(product.id);

    return (
        <div className={styles.container}>
            <button
                className={styles.backBtn}
                onClick={() => router.push(`/products/${category}`)}
            >
                ← Back to {category}
            </button>

            <div className={styles.card}>
              <img
                    src={product.image}
                    alt={product.title}
                    className={styles.productImage} 
                />

                <div className={styles.details}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <p className={styles.categoryName}>{category.toUpperCase()}</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.price}>PRICE: {product.price}$</p>

                    <div className={styles.cartControls}>
                        <button
                            className={styles.addButton}
                            onClick={(e) => {
                                e.stopPropagation();
                                addItem({ ...product, quantity: 1 });

                            }}
                        >
                            {quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
