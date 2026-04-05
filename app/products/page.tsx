"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { PRODUCT_CATEGORIES } from "@/utils/constants";
import { MOCK_PRODUCTS } from "@/lib/products";
import { useState } from "react";
import { addToCart } from "@/lib/cart";

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });

  // Filter products based on search and category
  let filteredProducts = MOCK_PRODUCTS;

  if (searchParams.search) {
    const query = searchParams.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }

  filteredProducts = filteredProducts.filter((p) => {
    const finalPrice = p.discount ? p.price - p.discount : p.price;
    return finalPrice >= priceRange.min && finalPrice <= priceRange.max;
  });

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    // toast.success("Added to cart!");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">All Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Category</h3>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded mb-2 transition ${
                    selectedCategory === null
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All Categories
                </button>
                {PRODUCT_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded mb-2 transition ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-lg font-bold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">Min: ₹{priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max: ₹{priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No products found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
