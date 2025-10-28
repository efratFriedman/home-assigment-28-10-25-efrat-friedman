import styles from "@/components/Checkout/CheckoutProduct/CheckoutProduct.module.css";

interface Props {
  total: number;
  onClear: () => void;
}

export default function CheckoutSummary({ total, onClear }: Props) {
  return (
    <div className={styles.summary}>
      <h3>Total: ${total.toFixed(2)}</h3>
      <button className={styles.resetButton} onClick={onClear}>
        Clear Cart
      </button>
    </div>
  );
}
