'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const FILTERS = ['All', 'Beauty', 'Jewelry', 'Shoes', 'Accessories'];

export default function ProductsGrid({ products }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? products
      : products.filter(
          (p) =>
            p.productType &&
            p.productType.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div className="filter-pills">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              color: '#8a8580',
            }}
          >
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
