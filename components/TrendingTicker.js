import Link from 'next/link';
import CatchPhrase from './CatchPhrase';
import { getProducts, formatPrice } from '../lib/shopify';

const TICKER_PHRASES = [
  'Trending now',
  'Going viral',
  'Flying off shelves',
  'Hot right now',
  "Editor's radar",
  'Cult favorites',
  'Most-loved',
  'Top picks today',
  'Selling fast',
];

// Server component — fetches live trending products on every request (edge runtime
// on the parent page revalidates via its own settings). Renders a continuously
// scrolling marquee linking to each product detail page.
export default async function TrendingTicker() {
  let products = [];
  try {
    // Pull the 20 most recently-published in-stock items — that's our "trending today"
    products = await getProducts(20, '', 'CREATED_AT');
  } catch {
    return null;
  }

  const items = (products || [])
    .filter((p) => p.images?.edges?.length && p.variants?.edges?.[0]?.node?.availableForSale)
    .slice(0, 20);

  if (items.length < 4) return null;

  // Duplicate the list so the marquee scrolls continuously
  const loop = [...items, ...items];

  return (
    <div className="fashionistas-trend-ticker" aria-label="Trending products right now">
      <div className="fashionistas-trend-ticker-badge">
        <span className="live-dot" />
        <CatchPhrase phrases={TICKER_PHRASES} interval={2800} className="fashionistas-trend-ticker-label" />
      </div>
      <div className="fashionistas-trend-ticker-track">
        {loop.map((p, i) => {
          const price = p.priceRangeV2?.minVariantPrice?.amount;
          const img = p.images.edges[0]?.node?.url;
          return (
            <Link
              key={`${p.id}-${i}`}
              href={`/products/${p.handle}`}
              className="fashionistas-trend-item"
              prefetch={false}
            >
              <img src={img + '?width=80'} alt={p.title} loading="lazy" width={40} height={40} />
              <span className="fashionistas-trend-title">{p.title}</span>
              {price && <span className="fashionistas-trend-price">{formatPrice(price)}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
