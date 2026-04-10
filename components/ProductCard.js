import Link from 'next/link';
import { formatPrice } from '../lib/shopify';

export default function ProductCard({ product }) {
  const image = product.images.edges[0]?.node;
  const price = product.priceRangeV2.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantCompareAtPrice;
  const hasDiscount =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

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
        {hasDiscount && (
          <span className="product-card-badge">Sale</span>
        )}
        <div className="product-card-quick">
          <button>Quick Add</button>
        </div>
      </div>
      <div className="product-card-body">
        <p className="product-card-brand">Fashionistas</p>
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
