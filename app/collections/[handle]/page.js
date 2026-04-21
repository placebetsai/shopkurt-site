export const runtime = "edge";
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import {
  getProductsByCollectionSorted,
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
    description: `Shop the ${title} collection at Fashionistas.ai. Browse affordable shoes, standout accessories, and trend-led pieces with fast US shipping.`,
    alternates: {
      canonical: `https://fashionistas.ai/collections/${handle}`,
    },
    openGraph: {
      title: `${title} | Fashionistas.ai`,
      description: `Explore the ${title} collection with affordable pricing, fast shipping, and stronger occasion-based style.`,
      url: `https://fashionistas.ai/collections/${handle}`,
    },
  };
}

function buildCollectionStory(handle, title) {
  const normalized = handle.toLowerCase();
  if (normalized.includes('shoe') || normalized.includes('heel') || normalized.includes('sandal') || normalized.includes('boot')) {
    return `This collection is built around occasion-ready footwear that photographs well, travels well, and gives shoppers a clear reason to buy now instead of later.`;
  }
  if (normalized.includes('bag') || normalized.includes('accessor') || normalized.includes('jewel')) {
    return `These are the add-on pieces that lift average order value: giftable accessories, easy styling upgrades, and trend-right items that work across TikTok, Shopify, and marketplace traffic.`;
  }
  return `Fashionistas.ai uses collection pages to turn broad browsing into intent-based shopping, with cleaner grouping, stronger pricing context, and products that fit a real style moment.`;
}

function getCollectionLead(handle, title) {
  const normalized = handle.toLowerCase();
  if (normalized.includes('fashion')) {
    return 'The main fashion lane: shoes, styling pieces, and trend-led catalog anchors.';
  }
  if (normalized.includes('accessories')) {
    return 'Small-ticket add-ons, gifting pieces, and faster impulse buys that lift average order value.';
  }
  if (normalized.includes('beauty')) {
    return 'Beauty and personal-care picks edited to feel more current than a generic marketplace shelf.';
  }
  if (normalized.includes('security')) {
    return 'A separate surveillance lane so the camera inventory stays searchable without muddying the main fashion edit.';
  }
  if (normalized.includes('trending')) {
    return 'A rolling collection of higher-momentum items and lower-friction impulse clicks.';
  }
  return `${title} is curated as a searchable lane inside Fashionistas.ai, not just a back-office category handle.`;
}

function sanitizeCollectionDescription(description) {
  if (!description) return '';
  const normalized = description.trim().toLowerCase();
  const blocked = [
    'put your category description here',
    'put your collection description here',
    'add your collection description',
    'describe your collection',
    'collection description',
    'category description',
  ];
  if (blocked.some((phrase) => normalized.includes(phrase))) {
    return '';
  }
  if (normalized.length < 20) {
    return '';
  }
  return description.trim();
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
  const collectionStory = buildCollectionStory(handle, collection.title);
  const collectionLead = getCollectionLead(handle, collection.title);
  const displayDescription = sanitizeCollectionDescription(collection.description);

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
      <div className="container" style={{ paddingTop: '44px', paddingBottom: '28px' }}>
        <div className="fashionistas-collection-hero">
          <div className="fashionistas-collection-copy">
            <p className="fashionistas-kicker">Collection Edit</p>
            <h1>{collection.title}</h1>
            <p className="fashionistas-collection-lead">{collectionLead}</p>
            {displayDescription && (
              <p className="fashionistas-collection-description">{displayDescription}</p>
            )}
            <p className="fashionistas-collection-story">{collectionStory}</p>
            <div className="fashionistas-collection-stats">
              <span>{collection.products.length} {collection.products.length === 1 ? 'piece' : 'pieces'}</span>
              <span>intent-led merchandising</span>
              <span>live Shopify inventory</span>
            </div>
          </div>

          <div className="fashionistas-collection-visual">
            {collection.image?.url ? (
              <img
                src={collection.image.url}
                alt={collection.image.altText || collection.title}
                className="fashionistas-collection-image"
              />
            ) : (
              <div className="fashionistas-collection-fallback">
                <span>{collection.title}</span>
              </div>
            )}
          </div>
        </div>
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

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px 28px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { href: '/interview-shoes', label: 'Shop Interview Shoes' },
          { href: '/vacation-sandals', label: 'Shop Vacation Sandals' },
          { href: '/trending-accessories', label: 'Shop Trending Accessories' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'inline-block',
              padding: '12px 16px',
              border: '1px solid #2a2622',
              color: '#c9a96e',
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

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
