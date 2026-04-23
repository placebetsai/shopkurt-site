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
    label: "Home",
    href: "/",
    children: null,
  },
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
    label: "Electronics",
    href: "/collections/security-cameras",
    children: [
      { label: "Hidden Cameras", href: "/collections/hidden-cameras" },
      { label: "Outdoor Cameras", href: "/collections/outdoor-cameras" },
      { label: "Indoor Cameras", href: "/collections/indoor-cameras" },
      { label: "Doorbell Cameras", href: "/collections/doorbell-cameras" },
      { label: "Nanny Cameras", href: "/collections/nanny-cameras" },
      { label: "Dash Cameras", href: "/collections/dash-cameras" },
      { label: "Security Cameras", href: "/collections/security-cameras" },
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

export default function Navbar({ availableCategories = { productTypes: [], collectionSlugs: [], tags: [] } }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const availableTypes = new Set((availableCategories.productTypes || []).map((t) => t.toLowerCase().trim()));
  const availableCollections = new Set((availableCategories.collectionSlugs || []).map((s) => s.toLowerCase().trim()));
  const availableTags = new Set((availableCategories.tags || []).map((t) => t.toLowerCase().trim()));

  // Hide dead links: a child with ?category=X drops off if no product has productType X
  // and no product carries tag X. A /collections/Y top-level link drops if slug Y has no products.
  function hrefHasContent(href) {
    if (!href) return true;
    // No filter: the landing page itself is always content
    const qsMatch = href.match(/\?category=([^&]+)/);
    if (qsMatch) {
      const val = decodeURIComponent(qsMatch[1].replace(/\+/g, " ")).toLowerCase().trim();
      return availableTypes.has(val) || availableTags.has(val) || val === "all";
    }
    const collMatch = href.match(/^\/collections\/([a-z0-9-]+)/i);
    if (collMatch) {
      return availableCollections.has(collMatch[1].toLowerCase()) ||
             availableCollections.size === 0; // fallback: if we failed to load counts, show everything
    }
    return true;
  }

  function filterLinks(entries) {
    if (availableTypes.size === 0 && availableCollections.size === 0) return entries;
    return entries
      .map((l) => {
        if (!l.children) return hrefHasContent(l.href) ? l : null;
        const kept = l.children.filter((c) => hrefHasContent(c.href));
        if (kept.length === 0 && !hrefHasContent(l.href)) return null;
        return { ...l, children: kept.length ? kept : null };
      })
      .filter(Boolean);
  }
  const VISIBLE_LINKS = filterLinks(NAV_LINKS);

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
          FASHIONISTAS<span className="nav-logo-accent">.AI</span>
        </Link>

        <ul className="nav-center">
          {VISIBLE_LINKS.map((link) => (
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
          <form action="/products" method="get" className="nav-search" role="search">
            <input type="search" name="q" placeholder="Search products…" aria-label="Search products" autoComplete="off" />
            <button type="submit" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
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
          {VISIBLE_LINKS.map((link) => (
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
