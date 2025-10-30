"use client";

// import { useEffect, useState } from "react";
import useCartStore from "@/store/useCartStore";
import CheckoutProduct from "@/components/Checkout/CheckoutProduct/CheckoutProduct";
import CheckoutSummary from "@/components/Checkout/CheckoutSummary/CheckoutSummary";
import styles from "@/app/checkout/Checkout.module.css";

export default function CheckoutPage() {
  const { products, addItem, removeItem, deleteItem, resetCart, sum } = useCartStore();
  // const [total, setTotal] = useState(0);
  // useEffect(() => { setTotal(getTotalSum()) }, [products]);


  if (products.length === 0) return <p className={styles.empty}>Your cart is empty.</p>;

  const handleCompleteOrder = () => {
    alert("Order completed!");
    resetCart();
  };

  return (
    <div className={styles.container}>
      <h2>Order <span style={{ color: '#ffa500' }}>Summary</span></h2>

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

      <div className={styles.summaryRow}>
        <CheckoutSummary total={sum} onClear={resetCart} />
        <button className={styles.completeButton} onClick={handleCompleteOrder}>
          Complete Order
        </button>
      </div>

    </div>
  );
}