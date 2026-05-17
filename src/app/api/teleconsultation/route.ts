import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { teleconsultations } from "../../../../drizzle/schema";
import { sendEmail } from "@/lib/resend";

const bookingSchema = z.object({
  patientName: z.string().min(2),
  patientEmail: z.string().email(),
  patientPhone: z.string().optional(),
  preferredDate: z.string().min(1),
  preferredTime: z.string().min(1),
  reason: z.string().min(10),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const { patientName, patientEmail, patientPhone, preferredDate, preferredTime, reason, notes } = parsed.data;

    const [booking] = await db
      .insert(teleconsultations)
      .values({
        patientName,
        patientEmail,
        patientPhone: patientPhone ?? null,
        preferredDate: new Date(preferredDate),
        preferredTime,
        reason,
        notes: notes ?? null,
      })
      .returning();

    await sendEmail({
      to: patientEmail,
      subject: "Teleconsultation Booked — Global Smile Prosthodontics",
      html: `
        <h2>Your teleconsultation is confirmed!</h2>
        <p>Dear ${patientName},</p>
        <p>We have received your teleconsultation request. Here are the details:</p>
        <ul>
          <li><strong>Date:</strong> ${preferredDate}</li>
          <li><strong>Time:</strong> ${preferredTime}</li>
          <li><strong>Reason:</strong> ${reason}</li>
        </ul>
        <p>Our team will review your request and send a video meeting link shortly.</p>
        <p>For urgent queries, please WhatsApp us at +91-XXXXXXXXXX.</p>
        <br/>
        <p>Warm regards,<br/>Global Smile Prosthodontics<br/>Vijayawada</p>
      `,
    });

    return NextResponse.json(
      { ok: true, id: booking.id, message: "Teleconsultation booked" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Booking failed", code: "BOOKING_ERROR" },
      { status: 500 }
    );
  }
}
