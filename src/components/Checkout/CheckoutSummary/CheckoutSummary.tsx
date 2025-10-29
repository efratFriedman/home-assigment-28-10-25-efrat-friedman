
import styles from "@/components/Checkout/CheckoutSummary/CheckoutSummary.module.css";

interface CheckoutSummaryProps {
  total: number;
  onClear: () => void;
}

export default function CheckoutSummary({ total }: CheckoutSummaryProps) {
  return (
    <div className={styles.summary}> 
      <span className={styles.totalLabel}>TOTAL:</span>
      <span className={styles.totalAmount}>{total.toFixed(2)} $</span>
    </div>
  );
}