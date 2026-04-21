"use client";
import { useState } from "react";
import Link from "next/link";

// Top-level category tree (order matters: New In first, Sale last).
// Slugs map to /collections/<slug> — if a slug doesn't resolve in Shopify,
// the collection page itself falls back gracefully.
const NAV_LINKS = [
  {
    label: "New In",
    href: "/collections/trending-items",
    children: [
      { label: "Just In", href: "/collections/trending-items" },
      { label: "Back In Stock", href: "/collections/back-in-stock" },
      { label: "Trending Now", href: "/collections/trending-items" },
    ],
  },
  {
    label: "Dresses",
    href: "/collections/dresses",
    children: [
      { label: "Mini", href: "/collections/mini-dresses" },
      { label: "Midi", href: "/collections/midi-dresses" },
      { label: "Maxi", href: "/collections/maxi-dresses" },
      { label: "Going Out", href: "/collections/going-out-dresses" },
      { label: "Wedding Guest", href: "/collections/wedding-guest" },
      { label: "Casual", href: "/collections/casual-dresses" },
      { label: "Lace & Slip", href: "/collections/lace-slip" },
    ],
  },
  {
    label: "Tops",
    href: "/collections/tops",
    children: [
      { label: "Crop", href: "/collections/crop-tops" },
      { label: "Bodysuits", href: "/collections/bodysuits" },
      { label: "Blouses", href: "/collections/blouses" },
      { label: "Tees & Tanks", href: "/collections/tees-tanks" },
      { label: "Sweaters", href: "/collections/sweaters" },
      { label: "Going Out", href: "/collections/going-out-tops" },
    ],
  },
  {
    label: "Bottoms",
    href: "/collections/bottoms",
    children: [
      { label: "Jeans", href: "/collections/jeans" },
      { label: "Pants", href: "/collections/pants" },
      { label: "Skirts", href: "/collections/skirts" },
      { label: "Shorts", href: "/collections/shorts" },
    ],
  },
  {
    label: "Sets",
    href: "/collections/sets-jumpsuits",
    children: [
      { label: "Matching Sets", href: "/collections/matching-sets" },
      { label: "Jumpsuits", href: "/collections/jumpsuits" },
      { label: "Rompers", href: "/collections/rompers" },
    ],
  },
  {
    label: "Outerwear",
    href: "/collections/outerwear",
    children: [
      { label: "Jackets", href: "/collections/jackets" },
      { label: "Trench", href: "/collections/trench" },
      { label: "Bombers", href: "/collections/bombers" },
      { label: "Blazers", href: "/collections/blazers" },
    ],
  },
  {
    label: "Shoes",
    href: "/collections/fashion",
    children: [
      { label: "Heels", href: "/collections/heels" },
      { label: "Sandals", href: "/collections/sandals" },
      { label: "Flats & Ballet", href: "/collections/flats" },
      { label: "Loafers & Derby", href: "/collections/loafers" },
      { label: "Sneakers", href: "/collections/sneakers" },
      { label: "Boots", href: "/collections/boots" },
    ],
  },
  {
    label: "Accessories",
    href: "/collections/accessories",
    children: [
      { label: "Bags", href: "/collections/bags" },
      { label: "Jewelry", href: "/collections/jewelry" },
      { label: "Belts", href: "/collections/belts" },
      { label: "Scarves", href: "/collections/scarves" },
      { label: "Sunglasses", href: "/collections/sunglasses" },
      { label: "Hair", href: "/collections/hair" },
      { label: "Hats", href: "/collections/hats" },
    ],
  },
  {
    label: "Aesthetic",
    href: "/collections/aesthetic",
    children: [
      { label: "Coquette", href: "/collections/coquette" },
      { label: "Bourgeois", href: "/collections/bourgeois" },
      { label: "Y2K", href: "/collections/y2k" },
      { label: "Boho", href: "/collections/boho" },
      { label: "'80s Power", href: "/collections/80s-power" },
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
