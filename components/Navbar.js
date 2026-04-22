"use client";
import { useState } from "react";
import Link from "next/link";

// Top-level category tree (order matters: New In first, Sale last).
// Slugs map to /collections/<slug> — if a slug doesn't resolve in Shopify,
// the collection page itself falls back gracefully.
// Only collections that actually exist on Shopify get /collections/<slug>.
// Everything else falls back to /products?category=<Label> (product grid
// filter) or /products?aesthetic=<slug>. No dead links from this nav.
const NAV_LINKS = [
  {
    label: "New In",
    href: "/collections/trending-items",
    children: [
      { label: "Just In", href: "/collections/trending-items" },
      { label: "Trending Now", href: "/collections/trending-items" },
      { label: "Best Sellers", href: "/products?sort=best-selling" },
    ],
  },
  {
    label: "Dresses",
    href: "/collections/dresses",
    children: [
      { label: "Mini", href: "/products?category=Mini+Dresses" },
      { label: "Midi", href: "/products?category=Midi+Dresses" },
      { label: "Maxi", href: "/products?category=Maxi+Dresses" },
      { label: "Going Out", href: "/products?category=Going+Out+Dresses" },
      { label: "Wedding Guest", href: "/products?category=Wedding+Guest" },
      { label: "Casual", href: "/products?category=Casual+Dresses" },
    ],
  },
  {
    label: "Tops",
    href: "/collections/tops",
    children: [
      { label: "Crop", href: "/products?category=Crop+Tops" },
      { label: "Bodysuits", href: "/products?category=Bodysuits" },
      { label: "Blouses", href: "/products?category=Blouses" },
      { label: "Tees & Tanks", href: "/products?category=Tees+%26+Tanks" },
      { label: "Sweaters", href: "/products?category=Sweaters" },
    ],
  },
  {
    label: "Bottoms",
    href: "/collections/bottoms",
    children: [
      { label: "Jeans", href: "/products?category=Jeans" },
      { label: "Pants", href: "/products?category=Pants" },
      { label: "Skirts", href: "/products?category=Skirts" },
      { label: "Shorts", href: "/products?category=Shorts" },
    ],
  },
  {
    label: "Sets",
    href: "/collections/sets-jumpsuits",
    children: [
      { label: "Matching Sets", href: "/products?category=Matching+Sets" },
      { label: "Jumpsuits", href: "/products?category=Jumpsuits" },
      { label: "Rompers", href: "/products?category=Rompers" },
    ],
  },
  {
    label: "Outerwear",
    href: "/collections/outerwear",
    children: [
      { label: "Jackets", href: "/products?category=Jackets" },
      { label: "Trench", href: "/products?category=Trench" },
      { label: "Blazers", href: "/products?category=Blazers" },
    ],
  },
  {
    label: "Shoes",
    href: "/collections/fashion",
    children: [
      { label: "Heels", href: "/products?category=Heels" },
      { label: "Sandals", href: "/products?category=Sandals" },
      { label: "Flats & Ballet", href: "/products?category=Flats" },
      { label: "Loafers & Derby", href: "/products?category=Loafers" },
      { label: "Sneakers", href: "/products?category=Sneakers" },
      { label: "Boots", href: "/products?category=Boots" },
    ],
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    children: [
      { label: "Bags", href: "/collections/bags" },
      { label: "Jewelry", href: "/collections/jewelry" },
      { label: "Scarves", href: "/products?category=Scarves" },
      { label: "Sunglasses", href: "/products?category=Sunglasses" },
      { label: "Hair", href: "/products?category=Hair" },
    ],
  },
  {
    label: "Aesthetic",
    href: "/products?aesthetic=all",
    children: [
      { label: "Coquette", href: "/products?aesthetic=coquette" },
      { label: "Bourgeois", href: "/products?aesthetic=bourgeois" },
      { label: "Y2K", href: "/products?aesthetic=y2k" },
      { label: "Boho", href: "/products?aesthetic=boho" },
      { label: "'80s Power", href: "/products?aesthetic=80s-power" },
    ],
  },
  {
    label: "Sale",
    href: "/collections/sale",
    children: null,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          FASHIONISTAS<span className="nav-logo-accent">.AI</span>
        </Link>

        <ul className="nav-center">
          {NAV_LINKS.map((link) => (
            <li
              key={link.label}
              className={`nav-item ${link.children ? "nav-item-has-children" : ""} ${link.label === "Sale" ? "nav-item-sale" : ""}`}
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link href={link.href}>{link.label}</Link>
              {link.children && (
                <div
                  className={`nav-dropdown ${openDropdown === link.label ? "nav-dropdown-open" : ""}`}
                >
                  <ul>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
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
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setOpen(false)} className="mobile-menu-cart">Shopping Bag</Link>
        </div>
      )}
    </nav>
  );
}
