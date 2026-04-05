import { Cart } from "@/types";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants";

// Get cart from localStorage
export const getCart = (): Cart => {
  if (typeof window === "undefined") return { items: [], totalPrice: 0, totalItems: 0 };

  const cartData = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
  return cartData ? JSON.parse(cartData) : { items: [], totalPrice: 0, totalItems: 0 };
};

// Save cart to localStorage
export const saveCart = (cart: Cart): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-change"));
  }
};

// Add item to cart
export const addToCart = (productId: string, quantity: number = 1): Cart => {
  const cart = getCart();
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  // Recalculate totals
  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId: string): Cart => {
  const cart = getCart();
  cart.items = cart.items.filter((item) => item.productId !== productId);

  // Recalculate totals
  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  saveCart(cart);
  return cart;
};

// Update cart item quantity
export const updateCartQuantity = (productId: string, quantity: number): Cart => {
  const cart = getCart();
  const item = cart.items.find((i) => i.productId === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }

  // Recalculate totals
  cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  saveCart(cart);
  return cart;
};

// Clear cart
export const clearCart = (): Cart => {
  const emptyCart: Cart = { items: [], totalPrice: 0, totalItems: 0 };
  saveCart(emptyCart);
  return emptyCart;
};
