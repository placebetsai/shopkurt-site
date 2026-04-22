import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import {
  getAllCollectionHandles,
  getProductsByCollectionSorted,
} from '../../../lib/shopify';

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const handles = await getAllCollectionHandles();
    return handles.map((collection) => ({ handle: collection.handle }));
  } catch (err) {
    console.error('Failed to generate collection params:', err.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const title = handle
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${title} | Fashionistas`,
    description: `Shop the ${title} collection at Fashionistas. New styles, weekly drops, and free shipping over $50.`,
    alternates: {
      canonical: `https://fashionistas.ai/collections/${handle}`,
    },
    openGraph: {
      title: `${title} | Fashionistas`,
      description: `Shop the ${title} collection at Fashionistas.`,
      url: `https://fashionistas.ai/collections/${handle}`,
    },
  };
}

function buildCollectionStory(handle, title) {
  const normalized = handle.toLowerCase();

  if (normalized.includes('shoe') || normalized.includes('heel') || normalized.includes('sandal') || normalized.includes('boot') || normalized.includes('fashion')) {
    return 'Heels, flats, sandals, and boots — picked for everyday wear and special moments.';
  }
  if (normalized.includes('bag') || normalized.includes('accessor') || normalized.includes('jewel')) {
    return 'Jewelry, bags, and finishing pieces to complete the outfit.';
  }
  if (normalized.includes('beauty')) {
    return 'Beauty, fragrance, and everyday picks for your routine.';
  }

  return `Shop the ${title} collection.`;
}

function getCollectionLead(handle, title) {
  const normalized = handle.toLowerCase();

  if (normalized.includes('fashion')) {
    return 'Shoes, outfit anchors, and core style pieces.';
  }
  if (normalized.includes('accessories')) {
    return 'Bags, jewelry, and finishing pieces.';
  }
  if (normalized.includes('beauty')) {
    return 'Beauty, fragrance, and personal-care picks.';
  }
  if (normalized.includes('trending')) {
    return 'This week’s most-shopped styles.';
  }

  return `Shop the ${title} edit.`;
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

  if (blocked.some((phrase) => normalized.includes(phrase)) || normalized.length < 20) {
    return '';
  }

  return description.trim();
}

const RELATED_LINKS = [
  { href: '/collections', label: 'All Collections' },
  { href: '/products', label: 'All Products' },
  { href: '/interview-shoes', label: 'Interview Shoes' },
  { href: '/trending-accessories', label: 'Trending Accessories' },
];

const SUBCATEGORY_MIN = 2;

function slugifyType(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function groupByProductType(products) {
  const groups = new Map();
  for (const product of products) {
    const type = (product.productType || '').trim();
    if (!type) continue;
    if (!groups.has(type)) groups.set(type, []);
    groups.get(type).push(product);
  }
  return Array.from(groups.entries())
    .filter(([, items]) => items.length >= SUBCATEGORY_MIN)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([type, items]) => ({ type, slug: slugifyType(type), items }));
}

export default async function CollectionPage({ params, searchParams }) {
  const { handle } = await params;
  let collection = null;

  try {
    collection = await getProductsByCollectionSorted(handle, 'CREATED', true);
  } catch (err) {
    console.error('Failed to fetch collection:', err.message);
  }

  if (!collection) {
    return (
      <div className="fashionistas-collection-page">
        <div className="container">
          <div className="empty-state fashionistas-empty-panel">
            <h2>Collection Not Found</h2>
            <p>This collection is not available right now.</p>
            <Link href="/collections" className="btn btn-outline">
              Back To Collections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const collectionStory = buildCollectionStory(handle, collection.title);
  const collectionLead = getCollectionLead(handle, collection.title);
  const displayDescription = sanitizeCollectionDescription(collection.description);

  return (
    <div className="fashionistas-collection-page">
      <div className="container">
        <nav className="fashionistas-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/collections">Collections</Link>
          <span>/</span>
          <strong>{collection.title}</strong>
        </nav>

        <section className="fashionistas-collection-hero">
          <div className="fashionistas-collection-copy">
            <p className="fashionistas-kicker">Shop The Collection</p>
            <h1>{collection.title}</h1>
            <p className="fashionistas-collection-lead">{collectionLead}</p>
            {displayDescription && (
              <p className="fashionistas-collection-description">{displayDescription}</p>
            )}
            <p className="fashionistas-collection-story">{collectionStory}</p>
            <div className="fashionistas-collection-stats">
              <span>{collection.products.length} {collection.products.length === 1 ? 'product' : 'products'}</span>
              <span>Newest first</span>
              <span>Free shipping over $50</span>
            </div>
          </div>

          <div className="fashionistas-collection-visual">
            {collection.image?.url && !/rn-image_picker_lib_temp|image_picker_lib_temp|placeholder/i.test(collection.image.url) ? (
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
        </section>

        <section className="fashionistas-collection-toolbar">
          <div className="fashionistas-chip-row">
            {RELATED_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="fashionistas-chip-link">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {(() => {
          const subGroups = groupByProductType(collection.products);
          const showSubs = subGroups.length > 1;

          if (collection.products.length === 0) {
            return (
              <div className="empty-state fashionistas-empty-panel">
                <h2>Restocking</h2>
                <p>This collection is currently empty — check back soon or shop all products.</p>
                <Link href="/products" className="btn btn-outline">
                  Shop All Products
                </Link>
              </div>
            );
          }

          if (!showSubs) {
            return (
              <section className="fashionistas-collection-grid-wrap">
                <div className="product-grid">
                  {collection.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          }

          return (
            <>
              <section className="fashionistas-subcategory-nav" aria-label="Subcategories">
                <div className="fashionistas-chip-row">
                  {subGroups.map((group) => (
                    <a
                      key={group.slug}
                      href={`#${group.slug}`}
                      className="fashionistas-chip-link fashionistas-chip-sub"
                    >
                      {group.type} <span>{group.items.length}</span>
                    </a>
                  ))}
                </div>
              </section>

              {subGroups.map((group) => (
                <section
                  key={group.slug}
                  id={group.slug}
                  className="fashionistas-subcategory-section"
                >
                  <div className="fashionistas-section-head fashionistas-subcategory-head">
                    <p className="fashionistas-kicker">{collection.title}</p>
                    <h2 className="fashionistas-display-title">{group.type}</h2>
                    <span className="fashionistas-subcategory-count">{group.items.length} {group.items.length === 1 ? 'style' : 'styles'}</span>
                  </div>
                  <div className="product-grid">
                    {group.items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </>
          );
        })()}
      </div>
    </div>
  );
}
