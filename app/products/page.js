import { getProducts } from '../../lib/shopify';
import Link from 'next/link';
import ProductsGrid from '../../components/ProductsGrid';
import { getMerchandiseableProducts } from '../../lib/merchandising';


export const metadata = {
  title: 'Shop All Products | Fashionistas',
  description:
    'Shop shoes, bags, jewelry, beauty, and new arrivals at Fashionistas. Free shipping over $50.',
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

  const merchProducts = getMerchandiseableProducts(products);
  const displayProducts = merchProducts.length >= 12 ? merchProducts : products;

  return (
    <div className="container">
      <div className="page-header">
        <p className="fashionistas-kicker" style={{ marginTop: '52px', textAlign: 'center' }}>
          Shop All
        </p>
        <h1>All Products</h1>
        <p className="fashionistas-page-intro">
          Shoes, bags, jewelry, beauty, and new arrivals — all in one place.
        </p>
        <div className="fashionistas-chip-row">
          {[
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
        <div className="empty-state">
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: '#8a8580' }}>
            New arrivals loading — check back shortly.
          </p>
        </div>
      )}
    </div>
  );
}
