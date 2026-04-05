import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const product = await db.product.findUnique({
      where: { id: productId },
      include: { reviews: true },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: productId } = await params;

    const product = await db.product.update({
      where: { id: productId },
      data: {
        ...(body.name !== undefined ? { name: body.name } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.price !== undefined ? { price: body.price } : {}),
        ...(body.discount !== undefined ? { discount: body.discount } : {}),
        ...(body.category !== undefined ? { category: body.category } : {}),
        ...(body.images !== undefined ? { images: body.images } : {}),
        ...(body.stock !== undefined ? { stock: body.stock } : {}),
        ...(body.rating !== undefined ? { rating: body.rating } : {}),
      },
      include: { reviews: true },
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    await db.product.delete({ where: { id: productId } });

    return NextResponse.json({
      success: true,
      message: `Product ${productId} deleted successfully`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
