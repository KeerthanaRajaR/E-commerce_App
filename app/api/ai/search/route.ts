import { NextRequest, NextResponse } from "next/server";
import { searchProducts, filterByPrice } from "@/lib/products";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, filters } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Search query is required" },
        { status: 400 }
      );
    }

    // Perform search
    let results = searchProducts(query);

    // Apply filters if provided
    if (filters?.minPrice || filters?.maxPrice) {
      const minPrice = filters?.minPrice || 0;
      const maxPrice = filters?.maxPrice || Infinity;
      results = filterByPrice(results, minPrice, maxPrice);
    }

    // In a production app, you would:
    // 1. Use OpenAI API to interpret natural language queries
    // 2. Extract product attributes (price, category, etc.)
    // 3. Generate personalized recommendations

    return NextResponse.json({
      success: true,
      query: query,
      results: results,
      count: results.length,
      aiInterpretation: {
        keywords: query.split(" "),
        filters: filters || {},
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
