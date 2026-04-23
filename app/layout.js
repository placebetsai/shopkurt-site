import './globals.css';
import Script from 'next/script';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import TrendingTicker from '../components/TrendingTicker';

export const metadata = {
  title: 'Fashionistas | Shoes, Accessories & Beauty',
  description:
    'Shop shoes, bags, jewelry, and beauty at Fashionistas. New drops weekly. Free shipping over $50.',
  metadataBase: new URL('https://fashionistas.ai'),
  alternates: {
    canonical: 'https://fashionistas.ai',
  },
  openGraph: {
    title: 'Fashionistas | Shoes, Accessories & Beauty',
    description: 'Shop shoes, bags, jewelry, and beauty. New drops weekly. Free shipping over $50.',
    url: 'https://fashionistas.ai',
    siteName: 'Fashionistas',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashionistas | Shoes, Accessories & Beauty',
    description: 'Shop shoes, bags, jewelry, and beauty. New drops weekly. Free shipping over $50.',
  },
  other: {
    'og:image:secure_url': 'https://fashionistas.ai/opengraph-image',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fashionistas.ai',
    url: 'https://fashionistas.ai',
    logo: 'https://fashionistas.ai/favicon.svg',
    sameAs: [
      'https://fashionistas.ai',
    ],
  };

  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fashionistas.ai',
    url: 'https://fashionistas.ai',
    description:
      'Shoes, accessories, and affordable style upgrades for interviews, vacations, and everyday wear.',
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7215975042937417"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <TrendingTicker />

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <p className="footer-brand">FASHIONISTAS<span style={{ color: '#c9a96e' }}>.AI</span></p>
            <p className="footer-copy" style={{ maxWidth: '42rem' }}>
              Shop shoes, accessories, and beauty — new styles added weekly.
            </p>
            <div className="fashionistas-topline-points" style={{ justifyContent: 'center' }}>
              <span>Free shipping over $50</span>
              <span>Fast checkout</span>
              <span>New drops weekly</span>
            </div>
            <nav aria-label="Footer navigation" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '28px',
              flexWrap: 'wrap',
              margin: '16px 0',
            }}>
              <Link href="/privacy" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a857e', transition: 'color 0.35s' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a857e', transition: 'color 0.35s' }}>Terms of Service</Link>
              <Link href="/refund-policy" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a857e', transition: 'color 0.35s' }}>Refund Policy</Link>
              <Link href="/shipping-policy" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a857e', transition: 'color 0.35s' }}>Shipping</Link>
              <Link href="/contact" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a857e', transition: 'color 0.35s' }}>Contact</Link>
            </nav>
            <p className="footer-copy">&copy; {new Date().getFullYear()} Fashionistas.ai. All rights reserved.</p>
            <nav className="sr-only" aria-label="Our Network">
              <a href="https://ihatecollege.com">ihatecollege.com</a>
              <a href="https://placebets.ai">placebets.ai</a>
              <a href="https://spanishtvshows.com">spanishtvshows.com</a>
              <a href="https://fashionistas.ai">fashionistas.ai</a>
              <a href="https://hiddencameras.tv">hiddencameras.tv</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
