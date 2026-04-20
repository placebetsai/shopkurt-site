import Link from 'next/link';

export const metadata = {
  title: 'Our Story | Fashionistas.ai',
  description:
    'Fashionistas.ai is an affordable style destination focused on trending shoes, standout accessories, and easy-to-wear fashion with fast US shipping.',
  openGraph: {
    title: 'Our Story | Fashionistas.ai',
    description:
      'Affordable shoes, accessories, and trend-right style. Founded by Israel Joffe.',
    url: 'https://fashionistas.ai/about',
    images: ['/og-image.svg'],
  },
};

export default function AboutPage() {
  const values = [
    {
      title: 'Selection',
      text: 'We focus on items people actually shop for: wedges, sandals, boots, statement accessories, and everyday pieces that photograph well and land at a price people can justify.',
    },
    {
      title: 'Speed',
      text: 'We keep the assortment lean, track trend signals closely, and move fast on the categories that convert instead of burying shoppers under thousands of random listings.',
    },
    {
      title: 'Value',
      text: 'Fashionistas.ai is built around affordable style. We aim for TikTok-friendly entry prices, stronger value on multi-channel bestsellers, and straightforward shipping expectations.',
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
          Fashionistas.ai is built for affordable style that still feels current.
          The store is strongest when it helps shoppers find trend-right shoes,
          standout accessories, and easy wins for everyday outfits without
          luxury-store pricing.
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
          We are building a sharper kind of fashion store: one that leans into
          categories with repeat demand and strong visual appeal, especially
          wedges, sandals, boots, loafers, jewelry, bags, and seasonal
          accessories. The goal is simple: useful style, competitive pricing,
          and fast enough shipping that customers come back instead of treating
          the site like a one-off impulse buy.
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
          competitive athletics and a bias toward lean, technology-driven
          businesses, Israel built Fashionistas.ai to turn trend data,
          merchandising discipline, and affordable pricing into a better online
          fashion experience.
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
