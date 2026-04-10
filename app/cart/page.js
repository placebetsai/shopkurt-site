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
    const stored = localStorage.getItem('shopkurt_cart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }

  function saveCart(newCart) {
    localStorage.setItem('shopkurt_cart', JSON.stringify(newCart));
    setCart(newCart);
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

  function clearCart() {
    saveCart([]);
  }

  function checkout() {
    if (cart.length === 0) return;
    const cartString = cart
      .map((item) => `${item.variantId}:${item.quantity}`)
      .join(',');
    window.location.href = `https://shopkurt.com/cart/${cartString}`;
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
        <h1>Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <div
            style={{
              fontSize: '4rem',
              marginBottom: '16px',
              opacity: 0.3,
            }}
          >
            &#128722;
          </div>
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: '32px' }}>
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link href="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div style={{ paddingBottom: '80px' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item) => (
              <div
                key={item.variantId}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  background: '#111',
                  borderRadius: '12px',
                  border: '1px solid #222',
                  alignItems: 'center',
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#1a1a1a',
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
                        color: '#555',
                        fontSize: '0.75rem',
                      }}
                    >
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#00e676',
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
                    gap: '0',
                    flexShrink: 0,
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.variantId, -1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid #333',
                      borderRadius: '8px 0 0 8px',
                      background: '#1a1a1a',
                      color: '#f5f5f5',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                  >
                    -
                  </button>
                  <div
                    style={{
                      width: '44px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#111',
                      border: '1px solid #333',
                      borderLeft: 'none',
                      borderRight: 'none',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => updateQuantity(item.variantId, 1)}
                    style={{
                      width: '36px',
                      height: '36px',
                      border: '1px solid #333',
                      borderRadius: '0 8px 8px 0',
                      background: '#1a1a1a',
                      color: '#f5f5f5',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Line Total */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '1rem',
                    minWidth: '80px',
                    textAlign: 'right',
                    flexShrink: 0,
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
                    color: '#555',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    padding: '4px 8px',
                    transition: 'color 0.2s',
                    flexShrink: 0,
                  }}
                  title="Remove item"
                  onMouseOver={(e) => (e.target.style.color = '#ff4757')}
                  onMouseOut={(e) => (e.target.style.color = '#555')}
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div
            style={{
              marginTop: '32px',
              padding: '28px',
              background: '#111',
              borderRadius: '12px',
              border: '1px solid #222',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '1rem',
                  color: '#888',
                  fontWeight: 500,
                }}
              >
                Subtotal ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#00e676',
                }}
              >
                {formatPrice(subtotal)}
              </span>
            </div>
            <p
              style={{
                fontSize: '0.8rem',
                color: '#555',
                marginBottom: '20px',
              }}
            >
              Shipping and taxes calculated at checkout
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={checkout}
                className="btn btn-buy"
                style={{ flex: 1, minWidth: '200px' }}
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="btn btn-outline"
                style={{
                  padding: '16px 24px',
                  background: 'transparent',
                  border: '1px solid #333',
                  color: '#888',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Continue Shopping */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/products" className="btn btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
