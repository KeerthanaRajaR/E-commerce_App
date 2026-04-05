"use client";

import Navbar from "@/components/Navbar";
import { addToCart } from "@/lib/cart";
import { getWishlist, removeFromWishlist, clearWishlist } from "@/lib/wishlist";
import { getProductById } from "@/lib/products";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/formatters";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => getWishlist());

  const wishlistProducts = useMemo(() => {
    return wishlistIds
      .map((productId) => getProductById(productId))
      .filter(Boolean);
  }, [wishlistIds]);

  const handleRemove = (productId: string) => {
    setWishlistIds(removeFromWishlist(productId));
  };

  const handleMoveToCart = (productId: string) => {
    addToCart(productId, 1);
    setWishlistIds(removeFromWishlist(productId));
  };

  const handleClear = () => {
    setWishlistIds(clearWishlist());
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h1 className="text-4xl font-bold text-gray-900">Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <button
              onClick={handleClear}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600 mb-6">Your wishlist is empty</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => {
              if (!product) return null;
              const finalPrice = product.discount ? product.price - product.discount : product.price;
              const imageSrc = product.images[0] || "/placeholder.jpg";
              const isSvg = imageSrc.endsWith(".svg");

              return (
                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={isSvg}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(finalPrice)}
                      </span>
                      {product.discount && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 bg-blue-600 text-white py-2 rounded text-center font-medium hover:bg-blue-700"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleMoveToCart(product.id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="flex-1 border border-red-500 text-red-600 py-2 rounded font-medium hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
