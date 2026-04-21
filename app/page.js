import Link from 'next/link';
import ProductCard from '../components/ProductCard';
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

function getProductImage(product) {
  return product.images?.edges?.[0]?.node || null;
}

export default async function HomePage() {
  let products = [];
  let liveCollections = [];

  try {
    products = await getProducts(24);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
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
  const sections = buildMerchSections(displayProducts, 4);
  const allPromos = buildCollectionPromos(displayProducts);
  const visibleSections = allPromos.filter((promo) => liveHandles.has(promo.slug));
  const featuredProducts = displayProducts.slice(0, 8);

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
                <strong>{visibleSections.length || 0}</strong>
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

      {visibleSections.length > 0 && (
        <section className="section fashionistas-merch-section">
          <div className="container">
            <div className="fashionistas-section-head">
              <p className="fashionistas-kicker">Shop By Category</p>
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
                    {mediaImage ? (
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
                  <p>{section.eyebrow}</p>
                  <h3>{section.title}</h3>
                  <span>{section.description}</span>
                  <div className="fashionistas-category-footer">
                    <strong>{section.total} styles</strong>
                    <em>{section.featuredProductTitle || 'Shop now'}</em>
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
              Shop The Edit
            </Link>
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
                  Shop The Edit
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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">New Arrivals</p>
            <h2 className="fashionistas-display-title">Just in.</h2>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="product-grid">
                {featuredProducts.map((product) => (
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
    </>
  );
}
