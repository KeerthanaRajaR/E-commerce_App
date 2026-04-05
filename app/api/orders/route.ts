import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate order data
    if (!body.items || !body.shippingAddress || !body.email) {
      return NextResponse.json(
        { success: false, error: "Missing required order information" },
        { status: 400 }
      );
    }

    const itemsInput = body.items as Array<{ productId: string; quantity: number }>;
    if (!Array.isArray(itemsInput) || itemsInput.length === 0) {
      return NextResponse.json(
        { success: false, error: "Order items are required" },
        { status: 400 }
      );
    }

    const productIds = itemsInput.map((item) => item.productId);
    const products = await db.product.findMany({ where: { id: { in: productIds } } });
    const productMap = new Map(products.map((p) => [p.id, p]));

    const orderItemsData = itemsInput.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      const unitPrice = product.discount ? product.price - product.discount : product.price;
      const lineTotal = unitPrice * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      };
    });

    const totalPrice = orderItemsData.reduce((sum, item) => sum + item.lineTotal, 0);

    const order = await db.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        email: body.email,
        name: body.name ?? "Guest",
        phone: body.phone ?? "",
        shippingAddress: (body.shippingAddress ?? {}) as Prisma.InputJsonValue,
        totalPrice,
        paymentProvider: "RAZORPAY",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
      orderId: order.orderNumber,
      data: order,
      paymentUrl: "https://checkout.razorpay.com/v1/checkout.js", // Placeholder
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: orders,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
