import Link from 'next/link';
import ProductCard from './ProductCard';
import { getProducts } from '../lib/shopify';

export default async function IntentProductLanding({
  title,
  eyebrow,
  description,
  query,
  collectionHref = '/products',
  collectionLabel = 'Browse All Products',
}) {
  let products = [];

  try {
    products = await getProducts(12, query);
  } catch (err) {
    console.error(`Failed to fetch landing products for "${title}":`, err.message);
  }

  return (
    <div className="container" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
      <div className="page-header" style={{ maxWidth: '760px', margin: '0 auto 48px', textAlign: 'center' }}>
        <p
          style={{
            color: '#c9a96e',
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          {eyebrow}
        </p>
        <h1 style={{ marginBottom: '16px' }}>{title}</h1>
        <p style={{ color: '#8a8580', lineHeight: 1.8, fontSize: '1rem', margin: 0 }}>
          {description}
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link href={collectionHref} className="btn btn-outline">
              {collectionLabel}
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h2>Fresh Picks Coming In</h2>
          <p>We’re refreshing this category now. Check the full catalog for live inventory.</p>
          <div style={{ marginTop: '32px' }}>
            <Link href={collectionHref} className="btn btn-outline">
              {collectionLabel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
