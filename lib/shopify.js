const SHOPIFY_STORE = process.env.SHOPIFY_STORE || 'js0hy0-ux.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

async function shopifyAdmin(query, variables = {}) {
  const url = `https://${SHOPIFY_STORE}/admin/api/2024-01/graphql.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify Admin API error ${res.status}: ${text}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
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
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
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
        }
        compareAtPriceRange {
          minVariantPrice {
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
  return data.productByHandle;
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
                minVariantPrice {
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
                minVariantPrice {
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
