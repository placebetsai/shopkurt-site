'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getVisibleFilterLanes } from '../lib/merchandising';

export default function ProductsGrid({ products }) {
  const filters = getVisibleFilterLanes(products);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!filters.some((filter) => filter.key === activeFilter)) {
      setActiveFilter(filters[0]?.key || 'all');
    }
  }, [activeFilter, filters]);

  const active = filters.find((filter) => filter.key === activeFilter) || filters[0];
  const filtered = products.filter(active.match);

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div className="filter-pills">
        {filters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-pill ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.key)}
            aria-pressed={activeFilter === filter.key}
          >
            {filter.label} <span style={{ color: 'var(--text-secondary)' }}>({filter.count})</span>
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 16,
          padding: '0 0 24px',
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          {active.label}
        </p>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
          }}
        >
          {filtered.length} style-forward picks
        </p>
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
            No matches in this filter. Try another category or shop all products.
          </p>
        </div>
      )}
    </div>
  );
}
