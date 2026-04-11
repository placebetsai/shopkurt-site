'use client';

import { useState, useEffect } from 'react';

export default function AddToCart({ variantId, title, price, image }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  function addToBag() {
    if (typeof window === 'undefined') return;

    const cart = JSON.parse(localStorage.getItem('fashionistas_cart') || '[]');
    const existingIndex = cart.findIndex((item) => item.variantId === variantId);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        variantId,
        title,
        price,
        image,
        quantity: 1,
      });
    }

    localStorage.setItem('fashionistas_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    setShowToast(true);
  }

  function buyNow() {
    window.location.href = `https://js0hy0-ux.myshopify.com/cart/${variantId}:1`;
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        <button onClick={addToBag} className="btn-add-to-bag">
          Add to Bag
        </button>
        <button onClick={buyNow} className="btn-buy-now-outline">
          Buy Now
        </button>
      </div>

      {showToast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            background: '#050505',
            border: '1px solid #c9a96e',
            color: '#f0ede8',
            padding: '16px 32px',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            zIndex: 9999,
            animation: 'toastSlideIn 0.3s ease-out',
          }}
        >
          Added to bag
        </div>
      )}
    </>
  );
}
