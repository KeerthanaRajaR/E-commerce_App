"use client";

import Navbar from "@/components/Navbar";
import CartItemComponent from "@/components/CartItem";
import { useMemo, useState } from "react";
import { Cart } from "@/types";
import { getCart, updateCartQuantity, removeFromCart, clearCart } from "@/lib/cart";
import { formatPrice } from "@/utils/formatters";
import Link from "next/link";
import { getProductById } from "@/lib/products";

export default function CartPage() {
  const [cart, setCart] = useState<Cart>(() => getCart());

  const totalPrice = useMemo(() => {
    let total = 0;
    cart.items.forEach((item) => {
      const product = getProductById(item.productId);
      if (product) {
        const finalPrice = product.discount ? product.price - product.discount : product.price;
        total += finalPrice * item.quantity;
      }
    });
    return total;
  }, [cart]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    const updatedCart = updateCartQuantity(productId, quantity);
    setCart(updatedCart);
  };

  const handleRemove = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
  };

  const handleClear = () => {
    clearCart();
    setCart({ items: [], totalPrice: 0, totalItems: 0 });
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <CartItemComponent
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
              <button
                onClick={handleClear}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 border-b pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold">₹0 (Free)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%):</span>
                    <span className="font-semibold">{formatPrice(totalPrice * 0.18)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-xl">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-blue-600">
                    {formatPrice(totalPrice * 1.18)}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-center hover:bg-blue-700 transition block"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/products"
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold text-center hover:bg-blue-50 transition block mt-3"
                >
                  Continue Shopping
                </Link>

                <div className="mt-6 p-4 bg-blue-50 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>💡 Tip:</strong> Add items worth ₹1000+ to get free shipping!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
