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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
          <div key={optionName} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label
              style={{
                fontSize: '0.65rem',
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#4a4745',
              }}
            >
              {optionName}: <span style={{ color: '#f0ede8' }}>{selectedOptions[optionName]}</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[...values].map((value) => {
                const isSelected = selectedOptions[optionName] === value;
                return (
                  <button
                    key={value}
                    onClick={() => selectOption(optionName, value)}
                    className={`variant-pill ${isSelected ? 'selected' : ''}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            {optionName.toLowerCase() === 'size' && (
              <button className="size-guide-link">Size Guide</button>
            )}
          </div>
        ))}

      {/* Availability */}
      {!selectedVariant.availableForSale && (
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#8a8580',
            padding: '4px 0',
          }}
        >
          Currently Unavailable
        </div>
      )}

      {/* Add to Bag / Buy Now */}
      <AddToCart
        variantId={numericId}
        title={productTitle + (!showDefaultTitle && hasMultipleVariants ? ` - ${selectedVariant.title}` : '')}
        price={selectedVariant.price}
        image={productImage}
      />
    </div>
  );
}
