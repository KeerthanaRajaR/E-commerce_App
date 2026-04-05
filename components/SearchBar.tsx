"use client";

import { useMemo, useState } from "react";
import { searchProducts } from "@/lib/products";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);

  const isOpen = query.length > 0;

  const handleSelect = (productId: string) => {
    router.push(`/products/${productId}`);
    setQuery("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products (e.g., 'cheap shoes under 1000')..."
          className="flex-1 px-4 py-2 rounded-l border-2 border-gray-300 focus:border-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 max-h-64 overflow-y-auto">
          {results.slice(0, 5).map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product.id)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b last:border-b-0 transition"
            >
              <div className="font-semibold text-gray-900">{product.name}</div>
              <div className="text-sm text-gray-600">{product.category}</div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-lg z-10 px-4 py-3 text-gray-600">
          No products found matching &quot;{query}&quot;
        </div>
      )}
    </form>
  );
}
