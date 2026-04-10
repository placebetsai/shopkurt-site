'use client';

import { useState, useEffect } from 'react';

export default function AddToCart({ variantId, title, price, image }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  function addToCart() {
    if (typeof window === 'undefined') return;

    const cart = JSON.parse(localStorage.getItem('shopkurt_cart') || '[]');
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

    localStorage.setItem('shopkurt_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
    setToastMessage('Added to cart!');
    setShowToast(true);
  }

  function buyNow() {
    window.location.href = `https://shopkurt.com/cart/${variantId}:1`;
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
        <button onClick={buyNow} className="btn btn-buy">
          Buy Now
        </button>
        <button onClick={addToCart} className="btn btn-add-to-cart">
          Add to Cart
        </button>
      </div>

      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            background: '#111',
            border: '1px solid var(--accent, #00e676)',
            color: '#fff',
            padding: '16px 28px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 8px 32px rgba(0, 230, 118, 0.2)',
            animation: 'toastSlideIn 0.3s ease-out',
          }}
        >
          {toastMessage}
        </div>
      )}
    </>
  );
}
