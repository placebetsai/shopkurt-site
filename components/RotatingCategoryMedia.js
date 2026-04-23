"use client";
import { useEffect, useState } from "react";

// Smooth cross-fade carousel. Both the outgoing and incoming image render
// simultaneously with absolute stacking; opacity eases over 700ms.
// No blank flash between frames.
export default function RotatingCategoryMedia({ images = [], interval = 4500 }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images?.length, interval]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    const img = images[0];
    return <img src={img.url} alt={img.alt || img.title || ""} width={520} height={620} loading="lazy" />;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", display: "block" }}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.alt || img.title || ""}
          loading={i === 0 ? "eager" : "lazy"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.7s ease-in-out",
            pointerEvents: i === idx ? "auto" : "none",
          }}
        />
      ))}
    </div>
  );
}
