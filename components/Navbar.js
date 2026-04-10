"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          FASHIONISTAS<span className="nav-logo-accent">.AI</span>
        </Link>

        <ul className="nav-center">
          <li><Link href="/products">Shop</Link></li>
          <li><Link href="/collections">Collections</Link></li>
          <li><Link href="/collections/trending-items">Trending</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>

        <div className="nav-right">
          <Link href="/cart" className="nav-cart" aria-label="Shopping bag">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </Link>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          <Link href="/products" onClick={() => setOpen(false)}>Shop All</Link>
          <Link href="/collections" onClick={() => setOpen(false)}>Collections</Link>
          <Link href="/collections/beauty-and-personal-care" onClick={() => setOpen(false)}>Beauty</Link>
          <Link href="/collections/fashion" onClick={() => setOpen(false)}>Fashion</Link>
          <Link href="/collections/accessories" onClick={() => setOpen(false)}>Accessories</Link>
          <Link href="/collections/trending-items" onClick={() => setOpen(false)}>Trending</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/cart" onClick={() => setOpen(false)} className="mobile-menu-cart">Shopping Bag</Link>
        </div>
      )}
    </nav>
  );
}
