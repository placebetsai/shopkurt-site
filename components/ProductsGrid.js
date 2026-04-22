'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { getVisibleFilterLanes } from '../lib/merchandising';

const CATEGORY_TOKENS = {
  'Heels': ['heel', 'stiletto', 'pump'],
  'Sandals': ['sandal', 'slide', 'flip'],
  'Flats': ['flat', 'ballet', 'mule', 'slipper'],
  'Loafers': ['loafer', 'derby', 'moccasin'],
  'Sneakers': ['sneaker', 'trainer'],
  'Boots': ['boot', 'bootie'],
  'Jeans': ['jean', 'denim'],
  'Pants': ['pant', 'trouser', 'legging', 'palazzo', 'cargo'],
  'Skirts': ['skirt'],
  'Shorts': ['short'],
  'Mini Dresses': ['mini dress', 'short dress'],
  'Midi Dresses': ['midi dress'],
  'Maxi Dresses': ['maxi dress', 'long dress'],
  'Going Out Dresses': ['going out', 'club dress', 'party dress', 'cocktail'],
  'Wedding Guest': ['wedding guest', 'formal dress'],
  'Casual Dresses': ['casual dress', 'everyday dress', 'sundress'],
  'Crop Tops': ['crop top', 'crop tank'],
  'Bodysuits': ['bodysuit', 'leotard'],
  'Blouses': ['blouse', 'shirt'],
  'Tees & Tanks': ['tee', 't-shirt', 'tank'],
  'Sweaters': ['sweater', 'cardigan', 'knit', 'pullover'],
  'Matching Sets': ['set', 'two-piece', 'two piece'],
  'Jumpsuits': ['jumpsuit'],
  'Rompers': ['romper', 'playsuit'],
  'Jackets': ['jacket'],
  'Trench': ['trench'],
  'Blazers': ['blazer'],
  'Scarves': ['scarf', 'neckerchief'],
  'Sunglasses': ['sunglass', 'shade'],
  'Hair': ['hair clip', 'claw clip', 'scrunchie', 'headband', 'hair tie'],
  'Bags': ['bag', 'tote', 'purse', 'clutch', 'backpack', 'crossbody'],
  'Bottoms': ['pant', 'jean', 'skirt', 'short', 'trouser'],
  'Tops': ['top', 'blouse', 'tee', 'tank', 'shirt', 'sweater', 'bodysuit'],
  'Dresses': ['dress', 'gown'],
  'Outerwear': ['jacket', 'coat', 'trench', 'blazer', 'bomber', 'parka', 'windbreaker'],
  'Sets & Jumpsuits': ['set', 'jumpsuit', 'romper', 'two-piece'],
};

const AESTHETIC_TOKENS = {
  'coquette': ['bow', 'ribbon', 'lace', 'pearl', 'rose', 'butterfly'],
  'bourgeois': ['trench', 'loafer', 'blazer', 'silk', 'cashmere', 'pearl'],
  'y2k': ['low-rise', 'baby tee', 'rhinestone', 'platform', 'crop'],
  'boho': ['boho', 'flowy', 'fringe', 'paisley', 'crochet', 'espadrille'],
  '80s-power': ['blazer', 'power', 'oversized', 'shoulder'],
};

function matchesTokens(product, tokens) {
  const hay = `${product.title || ''} ${product.productType || ''} ${(product.tags || []).join(' ')}`.toLowerCase();
  return tokens.some((t) => hay.includes(t.toLowerCase()));
}

export default function ProductsGrid({ products }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category') || '';
  const aestheticParam = (searchParams?.get('aesthetic') || '').toLowerCase();

  const paramFiltered = useMemo(() => {
    if (categoryParam) {
      const tokens = CATEGORY_TOKENS[categoryParam] || [categoryParam.toLowerCase()];
      const matched = products.filter((p) => matchesTokens(p, tokens));
      return matched.length > 0 ? matched : products;
    }
    if (aestheticParam && aestheticParam !== 'all') {
      const tokens = AESTHETIC_TOKENS[aestheticParam] || [aestheticParam];
      const matched = products.filter((p) => matchesTokens(p, tokens));
      return matched.length > 0 ? matched : products;
    }
    return products;
  }, [products, categoryParam, aestheticParam]);

  const filters = getVisibleFilterLanes(paramFiltered);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    if (!filters.some((filter) => filter.key === activeFilter)) {
      setActiveFilter(filters[0]?.key || 'all');
    }
  }, [activeFilter, filters]);

  const active = filters.find((filter) => filter.key === activeFilter) || filters[0];
  const filtered = paramFiltered.filter(active.match);

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
