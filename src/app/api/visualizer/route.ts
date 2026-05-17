import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { patients, reports } from "../../../../drizzle/schema";
import { generateReport } from "@/lib/gemini";
import { sendEmail, reportSummaryHtml } from "@/lib/resend";
import type { AgeBracket, PriorDentalHistory } from "@/types";

const visualizerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  ageBracket: z.enum(["18-30", "31-45", "46-60", "60+"] as const),
  priorDentalHistory: z.array(z.string()).optional(),
  concernText: z.string().min(10),
  photoUrls: z.array(z.string()).optional(),
  consentEducational: z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = visualizerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { name, email, phone, ageBracket, priorDentalHistory, concernText, photoUrls } = parsed.data;
    const photoUrl = photoUrls?.[0] ?? null;

    let patient = await db
      .select()
      .from(patients)
      .where(eq(patients.email, email))
      .then((r) => r[0] ?? null);

    if (!patient) {
      [patient] = await db
        .insert(patients)
        .values({
          name,
          email,
          phone: phone ?? null,
          consentPhotoUse: !!photoUrl,
          photoDeleteAfter: photoUrl
            ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            : null,
        })
        .returning();
    }

    const geminiReport = await generateReport(
      concernText,
      ageBracket as AgeBracket,
      (priorDentalHistory ?? []) as PriorDentalHistory[],
    );

    await db.insert(reports).values({
      patientId: patient.id,
      concernText,
      photoUrl,
      complexityTier: geminiReport.complexityTier,
      reportJson: JSON.stringify(geminiReport),
    });

    sendEmail({
      to: email,
      subject: "Your Preliminary Treatment Report — Global Smile",
      html: reportSummaryHtml({
        patientName: name,
        concernCategory: geminiReport.concernCategory,
        complexityTier: geminiReport.complexityTier,
        restorationScore: geminiReport.restorationScore,
        possiblePathways: geminiReport.possiblePathways,
        educationalNote: geminiReport.educationalNote,
        bookingUrl: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/teleconsultation`,
      }),
    });

    return NextResponse.json({ ...geminiReport, patientId: patient.id }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
