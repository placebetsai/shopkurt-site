import { getProducts } from '../../lib/shopify';
import Link from 'next/link';
import ProductsGrid from '../../components/ProductsGrid';
import { getMerchandiseableProducts } from '../../lib/merchandising';

export const runtime = 'edge';

export const metadata = {
  title: 'Shop All Products | Fashionistas',
  description:
    'Shop shoes, bags, jewelry, beauty, and new arrivals at Fashionistas. Free shipping over $50.',
  alternates: {
    canonical: 'https://fashionistas.ai/products',
  },
};

// Category label → tokens that should appear in title/productType/tags.
// Widened so "Heels" catches "Block Heel", "Mary Jane Heels", etc.
const CATEGORY_TOKENS = {
  'Heels': ['heel', 'stiletto', 'pump'],
  'Sandals': ['sandal', 'slide', 'flip'],
  'Flats': ['flat', 'ballet', 'mule', 'slipper'],
  'Loafers': ['loafer', 'derby', 'moccasin'],
  'Sneakers': ['sneaker', 'trainer'],
  'Boots': ['boot', 'bootie'],
  'Jeans': ['jean', 'denim'],
  'Pants': ['pant', 'trouser', 'legging', 'palazzo', 'cargo'],
  'Skirts': ['skirt'],
  'Shorts': ['short'],
  'Mini Dresses': ['mini dress', 'short dress'],
  'Midi Dresses': ['midi dress'],
  'Maxi Dresses': ['maxi dress', 'long dress'],
  'Going Out Dresses': ['going out', 'club dress', 'party dress', 'cocktail'],
  'Wedding Guest': ['wedding guest', 'formal dress'],
  'Casual Dresses': ['casual dress', 'everyday dress', 'sundress'],
  'Crop Tops': ['crop top', 'crop tank'],
  'Bodysuits': ['bodysuit', 'leotard'],
  'Blouses': ['blouse', 'shirt'],
  'Tees & Tanks': ['tee', 't-shirt', 'tank'],
  'Sweaters': ['sweater', 'cardigan', 'knit', 'pullover'],
  'Matching Sets': ['set', 'two-piece', 'two piece'],
  'Jumpsuits': ['jumpsuit'],
  'Rompers': ['romper', 'playsuit'],
  'Jackets': ['jacket'],
  'Trench': ['trench'],
  'Blazers': ['blazer'],
  'Scarves': ['scarf', 'neckerchief'],
  'Sunglasses': ['sunglass', 'shade'],
  'Hair': ['hair clip', 'claw clip', 'scrunchie', 'headband', 'hair tie'],
};

const AESTHETIC_TOKENS = {
  'coquette': ['bow', 'ribbon', 'lace', 'pearl', 'rose', 'butterfly'],
  'bourgeois': ['trench', 'loafer', 'blazer', 'silk', 'cashmere', 'pearl'],
  'y2k': ['low-rise', 'baby tee', 'rhinestone', 'platform', 'crop'],
  'boho': ['boho', 'flowy', 'fringe', 'paisley', 'crochet', 'espadrille'],
  '80s-power': ['blazer', 'power', 'oversized', 'shoulder'],
};

function filterByTokens(products, tokens) {
  if (!tokens || tokens.length === 0) return products;
  const regex = new RegExp(tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');
  return products.filter((p) => {
    const hay = `${p.title || ''} ${p.productType || ''} ${(p.tags || []).join(' ')}`;
    return regex.test(hay);
  });
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const categoryRaw = typeof params?.category === 'string' ? params.category : '';
  const aestheticRaw = typeof params?.aesthetic === 'string' ? params.aesthetic.toLowerCase() : '';

  let products = [];

  try {
    products = await getProducts(250);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  const merchProducts = getMerchandiseableProducts(products);
  let displayProducts = merchProducts.length >= 12 ? merchProducts : products;

  let filterLabel = null;
  let filterEyebrow = 'Shop All';

  let filterHadNoMatches = false;
  if (categoryRaw) {
    const tokens = CATEGORY_TOKENS[categoryRaw] || [categoryRaw.toLowerCase()];
    const filtered = filterByTokens(displayProducts, tokens);
    if (filtered.length > 0) displayProducts = filtered;
    else { displayProducts = []; filterHadNoMatches = true; }
    filterLabel = categoryRaw;
    filterEyebrow = 'Category';
  } else if (aestheticRaw && aestheticRaw !== 'all') {
    const tokens = AESTHETIC_TOKENS[aestheticRaw] || [aestheticRaw];
    const filtered = filterByTokens(displayProducts, tokens);
    if (filtered.length > 0) displayProducts = filtered;
    else { displayProducts = []; filterHadNoMatches = true; }
    filterLabel = aestheticRaw.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    filterEyebrow = 'Aesthetic';
  }

  const heading = filterLabel ? `${filterLabel}` : 'All Products';
  const intro = filterHadNoMatches
    ? `No ${filterLabel} in stock right now — new drops weekly.`
    : filterLabel
      ? `Showing ${displayProducts.length} ${displayProducts.length === 1 ? 'piece' : 'pieces'} matching ${filterLabel}.`
      : 'Shoes, bags, jewelry, beauty, and new arrivals — all in one place.';

  return (
    <div className="container">
      <div className="page-header">
        <p className="fashionistas-kicker" style={{ marginTop: '52px', textAlign: 'center' }}>
          {filterEyebrow}
        </p>
        <h1>{heading}</h1>
        <p className="fashionistas-page-intro">{intro}</p>
        <div className="fashionistas-chip-row">
          {[
            { href: '/products', label: 'Shop All' },
            { href: '/interview-shoes', label: 'Interview Shoes' },
            { href: '/vacation-sandals', label: 'Vacation Sandals' },
            { href: '/trending-accessories', label: 'Trending Accessories' },
            { href: '/collections', label: 'Shop All Collections' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="fashionistas-chip-link"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {displayProducts.length > 0 ? (
        <ProductsGrid products={displayProducts} />
      ) : (
        <div className="empty-state" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#e6e0d8', marginBottom: '0.5rem' }}>
            {filterLabel ? `${filterLabel} is empty right now.` : 'Nothing to show yet.'}
          </p>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.08em', color: '#8a8580', marginBottom: '1.5rem' }}>
            New drops land weekly — check related categories below.
          </p>
          <div className="fashionistas-chip-row" style={{ justifyContent: 'center' }}>
            <Link href="/products" className="fashionistas-chip-link">Shop All Products</Link>
            <Link href="/collections" className="fashionistas-chip-link">All Collections</Link>
            <Link href="/collections/trending-items" className="fashionistas-chip-link">Trending</Link>
          </div>
        </div>
      )}
    </div>
  );
}
