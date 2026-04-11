export const runtime = "edge";
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import {
  getProductsByCollectionSorted,
  formatPrice,
} from '../../../lib/shopify';

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
    description: `Shop the ${title} collection at Fashionistas.ai. Curated fashion, beauty, and accessories with fast US shipping.`,
    alternates: {
      canonical: `https://fashionistas.ai/collections/${handle}`,
    },
    openGraph: {
      title: `${title} | Fashionistas.ai`,
      description: `Explore the ${title} collection. Curated fashion for the modern woman.`,
      url: `https://fashionistas.ai/collections/${handle}`,
    },
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
      <div style={{ background: '#050505', minHeight: '100vh' }}>
        <div
          style={{
            textAlign: 'center',
            padding: '120px 24px',
          }}
        >
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: '300',
              color: '#c9a96e',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Collection Not Found
          </h2>
          <p style={{ color: '#888', marginTop: '12px' }}>
            This collection may no longer be available.
          </p>
          <Link
            href="/collections"
            style={{
              display: 'inline-block',
              marginTop: '32px',
              padding: '14px 40px',
              border: '1px solid #c9a96e',
              color: '#c9a96e',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const sortOptions = [
    { label: 'Newest', value: 'newest' },
    { label: 'Price \u2191', value: 'price-asc' },
    { label: 'Price \u2193', value: 'price-desc' },
    { label: 'Best Selling', value: 'best-selling' },
  ];

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '24px 24px 0',
        }}
      >
        <nav
          style={{
            fontSize: '0.75rem',
            color: '#666',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <Link
            href="/"
            style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
          >
            Home
          </Link>
          <span style={{ margin: '0 10px', color: '#444' }}>/</span>
          <Link
            href="/collections"
            style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
          >
            Collections
          </Link>
          <span style={{ margin: '0 10px', color: '#444' }}>/</span>
          <span style={{ color: '#c9a96e' }}>{collection.title}</span>
        </nav>
      </div>

      {/* Banner header */}
      <div
        style={{
          textAlign: 'center',
          padding: '60px 24px 20px',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            color: '#fff',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {collection.title}
        </h1>
        {collection.description && (
          <p
            style={{
              color: '#888',
              fontSize: '0.95rem',
              maxWidth: '600px',
              margin: '16px auto 0',
              lineHeight: '1.7',
            }}
          >
            {collection.description}
          </p>
        )}
        <p
          style={{
            fontSize: '0.8rem',
            color: '#c9a96e',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '16px',
          }}
        >
          {collection.products.length}{' '}
          {collection.products.length === 1 ? 'PIECE' : 'PIECES'}
        </p>
        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#c9a96e',
            margin: '24px auto 0',
          }}
        />
      </div>

      {/* Sort */}
      {collection.products.length > 0 && (
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {sortOptions.map((opt) => (
            <Link
              key={opt.value}
              href={`/collections/${handle}?sort=${opt.value}`}
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: sort === opt.value ? '#c9a96e' : '#666',
                textDecoration: 'none',
                borderBottom: sort === opt.value ? '1px solid #c9a96e' : '1px solid transparent',
                paddingBottom: '4px',
                transition: 'all 0.3s ease',
              }}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      )}

      {/* Product grid */}
      {collection.products.length > 0 ? (
        <div className="product-grid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 100px' }}>
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 24px 100px' }}>
          <p style={{ color: '#888' }}>No products in this collection yet.</p>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              marginTop: '24px',
              padding: '14px 40px',
              border: '1px solid #c9a96e',
              color: '#c9a96e',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
