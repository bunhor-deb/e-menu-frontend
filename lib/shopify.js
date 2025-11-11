// Shopify integration removed.
// This file is kept as a harmless stub to avoid hard import errors in
// packages or third-party code that may still reference it. All
// application code should now use the local helpers under
// `utils/helpers.js` (createShopifyCheckout / updateShopifyCheckout).

export function getAllProductsInCollection() {
  throw new Error(
    "Shopify integration removed. Use mock data or utils/helpers.js instead."
  );
}

export function getProductSlugs() {
  throw new Error(
    "Shopify integration removed. Use mock data or utils/helpers.js instead."
  );
}

export function getProduct() {
  throw new Error(
    "Shopify integration removed. Use mock data or utils/helpers.js instead."
  );
}

export function createCheckout() {
  throw new Error(
    "Shopify integration removed. Use createShopifyCheckout in utils/helpers.js instead."
  );
}

export function updateCheckout() {
  throw new Error(
    "Shopify integration removed. Use updateShopifyCheckout in utils/helpers.js instead."
  );
}
