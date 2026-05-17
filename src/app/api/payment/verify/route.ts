import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { z } from "zod";

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid verification data", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

    const isValid = Razorpay.validateWebhookSignature(
      `${razorpay_order_id}|${razorpay_payment_id}`,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET ?? ""
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature", code: "VERIFICATION_FAILED" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true, message: "Payment verified" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Verification failed", code: "VERIFY_ERROR" },
      { status: 500 }
    );
  }
}
