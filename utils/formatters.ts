import { CURRENCY_SYMBOL } from "./constants";

// Format currency
export const formatPrice = (price: number): string => {
  return `${CURRENCY_SYMBOL}${price.toFixed(2)}`;
};

// Format date
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format rating
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Calculate discount percentage
export const calculateDiscountPercentage = (
  originalPrice: number,
  discount: number
): number => {
  return Math.round((discount / originalPrice) * 100);
};

// Calculate final price after discount
export const calculateFinalPrice = (
  price: number,
  discount?: number
): number => {
  if (!discount) return price;
  return price - discount;
};

// Format product name for URL
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};
