import { useState } from "react";
import ProductCard from "@/components/ProductCard";

function ProductListings({ products }) {
  const [expanded, setExpanded] = useState(false);

  // show 4 items (2 columns x 2 rows) by default, expand to show all
  const visible = expanded ? products : products.slice(0, 4);

  return (
    <div className="py-12 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8">
        {visible.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {products.length > 4 && (
        <div className="mt-8 text-center">
          <button
            className="px-4 py-2 bg-palette-primary text-white rounded-sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : "Show all"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductListings;
