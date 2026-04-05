"use client";

import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { addToCart } from "@/lib/cart";
import { getTrendingProducts, getSaleProducts } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const trendingProducts = getTrendingProducts();
  const saleProducts = getSaleProducts();

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
    router.push("/cart");
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to SmartCart</h1>
          <p className="text-xl mb-8">
            AI-Powered Shopping Experience with Smart Recommendations
          </p>
          <SearchBar />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trending Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">🔥 Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Sale Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">💰 Hot Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI Recommendations</h3>
              <p className="text-gray-600">
                Smart suggestions based on your browsing and purchase history
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Find exactly what you want with intelligent search filters
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Checkout</h3>
              <p className="text-gray-600">
                Secure payment and quick order processing with Razorpay
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
