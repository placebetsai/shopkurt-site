import Link from 'next/link';
import { formatPrice } from '../lib/shopify';
import { getCategoryForProduct, getProductBadge } from '../lib/merchandising';

export default function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRangeV2.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantCompareAtPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);
  const category = getCategoryForProduct(product);
  const label = category.eyebrow;
  const badge = getProductBadge(product);
  const note = hasDiscount ? 'Marked down now' : category.cardNote || category.description;
  const priceText = formatPrice(price.amount, price.currencyCode);
  const compareText = hasDiscount
    ? formatPrice(compareAt.amount, compareAt.currencyCode)
    : null;

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      <div className="product-card-image">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            width={600}
            height={800}
            loading="lazy"
          />
        ) : (
          <div className="no-image">No Image</div>
        )}
        {badge && <span className="product-card-badge">{badge}</span>}
        <div className="product-card-overlay">
          <span>{label}</span>
          <strong>{priceText}</strong>
        </div>
      </div>
      <div className="product-card-body">
        <p className="product-card-brand">{label}</p>
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">
          <span className="price-current">{priceText}</span>
          {compareText && <span className="price-compare">{compareText}</span>}
        </div>
        <p className="product-card-note">{note}</p>
        <p className="product-card-cta">Open product</p>
      </div>
    </Link>
  );
}
