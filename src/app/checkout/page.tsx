"use client";

import { useEffect, useState } from "react";
import useCartStore, { Product } from "@/store/useCartStore";
import CheckoutProduct from "@/components/Checkout/CheckoutProduct/CheckoutProduct";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary/CheckoutSummary";
import styles from "@/app/checkout/Checkout.module.css";

export default function CheckoutPage() {
  const { products, addItem, removeItem, deleteItem, resetCart } = useCartStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    setTotal(sum);
  }, [products]);

  if (products.length === 0) return <p className={styles.empty}>Your cart is empty.</p>;

  const handleCompleteOrder = () => {
    alert("Order completed!");
    resetCart();
  };

  return (
    <div className={styles.container}>
      <h2>Checkout</h2>

      <div className={styles.productList}>
        {products.map((p) => (
          <CheckoutProduct
            key={p.id}
            product={p}
            onAdd={() => addItem(p)}
            onRemove={() => removeItem(p.id)}
            onDelete={() => deleteItem(p.id)}
          />
        ))}
      </div>

      <CheckoutSummary total={total} onClear={resetCart} />

      <button className={styles.completeButton} onClick={handleCompleteOrder}>
        Complete Order
      </button>
    </div>
  );
}
