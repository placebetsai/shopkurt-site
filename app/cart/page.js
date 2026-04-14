'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(parseFloat(amount));
}

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadCart();

    function onCartUpdated() {
      loadCart();
    }
    window.addEventListener('cart-updated', onCartUpdated);
    return () => window.removeEventListener('cart-updated', onCartUpdated);
  }, []);

  function loadCart() {
    const stored = localStorage.getItem('fashionistas_cart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }

  function saveCart(newCart) {
    localStorage.setItem('fashionistas_cart', JSON.stringify(newCart));
    setCart(newCart);
    window.dispatchEvent(new Event('cart-updated'));
  }

  function updateQuantity(variantId, delta) {
    const newCart = cart
      .map((item) => {
        if (item.variantId === variantId) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(newCart);
  }

  function removeItem(variantId) {
    const newCart = cart.filter((item) => item.variantId !== variantId);
    saveCart(newCart);
  }

  function checkout() {
    if (cart.length === 0) return;
    const cartString = cart
      .map((item) => `${item.variantId}:${item.quantity}`)
      .join(',');
    // Route through fashionistas.ai — Cloudflare Worker proxies /cart/* to
    // shop.fashionistas.ai (Shopify primary) so the URL bar stays fashionistas.ai.
    window.location.href = `https://fashionistas.ai/cart/${cartString}`;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  if (!mounted) {
    return (
      <div className="container" style={{ padding: '80px 24px' }}>
        <div className="skeleton" style={{ height: '400px', width: '100%' }} />
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '60vh' }}>
      <div className="page-header">
        <h1>Your Bag</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state" style={{ padding: '80px 24px' }}>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#8a8580',
              marginBottom: '40px',
              letterSpacing: '0.05em',
            }}
          >
            Your bag is empty
          </p>
          <Link
            href="/products"
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              borderBottom: '1px solid #c9a96e',
              paddingBottom: '4px',
              transition: 'opacity 0.3s',
            }}
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div style={{ paddingBottom: '120px', maxWidth: '900px', margin: '0 auto' }}>
          {/* Column Headers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 120px 100px 40px',
              gap: '24px',
              padding: '0 0 16px',
              borderBottom: '1px solid #1a1a1a',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4a4745',
              alignItems: 'end',
            }}
          >
            <span></span>
            <span>Product</span>
            <span style={{ textAlign: 'center' }}>Quantity</span>
            <span style={{ textAlign: 'right' }}>Total</span>
            <span></span>
          </div>

          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.variantId}
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr 120px 100px 40px',
                gap: '24px',
                padding: '24px 0',
                borderBottom: '1px solid #1a1a1a',
                alignItems: 'center',
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100px',
                  height: '130px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#0f0f0f',
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4a4745',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>

              {/* Details */}
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    marginBottom: '8px',
                    letterSpacing: '0.02em',
                    color: '#f0ede8',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    color: '#c9a96e',
                    letterSpacing: '0.03em',
                  }}
                >
                  {formatPrice(item.price)}
                </div>
              </div>

              {/* Quantity Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0',
                }}
              >
                <button
                  onClick={() => updateQuantity(item.variantId, -1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #2a2725',
                    background: 'transparent',
                    color: '#8a8580',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.3s, border-color 0.3s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => { e.target.style.borderColor = '#c9a96e'; e.target.style.color = '#c9a96e'; }}
                  onMouseOut={(e) => { e.target.style.borderColor = '#2a2725'; e.target.style.color = '#8a8580'; }}
                >
                  -
                </button>
                <div
                  style={{
                    width: '40px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    borderTop: '1px solid #2a2725',
                    borderBottom: '1px solid #2a2725',
                    fontWeight: 400,
                    fontSize: '0.8rem',
                    color: '#f0ede8',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.quantity}
                </div>
                <button
                  onClick={() => updateQuantity(item.variantId, 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #2a2725',
                    background: 'transparent',
                    color: '#8a8580',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.3s, border-color 0.3s',
                    fontFamily: 'inherit',
                  }}
                  onMouseOver={(e) => { e.target.style.borderColor = '#c9a96e'; e.target.style.color = '#c9a96e'; }}
                  onMouseOut={(e) => { e.target.style.borderColor = '#2a2725'; e.target.style.color = '#8a8580'; }}
                >
                  +
                </button>
              </div>

              {/* Line Total */}
              <div
                style={{
                  fontWeight: 400,
                  fontSize: '0.85rem',
                  textAlign: 'right',
                  color: '#f0ede8',
                  letterSpacing: '0.03em',
                }}
              >
                {formatPrice(parseFloat(item.price) * item.quantity)}
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.variantId)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4a4745',
                  cursor: 'pointer',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '4px 0',
                  transition: 'color 0.3s',
                  fontFamily: 'inherit',
                  textAlign: 'right',
                }}
                onMouseOver={(e) => (e.target.style.color = '#c9a96e')}
                onMouseOut={(e) => (e.target.style.color = '#4a4745')}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div
            style={{
              marginTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '24px',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'baseline',
                  gap: '24px',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: '#4a4745',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  Subtotal
                </span>
                <span
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 400,
                    color: '#c9a96e',
                    letterSpacing: '0.03em',
                  }}
                >
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: '#4a4745',
                  letterSpacing: '0.05em',
                }}
              >
                Shipping and taxes calculated at checkout
              </p>
            </div>

            <button
              onClick={checkout}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '18px 32px',
                background: '#c9a96e',
                color: '#050505',
                border: 'none',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.35s',
                fontFamily: 'inherit',
              }}
              onMouseOver={(e) => (e.target.style.background = '#d4b87a')}
              onMouseOut={(e) => (e.target.style.background = '#c9a96e')}
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Continue Shopping */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/products"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8a8580',
                borderBottom: '1px solid #2a2725',
                paddingBottom: '4px',
                transition: 'color 0.3s, border-color 0.3s',
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
