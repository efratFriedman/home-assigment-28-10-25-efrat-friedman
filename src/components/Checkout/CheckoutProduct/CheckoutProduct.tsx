import styles from "@/components/Checkout/CheckoutProduct/CheckoutProduct.module.css";
import { Product } from "@/types/Product";

interface Props {
  product: Product;
  onAdd: () => void;
  onRemove: () => void;
  onDelete?: () => void; 
}

export default function CheckoutProduct({ product, onAdd, onRemove, onDelete }: Props) {
  const totalPrice = product.price * product.quantity;

  return (
    <div className={styles.productItem}>
      <img src={product.image} alt={product.title} className={styles.image} />

      <div className={styles.details}>
        <h3>{product.title}</h3>

        <p className={styles.price}>
          ${product.price.toFixed(2)} × {product.quantity} ={" "}
          <span className={styles.total}>${totalPrice.toFixed(2)}</span>
        </p>

        <div className={styles.buttons}>
          <button onClick={onRemove}>-</button>
          <p>{product.quantity}</p>
          <button onClick={onAdd}>+</button>
          {onDelete && (
            <button className={styles.deleteButton} onClick={onDelete}>
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
