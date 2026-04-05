import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { browsedProducts } = body;

    // Simple recommendation logic
    // In production, use ML models or OpenAI API for better recommendations
    let recommendations = [...MOCK_PRODUCTS];

    // Filter by similar categories from browsed products
    if (browsedProducts && browsedProducts.length > 0) {
      const browsedCategories = new Set<string>();
      browsedProducts.forEach((prodId: string) => {
        const prod = MOCK_PRODUCTS.find((p) => p.id === prodId);
        if (prod) browsedCategories.add(prod.category);
      });

      recommendations = recommendations.filter((p) => browsedCategories.has(p.category));
    }

    // Sort by rating and limit to 6 recommendations
    recommendations = recommendations
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    return NextResponse.json({
      success: true,
      products: recommendations,
      reason: "Based on your browsing history and preferences",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
