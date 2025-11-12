import ProductSection from "@/components/ProductSection";
import { getAllProducts, getProduct } from "@/lib/products";

function ProductPage({ productData }) {
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection productData={productData} />
    </div>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();
  const paths = products.map((product) => ({
    params: { product: product.handle },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProduct(params.product);

  if (!productData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      productData,
    },
    revalidate: 60, // Optionally, re-generate the page every 60 seconds
  };
}

export default ProductPage;
