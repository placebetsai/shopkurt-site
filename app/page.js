import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import CatchPhrase from '../components/CatchPhrase';
import RotatingCategoryMedia from '../components/RotatingCategoryMedia';
import { getProducts, getCollections, formatPrice } from '../lib/shopify';
import { buildCollectionPromos, buildMerchSections, getMerchandiseableProducts } from '../lib/merchandising';

const TRUST_POINTS = [
  'Free shipping over $50',
  'Fast checkout',
  'New drops weekly',
];

const OCCASION_LANES = [
  {
    href: '/interview-shoes',
    label: 'Interview Shoes',
    note: 'Polished heels and flats for first impressions.',
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=800&q=80',
  },
  {
    href: '/vacation-sandals',
    label: 'Vacation Sandals',
    note: 'Warm-weather sandals for resort and travel.',
    image: 'https://images.unsplash.com/photo-1580478491436-fd6a937acc9e?w=800&q=80',
  },
  {
    href: '/trending-accessories',
    label: 'Trending Accessories',
    note: 'Jewelry, bags, and hair pieces to finish the look.',
    image: 'https://images.unsplash.com/photo-1596993100471-c3905dafa78e?w=800&q=80',
  },
  {
    href: '/spanish-style',
    label: 'Spanish Style',
    note: 'Black-forward pieces, sharp tailoring, bold accessories.',
    image: 'https://images.unsplash.com/photo-1541130292430-a832637ddc0d?w=800&q=80',
  },
];

const HERO_IMAGE = 'https://images.unsplash.com/photo-1664515226058-03952a19bd76?w=2000&q=80';
const HERO_SECONDARY = 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=1200&q=80';
const EDITORIAL_IMAGE = 'https://images.unsplash.com/photo-1627117204847-ec306fe712bb?w=1600&q=80';

const CATEGORY_IMAGES = {
  fashion: 'https://images.unsplash.com/photo-1554882195-8cf792f9a571?w=1200&q=80',
  accessories: 'https://images.unsplash.com/photo-1562151270-c7d22ceb586a?w=1200&q=80',
  'beauty-and-personal-care': 'https://images.unsplash.com/photo-1708363390856-172663a263d1?w=1200&q=80',
  'trending-items': 'https://images.unsplash.com/photo-1574015974293-817f0ebebb74?w=1200&q=80',
};

// 9-tile category grid to sit BEFORE the Shopify-driven "Browse by category" row.
// Links target /collections/<slug>; if a collection doesn't exist the collection
// page should render a graceful empty state (handled separately).
const BEST_PHRASES = [
  "The best picks",
  "Our #1 category",
  "Most-loved here",
  "Trending today",
  "Editor obsessed",
  "Customer favorite",
  "Fly off shelves",
  "Can't keep in stock",
  "Seen on TikTok",
  "Rated 5★",
];

const CATEGORY_TILES = [
  {
    label: 'Dresses',
    href: '/collections/dresses',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&q=80',
    ],
  },
  {
    label: 'Tops',
    href: '/collections/tops',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80',
      'https://images.unsplash.com/photo-1564257577-2d3ee8740faa?w=1200&q=80',
    ],
  },
  {
    label: 'Bottoms',
    href: '/collections/bottoms',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b3a0915?w=1200&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=1200&q=80',
    ],
  },
  {
    label: 'Sets & Jumpsuits',
    href: '/collections/sets-jumpsuits',
    images: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    ],
  },
  {
    label: 'Shoes',
    href: '/collections/fashion',
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=1200&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    ],
  },
  {
    label: 'Bags',
    href: '/collections/bags',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80',
      'https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=1200&q=80',
    ],
  },
  {
    label: 'Jewelry',
    href: '/collections/jewelry',
    images: [
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1200&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80',
    ],
  },
  {
    label: 'Sale',
    href: '/collections/sale',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80',
    ],
  },
];

const AESTHETIC_TILES = [
  {
    label: 'Coquette',
    note: 'Soft, feminine, ribbon-forward.',
    href: '/collections/coquette',
    fallback: '/products?aesthetic=coquette',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80',
  },
  {
    label: 'Bourgeois',
    note: 'Quiet luxury — loafers, trench, pearls.',
    href: '/collections/bourgeois',
    fallback: '/products?aesthetic=bourgeois',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=1200&q=80',
  },
  {
    label: 'Y2K',
    note: 'Low-rise, baby tees, rhinestones.',
    href: '/collections/y2k',
    fallback: '/products?aesthetic=y2k',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80',
  },
  {
    label: 'Boho',
    note: 'Flowy silhouettes, earth tones, fringe.',
    href: '/collections/boho',
    fallback: '/products?aesthetic=boho',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
  },
  {
    label: "'80s Power",
    note: 'Shoulders up, blazers, bold color.',
    href: '/collections/80s-power',
    fallback: '/products?aesthetic=80s-power',
    image: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=1200&q=80',
  },
];

