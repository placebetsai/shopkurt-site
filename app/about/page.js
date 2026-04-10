import Link from 'next/link';

export const metadata = {
  title: 'Our Story | Fashionistas.ai',
  description:
    'Fashionistas.ai is a curated fashion destination founded by Israel Joffe in Boca Raton, FL. Trending fashion, beauty, and accessories with fast US shipping.',
  openGraph: {
    title: 'Our Story | Fashionistas.ai',
    description:
      'Curated fashion. Founded by Israel Joffe. Fast US shipping.',
    url: 'https://fashionistas.ai/about',
    images: ['/og-image.svg'],
  },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Quality',
      text: 'Every piece is hand-selected for craftsmanship and style. We partner with trusted suppliers and ship from US-based warehouses for reliable, fast delivery.',
    },
    {
      title: 'Style',
      text: 'We track the pulse of fashion so you don\'t have to. From emerging trends to timeless essentials, our collections are curated with intention.',
    },
    {
      title: 'Accessibility',
      text: 'Great fashion shouldn\'t require a great fortune. We keep operations lean and pass the savings to you, with Best Offer on every listing.',
    },
  ];

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <div
        style={{
          textAlign: 'center',
          padding: '100px 24px 60px',
          maxWidth: '800px',
          margin: '0 auto',
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
          Our Story
        </h1>
        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#c9a96e',
            margin: '32px auto',
          }}
        />
        <p
          style={{
            fontSize: '1.1rem',
            color: '#aaa',
            lineHeight: '1.9',
            fontWeight: '300',
          }}
        >
          Fashionistas.ai is a curated fashion destination for the modern woman.
          We believe that style should be effortless, accessible, and never
          compromised by price.
        </p>
      </div>

      {/* Mission */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 24px 60px',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            fontWeight: '400',
            color: '#c9a96e',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          Our Mission
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
          }}
        >
          Making trending fashion accessible with fast US shipping. We work
          directly with US-based warehouses to deliver quality fashion, beauty
          products, and accessories to your door within days, not weeks. No
          mystery tracking, no inflated markups, just great style at honest
          prices.
        </p>
      </div>

      {/* Founder */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 24px 60px',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            fontWeight: '400',
            color: '#c9a96e',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          The Founder
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
          }}
        >
          Fashionistas.ai was founded by{' '}
          <Link
            href="/israel-joffe"
            style={{
              color: '#c9a96e',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,169,110,0.3)',
              transition: 'border-color 0.3s ease',
            }}
          >
            Israel Joffe
          </Link>
          , an entrepreneur based in Boca Raton, Florida. With a background in
          competitive athletics and a passion for lean, technology-driven
          businesses, Israel built Fashionistas.ai to bridge the gap between
          high-end curation and everyday affordability.
        </p>
      </div>

      {/* Values */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '40px 24px 80px',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <h2
          style={{
            fontSize: '0.85rem',
            fontWeight: '400',
            color: '#c9a96e',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          Our Values
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px',
          }}
        >
          {values.map((v) => (
            <div key={v.title} style={{ textAlign: 'center' }}>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: '#fff',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#888',
                  lineHeight: '1.8',
                  fontWeight: '300',
                }}
              >
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 24px 100px',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: '#c9a96e',
              color: '#050505',
              fontSize: '0.8rem',
              fontWeight: '500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Shop Now
          </Link>
          <Link
            href="/israel-joffe"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              border: '1px solid #c9a96e',
              color: '#c9a96e',
              fontSize: '0.8rem',
              fontWeight: '500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            Meet the Founder
          </Link>
        </div>
      </div>
    </div>
  );
}
