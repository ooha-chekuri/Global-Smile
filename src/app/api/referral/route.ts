import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { referrals, dentists } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { sendEmail, referralConfirmationHtml, statusUpdateHtml } from "@/lib/resend";
import { auth } from "@/lib/auth";

const createReferralSchema = z.object({
  patientName: z.string().min(2),
  patientEmail: z.string().email().optional().or(z.literal("")),
  patientPhone: z.string().optional().or(z.literal("")),
  chiefComplaint: z.string().min(10),
  urgency: z.enum(["normal", "urgent", "emergency"]),
  recordsUrl: z.string().optional().or(z.literal("")),
});

const updateStatusSchema = z.object({
  referralId: z.number(),
  status: z.enum(["pending", "reviewing", "scheduled", "in_progress", "closed"]),
  closureSummary: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = createReferralSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const { patientName, patientEmail, patientPhone, chiefComplaint, urgency, recordsUrl } = parsed.data;

    const [referral] = await db
      .insert(referrals)
      .values({
        referringDentistId: Number(session.user.id),
        patientName,
        patientEmail: patientEmail || null,
        patientPhone: patientPhone || null,
        chiefComplaint,
        urgency,
        recordsUrl: recordsUrl || null,
      })
      .returning();

    await sendEmail({
      to: session.user.email!,
      subject: `Referral Confirmation — ${patientName}`,
      html: referralConfirmationHtml(session.user.name ?? "Doctor", patientName, referral.id),
    });

    return NextResponse.json(referral, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const referralId = searchParams.get("id");

    if (session.user.role === "specialist") {
      if (referralId) {
        const [referral] = await db
          .select()
          .from(referrals)
          .where(eq(referrals.id, Number(referralId)));
        return NextResponse.json(referral ?? null);
      }
      const all = await db.select().from(referrals).orderBy(referrals.createdAt);
      return NextResponse.json(all);
    }

    if (referralId) {
      const [referral] = await db
        .select()
        .from(referrals)
        .where(eq(referrals.id, Number(referralId)));
      if (!referral || referral.referringDentistId !== Number(session.user.id)) {
        return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
      }
      return NextResponse.json(referral);
    }

    const userReferrals = await db
      .select()
      .from(referrals)
      .where(eq(referrals.referringDentistId, Number(session.user.id)))
      .orderBy(referrals.createdAt);
    return NextResponse.json(userReferrals);
  } catch {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "specialist") {
    return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const [referral] = await db
      .select()
      .from(referrals)
      .where(eq(referrals.id, parsed.data.referralId));

    if (!referral) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { status: parsed.data.status };
    if (parsed.data.closureSummary) {
      updateData.closureSummary = parsed.data.closureSummary;
    }

    const [updated] = await db
      .update(referrals)
      .set(updateData)
      .where(eq(referrals.id, parsed.data.referralId))
      .returning();

    const [dentist] = await db
      .select()
      .from(dentists)
      .where(eq(dentists.id, referral.referringDentistId));

    if (dentist) {
      await sendEmail({
        to: dentist.email,
        subject: `Referral Update — ${referral.patientName}`,
        html: statusUpdateHtml(dentist.name, referral.patientName, parsed.data.status),
      });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
