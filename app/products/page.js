import { getProducts } from '../../lib/shopify';
import ProductsGrid from '../../components/ProductsGrid';


export const metadata = {
  title: 'All Products | Fashionistas.ai',
  description:
    'Browse trending shoes, affordable accessories, and everyday fashion at Fashionistas.ai. Shop categories built for TikTok finds, seasonal style, and giftable picks.',
  alternates: {
    canonical: 'https://fashionistas.ai/products',
  },
};

export default async function ProductsPage() {
  let products = [];

  try {
    products = await getProducts(50);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>All Products</h1>
        <p
          style={{
            maxWidth: 680,
            margin: '18px auto 0',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontSize: '0.95rem',
          }}
        >
          Fashionistas.ai is strongest when it helps shoppers find high-visual
          products quickly: wedges, sandals, standout accessories, and easy
          gifting picks that look good on TikTok and still convert on Shopify,
          Google Shopping, and eBay.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
            marginTop: 28,
          }}
        >
          {[
            { href: '/interview-shoes', label: 'Interview Shoes' },
            { href: '/vacation-sandals', label: 'Vacation Sandals' },
            { href: '/trending-accessories', label: 'Trending Accessories' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                border: '1px solid var(--border-hover)',
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '12px 18px',
                fontSize: '0.72rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {products.length > 0 ? (
        <ProductsGrid products={products} />
      ) : (
        <div className="empty-state">
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: '#8a8580' }}>
            New arrivals coming soon.
          </p>
        </div>
      )}
    </div>
  );
}
