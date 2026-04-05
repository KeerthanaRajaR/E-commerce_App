import { Product } from "@/types";

// Mock product data for demonstration
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "MacBook Pro 16",
    description: "Powerful laptop for coding and design",
    price: 199999,
    discount: 10000,
    category: "Electronics",
    images: ["/products/macbook-pro.png"],
    stock: 5,
    rating: 4.8,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Nike Air Max",
    description: "Comfortable and stylish running shoes",
    price: 8999,
    discount: 1000,
    category: "Clothing",
    images: ["/products/nike-shoes.png"],
    stock: 15,
    rating: 4.5,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "The Clean Code Book",
    description: "Essential guide to writing maintainable code",
    price: 599,
    category: "Books",
    images: ["/products/clean-code.png"],
    stock: 20,
    rating: 4.9,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Sony WH-1000XM5 Headphones",
    description: "Premium noise-canceling wireless headphones",
    price: 24990,
    discount: 3000,
    category: "Electronics",
    images: ["/products/sony-headphones.png"],
    stock: 8,
    rating: 4.7,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Levi's 501 Jeans",
    description: "Classic durable denim jeans",
    price: 4999,
    discount: 500,
    category: "Clothing",
    images: ["/products/levis-jeans.png"],
    stock: 25,
    rating: 4.3,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "iPad Air 11",
    description: "Versatile tablet for work and entertainment",
    price: 79999,
    category: "Electronics",
    images: ["/products/ipad-air.png"],
    stock: 10,
    rating: 4.6,
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
};

// Get single product by ID
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};

// Search products by query
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
  );
};

// Filter products by price range
export const filterByPrice = (
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  return products.filter((p) => {
    const finalPrice = p.discount ? p.price - p.discount : p.price;
    return finalPrice >= minPrice && finalPrice <= maxPrice;
  });
};

// Get trending products
export const getTrendingProducts = (): Product[] => {
  return MOCK_PRODUCTS.sort((a, b) => b.rating - a.rating).slice(0, 6);
};

// Get on-sale products
export const getSaleProducts = (): Product[] => {
  return MOCK_PRODUCTS.filter((p) => p.discount && p.discount > 0);
};
