'use client';

import { useState } from 'react';
import { formatPrice } from '../lib/shopify';
import AddToCart from './AddToCart';

function getVariantId(gid) {
  return gid.split('/').pop();
}

export default function VariantSelector({ variants, productTitle, productImage }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = variants[selectedVariantIndex];
  const numericId = getVariantId(selectedVariant.id);

  // Group options by name (e.g., Size, Color)
  const optionGroups = {};
  variants.forEach((v) => {
    v.selectedOptions.forEach((opt) => {
      if (!optionGroups[opt.name]) {
        optionGroups[opt.name] = new Set();
      }
      optionGroups[opt.name].add(opt.value);
    });
  });

  // Get the selected options for the current variant
  const selectedOptions = {};
  selectedVariant.selectedOptions.forEach((opt) => {
    selectedOptions[opt.name] = opt.value;
  });

  function selectOption(optionName, optionValue) {
    // Find variant that matches this option plus other currently selected options
    const newSelected = { ...selectedOptions, [optionName]: optionValue };
    const matchIndex = variants.findIndex((v) =>
      v.selectedOptions.every((opt) => newSelected[opt.name] === opt.value)
    );
    if (matchIndex >= 0) {
      setSelectedVariantIndex(matchIndex);
    }
  }

  const hasMultipleVariants = variants.length > 1;
  const showDefaultTitle = !hasMultipleVariants && variants[0]?.title === 'Default Title';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Price display */}
      <div className="product-price">
        <span className="price-current">
          {formatPrice(selectedVariant.price)}
        </span>
        {selectedVariant.compareAtPrice &&
          parseFloat(selectedVariant.compareAtPrice) > parseFloat(selectedVariant.price) && (
            <>
              <span className="price-compare">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
              <span className="price-badge">
                Save{' '}
                {Math.round(
                  (1 -
                    parseFloat(selectedVariant.price) /
                      parseFloat(selectedVariant.compareAtPrice)) *
                    100
                )}
                %
              </span>
            </>
          )}
      </div>

      {/* Variant option buttons */}
      {hasMultipleVariants &&
        Object.entries(optionGroups).map(([optionName, values]) => (
          <div key={optionName} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#888',
              }}
            >
              {optionName}: <span style={{ color: '#f5f5f5' }}>{selectedOptions[optionName]}</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[...values].map((value) => {
                const isSelected = selectedOptions[optionName] === value;
                return (
                  <button
                    key={value}
                    onClick={() => selectOption(optionName, value)}
                    className="variant-btn"
                    style={{
                      padding: '10px 20px',
                      border: isSelected ? '2px solid #00e676' : '1px solid #333',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(0, 230, 118, 0.1)' : '#111',
                      color: isSelected ? '#00e676' : '#f5f5f5',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      {/* Availability */}
      {!selectedVariant.availableForSale && (
        <div
          style={{
            color: '#ff4757',
            fontSize: '0.9rem',
            fontWeight: 600,
            padding: '8px 0',
          }}
        >
          Out of Stock
        </div>
      )}

      {/* Add to Cart / Buy Now */}
      <AddToCart
        variantId={numericId}
        title={productTitle + (!showDefaultTitle && hasMultipleVariants ? ` - ${selectedVariant.title}` : '')}
        price={selectedVariant.price}
        image={productImage}
      />
    </div>
  );
}
