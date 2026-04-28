import Link from "next/link";

export const metadata = {
  title: "Women's Fashion, Shoes, Sandals & Accessories | Fashionistas.ai",
  description:
    "Fashionistas.ai women's fashion hub for trending shoes, sandals, accessories, interview outfits, vacation sandals, and everyday style picks.",
  alternates: { canonical: "https://fashionistas.ai/womens-fashion" },
};

const links = [
  ["Women's Shoes", "/womens-shoes"],
  ["Vacation Sandals", "/vacation-sandals"],
  ["Interview Shoes", "/interview-shoes"],
  ["Trending Accessories", "/trending-accessories"],
  ["All Products", "/products"],
  ["Collections", "/collections"],
];

export default function WomensFashionPage() {
  return (
    <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 20px" }}>
      <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase", color: "#be123c" }}>
        Fashionistas.ai Hub
      </p>
      <h1 style={{ fontSize: "clamp(36px,7vw,64px)", lineHeight: 1, margin: "14px 0", color: "#111827" }}>
        Women's Fashion
      </h1>
      <p style={{ color: "#4b5563", fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
        A crawlable shopping hub for women's fashion, women's shoes, sandals, accessories,
        work outfits, vacation picks, and trending style pages.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginTop: 32 }}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 18, color: "#111827", textDecoration: "none", background: "#fff" }}>
            <strong>{label}</strong>
            <div style={{ color: "#6b7280", fontSize: 14, marginTop: 8 }}>Open the focused shopping page.</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
