const CATEGORY_DEFINITIONS = [
  {
    key: 'footwear',
    title: 'Shoes',
    slug: 'fashion',
    eyebrow: 'Shoes',
    description: 'Heels, sandals, flats, and boots.',
    cardNote: 'Shoes',
    filterLabel: 'Shoes',
    accent: '#f3b15a',
    keywords: [
      'shoe',
      'sneaker',
      'boot',
      'sandal',
      'loafer',
      'heel',
      'flat',
      'slipper',
      'wedge',
      'pump',
      'footwear',
    ],
  },
  {
    key: 'bags',
    title: 'Bags',
    slug: 'accessories',
    eyebrow: 'Bags',
    description: 'Crossbodies, totes, clutches, and carryalls.',
    cardNote: 'Bags',
    filterLabel: 'Bags',
    accent: '#ff7a90',
    keywords: [
      'bag',
      'tote',
      'crossbody',
      'wallet',
      'purse',
      'clutch',
      'satchel',
      'hobo',
      'backpack',
      'shoulder bag',
    ],
  },
  {
    key: 'jewelry',
    title: 'Jewelry',
    slug: 'accessories',
    eyebrow: 'Jewelry',
    description: 'Earrings, necklaces, bracelets, and rings.',
    cardNote: 'Jewelry',
    filterLabel: 'Jewelry',
    accent: '#d9b46b',
    keywords: [
      'earring',
      'necklace',
      'bracelet',
      'ring',
      'jewelry',
      'jewellery',
      'pendant',
      'chain',
      'cuff',
      'anklet',
      'brooch',
    ],
  },
  {
    key: 'beauty',
    title: 'Beauty',
    slug: 'beauty-and-personal-care',
    eyebrow: 'Beauty',
    description: 'Hair, lashes, nails, and makeup tools.',
    cardNote: 'Beauty',
    filterLabel: 'Beauty',
    accent: '#c88cff',
    keywords: [
      'beauty',
      'cosmetic',
      'lash',
      'lip',
      'nail',
      'makeup',
      'skin',
      'hair',
      'personal care',
      'personal-care',
      'brush',
      'mirror',
    ],
  },
];

const FALLBACK_CATEGORY = {
  key: 'featured',
  title: 'New In',
  slug: 'trending-items',
  eyebrow: 'New In',
  description: 'Just-added styles.',
  cardNote: 'New arrival',
  filterLabel: 'New In',
  accent: '#84d6ff',
};

const COLLECTION_PROMOS = {
  fashion: {
    slug: 'fashion',
    eyebrow: 'Shoes & Style',
    title: 'Shoes & Outfit Staples',
    description: 'Heels, sandals, flats, and statement pieces.',
    accent: '#f3b15a',
  },
  accessories: {
    slug: 'accessories',
    eyebrow: 'Accessories',
    title: 'Bags, Jewelry & More',
    description: 'Finishing pieces to complete the look.',
    accent: '#ff8fa0',
  },
  'beauty-and-personal-care': {
    slug: 'beauty-and-personal-care',
    eyebrow: 'Beauty',
    title: 'Beauty & Personal Care',
    description: 'Lashes, nails, hair tools, and everyday beauty.',
    accent: '#c88cff',
  },
  'trending-items': {
    slug: 'trending-items',
    eyebrow: 'Trending',
    title: 'Trending Now',
    description: 'This week’s most-shopped styles.',
    accent: '#84d6ff',
  },
};

const MIN_LANE_SIZE = 2;

const EXCLUDED_PRODUCT_PATTERNS = [
  'tumbler',
  'chapstick',
  'poker',
  'casino',
  'dice',
  'camera',
  'doorbell',
  'dashcam',
  'security',
  'dealer button',
  'discard tray',
  'cards',
  'carplay',
  'wifi video',
  'clock fan',
  'led fan',
  'flashlight',
  'blacklight',
  'led light',
  'led clock',
  'usb cable',
  'usb hub',
  'earbud',
  'headphone',
  'headlight',
  'phone case',
  'airtag',
  'air tag',
  'stress cube',
  'fidget',
  'gadget',
  'baby monitor',
  'pet monitor',
  'monitor',
  'dvr',
  'thermometer',
  'toilet',
  'kitchen',
  'baking',
  'air fryer',
  'silicone liner',
  'mirror tile',
  'wall sticker',
  'planner',
  'notebook',
  'spiral',
  'tablet',
  'router',
];

