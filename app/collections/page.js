import Link from 'next/link';
import { getCollections } from '../../lib/shopify';

export const metadata = {
  title: 'Collections | Fashionistas.ai',
  description:
    'Browse curated product collections at Fashionistas.ai. Kitchen gadgets, beauty tools, phone accessories, pet products, and more.',
};

export default async function CollectionsPage() {
  let collections = [];

  try {
    collections = await getCollections();
  } catch (err) {
    console.error('Failed to fetch collections:', err.message);
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Collections</h1>
        <p>Browse our curated product collections</p>
      </div>

      {collections.length > 0 ? (
        <div className="product-grid" style={{ paddingBottom: '80px' }}>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="product-card"
            >
              <div className="product-card-image">
                {collection.image ? (
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image" style={{ aspectRatio: '1' }}>
                    {collection.title}
                  </div>
                )}
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">{collection.title}</h3>
                {collection.description && (
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      marginTop: '4px',
                    }}
                  >
                    {collection.description.slice(0, 100)}
                    {collection.description.length > 100 ? '...' : ''}
                  </p>
                )}
                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    marginTop: '8px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {collection.productCount}{' '}
                  {collection.productCount === 1 ? 'product' : 'products'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No Collections Yet</h2>
          <p>Collections will appear here once they are set up in our store.</p>
          <Link
            href="/products"
            className="btn btn-outline"
            style={{ marginTop: '24px' }}
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
