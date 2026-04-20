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

  const data = await shopifyAdmin(gql, { first, query });
  if (!data?.products?.edges) return [];
  return data.products.edges.map((e) => e.node);
}

export async function getProduct(handle) {
  const gql = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
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
  `;

  const data = await shopifyAdmin(gql, { handle });
  return data?.productByHandle || null;
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

export async function getProductsByCollection(handle, first = 50) {
  const gql = `
    query getProductsByCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        description
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              productType
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql, { handle, first });
  if (!data.collectionByHandle) return null;
  return {
    ...data.collectionByHandle,
    products: data.collectionByHandle.products.edges.map((e) => e.node),
  };
}

export async function getProductsByCollectionSorted(handle, sortKey = 'CREATED', reverse = true, first = 50) {
  const gql = `
    query getProductsByCollectionSorted($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean!) {
      collectionByHandle(handle: $handle) {
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
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyAdmin(gql, { handle, first, sortKey, reverse });
  if (!data.collectionByHandle) return null;
  return {
    ...data.collectionByHandle,
    products: data.collectionByHandle.products.edges.map((e) => e.node),
  };
}

export async function getAllProductHandles() {
  const gql = `
    query getAllProductHandles {
      products(first: 250) {
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
  if (!data?.products?.edges) return [];
  return data.products.edges.map((e) => e.node);
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
