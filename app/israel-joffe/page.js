import Link from 'next/link';

export const metadata = {
  title: 'Israel Joffe | Entrepreneur, Founder of Fashionistas.ai',
  description:
    'Israel Joffe is an entrepreneur based in Boca Raton, FL. Founder of Fashionistas.ai and operator of multiple web properties including ihatecollege.com, placebets.ai, and hiddencameras.tv.',
  openGraph: {
    title: 'Israel Joffe | Fashionistas.ai',
    description:
      'Entrepreneur, founder of Fashionistas.ai and operator of multiple web properties.',
    url: 'https://fashionistas.ai/israel-joffe',
    type: 'profile',
    images: ['/og-image.svg'],
  },
};

export default function IsraelJoffePage() {
  const sites = [
    {
      name: 'Fashionistas.ai',
      url: 'https://fashionistas.ai',
      description: 'Affordable shoes, accessories, and trend-led style',
    },
    {
      name: 'ihatecollege.com',
      url: 'https://ihatecollege.com',
      description: 'Alternative education perspectives and resources',
    },
    {
      name: 'placebets.ai',
      url: 'https://placebets.ai',
      description: 'AI-powered prediction market insights',
    },
    {
      name: 'spanishtvshows.com',
      url: 'https://spanishtvshows.com',
      description: 'Spanish language television guides and reviews',
    },
    {
      name: 'hiddencameras.tv',
      url: 'https://hiddencameras.tv',
      description: 'Security camera reviews and recommendations',
    },
  ];

  return (
    <div style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '100px 24px 20px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '300',
            color: '#fff',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Israel Joffe
        </h1>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#c9a96e',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '16px',
          }}
        >
          Entrepreneur &middot; Builder &middot; Boca Raton, FL
        </p>
        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#c9a96e',
            margin: '32px auto',
          }}
        />
      </div>

      {/* Background */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px 60px',
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
          Background
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
            marginBottom: '20px',
          }}
        >
          Israel Joffe is an entrepreneur and builder based in Boca Raton,
          Florida. He is the founder of Fashionistas.ai, a fashion commerce
          brand spanning Shopify, eBay, Google Shopping, and TikTok Shop, and
          operates a portfolio of web properties across media, commerce, and
          technology.
        </p>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
          }}
        >
          Before entering entrepreneurship, Israel was a competitive wrestler
          — a background that instilled discipline, relentless work ethic, and
          the ability to thrive under pressure. Those same qualities drive his
          approach to building businesses today.
        </p>
      </div>

      {/* What He Builds */}
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
          What He Builds
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
            marginBottom: '20px',
          }}
        >
          Israel focuses on lean, profitable internet businesses. His approach
          combines automation, AI-assisted workflows, and direct-to-consumer
          e-commerce. He runs a multi-agent development system (Claude Code,
          Codex, Gemini, and Grok) to operate at speed without a large team.
        </p>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
          }}
        >
          His current focus areas include affordable fashion commerce with
          multi-channel distribution, content-driven web properties monetized
          through advertising and affiliate partnerships, and AI-powered tools
          for prediction markets and trend discovery.
        </p>
      </div>

      {/* Portfolio */}
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
            marginBottom: '32px',
          }}
        >
          Portfolio
        </h2>
        <div
          style={{
            display: 'grid',
            gap: '2px',
          }}
        >
          {sites.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 28px',
                background: '#0a0a0a',
                textDecoration: 'none',
                transition: 'background 0.3s ease',
              }}
            >
              <div>
                <span
                  style={{
                    color: '#c9a96e',
                    fontSize: '0.95rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {site.name}
                </span>
                <span
                  style={{
                    display: 'block',
                    color: '#666',
                    fontSize: '0.8rem',
                    marginTop: '4px',
                    letterSpacing: '0.02em',
                  }}
                >
                  {site.description}
                </span>
              </div>
              <span style={{ color: '#333', fontSize: '1.2rem' }}>&rarr;</span>
            </a>
          ))}
        </div>
      </div>

      {/* Public Records */}
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
          Public Records
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: '#999',
            lineHeight: '1.9',
            fontWeight: '300',
          }}
        >
          Verified public records and documents are available through{' '}
          <a
            href="https://www.documentcloud.org/search/q:israel+joffe"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#c9a96e',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,169,110,0.3)',
              transition: 'border-color 0.3s ease',
            }}
          >
            DocumentCloud
          </a>
          .
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          textAlign: 'center',
          padding: '40px 24px 100px',
          borderTop: '1px solid #1a1a1a',
        }}
      >
        <Link
          href="/about"
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
          About Fashionistas.ai
        </Link>
      </div>
    </div>
  );
}
