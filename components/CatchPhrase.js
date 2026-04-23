"use client";
import { useEffect, useState } from "react";

// Commerce-lean rotating phrases. Short, specific, urgency + trend signal.
// No fluff. Each < 40 chars so it fits the card label slot without wrapping.
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
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % phrases.length);
        setFade(true);
      }, 220);
    }, interval);
    return () => clearInterval(t);
  }, [phrases.length, interval]);

  return (
    <span
      className={`fashionistas-catchphrase ${className}`}
      style={{
        opacity: fade ? 1 : 0,
        transition: "opacity 0.22s ease",
        display: "inline-block",
      }}
    >
      {phrases[idx]}
    </span>
  );
}
