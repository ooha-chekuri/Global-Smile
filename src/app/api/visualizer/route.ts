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
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  homeCity: z.string().min(2),
  ageBracket: z.enum(["18-30", "31-45", "46-60", "60+"] as const),
  priorDentalHistory: z.array(z.string()).optional(),
  concernText: z.string().min(10),
  photoUrls: z.array(z.string()).optional(),
  consentEducational: z.literal(true),
});

export async function POST(req: NextRequest) {
  console.log("[Visualizer API] Authenticating request...");
  const session = await auth();
  
  if (!session?.user?.id) {
    console.warn("[Visualizer API] Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    const { name, phone, homeCity, ageBracket, priorDentalHistory, concernText, photoUrls } = parsed.data;
    const photoUrl = photoUrls?.[0] ?? null;

    console.log(`[Visualizer API] Processing authenticated case for: ${session.user.name} (ID: ${session.user.id})`);

    // 1. Update/Ensure patient metadata in DB
    const patientId = parseInt(session.user.id);
    
    console.log(`[Visualizer API] Updating patient metadata for ID: ${patientId}`);
    await db.update(patients)
      .set({ 
        homeCity, 
        phone: phone || undefined,
        currentStage: "recommendation", // Advance journey stage
        consentPhotoUse: !!photoUrl,
        photoDeleteAfter: photoUrl
          ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          : undefined,
      })
      .where(eq(patients.id, patientId));

    // 2. Generate AI Clinical Report
    console.log("[Visualizer API] Invoking Gemini-2.5-Flash for analysis with images...");
    const geminiReport = await generateReport(
      concernText,
      ageBracket as AgeBracket,
      (priorDentalHistory ?? []) as PriorDentalHistory[],
      photoUrls ?? [],
    );
    console.log("[Visualizer API] Gemini report generated successfully");

    // 3. Store Report in DB linked to Patient
    console.log("[Visualizer API] Storing report in database...");
    const [storedReport] = await db.insert(reports).values({
      patientId: patientId,
      concernText,
      photoUrl,
      complexityTier: geminiReport.complexityTier,
      reportJson: JSON.stringify(geminiReport),
    }).returning();
    console.log(`[Visualizer API] Report stored successfully (ID: ${storedReport.id})`);

    // 4. Send Email via Resend
    console.log(`[Visualizer API] Sending summary email to: ${session.user.email}`);
    sendEmail({
      to: session.user.email!,
      subject: "Your Preliminary Treatment Report — Global Smile",
      html: reportSummaryHtml({
        patientName: session.user.name || "Valued Patient",
        concernCategory: geminiReport.concernCategory,
        complexityTier: geminiReport.complexityTier,
        restorationScore: geminiReport.restorationScore,
        possiblePathways: geminiReport.possiblePathways,
        educationalNote: geminiReport.educationalNote,
        bookingUrl: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/patient/dashboard`,
      }),
    });

    console.log("[Visualizer API] Request completed successfully");
    return NextResponse.json({ ...geminiReport, reportId: storedReport.id }, { status: 200 });
  } catch (error) {
    console.error("[Visualizer API] CRITICAL ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
