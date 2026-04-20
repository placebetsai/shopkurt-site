export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://fashionistas.ai/sitemap.xml',
    host: 'https://fashionistas.ai',
  };
}
