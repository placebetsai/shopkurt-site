"use client";
import { useEffect, useState } from "react";

// Smooth cross-fade carousel for short phrases. Both current and next phrase
// render stacked; opacity transitions over 500ms for smooth swap.
const PHRASES = [
  "Trending this week",
  "Seen on TikTok",
  "Free shipping over $50",
  "#1 pick, selling fast",
  "Editor's top pick",
  "Back in stock today",
  "Limited drop — move fast",
  "Viral right now",
  "Shop the look",
  "Fresh drop today",
  "Restocked — grab one",
  "Customer favorite",
  "Best-seller this month",
  "Sold out 3x — restocked",
  "Under the radar — not for long",
];

export default function CatchPhrase({ phrases = PHRASES, interval = 3200, className = "" }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!phrases || phrases.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % phrases.length), interval);
    return () => clearInterval(t);
  }, [phrases?.length, interval]);

  if (!phrases || phrases.length === 0) return null;

  return (
    <span
      className={`fashionistas-catchphrase ${className}`}
      style={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "baseline",
        minHeight: "1.2em",
        maxWidth: "100%",
      }}
    >
      {phrases.map((p, i) => (
        <span
          key={i}
          style={{
            position: i === idx ? "relative" : "absolute",
            left: 0,
            top: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            maxWidth: "100%",
            // no whiteSpace:nowrap — long rotator phrases (hero h1 + lead)
            // were forcing 700+px widths and bleeding mobile viewport by 33px.
          }}
        >
          {p}
        </span>
      ))}
    </span>
  );
}
