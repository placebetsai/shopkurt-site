'use client';

import { useEffect, useRef } from 'react';

export default function AdUnit({ slot, format = 'auto', responsive = true }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (e) {
      // AdSense not loaded yet, skip silently
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '24px 0',
      }}
    >
      <ins
        className="adsbygoogle"
        ref={adRef}
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-7215975042937417"
        data-ad-slot={slot || ''}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
