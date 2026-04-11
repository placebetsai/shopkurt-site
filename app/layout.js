import './globals.css';
import Script from 'next/script';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'FASHIONISTAS.AI | Curated Women\'s Fashion, Beauty & Accessories',
  description:
    'Discover curated women\'s fashion, beauty essentials, and luxury accessories. Trending styles, fast shipping, effortless elegance.',
  metadataBase: new URL('https://fashionistas.ai'),
  alternates: {
    canonical: 'https://fashionistas.ai',
  },
  openGraph: {
    title: 'FASHIONISTAS.AI',
    description: 'Curated Women\'s Fashion, Beauty & Accessories',
    url: 'https://fashionistas.ai',
    siteName: 'Fashionistas.ai',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7215975042937417"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar />

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <p className="footer-brand">FASHIONISTAS<span style={{ color: '#c9a96e' }}>.AI</span></p>
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
