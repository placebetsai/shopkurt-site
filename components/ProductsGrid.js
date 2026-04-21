'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const FILTERS = [
  { label: 'All', match: () => true },
  { label: 'Shoes', match: (p) => /\b(shoe|sneaker|boot|sandal|loafer|heel|flat|slipper|wedge)\b/i.test(`${p.productType || ''} ${p.title || ''}`) },
  { label: 'Accessories', match: (p) => /\b(accessor|bag|tote|crossbody|wallet|belt|clip|keychain)\b/i.test(`${p.productType || ''} ${p.title || ''}`) },
  { label: 'Beauty', match: (p) => /\b(beauty|cosmetic|lash|lip|nail|makeup|skin|hair)\b/i.test(`${p.productType || ''} ${p.title || ''}`) },
  { label: 'Trending', match: (p) => /\b(trending|viral|tiktok|fashion)\b/i.test(`${p.tags?.join(' ') || ''} ${p.productType || ''}`) },
];

export default function ProductsGrid({ products }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const active = FILTERS.find((filter) => filter.label === activeFilter) || FILTERS[0];
  const filtered = products.filter(active.match);

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div className="filter-pills">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            className={`filter-pill ${activeFilter === filter.label ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.label)}
          >
            {filter.label}
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
              fontSize: '0.9rem',
              lineHeight: 1.8,
              color: '#8a8580',
            }}
          >
            No products matched this edit yet. Try another lane or browse the full catalog.
          </p>
        </div>
      )}
    </div>
  );
}
