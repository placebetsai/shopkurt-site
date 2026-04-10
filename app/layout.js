import './globals.css';
import Script from 'next/script';
import Link from 'next/link';

export const metadata = {
  title: 'FASHIONISTAS.AI | Curated Women\'s Fashion, Beauty & Accessories',
  description:
    'Discover curated women\'s fashion, beauty essentials, and luxury accessories. Trending styles, fast shipping, effortless elegance.',
  metadataBase: new URL('https://fashionistas.ai'),
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
        <nav className="navbar">
          <div className="container">
            <Link href="/" className="nav-logo">
              FASHIONISTAS<span className="nav-logo-accent">.AI</span>
            </Link>
            <ul className="nav-center">
              <li>
                <Link href="/products">Shop</Link>
              </li>
              <li>
                <Link href="/collections">Collections</Link>
              </li>
              <li>
                <Link href="/products">New Arrivals</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
            <div className="nav-right">
              <Link href="/cart" className="nav-cart" aria-label="Shopping bag">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <p className="footer-brand">FASHIONISTAS<span style={{ color: '#c9a96e' }}>.AI</span></p>
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
