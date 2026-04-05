// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

// Cart Types
export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  paymentId?: string;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

// Address Types
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Search Request Types
export interface SearchRequest {
  query: string;
  filters?: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    rating?: number;
  };
}

// AI Recommendation Types
export interface RecommendationRequest {
  userId?: string;
  cartItems?: CartItem[];
  browsedProducts?: string[];
  searchQuery?: string;
}

export interface RecommendationResponse {
  products: Product[];
  reason: string;
}
