import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { patients } from "../../../../../drizzle/schema";
import { hash } from "bcryptjs";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    const existing = await db
      .select()
      .from(patients)
      .where(eq(patients.email, email))
      .then((r) => r[0] ?? null);

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered", code: "EMAIL_EXISTS" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await db.insert(patients).values({
      name,
      email,
      phone: phone ?? null,
      hashedPassword,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Sign up failed", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
