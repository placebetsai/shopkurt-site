import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import {
  getProductsByCollectionSorted,
  formatPrice,
} from '../../../lib/shopify';

const SORT_OPTIONS = [
  { label: 'Newest', key: 'CREATED', reverse: true },
  { label: 'Price: Low to High', key: 'PRICE', reverse: false },
  { label: 'Price: High to Low', key: 'PRICE', reverse: true },
  { label: 'Best Selling', key: 'BEST_SELLING', reverse: true },
];

function parseSortParam(sort) {
  switch (sort) {
    case 'price-asc':
      return { sortKey: 'PRICE', reverse: false };
    case 'price-desc':
      return { sortKey: 'PRICE', reverse: true };
    case 'best-selling':
      return { sortKey: 'BEST_SELLING', reverse: true };
    case 'newest':
    default:
      return { sortKey: 'CREATED', reverse: true };
  }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const title = handle
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | Fashionistas.ai`,
    description: `Shop the ${title} collection at Fashionistas.ai. Trending products, fast shipping, best prices.`,
  };
}

export default async function CollectionPage({ params, searchParams }) {
  const { handle } = await params;
  const resolvedSearch = await searchParams;
  const sort = resolvedSearch?.sort || 'newest';
  const { sortKey, reverse } = parseSortParam(sort);

  let collection = null;

  try {
    collection = await getProductsByCollectionSorted(
      handle,
      sortKey,
      reverse
    );
  } catch (err) {
    console.error('Failed to fetch collection:', err.message);
  }

  if (!collection) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Collection Not Found</h2>
          <p>This collection may no longer be available.</p>
          <Link
            href="/collections"
            className="btn btn-outline"
            style={{ marginTop: '24px' }}
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>{collection.title}</h1>
        {collection.description && <p>{collection.description}</p>}
      </div>

      {collection.products.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '24px',
          }}
        >
          <div style={{ position: 'relative' }}>
            <label
              htmlFor="sort-select"
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginRight: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Sort by
            </label>
            {/*
              Sort links rendered as anchor tags for server-component compatibility.
              Each option navigates to the same page with a different ?sort= param.
            */}
            <span
              style={{
                display: 'inline-flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Newest', value: 'newest' },
                { label: 'Price: Low-High', value: 'price-asc' },
                { label: 'Price: High-Low', value: 'price-desc' },
                { label: 'Best Selling', value: 'best-selling' },
              ].map((opt) => (
                <Link
                  key={opt.value}
                  href={`/collections/${handle}?sort=${opt.value}`}
                  style={{
                    fontSize: '0.8rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border:
                      sort === opt.value
                        ? '1px solid var(--accent)'
                        : '1px solid var(--border)',
                    color:
                      sort === opt.value
                        ? 'var(--accent)'
                        : 'var(--text-secondary)',
                    background:
                      sort === opt.value
                        ? 'var(--accent-glow)'
                        : 'transparent',
                    transition: 'all var(--transition)',
                    textDecoration: 'none',
                  }}
                >
                  {opt.label}
                </Link>
              ))}
            </span>
          </div>
        </div>
      )}

      {collection.products.length > 0 ? (
        <div className="product-grid" style={{ paddingBottom: '80px' }}>
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No Products in This Collection</h2>
          <Link
            href="/products"
            className="btn btn-outline"
            style={{ marginTop: '24px' }}
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
