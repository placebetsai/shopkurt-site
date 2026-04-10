import { getAllProductHandles, getAllCollectionHandles } from '../lib/shopify';

const BASE_URL = 'https://fashionistas.ai';

export default async function sitemap() {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/collections`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/israel-joffe`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  let productPages = [];
  let collectionPages = [];

  try {
    const products = await getAllProductHandles();
    productPages = products.map((product) => ({
      url: `${BASE_URL}/products/${product.handle}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (err) {
    console.error('Sitemap: failed to fetch products:', err.message);
  }

  try {
    const collections = await getAllCollectionHandles();
    collectionPages = collections.map((collection) => ({
      url: `${BASE_URL}/collections/${collection.handle}`,
      lastModified: collection.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (err) {
    console.error('Sitemap: failed to fetch collections:', err.message);
  }

  return [...staticPages, ...productPages, ...collectionPages];
}
