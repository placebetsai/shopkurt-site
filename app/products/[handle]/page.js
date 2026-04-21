import {
  getProduct,
  getProducts,
  getAllProductHandles,
  formatPrice,
  getVariantId,
} from '../../../lib/shopify';
import Link from 'next/link';
import ProductCard from '../../../components/ProductCard';
import VariantSelector from '../../../components/VariantSelector';

export async function generateStaticParams() {
  try {
    const handles = await getAllProductHandles();
    return handles.map((product) => ({ handle: product.handle }));
  } catch (err) {
    console.error('Failed to generate product params:', err.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: 'Product Not Found | Fashionistas.ai' };

  const price = product.priceRangeV2.minVariantPrice;
  const image = product.images.edges[0]?.node;
  const url = `https://fashionistas.ai/products/${handle}`;

  return {
    title: `${product.title} | Fashionistas.ai`,
    description:
      product.description?.slice(0, 160) ||
      `Shop ${product.title} at Fashionistas.ai. Curated fashion, fast shipping.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160) || product.title,
      images: image ? [{ url: image.url, width: image.width, height: image.height }] : [],
      type: 'website',
      url,
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
          <p style={{
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8a8580',
            marginBottom: '32px',
          }}>
            This product is no longer available
          </p>
          <Link
            href="/products"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              borderBottom: '1px solid #c9a96e',
              paddingBottom: '4px',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[0];
  const variants = product.variants.edges.map((e) => e.node);
  const minPrice = product.priceRangeV2.minVariantPrice;

  // JSON-LD Product structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || product.title,
    url: `https://fashionistas.ai/products/${handle}`,
    image: images.map((img) => img.url),
    brand: {
      '@type': 'Brand',
      name: product.vendor || 'Fashionistas.ai',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: minPrice.currencyCode,
      lowPrice: minPrice.amount,
      highPrice: product.priceRangeV2.maxVariantPrice.amount,
      availability: variants.some((v) => v.availableForSale)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Fashionistas.ai',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fashionistas.ai',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://fashionistas.ai/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: `https://fashionistas.ai/products/${handle}`,
      },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav
        style={{
          padding: '32px 0 0',
          fontSize: '0.65rem',
          color: '#4a4745',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        <Link href="/" style={{ color: '#4a4745', transition: 'color 0.3s' }}>
          Home
        </Link>
        <span style={{ color: '#2a2725' }}>/</span>
        <Link href="/products" style={{ color: '#4a4745', transition: 'color 0.3s' }}>
          Products
        </Link>
        <span style={{ color: '#2a2725' }}>/</span>
        <span style={{ color: '#8a8580' }}>{product.title}</span>
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
                height={1067}
              />
            ) : (
              <div
                className="no-image"
                style={{ aspectRatio: '3/4', fontSize: '0.8rem', letterSpacing: '0.1em' }}
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
                    alt={img.altText || `${product.title} - Image ${i + 1}`}
                    width={72}
                    height={96}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info">
          {product.productType && (
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4a4745',
            }}>
              {product.productType}
            </span>
          )}

          <h1>{product.title}</h1>

          <hr className="luxury-divider" />

          {/* Variant Selector with integrated price, add to bag, buy now */}
          <VariantSelector
            variants={variants}
            productTitle={product.title}
            productImage={mainImage?.url || ''}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '10px',
              marginTop: '8px',
            }}
          >
            {[
              ['Fast Checkout', 'Buy now routes directly into checkout.'],
              ['Style-First Picks', 'Focused on shoes, accessories, and wearable upgrades.'],
              ['Simple Returns Info', 'Policies are linked clearly before purchase.'],
            ].map(([title, detail]) => (
              <div
                key={title}
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '14px 14px 12px',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div
                  style={{
                    color: '#c9a96e',
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {title}
                </div>
                <div style={{ color: '#8a8580', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  {detail}
                </div>
              </div>
            ))}
          </div>

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
            {product.vendor && <span>Brand: {product.vendor}</span>}
            {product.tags.length > 0 && (
              <span>Tags: {product.tags.join(', ')}</span>
            )}
          </div>

          <div
            style={{
              marginTop: '18px',
              display: 'flex',
              gap: '18px',
              flexWrap: 'wrap',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#8a8580',
            }}
          >
            <Link href="/shipping-policy" style={{ color: '#8a8580' }}>Shipping Policy</Link>
            <Link href="/refund-policy" style={{ color: '#8a8580' }}>Returns & Refunds</Link>
            <Link href="/contact" style={{ color: '#8a8580' }}>Contact Support</Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '80px 0 120px' }}>
          <h2 className="section-title">You May Also Like</h2>
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
