"use client";

import { CartItem } from "@/types";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import { getProductById } from "@/lib/products";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const product = getProductById(item.productId);

  if (!product) {
    return null;
  }

  const finalPrice = product.discount ? product.price - product.discount : product.price;
  const itemTotal = finalPrice * item.quantity;
  const imageSrc = product.images[0] || "/placeholder.jpg";
  const isSvg = imageSrc.endsWith(".svg");

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow border">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="80px"
          unoptimized={isSvg}
          className="object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{product.name}</h4>
        <p className="text-sm text-gray-600">{formatPrice(finalPrice)} each</p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
          >
            −
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              onUpdateQuantity(item.productId, parseInt(e.target.value) || 1)
            }
            className="w-12 text-center border rounded px-1 py-1"
            min="1"
          />
          <button
            onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300"
          >
            +
          </button>
          <span className="text-sm text-gray-500 ml-4">
            Subtotal: {formatPrice(itemTotal)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.productId)}
        className="text-red-600 hover:text-red-800 font-semibold"
      >
        Remove
      </button>
    </div>
  );
}
