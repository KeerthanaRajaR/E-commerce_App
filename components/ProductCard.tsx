"use client";

import { Product } from "@/types";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const finalPrice = product.discount ? product.price - product.discount : product.price;
  const discountPercentage = product.discount
    ? Math.round((product.discount / product.price) * 100)
    : 0;
  const imageSrc = product.images[0] || "/placeholder.jpg";
  const isSvg = imageSrc.endsWith(".svg");

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={isSvg}
          className="object-cover"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews.length} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">{formatPrice(finalPrice)}</span>
          {product.discount && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-center font-medium hover:bg-blue-700 transition"
          >
            View Details
          </Link>
          <button
            onClick={() => onAddToCart?.(product.id)}
            disabled={product.stock === 0}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-3 rounded font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
