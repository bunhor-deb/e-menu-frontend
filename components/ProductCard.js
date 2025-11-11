import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";

function ProductCard({ product }) {
  // Support both Shopify format (product.node) and flat mock format (product)
  const productData = product.node || product;

  const handle = productData.handle;
  const title = productData.title;
  const description = productData.description;

  // Handle both formats for price
  const price = productData.priceRange
    ? productData.priceRange.minVariantPrice.amount
    : productData.variants?.edges?.[0]?.node?.price || "0";

  // Handle both formats for images
  const imageUrl =
    productData.images?.edges?.[0]?.node?.src ||
    productData.images?.edges?.[0]?.node?.originalSrc ||
    productData.images?.[0]?.src ||
    "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Link
      href={`/products/${handle}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter block"
    >
      <div className="h-72 border-b-2 border-palette-lighter relative">
        <Image
          src={imageUrl}
          alt={description}
          fill
          className="transform duration-500 ease-in-out hover:scale-110 object-cover"
        />
      </div>
      <div className="h-48 relative">
        <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold">
          {title}
        </div>
        <div className="text-lg text-gray-600 p-4 font-primary font-light">
          {description}
        </div>
        <div
          className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
          rounded-tl-sm triangle"
        >
          <Price currency="$" num={price} numSize="text-lg" />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
