import Link from 'next/link';

export const metadata = {
  title: 'About Fashionistas.ai | Trending Products, Fast Shipping',
  description:
    'About Fashionistas.ai. Founded by Israel Joffe, based in Boca Raton, FL. Trending products with fast US shipping and the best prices.',
  openGraph: {
    title: 'About Fashionistas.ai',
    description:
      'Founded by Israel Joffe. Trending products, fast shipping, best prices.',
    url: 'https://fashionistas.ai/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container">
      <div className="about-content">
        <h1>About Fashionistas.ai</h1>

        <p>
          Fashionistas.ai is your destination for trending products at unbeatable
          prices. We curate the best items across categories like kitchen
          gadgets, beauty tools, phone accessories, pet products, LED lighting,
          and fitness gear — all with fast shipping directly to your door.
        </p>

        <p>
          Based in <strong>Boca Raton, Florida</strong>, Fashionistas.ai was founded by{' '}
          <Link
            href="/israel-joffe"
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            Israel Joffe
          </Link>{' '}
          with a simple mission: make great products accessible without inflated
          price tags.
        </p>

        <h2>Our Mission</h2>

        <p>
          We believe everyone deserves access to quality, trending products
          without overpaying. By working directly with US-based warehouses and
          keeping our operations lean, we cut out the middlemen and pass the
          savings on to you. Most orders ship within 2 days — no long waits, no
          mystery tracking numbers.
        </p>

        <h2>Why Fashionistas.ai?</h2>

        <ul
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            lineHeight: '2',
            paddingLeft: '24px',
            marginBottom: '24px',
          }}
        >
          <li>Hand-picked products for quality, value, and trend relevance</li>
          <li>US-based warehouses with 2-day shipping on most items</li>
          <li>Best Offer enabled on every listing</li>
          <li>Active across Shopify, eBay, and TikTok Shop</li>
          <li>Real people, real support — no bots, no runaround</li>
        </ul>

        <h2>Our Promise</h2>

        <p>
          Best Offer is enabled on every listing. If you see something you love
          but want a better deal, make us an offer. We&apos;re here to make it
          work.
        </p>

        <p>
          Have questions? Reach out to us anytime. We&apos;re a small team that
          genuinely cares about your experience.
        </p>

        <div style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/products" className="btn btn-primary">
            Start Shopping
          </Link>
          <Link href="/israel-joffe" className="btn btn-outline">
            Meet the Founder
          </Link>
        </div>
      </div>
    </div>
  );
}
