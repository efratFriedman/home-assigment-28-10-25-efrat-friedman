"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/products/[category]/CategoryPage.module.css"
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export default function CategoryPage() {
    const params = useParams();
    const category = Array.isArray(params.category) ? params.category[0] : params.category;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;

        setLoading(true);
        fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            });
    }, [category]);

    if (!category) return <p>No category selected</p>;
    if (loading) return <p>Loading...</p>;

    return (
    <div>
      <h2 className={styles.title}>{category}</h2>
      <div className={styles.productsGrid}>
        {products.map(p => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
    );
}
