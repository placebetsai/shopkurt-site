import Link from 'next/link';
import { getCollections } from '../../lib/shopify';

export const metadata = {
  title: 'Collections | Fashionistas.ai',
  description:
    'Browse Fashionistas.ai collections for wedges, sandals, boots, jewelry, bags, and trend-led accessories. Shop curated categories built for search, gifting, and seasonal style.',
  alternates: {
    canonical: 'https://fashionistas.ai/collections',
  },
  openGraph: {
    title: 'Collections | Fashionistas.ai',
    description: 'Shop collections for shoes, accessories, and affordable trend-led style.',
    url: 'https://fashionistas.ai/collections',
  },
};

export default async function CollectionsPage() {
  let collections = [];

  try {
    collections = await getCollections();
  } catch (err) {
    console.error('Failed to fetch collections:', err.message);
  }

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px 60px',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            color: '#fff',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Collections
        </h1>
        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#c9a96e',
            margin: '24px auto 0',
          }}
        />
        <p
          style={{
            maxWidth: 720,
            margin: '24px auto 0',
            color: '#9a948d',
            lineHeight: 1.8,
            fontSize: '0.95rem',
          }}
        >
          These category pages are where Fashionistas.ai gets sharper: shoes
          that solve a specific occasion, accessories that lift a basic outfit,
          and seasonal trends grouped in a way that is easier to shop than a
          generic catalog feed.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginTop: '28px',
          }}
        >
          {[
            { href: '/interview-shoes', label: 'Interview Shoes' },
            { href: '/vacation-sandals', label: 'Vacation Sandals' },
            { href: '/trending-accessories', label: 'Trending Accessories' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'inline-block',
                padding: '12px 18px',
                border: '1px solid #2a2622',
                color: '#fff',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {collections.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4px',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px 100px',
          }}
        >
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              style={{
                position: 'relative',
                display: 'block',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              {collection.image ? (
                <img
                  src={collection.image.url}
                  alt={collection.image.altText || collection.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease, filter 0.4s ease',
                  }}
                  loading="lazy"
                  onMouseOver="this.style.transform='scale(1.03)';this.style.filter='brightness(0.7)'"
                  onMouseOut="this.style.transform='scale(1)';this.style.filter='brightness(0.85)'"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              )}
              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: collection.image
                    ? 'linear-gradient(transparent 40%, rgba(5,5,5,0.7))'
                    : 'transparent',
                  pointerEvents: 'none',
                }}
              />
              {/* Text overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '40px 32px',
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    fontWeight: '400',
                    color: '#fff',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {collection.title}
                </h2>
                {collection.productCount > 0 && (
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#c9a96e',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginTop: '8px',
                    }}
                  >
                    {collection.productCount}{' '}
                    {collection.productCount === 1 ? 'PIECE' : 'PIECES'}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
          }}
        >
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: '300',
              color: '#c9a96e',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Coming Soon
          </h2>
          <p
            style={{
              color: '#888',
              fontSize: '0.95rem',
              marginTop: '12px',
              lineHeight: '1.8',
            }}
          >
            Our curated collections are being prepared.
          </p>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              marginTop: '32px',
              padding: '14px 40px',
              border: '1px solid #c9a96e',
              color: '#c9a96e',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
