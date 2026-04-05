import { LOCAL_STORAGE_KEYS } from "@/utils/constants";

export const getWishlist = (): string[] => {
  if (typeof window === "undefined") return [];

  const wishlistData = localStorage.getItem(LOCAL_STORAGE_KEYS.WISHLIST);
  if (!wishlistData) return [];

  try {
    return JSON.parse(wishlistData) as string[];
  } catch {
    return [];
  }
};

export const saveWishlist = (wishlist: string[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist-change"));
  }
};

export const toggleWishlistItem = (productId: string): boolean => {
  const wishlist = getWishlist();
  const existingIndex = wishlist.indexOf(productId);

  if (existingIndex >= 0) {
    wishlist.splice(existingIndex, 1);
    saveWishlist(wishlist);
    return false;
  }

  wishlist.push(productId);
  saveWishlist(wishlist);
  return true;
};

export const isInWishlist = (productId: string): boolean => {
  return getWishlist().includes(productId);
};

export const removeFromWishlist = (productId: string): string[] => {
  const wishlist = getWishlist().filter((id) => id !== productId);
  saveWishlist(wishlist);
  return wishlist;
};

export const clearWishlist = (): string[] => {
  saveWishlist([]);
  return [];
};
