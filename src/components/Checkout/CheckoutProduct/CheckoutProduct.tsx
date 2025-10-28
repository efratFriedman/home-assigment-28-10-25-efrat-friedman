import { Product } from "@/store/useCartStore";
import styles from "./CheckoutProduct.module.css";

interface Props {
  product: Product;
  onAdd: () => void;
  onRemove: () => void;
  onDelete?: () => void; // אופציונלי למחיקה מלאה
}

export default function CheckoutProduct({ product, onAdd, onRemove, onDelete }: Props) {
  return (
    <div className={styles.productItem}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.details}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <div className={styles.buttons}>
          <button onClick={onRemove}>-</button>
          <button onClick={onAdd}>+</button>
          {onDelete && <button className={styles.deleteButton} onClick={onDelete}>Remove</button>}
        </div>
      </div>
    </div>
  );
}