function productText(product) {
  return [
    product.title,
    product.productType,
    product.vendor,
    Array.isArray(product.tags) ? product.tags.join(' ') : '',
    product.description,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function scoreCategory(category, haystack) {
  let score = 0;

  for (const keyword of category.keywords) {
    if (haystack.includes(keyword)) {
      score += keyword.includes(' ') ? 3 : 2;
    }
  }

  if (category.slug && haystack.includes(category.slug)) {
    score += 3;
  }

  return score;
}

export function isFashionProduct(product) {
  const haystack = productText(product);

  if (!haystack) {
    return false;
  }

  return !EXCLUDED_PRODUCT_PATTERNS.some((pattern) => haystack.includes(pattern));
}

export function getMerchandiseableProducts(products) {
  return products.filter(isFashionProduct);
}

export function getCategoryForProduct(product) {
  const haystack = productText(product);
  let bestCategory = FALLBACK_CATEGORY;
  let bestScore = 0;

  for (const category of CATEGORY_DEFINITIONS) {
    const score = scoreCategory(category, haystack);
    if (score > bestScore) {
      bestCategory = category;
      bestScore = score;
    }
  }

  return bestCategory;
}

export function buildMerchSections(products, limitPerSection) {
  const buckets = new Map();

  for (const product of products) {
    const category = getCategoryForProduct(product);
    if (!buckets.has(category.key)) {
      buckets.set(category.key, {
        ...category,
        products: [],
      });
    }
    buckets.get(category.key).products.push(product);
  }

  return Array.from(buckets.values())
    .map((bucket) => ({
      ...bucket,
      products:
        typeof limitPerSection === 'number'
          ? bucket.products.slice(0, limitPerSection)
          : bucket.products,
      total: bucket.products.length,
    }))
    .sort((a, b) => b.total - a.total);
}

export function buildCollectionPromos(products, minCount = MIN_LANE_SIZE) {
  const totals = new Map();

  for (const product of products) {
    const category = getCategoryForProduct(product);
    const current = totals.get(category.slug) || {
      total: 0,
      product: null,
    };
    totals.set(category.slug, {
      total: current.total + 1,
      product: current.product || product,
    });
  }

  return Array.from(totals.entries())
    .map(([slug, entry]) => ({
      ...(COLLECTION_PROMOS[slug] || COLLECTION_PROMOS['trending-items']),
      total: entry.total,
      featuredProductTitle: entry.product?.title || '',
      image: entry.product?.images?.edges?.[0]?.node || null,
      handle: entry.product?.handle || '',
    }))
    .filter((promo) => promo.total >= minCount)
    .sort((a, b) => b.total - a.total);
}

export function getVisibleFilterLanes(products) {
  const sections = buildMerchSections(products);
  const strongSections = sections.filter((section) => section.total >= MIN_LANE_SIZE);
  const visibleSections = strongSections.length > 0 ? strongSections : sections;

  return [
    {
      key: 'all',
      label: 'All Products',
      count: products.length,
      match: () => true,
    },
    ...visibleSections.map((section) => ({
      key: section.key,
      label: section.filterLabel,
      count: section.total,
      match: (product) => getCategoryForProduct(product).key === section.key,
    })),
  ];
}

export function getProductBadge(product) {
  const compareAt = product.compareAtPriceRange?.minVariantCompareAtPrice;
  const price = product.priceRangeV2?.minVariantPrice;
  const text = productText(product);

  if (compareAt && price && parseFloat(compareAt.amount) > parseFloat(price.amount)) {
    return 'Sale';
  }
  if (text.includes('new arrival') || text.includes('just in') || text.includes('fresh')) {
    return 'Just In';
  }
  if (text.includes('statement') || text.includes('viral') || text.includes('trending')) {
    return 'Standout';
  }

  return null;
}

export { CATEGORY_DEFINITIONS, FALLBACK_CATEGORY, COLLECTION_PROMOS };
