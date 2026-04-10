import Link from 'next/link';
import { formatPrice } from '../lib/shopify';

export default function ProductCard({ product }) {
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
        {hasDiscount && (
          <span className="product-card-badge">-{discountPercent}%</span>
        )}
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-price">
          <span className="price-current">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="price-compare">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
