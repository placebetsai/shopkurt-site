import Link from 'next/link';
import { getCollections } from '../../lib/shopify';

const BLOCKED_COLLECTION_PATTERNS = [
  'security',
  'camera',
  'hidden',
  'nanny',
  'doorbell',
  'dash',
  'placebets',
  'spanishtvshows',
  'ihatecollege',
  'dorm',
  'frontpage',
  'rn-image',
  'page-',
];

export const metadata = {
  title: 'Shop All Collections | Fashionistas',
  description:
    'Shop shoes, accessories, beauty, and more at Fashionistas. Browse every active collection.',
  alternates: {
    canonical: 'https://fashionistas.ai/collections',
  },
  openGraph: {
    title: 'Shop All Collections | Fashionistas',
    description: 'Shop shoes, accessories, beauty, and giftable finds.',
    url: 'https://fashionistas.ai/collections',
  },
};

const FEATURED_PATHS = [
  { href: '/interview-shoes', label: 'Interview Shoes' },
  { href: '/vacation-sandals', label: 'Vacation Sandals' },
  { href: '/trending-accessories', label: 'Trending Accessories' },
  { href: '/collections/fashion', label: 'Shop Fashion' },
  { href: '/products', label: 'All Products' },
];

function collectionMood(handle) {
  const normalized = handle.toLowerCase();

  if (normalized.includes('fashion')) {
    return 'Shoes, outfit anchors, and core style pieces.';
  }
  if (normalized.includes('accessories')) {
    return 'Jewelry, bags, and finishing pieces.';
  }
  if (normalized.includes('beauty')) {
    return 'Beauty, fragrance, and prep-table picks.';
  }
  if (normalized.includes('trending')) {
    return 'This week’s most-shopped styles.';
  }
  return 'Shop the collection.';
}

export default async function CollectionsPage() {
  let collections = [];

  try {
    collections = await getCollections();
  } catch (err) {
    console.error('Failed to fetch collections:', err.message);
  }

  const visibleCollections = collections
    .filter((collection) => (collection.productCount || 0) > 0)
    .filter((collection) => {
      const haystack = `${collection.handle} ${collection.title}`.toLowerCase();
      return !BLOCKED_COLLECTION_PATTERNS.some((pattern) => haystack.includes(pattern));
    });

  return (
    <div className="fashionistas-collections-page">
      <section className="fashionistas-collections-hero">
        <div className="container">
          <div className="fashionistas-section-head">
            <p className="fashionistas-kicker">Collections</p>
            <h1 className="fashionistas-display-title">Shop by category.</h1>
            <p className="fashionistas-lead">
              Shoes, accessories, beauty, and more. Every collection, in one place.
            </p>
          </div>
          <div className="fashionistas-collections-links">
            {FEATURED_PATHS.map((item) => (
              <Link key={item.href} href={item.href} className="fashionistas-chip-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {visibleCollections.length > 0 ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="fashionistas-collections-grid">
              {visibleCollections.map((collection) => (
                <Link key={collection.id} href={`/collections/${collection.handle}`} className="fashionistas-collection-tile">
                  <div className="fashionistas-collection-tile-media">
                    {collection.image?.url ? (
                      <img
                        src={collection.image.url}
                        alt={collection.image.altText || collection.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="fashionistas-collection-fallback">
                        <span>{collection.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="fashionistas-collection-tile-copy">
                    <p>{collection.productCount} products</p>
                    <h2>{collection.title}</h2>
                    <span>{collectionMood(collection.handle)}</span>
                    <strong>Shop collection</strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="empty-state">
          <h2>Restocking</h2>
          <p>New collections are loading — check back shortly.</p>
          <div style={{ marginTop: '24px' }}>
            <Link href="/products" className="btn btn-outline">
              Shop All Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
