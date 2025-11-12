// import { getProductSlugs, getProduct } from '@/lib/shopify'
import ProductSection from "@/components/ProductSection";

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
            src: "/images/t1.jpg",
            originalSrc: "/images/t1.jpg",
            altText: "Sample Product 1",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "variant-1",
            title: "Default",
            price: "29.99",
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
            src: "/images/t2.jpg",
            originalSrc: "/images/t2.jpg",
            altText: "Sample Product 2",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "variant-2",
            title: "Default",
            price: "39.99",
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
            src: "/images/t3.jpg",
            originalSrc: "/images/t3.jpg",
            altText: "Sample Product 3",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "variant-3",
            title: "Default",
            price: "49.99",
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
            src: "/images/t4.jpg",
            originalSrc: "/images/t4.jpg",
            altText: "Sample Product 4",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "variant-4",
            title: "Default",
            price: "59.99",
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
            src: "/images/t5.jpg",
            originalSrc: "/images/t5.jpg",
            altText: "Sample Product 5",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "variant-5",
            title: "Default",
            price: "69.99",
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
            src: "/images/t4.jpg",
            originalSrc: "/images/t4.jpg",
            altText: "Sample Product 6",
          },
        },
      ],
    },
    variants: {
      edges: [
        {
          node: {
            id: "variant-6",
            title: "Default",
            price: "79.99",
          },
        },
      ],
    },
  },
];

function ProductPage({ productData }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  );
}

export async function getStaticPaths() {
  // Use mock product handles instead of fetching from Shopify
  const paths = mockProducts.map((product) => ({
    params: { product: product.handle },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Find the mock product by handle
  const productData = mockProducts.find((p) => p.handle === params.product);

  if (!productData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productData,
    },
  };
}

export default ProductPage;
