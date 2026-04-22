// Cloudflare Pages Function — proxy /cart/* to the Shopify backend so
// checkout permalinks (e.g. /cart/53125145002289:1) actually reach Shopify.
//
// Why this exists: Shopify primary domain is set to fashionistas.ai. Any
// shopkurt.com/cart/... or js0hy0-ux.myshopify.com/cart/... URL 301-redirects
// to fashionistas.ai/cart/... — which Next.js serves, and Next doesn't have
// a /cart/:variantId route, so it 404s. This intercepts on CF Pages and
// forwards to myshopify.com with ?_fd=0 so Shopify stops redirecting back.

const SHOPIFY_DOMAIN = 'js0hy0-ux.myshopify.com';

export async function onRequest(context) {
  const { request, params } = context;
  const url = new URL(request.url);

  // The Next.js app also has an in-app /cart page (shows localStorage items).
  // Only intercept cart ADD patterns: /cart/<variantId>:<qty>[,<id>:<qty>...]
  // i.e. the path must start with a number. If it's just /cart (the app page),
  // let it through to Next.js by returning null.
  const pathSegments = params.path || [];
  const firstSeg = Array.isArray(pathSegments) ? pathSegments[0] : pathSegments;

  if (!firstSeg || !/^\d/.test(firstSeg)) {
    // Not a cart permalink — let Next.js handle it (the /cart page).
    return context.next();
  }

  // Rebuild the path exactly as Shopify expects and forward.
  const cartPath = Array.isArray(pathSegments) ? pathSegments.join('/') : pathSegments;

  // Preserve incoming query, add _fd=0 to stop Shopify's forward-domain redirect
  // (which would send us back to fashionistas.ai and 404).
  const outgoing = new URL(`https://${SHOPIFY_DOMAIN}/cart/${cartPath}`);
  for (const [k, v] of url.searchParams) outgoing.searchParams.set(k, v);
  if (!outgoing.searchParams.has('_fd')) outgoing.searchParams.set('_fd', '0');

  return Response.redirect(outgoing.toString(), 302);
}
