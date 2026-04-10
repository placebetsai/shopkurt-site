import './globals.css';
import Script from 'next/script';
import Link from 'next/link';

export const metadata = {
  title: 'Fashionistas.ai | Trending Products. Fast Shipping. Best Prices.',
  description:
    'Shop trending products with fast shipping and the best prices. Kitchen gadgets, beauty tools, phone accessories, pet products, and more.',
  metadataBase: new URL('https://fashionistas.ai'),
  openGraph: {
    title: 'Fashionistas.ai',
    description: 'Trending Products. Fast Shipping. Best Prices.',
    url: 'https://fashionistas.ai',
    siteName: 'Fashionistas.ai',
    type: 'website',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
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
              Fashionistas.ai
            </Link>
            <ul className="nav-links">
              <li>
                <Link href="/products">Shop</Link>
              </li>
              <li>
                <Link href="/collections">Collections</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main>{children}</main>

        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Fashionistas.ai. All rights reserved.</p>
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
