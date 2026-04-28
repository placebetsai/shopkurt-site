import Link from "next/link";

export const metadata = {
  title: "Women's Shoes: Flats, Loafers, Sandals & Work Shoes | Fashionistas.ai",
  description:
    "Shop women's shoes at Fashionistas.ai: flats, loafers, sandals, interview shoes, vacation sandals, and everyday style picks.",
  alternates: { canonical: "https://fashionistas.ai/womens-shoes" },
};

export default function WomensShoesPage() {
  return (
    <section style={{ maxWidth: 980, margin: "0 auto", padding: "56px 20px" }}>
      <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: ".2em", textTransform: "uppercase", color: "#be123c" }}>
        Shoe Hub
      </p>
      <h1 style={{ fontSize: "clamp(36px,7vw,64px)", lineHeight: 1, margin: "14px 0", color: "#111827" }}>
        Women's Shoes
      </h1>
      <p style={{ color: "#4b5563", fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
        Focused shopping paths for women's flats, loafers, sandals, interview shoes,
        vacation sandals, and trending shoe picks.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
        <Link href="/interview-shoes" style={{ padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }}>Interview Shoes</Link>
        <Link href="/vacation-sandals" style={{ padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }}>Vacation Sandals</Link>
        <Link href="/products" style={{ padding: "12px 16px", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827" }}>All Products</Link>
      </div>
    </section>
  );
}
