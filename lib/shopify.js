async function shopifyAdmin(query, variables = {}) {
  const store =
    process.env.FASHIONISTAS_SHOP ||
    process.env.SHOPIFY_STORE ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE ||
    'js0hy0-ux.myshopify.com';
  const token =
    process.env.FASHIONISTAS_TOKEN ||
    process.env.SHOPIFY_ADMIN_TOKEN ||
    process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;
  const url = `https://${store}/admin/api/2024-01/graphql.json`;

  if (!token) {
    console.error('FASHIONISTAS_TOKEN or SHOPIFY_ADMIN_TOKEN not set');
    return null;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      console.error(`Shopify API ${res.status}`);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error('Shopify errors:', JSON.stringify(json.errors).slice(0, 200));
      return null;
    }

    return json.data;
  } catch (e) {
    console.error('Shopify fetch failed:', e.message);
    return null;
  }
}

export async function getProducts(first = 12, query = '') {
  const effectiveQuery = query
    ? `status:active AND published_status:published AND (${query})`
    : 'status:active AND published_status:published';
  const overFetch = Math.max(first * 3, 30);
  const gql = `
    query getProducts($first: Int!, $query: String) {
      products(first: $first, query: $query, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            productType
            vendor
            tags
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantCompareAtPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price
                  compareAtPrice
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql, { first: overFetch, query: effectiveQuery });
  if (!data?.products?.edges) return [];
  const live = data.products.edges
    .map((e) => e.node)
    .filter((p) => {
      const variant = p.variants?.edges?.[0]?.node;
      return variant?.availableForSale === true;
    });
  return live.slice(0, first);
}

export async function getProduct(handle) {
  const gql = `
    query getProduct($handle: String!) {
      products(first: 1, query: $handle) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            productType
            vendor
            tags
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantCompareAtPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  price
                  compareAtPrice
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql, { handle: `handle:${handle}` });
  return data?.products?.edges?.[0]?.node || null;
}

export async function getCollections() {
  const gql = `
    query getCollections {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
            productsCount {
              count
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql);
  if (!data?.collections?.edges) return [];
  return data.collections.edges.map((e) => ({
    ...e.node,
    productCount: e.node.productsCount?.count ?? 0,
  }));
}

function isLiveProduct(product) {
  if (!product) return false;
  if (product.status && product.status !== 'ACTIVE') return false;
  if (!product.publishedAt) return false;
  const variant = product.variants?.edges?.[0]?.node;
  return variant?.availableForSale === true;
}

export async function getProductsByCollection(handle, first = 50) {
  const gql = `
    query getProductsByCollection($query: String!, $first: Int!) {
      collections(first: 1, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            products(first: $first) {
              edges {
                node {
                  id
                  title
                  handle
                  productType
                  status
                  publishedAt
                  priceRangeV2 {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  compareAtPriceRange {
                    minVariantCompareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        price
                        compareAtPrice
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql, { query: `handle:${handle}`, first: Math.max(first * 3, 50) });
  const collection = data?.collections?.edges?.[0]?.node;
  if (!collection) return null;
  const live = collection.products.edges.map((e) => e.node).filter(isLiveProduct).slice(0, first);
  return {
    ...collection,
    products: live,
  };
}

export async function getProductsByCollectionSorted(handle, sortKey = 'CREATED', reverse = true, first = 50) {
  const gql = `
    query getProductsByCollectionSorted($query: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean!) {
      collections(first: 1, query: $query) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            image {
              url
              altText
            }
            products(first: $first, sortKey: $sortKey, reverse: $reverse) {
              edges {
                node {
                  id
                  title
                  handle
                  productType
                  status
                  publishedAt
                  createdAt
                  priceRangeV2 {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  compareAtPriceRange {
                    minVariantCompareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        price
                        compareAtPrice
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql, {
    query: `handle:${handle}`,
    first: Math.max(first * 3, 50),
    sortKey,
    reverse,
  });
  const collection = data?.collections?.edges?.[0]?.node;
  if (!collection) return null;
  const live = collection.products.edges.map((e) => e.node).filter(isLiveProduct).slice(0, first);
  return {
    ...collection,
    products: live,
  };
}

export async function getAllProductHandles() {
  const gql = `
    query getAllProductHandles($cursor: String) {
      products(first: 250, after: $cursor, query: "status:active AND published_status:published", sortKey: CREATED_AT, reverse: true) {
        pageInfo { hasNextPage endCursor }
        edges {
          cursor
          node {
            handle
            updatedAt
            variants(first: 1) { edges { node { availableForSale } } }
          }
        }
      }
    }
  `;

  const handles = [];
  let cursor = null;
  for (let page = 0; page < 20; page++) {
    const data = await shopifyAdmin(gql, { cursor });
    const edges = data?.products?.edges || [];
    for (const edge of edges) {
      const node = edge.node;
      const available = node.variants?.edges?.[0]?.node?.availableForSale === true;
      if (available && node.handle) {
        handles.push({ handle: node.handle, updatedAt: node.updatedAt });
      }
    }
    const pageInfo = data?.products?.pageInfo;
    if (!pageInfo?.hasNextPage) break;
    cursor = pageInfo.endCursor;
  }
  return handles;
}

export async function getAllCollectionHandles() {
  const gql = `
    query getAllCollectionHandles {
      collections(first: 50) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql);
  if (!data?.collections?.edges) return [];
  return data.collections.edges.map((e) => e.node);
}

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(parseFloat(amount));
}

export function getVariantId(gid) {
  // Convert gid://shopify/ProductVariant/12345 to 12345
  return gid.split('/').pop();
}
