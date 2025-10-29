"use client";

import useCartStore from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import styles from "@/components/CartModal/CartModal.module.css";
import { Product } from "@/types/Product";

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const products = useCartStore((state) => state.products);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const deleteItem = useCartStore((state) => state.deleteItem);

  const router = useRouter();

  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
     
        <h2>Your Cart ({products.length})</h2>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        {products.length === 0 ? (
          
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className={styles.productsContainer}>
              <ul className={styles.cartList}>
                {products.map((product: Product) => (
                  <li key={product.id} className={styles.cartItem}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.productImage}
                    />
                    <div className={styles.productInfo}>
                      <span className={styles.productTitle}>
                        {product.title}
                      </span>
                      <div className={styles.buttons}>
                        <button onClick={() => removeItem(product.id)}>-</button>
                        <span>{product.quantity}</span> 
                        <button onClick={() => addItem(product)}>+</button>
                        <button 
                          onClick={() => deleteItem(product.id)} 
                          style={{ display: 'none' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.cartFooter}>
              <span className={styles.totalPrice}>
                Total: {totalPrice.toFixed(2)}$
              </span>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}