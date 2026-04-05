"use client";

import Navbar from "@/components/Navbar";
import { getProductById } from "@/lib/products";
import { formatPrice } from "@/utils/formatters";
import { addToCart } from "@/lib/cart";
import { isInWishlist, toggleWishlistItem } from "@/lib/wishlist";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setIsWishlisted(isInWishlist(productId));
  }, [productId]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className="text-xl text-gray-600">Product not found</p>
        </div>
      </>
    );
  }

  const finalPrice = product.discount ? product.price - product.discount : product.price;
  const discountPercentage = product.discount
    ? Math.round((product.discount / product.price) * 100)
    : 0;
  const imageSrc = product.images[0] || "/placeholder.jpg";
  const isSvg = imageSrc.endsWith(".svg");

  const handleAddToCart = () => {
    addToCart(productId, quantity);
    setFeedback("Added to cart successfully.");
    router.push("/cart");
  };

  const handleWishlistToggle = () => {
    const nextValue = toggleWishlistItem(productId);
    setIsWishlisted(nextValue);
    setFeedback(nextValue ? "Added to wishlist." : "Removed from wishlist.");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={isSvg}
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl text-yellow-500">★</span>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600">({product.reviews.length} reviews)</span>
            </div>

            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            {/* Category */}
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(finalPrice)}
                </span>
                {product.discount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-lg font-semibold text-green-600">
                  In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-lg font-semibold text-red-600">Out of Stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 border rounded px-3 py-2 text-center"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                🛒 Add to Cart
              </button>
              <button
                type="button"
                onClick={handleWishlistToggle}
                className="flex-1 border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
                aria-pressed={isWishlisted}
              >
                {isWishlisted ? "❤ Wishlisted" : "♡ Wishlist"}
              </button>
            </div>

            {feedback && (
              <p className="mt-4 text-sm font-medium text-blue-700">{feedback}</p>
            )}

            {/* Product Details */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-2xl font-bold mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
                <li>
                  <strong>In Stock:</strong> {product.stock} units
                </li>
                <li>
                  <strong>Rating:</strong> {product.rating} / 5
                </li>
                <li>
                  <strong>Reviews:</strong> {product.reviews.length} customer reviews
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
