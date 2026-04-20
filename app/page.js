// Products fetched at build time, rebuilt every 5 min via ISR
import Link from 'next/link';
import { getProducts, formatPrice } from '../lib/shopify';

const STORE_PROMISES = [
  { stat: 'Shoes First', detail: 'Wedges, sandals, heels, flats, loafers' },
  { stat: 'Low-Cost Style', detail: 'Affordable outfit upgrades and accessories' },
  { stat: 'Intent Pages', detail: 'Built for interviews, vacations, and trending looks' },
];

const SHOP_DESTINATIONS = [
  { label: 'Interview Shoes', href: '/interview-shoes' },
  { label: 'Vacation Sandals', href: '/vacation-sandals' },
  { label: 'Trending Accessories', href: '/trending-accessories' },
  { label: 'Blue-Collar Essentials', href: '/blue-collar-essentials' },
  { label: 'Spanish Style', href: '/spanish-style' },
  { label: 'Security Cameras', href: '/security-cameras' },
  { label: 'Bettor Desk', href: '/bettor-desk' },
];

const PORTFOLIO_SHOPS = [
  {
    eyebrow: 'IHateCollege.com',
    title: 'Workwear, interview shoes, and blue-collar basics',
    description: 'A cleaner store path for first jobs, trade programs, interviews, and practical work-ready upgrades.',
    href: '/blue-collar-essentials',
  },
  {
    eyebrow: 'SpanishTVShows.com',
    title: 'Show-inspired fashion, resort looks, and dramatic accessories',
    description: 'Built for editorial style tie-ins instead of random generic product spam.',
    href: '/spanish-style',
  },
  {
    eyebrow: 'Hiddencameras.tv',
    title: 'Security cameras, nanny cams, and surveillance gear',
    description: 'A dedicated searchable section for the camera audience instead of burying those products in a mixed catalog.',
    href: '/security-cameras',
  },
  {
    eyebrow: 'PlaceBets.ai',
    title: 'Bettor desk gear, organizers, and study setup upgrades',
    description: 'A lightweight commerce lane tied to the betting workspace, not random unrelated offers.',
    href: '/bettor-desk',
  },
];

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
          <p className="hero-eyebrow">Shoes, Wedges & Everyday Style</p>
          <h1>Affordable Fashion That Still Looks Finished</h1>
          <p>
            Focused on trending shoes, wedges, sandals, accessories, and easy outfit upgrades
            that work for nights out, vacations, and everyday wear.
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

      <section className="section" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {STORE_PROMISES.map((item) => (
              <div
                key={item.stat}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                  padding: '22px 18px',
                }}
              >
                <div style={{ color: '#c9a96e', fontSize: '1.15rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {item.stat}
                </div>
                <div style={{ color: '#8a857e', fontSize: '0.86rem', lineHeight: 1.7 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link href="/collections/fashion" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1412 0%, #0d0b0a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: '#c9a96e' }}>&#9733;</span>
              </div>
              <span className="category-label">Shoes & Fashion</span>
            </Link>
            <Link href="/collections/beauty-and-personal-care" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #14120d 0%, #0a0908 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: '#c9a96e' }}>&#10023;</span>
              </div>
              <span className="category-label">Beauty</span>
            </Link>
            <Link href="/collections/accessories" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #12140d 0%, #090a08 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: '#c9a96e' }}>&#9826;</span>
              </div>
              <span className="category-label">Accessories</span>
            </Link>
            <Link href="/collections/trending-items" className="category-tile">
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #140d12 0%, #0a0809 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', color: '#c9a96e' }}>&#9830;</span>
              </div>
              <span className="category-label">Trending Picks</span>
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

      {products.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2 className="section-title">Live Catalog Picks</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
              }}
            >
              {products.slice(0, 4).map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.handle}`}
                  style={{
                    display: 'block',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'linear-gradient(135deg, #0f0d0b 0%, #090807 100%)',
                    padding: '22px 20px',
                  }}
                >
                  <div style={{ color: '#c9a96e', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '14px' }}>
                    {['Fresh Find', 'Top Click', 'Low-Cost Win', 'Current Pick'][index]}
                  </div>
                  <h3 style={{ color: '#f0ece6', fontSize: '1.1rem', lineHeight: 1.35, marginBottom: '12px' }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#8a857e', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '16px' }}>
                    Routed from the live catalog, not a fake placeholder card. Better for search, cleaner for shoppers, and easier to push from the rest of the portfolio.
                  </p>
                  <div style={{ color: '#c9a96e', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Shop Product →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Shop By Use Case</h2>
          <div className="categories-grid">
            {SHOP_DESTINATIONS.map((item, index) => (
              <Link key={item.href} href={item.href} className="category-tile">
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #17120f 0%, #0b0908 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.8rem', color: '#c9a96e' }}>{['↗', '✷', '✦', '⌁', '✧', '◉', '▣'][index]}</span>
                </div>
                <span className="category-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Portfolio Shops</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '12px',
            }}
          >
            {PORTFOLIO_SHOPS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{
                  display: 'block',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'linear-gradient(135deg, #0f0d0b 0%, #090807 100%)',
                  padding: '28px 24px',
                  minHeight: '240px',
                }}
                >
                <div style={{ color: '#c9a96e', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '18px' }}>
                  {item.eyebrow}
                </div>
                <h3 style={{ color: '#f0ece6', fontSize: '1.5rem', lineHeight: 1.2, fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#8a857e', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: '26rem' }}>
                  {item.description}
                </p>
                <div style={{ marginTop: '28px', color: '#c9a96e', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Browse Section →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '12px',
            }}
            className="fashionistas-editorial-grid"
          >
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(135deg, rgba(201,169,110,0.09), rgba(201,169,110,0.02))',
                padding: '34px 30px',
              }}
            >
              <p style={{ color: '#c9a96e', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '18px' }}>
                Why This Store Wins
              </p>
              <h2 style={{ color: '#f0ece6', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.15, marginBottom: '18px' }}>
                Less catalog clutter. More money pages.
              </h2>
              <p style={{ color: '#8a857e', fontSize: '0.95rem', lineHeight: 1.9, maxWidth: '42rem', marginBottom: '24px' }}>
                Fashionistas.ai should not feel like a random dropship feed. It should feel like a focused store for
                shoes, accessories, and easy outfit upgrades tied to real use cases like interviews, vacations, nights out,
                and low-cost style refreshes.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/interview-shoes" className="btn btn-primary">
                  Shop Interview Shoes
                </Link>
                <Link href="/vacation-sandals" className="btn btn-ghost">
                  Shop Vacation Sandals
                </Link>
              </div>
            </div>

            <div
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#0a0908',
                padding: '30px 26px',
              }}
            >
              <p style={{ color: '#c9a96e', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '18px' }}>
                Power Categories
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                {[
                  ['Wedges & Sandals', '/vacation-sandals'],
                  ['Interview Shoes', '/interview-shoes'],
                  ['Trending Accessories', '/trending-accessories'],
                  ['Blue-Collar Essentials', '/blue-collar-essentials'],
                  ['Spanish Style', '/spanish-style'],
                  ['Security Cameras', '/security-cameras'],
                  ['Full Catalog', '/products'],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      color: '#f0ece6',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontSize: '0.78rem',
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ color: '#c9a96e' }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container">
          <p className="section-title" style={{ marginBottom: '40px' }}>Why People Buy Here</p>
          <div className="trust-badges">
            <span className="trust-badge">Focused catalog instead of random filler</span>
            <span className="trust-badge">Searchable sections for each portfolio brand</span>
            <span className="trust-badge">Shoes, accessories, cameras, and niche desk gear</span>
            <span className="trust-badge">SEO landing pages built for real user intent</span>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="email-section">
        <div className="container">
          <h2>Join the List</h2>
          <p>Be the first to know about new arrivals, exclusive offers, and style inspiration.</p>
          <form className="email-form" action="#" method="GET">
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
  const compareAt = product.compareAtPriceRange?.minVariantCompareAtPrice;
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
        <p className="product-card-brand">Fashionistas.ai</p>
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
