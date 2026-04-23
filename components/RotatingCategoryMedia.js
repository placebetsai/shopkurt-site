"use client";
import { useEffect, useState } from "react";

// Cycles through multiple product images for a single category card.
// Expects an array of { url, alt, title } objects. Falls back gracefully
// if only one image is available — renders it static.
export default function RotatingCategoryMedia({ images = [], interval = 4500 }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % images.length);
        setVisible(true);
      }, 260);
    }, interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  if (images.length === 0) return null;
  const img = images[idx];

  return (
    <img
      key={`rot-${idx}`}
      src={img.url}
      alt={img.alt || img.title || ""}
      width={520}
      height={620}
      loading="lazy"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.26s ease",
      }}
    />
  );
}
