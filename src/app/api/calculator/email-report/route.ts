import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/resend";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  treatmentType: z.string(),
  homeCity: z.string(),
  savingsMin: z.number(),
  savingsMax: z.number(),
  savingsPctMin: z.number(),
  savingsPctMax: z.number(),
  totalGSMin: z.number(),
  totalGSMax: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", code: "VALIDATION_ERROR" }, { status: 400 });
    }

    const { email, name, treatmentType, homeCity, savingsMin, savingsMax, savingsPctMin, savingsPctMax, totalGSMin, totalGSMax } = parsed.data;

    const cityLabels: Record<string, string> = { newYork: "New York", london: "London", sydney: "Sydney" };
    const cityLabel = cityLabels[homeCity] ?? homeCity;

    const treatmentLabels: Record<string, string> = {
      "full-arch": "Full-Arch Restoration",
      "implants-single": "Single Implant",
      veneers: "Veneers",
      "crowns-bridges": "Crowns & Bridges",
      maxillofacial: "Maxillofacial Surgery",
    };
    const treatmentLabel = treatmentLabels[treatmentType] ?? treatmentType;

    const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");

    const html = `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="color:#0d9488;font-size:24px;margin:0;">Global Smile</h1>
          <p style="color:#6b7280;font-size:14px;margin:4px 0 0;">Cost Analysis Report</p>
        </div>
        <p style="color:#374151;font-size:15px;">Dear ${name},</p>
        <p style="color:#374151;font-size:15px;">Here is your cost comparison for <strong>${treatmentLabel}</strong> in Vijayawada vs. ${cityLabel}.</p>
        <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:12px;padding:20px;margin:24px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <tr><td style="padding:6px 0;color:#6b7280;">Treatment Cost (${cityLabel})</td><td style="padding:6px 0;text-align:right;font-weight:600;">${formatINR(savingsMin + totalGSMax)} – ${formatINR(savingsMax + totalGSMin)}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;">Total in Vijayawada (TCDT)</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#0d9488;">${formatINR(totalGSMin)} – ${formatINR(totalGSMax)}</td></tr>
            <tr><td style="padding:6px 0;color:#6b7280;border-top:1px solid #e5e7eb;font-weight:700;">Net Savings</td><td style="padding:6px 0;text-align:right;font-weight:700;color:#0d9488;border-top:1px solid #e5e7eb;">${formatINR(savingsMin)} – ${formatINR(savingsMax)} (${savingsPctMin}–${savingsPctMax}%)</td></tr>
          </table>
        </div>
        <div style="text-align:center;margin:28px 0;">
          <a href="${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/calculator"
             style="display:inline-block;background:#0d9488;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px;">
            View Full Report
          </a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;border-top:1px solid #e5e7eb;padding-top:16px;">
          Global Smile Prosthodontics — Vijayawada, India
        </p>
      </div>
    `;

    await sendEmail({ to: email, subject: "Your Cost Analysis Report — Global Smile", html });

    return NextResponse.json({ sent: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email", code: "EMAIL_ERROR" }, { status: 500 });
  }
}
