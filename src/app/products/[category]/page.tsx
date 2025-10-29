"use client";

import ProductCard from "@/components/ProductCard/ProductCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/app/products/[category]/CategoryPage.module.css";
import { Product } from "@/types/Product";



export default function CategoryPage() {
  const params = useParams();
  const urlCategory = Array.isArray(params.category) ? params.category[0] : params.category;

  const categoryMap: Record<string, string> = {
    men: "men's clothing",
    women: "women's clothing",
    jewelery: "jewelery",
    electronics: "electronics",
  };

  const apiCategory = urlCategory ? categoryMap[urlCategory.toLowerCase()] : undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiCategory) return;

    setLoading(true);
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(apiCategory)}`)
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, [apiCategory]);

  if (!urlCategory) return <p>No category selected</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className={styles.productsGrid}>
        {products.map(p => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
