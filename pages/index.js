import StoreHeading from "@/components/StoreHeading";
import ProductListings from "@/components/ProductListings";
// import { getAllProductsInCollection } from '@/lib/shopify'

// Mock products for testing without Shopify
const mockProducts = [
  {
    id: "1",
    title: "Sample Product 1",
    handle: "sample-product-1",
    description: "This is a sample product for testing",
    priceRange: {
      minVariantPrice: {
        amount: "29.99",
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            src: "/images/main.jpg",
          },
        },
      ],
    },
  },
  {
    id: "2",
    title: "Sample Product 2",
    handle: "sample-product-2",
    description: "This is another sample product for testing",
    priceRange: {
      minVariantPrice: {
        amount: "39.99",
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            src: "/images/desktop-lighthouse.png",
          },
        },
      ],
    },
  },
  {
    id: "3",
    title: "Sample Product 3",
    handle: "sample-product-3",
    description: "This is a third sample product for testing",
    priceRange: {
      minVariantPrice: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            src: "/images/mobile-lighthouse.png",
          },
        },
      ],
    },
  },
  {
    id: "4",
    title: "Sample Product 4",
    handle: "sample-product-4",
    description: "This is a fourth sample product for testing",
    priceRange: {
      minVariantPrice: {
        amount: "59.99",
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            src: "/images/main.jpg",
          },
        },
      ],
    },
  },
  {
    id: "5",
    title: "Sample Product 5",
    handle: "sample-product-5",
    description: "This is a fifth sample product for testing",
    priceRange: {
      minVariantPrice: {
        amount: "69.99",
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            src: "/images/desktop-lighthouse.png",
          },
        },
      ],
    },
  },
  {
    id: "6",
    title: "Sample Product 6",
    handle: "sample-product-6",
    description: "This is a sixth sample product for testing",
    priceRange: {
      minVariantPrice: {
        amount: "79.99",
        currencyCode: "USD",
      },
    },
    images: {
      edges: [
        {
          node: {
            src: "/images/mobile-lighthouse.png",
          },
        },
      ],
    },
  },
];

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />
    </div>
  );
}

export async function getStaticProps() {
  // Return mock products instead of fetching from Shopify
  // Wrap in { node: ... } format to match Shopify GraphQL structure
  const products = mockProducts.map((product) => ({
    node: product,
  }));

  return {
    props: {
      products,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
}

export default IndexPage;
