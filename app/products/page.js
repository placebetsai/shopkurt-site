import { getProducts } from '../../lib/shopify';
import ProductCard from '../../components/ProductCard';
import AdUnit from '../../components/AdUnit';

export const metadata = {
  title: 'Shop All Products | Fashionistas.ai',
  description:
    'Browse all trending products at Fashionistas.ai. Kitchen gadgets, beauty tools, phone accessories, pet products, and more. Fast shipping, best prices.',
};

export default async function ProductsPage() {
  let products = [];

  try {
    products = await getProducts(50);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  // Split products into rows of 4 for ad insertion
  const rows = [];
  for (let i = 0; i < products.length; i += 4) {
    rows.push(products.slice(i, i + 4));
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shop All Products</h1>
        <p>Discover trending products with fast shipping and the best prices</p>
      </div>

      {products.length > 0 ? (
        <div style={{ paddingBottom: '80px' }}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              <div className="product-grid">
                {row.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {/* Ad between every 2 rows */}
              {rowIndex % 2 === 1 && rowIndex < rows.length - 1 && (
                <AdUnit format="horizontal" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No Products Yet</h2>
          <p>
            Our store is being stocked with amazing products. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
