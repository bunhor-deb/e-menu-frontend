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
 * Fetches a single product from the API endpoint by its handle.
 * @param {string} handle - The handle of the product to fetch.
 * @returns {Promise<object|null>} A promise that resolves to the product object, or null if not found.
 */
export async function getProduct(handle) {
  try {
    // Extract the externalId from the handle (e.g., "sample-product-2" -> "2")
    const externalId = handle.split("-").pop();
    if (!externalId) {
      throw new Error(`Could not extract external ID from handle: ${handle}`);
    }

    const res = await fetch(
      `http://localhost:8080/api/products/external/${externalId}`
    );
    if (!res.ok) {
      // If not found, res.ok will be false.
      return null;
    }
    const product = await res.json();
    return transformProduct(product);
  } catch (error) {
    console.error(`Error fetching product with handle "${handle}":`, error);
    return null;
  }
}

function transformProduct(product) {
  return {
    id: product.externalId || product.id.toString(), // Use externalId if available, otherwise id
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
      edges: product.images.map((image) => ({
        node: {
          src: image.src,
          originalSrc: image.src, // ProductImage component expects originalSrc
          altText: product.title, // Use product title as alt text
        },
      })),
    },
    variants: {
      // Crucial for ProductDetails and ProductForm
      edges: [
        {
          node: {
            id: `variant-${product.id}`, // Create a unique variant ID
            title: "Default", // Assuming a default variant for simplicity
            price: product.price.toString(),
          },
        },
      ],
    },
  };
}
