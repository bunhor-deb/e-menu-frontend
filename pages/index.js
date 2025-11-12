import StoreHeading from "@/components/StoreHeading";
import ProductListings from "@/components/ProductListings";
import { getAllProducts } from "@/lib/products";

function IndexPage({ products }) {
  return (
    <div className="mx-auto max-w-6xl">
      <StoreHeading />
      <ProductListings products={products} />
    </div>
  );
}

export async function getStaticProps() {
  const rawProducts = await getAllProducts();

  // Wrap in { node: ... } format to match Shopify GraphQL structure
  const products = rawProducts.map((product) => ({
    node: product,
  }));

  return {
    props: { products },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
}

export default IndexPage;
