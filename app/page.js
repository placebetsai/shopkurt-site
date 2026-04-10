export const runtime = "edge";
import Link from 'next/link';
import { getProducts, formatPrice } from '../lib/shopify';

export default async function HomePage() {
  let products = [];

  try {
    products = await getProducts(12);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-eyebrow">New Season 2026</p>
          <h1>Effortless Elegance</h1>
          <p>
            Curated fashion, beauty, and accessories for the modern woman.
            Discover what is trending now.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/collections" className="btn btn-ghost">
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" style={{ margin: '0 auto' }} />

      {/* Shop by Category */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link href="/collections/beauty" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1412 0%, #0d0b0a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>&#10023;</span>
              </div>
              <span className="category-label">Beauty</span>
            </Link>
            <Link href="/collections/shoes" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #14120d 0%, #0a0908 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>&#10023;</span>
              </div>
              <span className="category-label">Shoes</span>
            </Link>
            <Link href="/collections/accessories" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #12140d 0%, #090a08 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>&#10023;</span>
              </div>
              <span className="category-label">Accessories</span>
            </Link>
            <Link href="/collections/jewelry" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #140d12 0%, #0a0809 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>&#10023;</span>
              </div>
              <span className="category-label">Jewelry</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Trending Now</h2>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Coming Soon</h2>
              <p>Our curated collection is being prepared. Check back soon.</p>
            </div>
          )}

          {products.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link href="/products" className="btn btn-outline">
                View All
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* As Seen On */}
      <section className="trust-section">
        <div className="container">
          <p className="section-title" style={{ marginBottom: '40px' }}>As Seen On</p>
          <div className="trust-badges">
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.01 1.52-.02 3.03-.02 4.55-.46-.15-.96-.21-1.45-.14a3.3 3.3 0 00-2.58 2.09c-.23.63-.18 1.34.02 1.97.39 1.15 1.53 2.03 2.78 2.07 1.01.06 2.03-.41 2.66-1.2.2-.27.42-.56.47-.91.15-1.25.1-2.51.11-3.77.01-4.47-.01-8.95.01-13.42z"/></svg>
              TikTok
            </span>
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </span>
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/></svg>
              YouTube
            </span>
            <span className="trust-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
              Pinterest
            </span>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="email-section">
        <div className="container">
          <h2>Join the List</h2>
          <p>Be the first to know about new arrivals, exclusive offers, and style inspiration.</p>
          <form className="email-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRangeV2.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      <div className="product-card-image">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            width={600}
            height={800}
            loading="lazy"
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
        {hasDiscount && (
          <span className="product-card-badge">Sale</span>
        )}
        <div className="product-card-quick">
          <button>Quick Add</button>
        </div>
      </div>
      <div className="product-card-body">
        <p className="product-card-brand">Fashionistas</p>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">
          <span className="price-current">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="price-compare">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
