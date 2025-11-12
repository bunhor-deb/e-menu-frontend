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
      className="block rounded shadow-lg mx-auto border border-palette-lighter overflow-hidden w-full"
    >
      {/* Image: responsive height so cards are smaller on phones */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 border-b-2 border-palette-lighter overflow-hidden">
        <Image
          src={imageUrl}
          alt={description}
          fill
          className="transform duration-500 ease-in-out hover:scale-110 object-cover"
        />
      </div>

      <div className="relative p-3 md:p-4">
        <div className="font-primary text-palette-primary text-base sm:text-lg md:text-xl font-semibold truncate">
          {title}
        </div>
        <div className="text-sm sm:text-base text-gray-600 mt-2 leading-tight overflow-hidden">
          {description}
        </div>

        <div className="absolute bottom-3 right-3 bg-palette-lighter text-palette-dark font-primary font-medium text-sm sm:text-base px-3 py-1 rounded">
          <Price currency="$" num={price} numSize="text-sm" />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
