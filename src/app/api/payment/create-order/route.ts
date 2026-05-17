import { NextRequest, NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { z } from "zod";

const orderSchema = z.object({
  amount: z.number().int().min(100),
  currency: z.enum(["INR", "USD", "GBP", "AUD"]).default("INR"),
  receipt: z.string().optional(),
  notes: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { amount, currency, receipt, notes } = parsed.data;

    if (!process.env.RAZORPAY_KEY_ID) {
      return NextResponse.json(
        {
          error: "Payments not configured",
          code: "PAYMENTS_DISABLED",
          demoMode: true,
          message: "Razorpay is not configured. Contact admin to set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
        },
        { status: 503 }
      );
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt ?? `rcpt_${Date.now()}`,
      notes,
    });

    return NextResponse.json(order, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order", code: "ORDER_ERROR" },
      { status: 500 }
    );
  }
}
