import {
  getProduct,
  getProducts,
  formatPrice,
  getVariantId,
} from '../../../lib/shopify';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import VariantSelector from '../../../components/VariantSelector';

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Product Not Found | Fashionistas.ai' };

  const price = product.priceRangeV2.minVariantPrice;
  const image = product.images.edges[0]?.node;

  return {
    title: `${product.title} | Fashionistas.ai`,
    description:
      product.description?.slice(0, 160) ||
      `Shop ${product.title} at Fashionistas.ai. Fast shipping, best prices.`,
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160) || product.title,
      images: image ? [{ url: image.url, width: image.width, height: image.height }] : [],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }) {
  const { handle } = await params;
  let product = null;

  try {
    product = await getProduct(handle);
  } catch (err) {
    console.error('Failed to fetch product:', err.message);
  }

  if (!product) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Product Not Found</h2>
          <p>This product may no longer be available.</p>
          <Link
            href="/products"
            className="btn btn-outline"
            style={{ marginTop: '24px' }}
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[0];
  const variants = product.variants.edges.map((e) => e.node);

  // Fetch related products
  let relatedProducts = [];
  try {
    const allProducts = await getProducts(20);
    relatedProducts = allProducts
      .filter((p) => p.handle !== handle)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  } catch (err) {
    console.error('Failed to fetch related products:', err.message);
  }

  return (
    <div className="container">
      {/* Breadcrumb */}
      <nav
        style={{
          padding: '24px 0 0',
          fontSize: '0.85rem',
          color: '#888',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/" style={{ color: '#888', transition: 'color 0.2s' }}>
          Home
        </Link>
        <span style={{ color: '#555' }}>/</span>
        <Link href="/products" style={{ color: '#888', transition: 'color 0.2s' }}>
          Products
        </Link>
        <span style={{ color: '#555' }}>/</span>
        <span style={{ color: '#f5f5f5' }}>{product.title}</span>
      </nav>

      {/* Product Detail */}
      <div className="product-detail">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-main-image">
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                width={800}
                height={800}
              />
            ) : (
              <div
                className="no-image"
                style={{ aspectRatio: '1', fontSize: '1rem' }}
              >
                No Image Available
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="product-thumbnails">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`product-thumbnail ${i === 0 ? 'active' : ''}`}
                >
                  <img
                    src={img.url}
                    alt={
                      img.altText || `${product.title} - Image ${i + 1}`
                    }
                    width={72}
                    height={72}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info">
          <h1>{product.title}</h1>

          {/* Variant Selector with integrated price, add to cart, buy now */}
          <VariantSelector
            variants={variants}
            productTitle={product.title}
            productImage={mainImage?.url || ''}
          />

          {/* Description */}
          {product.descriptionHtml ? (
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : product.description ? (
            <div className="product-description">
              <p>{product.description}</p>
            </div>
          ) : null}

          {/* Meta */}
          <div className="product-meta">
            {product.productType && (
              <span>Category: {product.productType}</span>
            )}
            {product.vendor && <span>Brand: {product.vendor}</span>}
            {product.tags.length > 0 && (
              <span>Tags: {product.tags.join(', ')}</span>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '64px 0 80px' }}>
          <h2 className="section-title">You Might Also Like</h2>
          <div className="product-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
