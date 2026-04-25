import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import {
  getProducts,
  getProductsByCollectionSorted,
} from '../../../lib/shopify';
import { getMerchandiseableProducts } from '../../../lib/merchandising';

export const runtime = 'edge';
export const dynamicParams = true;

const COLLECTION_FALLBACKS = {
  dresses: {
    title: 'Dresses',
    query: 'dress',
    titleTokens: ['dress', 'gown'],
    excludeTokens: ['sandal', 'shoe', 'heel', 'boot', 'bag', 'purse'],
  },
  tops: {
    title: 'Tops',
    query: 'top OR blouse OR bodysuit OR sweater OR tee OR tank',
    titleTokens: ['top', 'blouse', 'bodysuit', 'sweater', 'tee', 't-shirt', 'tank', 'cardigan', 'shirt'],
    excludeTokens: ['dress', 'pant', 'skirt', 'short', 'jean', 'bag', 'shoe', 'heel', 'sandal'],
  },
  bottoms: {
    title: 'Bottoms',
    query: 'jean OR denim OR pant OR trouser OR skirt OR short',
    titleTokens: ['jean', 'denim', 'pant', 'trouser', 'skirt', 'short', 'legging'],
    excludeTokens: ['top', 'dress', 'bag', 'shoe', 'sandal'],
  },
  'sets-jumpsuits': {
    title: 'Sets & Jumpsuits',
    query: 'jumpsuit OR romper OR playsuit OR "two piece"',
    titleTokens: ['jumpsuit', 'romper', 'playsuit', 'two-piece', 'two piece'],
    excludeTokens: ['set of', 'chair', 'lamp'],
  },
  outerwear: {
    title: 'Outerwear',
    query: 'jacket OR trench OR blazer OR coat OR parka',
    titleTokens: ['jacket', 'trench', 'blazer', 'coat', 'parka'],
    excludeTokens: ['bag', 'shoe'],
  },
  bags: {
    title: 'Bags',
    query: 'bag OR purse OR tote OR clutch OR backpack OR handbag',
    titleTokens: ['bag', 'purse', 'tote', 'clutch', 'backpack', 'handbag', 'wallet', 'crossbody'],
    excludeTokens: ['camera', 'sleeping bag', 'trash bag'],
  },
  jewelry: {
    title: 'Jewelry',
    query: 'jewelry OR necklace OR bracelet OR earring OR ring OR pendant',
    titleTokens: ['necklace', 'bracelet', 'earring', 'ring', 'pendant', 'jewelry', 'jewellery', 'choker', 'anklet'],
    excludeTokens: ['airtag', 'phone case', 'camera'],
  },
  sale: {
    title: 'Sale',
    query: 'sale OR clearance OR discount',
    titleTokens: [],
    excludeTokens: [],
  },
  'hidden-cameras': {
    title: 'Hidden Cameras',
    query: '"hidden camera" OR pinhole OR "spy camera" OR "nanny cam"',
    titleTokens: ['hidden camera', 'spy camera', 'pinhole', 'nanny cam', 'mini camera', 'mini cam'],
    excludeTokens: ['doorbell', 'outdoor', 'dash'],
  },
  'outdoor-cameras': {
    title: 'Outdoor Cameras',
    query: '"outdoor camera" OR "solar camera" OR "bullet camera" OR "ptz camera"',
    titleTokens: ['outdoor', 'solar', 'bullet camera', 'ptz', 'weatherproof'],
    excludeTokens: ['doorbell', 'dash', 'indoor'],
  },
  'indoor-cameras': {
    title: 'Indoor Cameras',
    query: '"indoor camera" OR ptz OR pan-tilt',
    titleTokens: ['indoor', 'pan-tilt', 'ptz', 'pan tilt'],
    excludeTokens: ['outdoor', 'doorbell', 'dash'],
  },
  'doorbell-cameras': {
    title: 'Doorbell Cameras',
    query: '"doorbell camera" OR "video doorbell"',
    titleTokens: ['doorbell'],
    excludeTokens: [],
  },
  'nanny-cameras': {
    title: 'Nanny Cameras',
    query: '"nanny cam" OR "baby monitor" OR "pet monitor"',
    titleTokens: ['nanny', 'baby monitor', 'pet monitor'],
    excludeTokens: [],
  },
  'dash-cameras': {
    title: 'Dash Cameras',
    query: 'dashcam OR "dash cam" OR "dash camera" OR carplay',
    titleTokens: ['dashcam', 'dash cam', 'dash camera', 'carplay', 'car camera', 'dvr'],
    excludeTokens: ['doorbell', 'indoor', 'outdoor'],
  },
};

function dedupeByHandle(products) {
  const seen = new Set();
  const out = [];
  for (const p of products) {
    const rawHandle = p.handle || p.id || '';
    const normalized = String(rawHandle).replace(/-\d+$/, '').toLowerCase();
    const titleKey = (p.title || '').trim().toLowerCase();
    const key = normalized || titleKey;
    if (seen.has(key)) continue;
    if (titleKey && seen.has('t:' + titleKey)) continue;
    seen.add(key);
    if (titleKey) seen.add('t:' + titleKey);
    out.push(p);
  }
  return out;
}

function filterByTitleTokens(products, includeTokens, excludeTokens) {
  if (!includeTokens || includeTokens.length === 0) return products;
  const inc = includeTokens.map((t) => t.toLowerCase());
  const exc = (excludeTokens || []).map((t) => t.toLowerCase());
  return products.filter((p) => {
    const title = (p.title || '').toLowerCase();
    if (exc.some((t) => title.includes(t))) return false;
    return inc.some((t) => title.includes(t));
  });
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const title = handle
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const url = `https://fashionistas.ai/collections/${handle}`;
  const description = `Shop the ${title} collection at Fashionistas. New styles, weekly drops, free shipping over $50.`;
  const ogImage = `https://fashionistas.ai/opengraph-image`;

  return {
    title: `${title} | Fashionistas`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Fashionistas`,
      description,
      url,
      siteName: 'Fashionistas',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${title} — Fashionistas.ai` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Fashionistas`,
      description,
      images: [ogImage],
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

  return `Shop the ${title} collection.`;
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

async function getFallbackCollection(handle) {
  const fallback = COLLECTION_FALLBACKS[handle];
  if (!fallback) return null;

  const raw = await getProducts(120, fallback.query, 'CREATED_AT');
  if (!raw?.length) return null;

  const deduped = dedupeByHandle(raw);
  const relevant = filterByTitleTokens(deduped, fallback.titleTokens, fallback.excludeTokens);
  const products = relevant.length > 0 ? relevant : deduped;

  return {
    id: `fallback-${handle}`,
    title: fallback.title,
    handle,
    description: '',
    image: null,
    products,
  };
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
    try {
      collection = await getFallbackCollection(handle);
    } catch (err) {
      console.error('Failed to fetch fallback collection:', err.message);
    }
  }

  if (collection && Array.isArray(collection.products)) {
    collection.products = dedupeByHandle(collection.products);
    const merchOnly = getMerchandiseableProducts(collection.products);
    if (merchOnly.length > 0) collection.products = merchOnly;
    const tokens = COLLECTION_FALLBACKS[handle];
    if (tokens?.titleTokens?.length) {
      const filtered = filterByTitleTokens(
        collection.products,
        tokens.titleTokens,
        tokens.excludeTokens,
      );
      if (filtered.length > 0) collection.products = filtered;
    }
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
