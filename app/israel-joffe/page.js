import Link from 'next/link';

export const metadata = {
  title: 'Israel Joffe | Entrepreneur, Founder of Fashionistas.ai',
  description:
    'Israel Joffe is an entrepreneur based in Boca Raton, FL. Founder of Fashionistas.ai and operator of multiple web properties including ihatecollege.com, placebets.ai, and hiddencameras.tv.',
  openGraph: {
    title: 'Israel Joffe',
    description:
      'Entrepreneur, founder of Fashionistas.ai and operator of multiple web properties.',
    url: 'https://shopkurt.com/israel-joffe',
    type: 'profile',
  },
};

export default function IsraelJoffePage() {
  const sites = [
    {
      name: 'Fashionistas.ai',
      url: 'https://shopkurt.com',
      description: 'Trending products, fast shipping, best prices',
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
      name: 'fashionistas.ai',
      url: 'https://fashionistas.ai',
      description: 'AI-curated women\'s fashion',
    },
    {
      name: 'hiddencameras.tv',
      url: 'https://hiddencameras.tv',
      description: 'Security camera reviews and recommendations',
    },
  ];

  return (
    <div className="container">
      <div className="about-content">
        <h1>Israel Joffe</h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text)', fontWeight: '500' }}>
          Entrepreneur &middot; Builder &middot; Boca Raton, FL
        </p>

        <h2>Background</h2>

        <p>
          Israel Joffe is an entrepreneur and builder based in Boca Raton,
          Florida. He is the founder of Fashionistas.ai, an e-commerce operation
          spanning Shopify, eBay, and TikTok Shop, and operates a portfolio of
          web properties across media, commerce, and technology.
        </p>

        <p>
          Before entering entrepreneurship, Israel was a competitive wrestler
          — a background that instilled discipline, relentless work ethic, and
          the ability to thrive under pressure. Those same qualities drive his
          approach to building businesses today.
        </p>

        <h2>What He Builds</h2>

        <p>
          Israel focuses on lean, profitable internet businesses. His approach
          combines automation, AI-assisted workflows, and direct-to-consumer
          e-commerce. He runs a multi-agent development system (Claude Code,
          Codex, Gemini, and Grok) to operate at speed without a large team.
        </p>

        <p>
          His current focus areas include dropshipping with US-based warehouses
          for fast shipping, content-driven web properties monetized through
          advertising and affiliate partnerships, and AI-powered tools for
          prediction markets and fashion.
        </p>

        <h2>Portfolio</h2>

        <div
          style={{
            display: 'grid',
            gap: '16px',
            marginTop: '16px',
            marginBottom: '32px',
          }}
        >
          {sites.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition)',
              }}
            >
              <strong style={{ color: 'var(--accent)', fontSize: '1rem' }}>
                {site.name}
              </strong>
              <br />
              <span
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                }}
              >
                {site.description}
              </span>
            </a>
          ))}
        </div>

        <h2>Public Records</h2>

        <p>
          Verified public records and documents are available through{' '}
          <a
            href="https://www.documentcloud.org/search/q:israel+joffe"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            DocumentCloud
          </a>
          .
        </p>

        <div style={{ marginTop: '48px' }}>
          <Link href="/about" className="btn btn-outline">
            About Fashionistas.ai
          </Link>
        </div>
      </div>
    </div>
  );
}
