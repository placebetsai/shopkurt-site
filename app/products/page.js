import { getProducts } from '../../lib/shopify';
import ProductsGrid from '../../components/ProductsGrid';


export const metadata = {
  title: 'All Products | Fashionistas.ai',
  description:
    'Browse the full collection at Fashionistas.ai. Beauty, jewelry, shoes, accessories, and more. Curated for the modern woman.',
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
