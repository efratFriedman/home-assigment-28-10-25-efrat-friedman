'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types/Product';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4') 
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/imgs/logo2.png" alt="Shop Logo" className={styles.logo} />
      </div>

      <h2 className={styles.latestProductsHeader}>LATEST PRODUCTS</h2>

      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            category={product.category}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}