function getProductImage(product) {
  return product.images?.edges?.[0]?.node || null;
}

export default async function HomePage() {
  let products = [];
  let bestSellers = [];
  let liveCollections = [];

  try {
    products = await getProducts(50);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  try {
    bestSellers = await getProducts(16, 'tag:trending OR tag:bestseller OR tag:featured', 'UPDATED_AT');
  } catch (err) {
    console.error('Failed to fetch best sellers:', err.message);
  }

  try {
    liveCollections = await getCollections();
  } catch (err) {
    console.error('Failed to fetch collections:', err.message);
  }

  const liveHandles = new Set(
    (liveCollections || [])
      .filter((c) => (c.productCount || 0) > 0)
      .map((c) => c.handle)
  );

  const merchProducts = getMerchandiseableProducts(products);
  const displayProducts = merchProducts.length >= 8 ? merchProducts : products;
  const heroProducts = displayProducts.slice(0, 3);
  const heroIds = new Set(heroProducts.map((p) => p.id));
  const sections = buildMerchSections(displayProducts, 6);
  const productsBySectionSlug = new Map(sections.map((s) => [s.slug, s.products]));
  const allPromos = buildCollectionPromos(displayProducts);
  const visibleSections = allPromos
    .filter((promo) => liveHandles.has(promo.slug))
    .map((promo) => ({
      ...promo,
      rotatingImages: (productsBySectionSlug.get(promo.slug) || [])
        .map((p) => {
          const img = p?.images?.edges?.[0]?.node;
          return img ? { url: img.url, alt: img.altText || p.title, title: p.title } : null;
        })
        .filter(Boolean)
        .slice(0, 5),
    }));
  const justInProducts = displayProducts.filter((p) => !heroIds.has(p.id)).slice(0, 16);
  const trendingProducts = (bestSellers || []).filter((p) => !heroIds.has(p.id)).slice(0, 8);

  // Rewrite category tile hrefs: if the slug IS NOT a live Shopify collection,
  // send the click to /products?category=<label> so the user lands somewhere
  // useful rather than a dead /collections/<slug> page.
  const categoryTilesResolved = CATEGORY_TILES.map((tile) => {
    const slug = tile.href.replace('/collections/', '');
    if (liveHandles.has(slug)) return tile;
    return {
      ...tile,
      href: `/products?category=${encodeURIComponent(tile.label)}`,
    };
  });

  const aestheticTilesResolved = AESTHETIC_TILES.map((tile) => {
    const slug = tile.href.replace('/collections/', '');
    return liveHandles.has(slug) ? tile : { ...tile, href: tile.fallback };
  });

  return (
    <>
      <section className="fashionistas-topline">
        <div className="container fashionistas-topline-inner">
          <div className="fashionistas-topline-copy">
            <span>Free shipping on orders over $50. Fast, direct checkout.</span>
          </div>
          <div className="fashionistas-topline-points">
            {TRUST_POINTS.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="fashionistas-hero fashionistas-hero-editorial"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.2) 100%), url('${HERO_IMAGE}')`,
        }}
      >
        <div className="container fashionistas-hero-grid">
          <div className="fashionistas-hero-copy">
            <p className="fashionistas-kicker">Fashionistas</p>
            <h1>Shoes, accessories, and everyday fashion.</h1>
            <p className="fashionistas-lead">
              Shop the latest drops in shoes, bags, jewelry, and beauty — hand-picked, updated weekly.
            </p>
            <div className="fashionistas-hero-actions">
              <Link href="/collections" className="btn btn-primary">
                Shop By Category
              </Link>
              <Link href="/products" className="btn btn-ghost">
                Browse All Products
              </Link>
            </div>
            {heroProducts.length > 0 && (
              <div className="fashionistas-hero-filmstrip">
                {heroProducts.map((product, index) => {
                  const image = getProductImage(product);
                  if (!image) return null;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      className={`fashionistas-film-card fashionistas-film-card-${index + 1}`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || product.title}
                        width={360}
                        height={460}
                        loading="lazy"
                      />
                      <div className="fashionistas-film-overlay">
                        <span>{['New in', 'Trending', 'Just dropped'][index] || 'Shop now'}</span>
                        <strong>{product.title}</strong>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            <div className="fashionistas-hero-stats">
              <div className="fashionistas-hero-stat">
                <strong>{products.length || 0}+</strong>
                <span>new styles</span>
              </div>
              <div className="fashionistas-hero-stat">
                <strong>{liveHandles.size || 0}</strong>
                <span>categories</span>
              </div>
              <div className="fashionistas-hero-stat">
                <strong>Free</strong>
                <span>shipping over $50</span>
              </div>
            </div>
          </div>

          <div className="fashionistas-hero-panel">
            <div
              className="fashionistas-hero-editorial-image"
              style={{ backgroundImage: `url('${HERO_SECONDARY}')` }}
              aria-hidden="true"
            />
            <div className="fashionistas-panel-header">
              <p>Now Trending</p>
              <span>{heroProducts.length > 0 ? 'This week' : 'Refreshing'}</span>
            </div>
            <div className="fashionistas-spotlight-grid">
              {heroProducts.length > 0 ? (
                heroProducts.map((product, index) => {
                  const image = getProductImage(product);
                  return (
                    <Link key={product.id} href={`/products/${product.handle}`} className="fashionistas-spotlight-card">
                  <div className="fashionistas-spotlight-meta">
                        <span>{['New in', 'Bestseller', 'Just dropped'][index] || 'Shop'}</span>
                        <strong>{formatPrice(product.priceRangeV2.minVariantPrice.amount, product.priceRangeV2.minVariantPrice.currencyCode)}</strong>
                      </div>
                      <div className="fashionistas-spotlight-layout">
                        <div className="fashionistas-spotlight-text">
                          <h2>{product.title}</h2>
                          <p>{product.productType || 'Shop now'}</p>
                        </div>
                        <div className="fashionistas-spotlight-thumb">
                          {image ? (
                            <img
                              src={image.url}
                              alt={image.altText || product.title}
                              width={220}
                              height={260}
                              loading="lazy"
                            />
                          ) : (
                            <div className="no-image">No Image</div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="fashionistas-spotlight-card">
                  <div className="fashionistas-spotlight-meta">
                    <span>Restocking</span>
                    <strong>Soon</strong>
                  </div>
                  <h2>New arrivals loading.</h2>
                  <p>Check back in a moment for this week&rsquo;s picks.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section fashionistas-tile-section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">Shop By Category</p>
            <h2 className="fashionistas-display-title">Everything, sorted.</h2>
          </div>
          <div className="fashionistas-tile-grid">
            {categoryTilesResolved.map((tile) => {
              const tileImages = tile.images && tile.images.length
                ? tile.images.map((url) => ({ url, alt: tile.label }))
                : tile.image ? [{ url: tile.image, alt: tile.label }] : [];
              return (
                <Link key={tile.label} href={tile.href} className="fashionistas-tile-card">
                  <div className="fashionistas-tile-media" aria-hidden="true">
                    <RotatingCategoryMedia images={tileImages} interval={4500} />
                    <div className="fashionistas-tile-media-shade" />
                  </div>
                  <div className="fashionistas-tile-label">
                    <span>{tile.label}</span>
                    <CatchPhrase phrases={BEST_PHRASES} interval={4000} className="fashionistas-tile-sub" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {visibleSections.length > 0 && (
        <section className="section fashionistas-merch-section">
          <div className="container">
            <div className="fashionistas-section-head">
              <p className="fashionistas-kicker">Live Collections</p>
              <h2 className="fashionistas-display-title">Browse by category.</h2>
            </div>
            <div className="fashionistas-category-grid">
              {visibleSections.map((section) => {
                const editorialImage = CATEGORY_IMAGES[section.slug];
                const mediaImage = editorialImage || section.image?.url;
                const mediaAlt = editorialImage ? `${section.title} editorial` : (section.image?.altText || section.title);
                return (
                <Link
                  key={section.slug}
                  href={`/collections/${section.slug}`}
                  className="fashionistas-category-card"
                  style={{ '--fashionistas-accent': section.accent }}
                >
                  <div className="fashionistas-category-media">
                    {section.rotatingImages && section.rotatingImages.length >= 2 ? (
                      <RotatingCategoryMedia images={section.rotatingImages} interval={4500} />
                    ) : mediaImage ? (
                      <img
                        src={mediaImage}
                        alt={mediaAlt}
                        width={520}
                        height={620}
                        loading="lazy"
                      />
                    ) : (
                      <div className="fashionistas-category-fallback">{section.eyebrow}</div>
                    )}
                  </div>
                  <div className="fashionistas-category-copy">
                  <p className="fashionistas-catchphrase-line"><CatchPhrase /></p>
                  <h3>{section.title}</h3>
                  <span>{section.featuredProductTitle ? `Top right now: ${section.featuredProductTitle}` : section.description}</span>
                  <div className="fashionistas-category-footer">
                    <strong>{section.total} styles</strong>
                    <em>Shop now →</em>
                  </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
                <p className="fashionistas-kicker">Shop By Occasion</p>
            <h2 className="fashionistas-display-title">Built for the moment.</h2>
          </div>
          <div className="fashionistas-intent-grid">
            {OCCASION_LANES.map((item) => (
              <Link key={item.href} href={item.href} className="fashionistas-intent-card">
                {item.image && (
                  <div
                    className="fashionistas-intent-media"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    aria-hidden="true"
                  />
                )}
                <div className="fashionistas-intent-body">
                  <h3>{item.label}</h3>
                  <p>{item.note}</p>
                  <span className="fashionistas-intent-cta">Shop Now</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section fashionistas-editorial-banner"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.4) 60%, rgba(5,5,5,0) 100%), url('${EDITORIAL_IMAGE}')` }}
      >
        <div className="container">
          <div className="fashionistas-editorial-banner-copy">
            <p className="fashionistas-kicker">New Season</p>
            <h2 className="fashionistas-display-title">Built to be seen.</h2>
            <p className="fashionistas-lead">
              Shoes that anchor the outfit, accessories that finish it, beauty that holds all day.
            </p>
            <Link href="/collections/fashion" className="btn btn-primary">
              Shop The Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="section fashionistas-aesthetic-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">Shop By Aesthetic</p>
            <h2 className="fashionistas-display-title">Find your vibe.</h2>
          </div>
          <div className="fashionistas-aesthetic-grid">
            {aestheticTilesResolved.map((tile) => (
              <Link key={tile.label} href={tile.href} className="fashionistas-aesthetic-card">
                <div
                  className="fashionistas-aesthetic-media"
                  style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%), url('${tile.image}')` }}
                  aria-hidden="true"
                />
                <div className="fashionistas-aesthetic-body">
                  <h3>{tile.label}</h3>
                  <p>{tile.note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {sections.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="fashionistas-editorial">
              <div className="fashionistas-editorial-copy">
                <p className="fashionistas-kicker">{sections[0].eyebrow}</p>
                <h2 className="fashionistas-display-title">{sections[0].title}</h2>
                <p className="fashionistas-lead">
                  {sections[0].description}
                </p>
                <Link href={`/collections/${sections[0].slug}`} className="btn btn-outline">
                  Shop The Collection
                </Link>
              </div>
              <div className="fashionistas-editorial-grid">
                {sections[0].products.slice(0, 2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {trendingProducts.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="fashionistas-section-head">
              <p className="fashionistas-kicker">Best Sellers</p>
              <h2 className="fashionistas-display-title">What&rsquo;s moving right now.</h2>
            </div>
            <div className="product-grid">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/collections/trending-items" className="btn btn-outline">
                Shop All Bestsellers
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">New Arrivals</p>
            <h2 className="fashionistas-display-title">Just in.</h2>
          </div>

          {justInProducts.length > 0 ? (
            <>
              <div className="product-grid">
                {justInProducts.map((product) => (
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
              <h2>Restocking</h2>
              <p>New arrivals are loading — check back shortly.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section fashionistas-newsletter-section">
        <div className="container">
          <div className="fashionistas-newsletter">
            <div className="fashionistas-newsletter-copy">
              <p className="fashionistas-kicker">Get 15% off</p>
              <h2 className="fashionistas-display-title">Join the list.</h2>
              <p className="fashionistas-lead">
                New drops, restocks, and editor picks — straight to your inbox.
              </p>
            </div>
            <form
              className="fashionistas-newsletter-form"
              action="/contact"
              method="post"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                aria-label="Email address"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
