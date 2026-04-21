import Link from 'next/link';
import { getProducts, formatPrice } from '../lib/shopify';

const HERO_POINTS = [
  'Fashion-led merchandising, not random catalog dump',
  'Shoes, bags, beauty, and occasion-based shopping paths',
  'Intent pages built to rank and convert across the portfolio',
];

const FEATURED_COLLECTIONS = [
  {
    href: '/collections/fashion',
    label: 'Shoes & Style',
    eyebrow: 'Core Collection',
    description: 'Wedges, sandals, loafers, heels, and everyday pieces that anchor the brand.',
  },
  {
    href: '/collections/accessories',
    label: 'Accessories',
    eyebrow: 'Add-On Lane',
    description: 'Jewelry, bags, clips, and small wins that lift outfits and increase basket value.',
  },
  {
    href: '/collections/beauty-and-personal-care',
    label: 'Beauty',
    eyebrow: 'Ready-To-Gift',
    description: 'Beauty and personal-care picks that feel trend-aware instead of filler inventory.',
  },
  {
    href: '/collections/trending-items',
    label: 'Trending Picks',
    eyebrow: 'Fast-Moving',
    description: 'Current catalog momentum with a stronger edit than a generic newest-products feed.',
  },
];

const INTENT_PAGES = [
  { label: 'Interview Shoes', href: '/interview-shoes', note: 'Job-ready footwear and cleaner polish.' },
  { label: 'Vacation Sandals', href: '/vacation-sandals', note: 'Warm-weather pairs, low effort, high click appeal.' },
  { label: 'Trending Accessories', href: '/trending-accessories', note: 'Cheap upgrades that still feel current.' },
  { label: 'Blue-Collar Essentials', href: '/blue-collar-essentials', note: 'Practical picks for trades and first jobs.' },
  { label: 'Spanish Style', href: '/spanish-style', note: 'Editorial looks tied to the SpanishTVShows audience.' },
  { label: 'Security Cameras', href: '/security-cameras', note: 'A separated surveillance lane for hiddencameras.tv traffic.' },
];

const BRAND_PILLARS = [
  {
    title: 'Sharper Positioning',
    body: 'Fashionistas.ai should feel like an edited store with a point of view, not a warehouse page with random products shoved together.',
  },
  {
    title: 'Search-First Structure',
    body: 'Collections and intent pages should answer real shopping language: interview shoes, vacation sandals, trending accessories, and more.',
  },
  {
    title: 'Portfolio Distribution',
    body: 'Each portfolio site can route into a relevant commerce lane without dragging the homepage into identity chaos.',
  },
];

export default async function HomePage() {
  let products = [];

  try {
    products = await getProducts(12);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  const spotlightProducts = products.slice(0, 3);

  return (
    <>
      <section className="fashionistas-hero">
        <div className="container fashionistas-hero-grid">
          <div className="fashionistas-hero-copy">
            <p className="fashionistas-kicker">Fashionistas.ai</p>
            <h1>2026-style shopping with cleaner merchandising and stronger intent pages.</h1>
            <p className="fashionistas-lead">
              Fashionistas.ai is the commerce hub for shoes, accessories, beauty, and sharper occasion-based shopping.
              The goal is simple: make the store feel edited, modern, and premium enough to convert without pretending to be luxury.
            </p>
            <div className="fashionistas-hero-actions">
              <Link href="/collections" className="btn btn-primary">
                Browse Collections
              </Link>
              <Link href="/products" className="btn btn-ghost">
                Shop Live Catalog
              </Link>
            </div>
            <div className="fashionistas-point-list">
              {HERO_POINTS.map((point) => (
                <div key={point} className="fashionistas-point-item">
                  <span className="fashionistas-point-dot" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fashionistas-hero-panel">
            <div className="fashionistas-panel-header">
              <p>Current Edit</p>
              <span>{products.length > 0 ? `${products.length}+ live picks` : 'Live catalog'}</span>
            </div>
            <div className="fashionistas-spotlight-grid">
              {spotlightProducts.length > 0 ? (
                spotlightProducts.map((product, index) => (
                  <Link key={product.id} href={`/products/${product.handle}`} className="fashionistas-spotlight-card">
                    <div className="fashionistas-spotlight-meta">
                      <span>{['Lead Pick', 'Trending Pair', 'Catalog Favorite'][index]}</span>
                      <strong>{formatPrice(product.priceRangeV2.minVariantPrice.amount, product.priceRangeV2.minVariantPrice.currencyCode)}</strong>
                    </div>
                    <h2>{product.title}</h2>
                    <p>{product.productType || 'Fashion pick'} routed from the live catalog, not a fake featured slot.</p>
                  </Link>
                ))
              ) : (
                <div className="fashionistas-spotlight-card">
                  <div className="fashionistas-spotlight-meta">
                    <span>Live Catalog</span>
                    <strong>Updating</strong>
                  </div>
                  <h2>Catalog sync in progress</h2>
                  <p>The homepage is wired to live Shopify inventory and will populate when the feed responds.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section fashionistas-band-section">
        <div className="container">
          <div className="fashionistas-band">
            {BRAND_PILLARS.map((item) => (
              <div key={item.title} className="fashionistas-band-card">
                <p>{item.title}</p>
                <h2>{item.body}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">Shop The Main Lanes</p>
            <h2 className="fashionistas-display-title">Collections that read like a real store, not placeholder admin buckets.</h2>
          </div>
          <div className="fashionistas-category-grid">
            {FEATURED_COLLECTIONS.map((item) => (
              <Link key={item.href} href={item.href} className="fashionistas-category-card">
                <p>{item.eyebrow}</p>
                <h3>{item.label}</h3>
                <span>{item.description}</span>
                <strong>Open Collection →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">Intent Pages</p>
            <h2 className="fashionistas-display-title">SEO pages built around the way people actually shop.</h2>
          </div>
          <div className="fashionistas-intent-grid">
            {INTENT_PAGES.map((item) => (
              <Link key={item.href} href={item.href} className="fashionistas-intent-card">
                <h3>{item.label}</h3>
                <p>{item.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">Live Products</p>
            <h2 className="fashionistas-display-title">Current catalog picks from Shopify.</h2>
          </div>

          {products.length > 0 ? (
            <>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '56px' }}>
                <Link href="/products" className="btn btn-outline">
                  View Full Catalog
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2>Live Catalog Refreshing</h2>
              <p>The product feed is connected, but the current request returned empty. Try the full catalog.</p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/products" className="btn btn-outline">
                  Browse Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRangeV2.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantCompareAtPrice;
  const hasDiscount = compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

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
        {hasDiscount && <span className="product-card-badge">Sale</span>}
      </div>
      <div className="product-card-body">
        <p className="product-card-brand">{product.productType || 'Fashionistas.ai'}</p>
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
