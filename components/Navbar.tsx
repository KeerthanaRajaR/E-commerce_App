"use client";

import { getCart } from "@/lib/cart";
import { getWishlist } from "@/lib/wishlist";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const syncCounts = () => {
      setCartCount(getCart().totalItems);
      setWishlistCount(getWishlist().length);
    };

    syncCounts();
    window.addEventListener("storage", syncCounts);
    window.addEventListener("cart-change", syncCounts);
    window.addEventListener("wishlist-change", syncCounts);

    return () => {
      window.removeEventListener("storage", syncCounts);
      window.removeEventListener("cart-change", syncCounts);
      window.removeEventListener("wishlist-change", syncCounts);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ⚡ SmartCart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="hover:text-blue-200 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-200 transition">
            Shop
          </Link>
          <Link href="/admin" className="hover:text-blue-200 transition">
            Admin
          </Link>
          <Link href="/wishlist" className="hover:text-blue-200 transition">
            ❤ Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
          </Link>
          <Link
            href="/cart"
            className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-50 transition"
          >
            🛒 Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-4 space-y-3">
          <Link href="/" className="block hover:text-blue-200">
            Home
          </Link>
          <Link href="/products" className="block hover:text-blue-200">
            Shop
          </Link>
          <Link href="/admin" className="block hover:text-blue-200">
            Admin
          </Link>
          <Link href="/wishlist" className="block hover:text-blue-200">
            ❤ Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
          </Link>
          <Link href="/cart" className="block hover:text-blue-200">
            🛒 Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>
        </div>
      )}
    </nav>
  );
}
