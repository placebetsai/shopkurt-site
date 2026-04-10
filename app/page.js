import Link from 'next/link';
import { getProducts, formatPrice } from '../lib/shopify';

export default async function HomePage() {
  let products = [];

  try {
    products = await getProducts(12);
  } catch (err) {
    console.error('Failed to fetch products:', err.message);
  }

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Fashionistas.ai</h1>
          <p>Trending Products. Fast Shipping. Best Prices.</p>
          <Link href="/products" className="btn btn-primary">
            Shop All Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>Coming Soon</h2>
              <p>We&apos;re loading up our store with amazing products. Check back soon!</p>
            </div>
          )}

          {products.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <Link href="/products" className="btn btn-outline">
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRangeV2.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const discountPercent = hasDiscount
    ? Math.round(
        (1 - parseFloat(price.amount) / parseFloat(compareAt.amount)) * 100
      )
    : 0;

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      <div className="product-card-image">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            width={600}
            height={600}
            loading="lazy"
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">
          <span className="price-current">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <>
              <span className="price-compare">
                {formatPrice(compareAt.amount, compareAt.currencyCode)}
              </span>
              <span className="price-badge">-{discountPercent}%</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
