/**
 * Fetches all products from the API endpoint.
 * @returns {Promise<Array>} A promise that resolves to an array of products.
 */
export async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:8080/api/products");
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    const products = await res.json();
    return products.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    // In a real-world app, you might want to handle this more gracefully,
    // maybe by returning an empty array or a specific error object.
    return [];
  }
}

/**
 * Transforms the product data from the API to match the structure
 * expected by the frontend components (similar to the original mock data).
 * @param {object} product - The product object from the API.
 * @returns {object} The transformed product object.
 */
function transformProduct(product) {
  return {
    id: product.externalId || product.id.toString(),
    title: product.title,
    handle: product.handle,
    description: product.description,
    priceRange: {
      minVariantPrice: {
        amount: product.price.toString(),
        currencyCode: product.currencyCode,
      },
    },
    images: {
      edges: product.images.map((image) => ({ node: { src: image.src } })),
    },
  };
}
