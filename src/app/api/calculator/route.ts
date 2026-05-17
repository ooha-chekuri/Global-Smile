import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { calculateSavings } from "@/lib/calculator-utils";

const calculatorSchema = z.object({
  treatmentType: z.enum([
    "full-arch",
    "implants-single",
    "veneers",
    "crowns-bridges",
    "maxillofacial",
  ]),
  homeCity: z.enum(["newYork", "london", "sydney"]),
  travelClass: z.enum(["economy", "business"]),
  stayDuration: z.number().min(3).max(30),
  companion: z.boolean(),
  hotelClass: z.enum(["threestar", "fourstar", "fivestar"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = calculatorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const result = calculateSavings(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
