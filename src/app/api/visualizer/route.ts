import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { patients, reports } from "../../../../drizzle/schema";
import { generateReport } from "@/lib/gemini";
import { sendEmail, reportSummaryHtml } from "@/lib/resend";
import type { AgeBracket, PriorDentalHistory } from "@/types";

const visualizerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  homeCity: z.string().min(2),
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
      console.warn("[Visualizer API] Validation failed:", parsed.error.format());
      return NextResponse.json(
        { error: "Validation failed", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { name, email, phone, homeCity, ageBracket, priorDentalHistory, concernText, photoUrls } = parsed.data;
    const photoUrl = photoUrls?.[0] ?? null;

    // 1. Generate AI Clinical Report
    console.log("[Visualizer API] Invoking Gemini-2.5-Flash for analysis...");
    const geminiReport = await generateReport(
      concernText,
      ageBracket as AgeBracket,
      (priorDentalHistory ?? []) as PriorDentalHistory[],
      photoUrls ?? [],
    );
    console.log("[Visualizer API] Gemini report generated successfully");

    // 2. Handle DB storage (auth-optional)
    const session = await auth();
    const isAuthenticated = !!session?.user?.id;

    let storedReportId: number | null = null;

    if (isAuthenticated) {
      const patientId = parseInt(session.user.id);

      await db.update(patients)
        .set({
          homeCity,
          phone: phone || undefined,
          currentStage: "recommendation",
          consentPhotoUse: !!photoUrl,
          photoDeleteAfter: photoUrl
            ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            : undefined,
        })
        .where(eq(patients.id, patientId));

      const [storedReport] = await db.insert(reports).values({
        patientId: patientId,
        concernText,
        photoUrl,
        complexityTier: geminiReport.complexityTier,
        reportJson: JSON.stringify(geminiReport),
      }).returning();
      storedReportId = storedReport.id;
    }

    // 3. Send Email via Resend
    if (email) {
      console.log(`[Visualizer API] Sending summary email to: ${email}`);
      sendEmail({
        to: email,
        subject: "Your Preliminary Treatment Report — Global Smile",
        html: reportSummaryHtml({
          patientName: name || "Valued Patient",
          concernCategory: geminiReport.concernCategory,
          complexityTier: geminiReport.complexityTier,
          restorationScore: geminiReport.restorationScore,
          possiblePathways: geminiReport.possiblePathways,
          educationalNote: geminiReport.educationalNote,
          bookingUrl: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/teleconsultation`,
        }),
      });
    }

    console.log("[Visualizer API] Request completed successfully");
    return NextResponse.json({ ...geminiReport, reportId: storedReportId }, { status: 200 });
  } catch (error) {
    console.error("[Visualizer API] CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
