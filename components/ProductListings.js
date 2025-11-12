import ProductCard from "@/components/ProductCard";

function ProductListings({ products }) {
  return (
    <div className="py-12 max-w-6xl mx-auto">
      {/* responsive grid: 2 cols on very small, 3 on small, 4 on md, 6 on large screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductListings;
