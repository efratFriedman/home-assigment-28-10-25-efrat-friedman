// src/app/checkout/CheckoutPage.tsx (Unchanged from your prompt, using new CSS)

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
    // The sum calculation remains the same
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
      {/* Heading is styled to separate "Order" and "Summary" */}
      <h2>Order <span style={{ color: '#ffa500' }}>Summary</span></h2> 
      {/* The in-line span for "Summary" color overrides the H2 color just for that word */}
      
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
      
      {/* This summary section contains the total and will be aligned with the button */}
      <div className={styles.summaryRow}>
          <CheckoutSummary total={total} onClear={resetCart} />
          <button className={styles.completeButton} onClick={handleCompleteOrder}>
            Complete Order
          </button>
      </div>

    </div>
  );
}