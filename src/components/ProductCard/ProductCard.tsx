import styles from "@/components/ProductCard/ProductCard.module.css";
import useCartStore from "@/store/useCartStore";

interface CardProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function ProductCard({ id, title, price, description, category, image }: CardProps) {
    const { products, addItem } = useCartStore();

    const productInCart = products.find((p) => p.id === id);
    const quantity = productInCart?.quantity || 0;

    return (
        <div className={styles.card} key={id}>
            <div className={styles.image}>
                <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.category}>{category}</p>
            <p className={styles.price}>{price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <p className={styles.description}>{description}</p>
            <button
                className={styles.addButton}
                onClick={() => addItem({ id, title, description, price, category, image, quantity: 1 })}
            >
                {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
            </button>
        </div>
    );
}
