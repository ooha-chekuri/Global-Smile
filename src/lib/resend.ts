import { Resend } from "resend";

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const client = getResend();
    await client.emails.send({
      from: "Global Smile <notifications@globalsmile.in>",
      to,
      subject,
      html,
    });
  } catch {
    // Email sending is non-critical; fail silently
  }
}

export function referralConfirmationHtml(gpName: string, patientName: string, referralId: number): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #0d9488;">Referral Submitted</h2>
      <p>Dear Dr. ${gpName},</p>
      <p>Your referral for <strong>${patientName}</strong> (Ref #${referralId}) has been received by the Global Smile specialist team.</p>
      <p>We will review the case and update you within 24 hours. You can track the status in your portal.</p>
      <p style="color: #71717a; font-size: 12px;">This is an automated message from Global Smile.</p>
    </div>
  `;
}

interface ReportSummaryParams {
  patientName: string;
  concernCategory: string;
  complexityTier: string;
  restorationScore: number;
  possiblePathways: string[];
  educationalNote: string;
  bookingUrl: string;
}

export function reportSummaryHtml(params: ReportSummaryParams): string {
  const pathways = params.possiblePathways.map(
    (p) => `<li style="margin-bottom: 6px; color: #374151;">${p}</li>`
  ).join("");

  return `
    <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #0d9488; font-size: 24px; margin: 0;">Global Smile</h1>
        <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0;">Preliminary Treatment Analysis</p>
      </div>

      <p style="color: #374151; font-size: 15px;">Dear ${params.patientName},</p>
      <p style="color: #374151; font-size: 15px;">
        Thank you for trusting Global Smile with your dental health. Based on the information you shared,
        here is a summary of your preliminary treatment analysis.
      </p>

      <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 20px; margin: 24px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Concern Category</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #0d9488;">${params.concernCategory}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Complexity Tier</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #0d9488; text-transform: capitalize;">${params.complexityTier}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280;">Restoration Readiness</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #0d9488;">${params.restorationScore}/10</td>
          </tr>
        </table>
      </div>

      <h3 style="color: #111827; font-size: 15px; margin: 0 0 8px;">Possible Treatment Pathways</h3>
      <ul style="padding-left: 20px; margin: 0 0 20px;">${pathways}</ul>

      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 16px 0; font-size: 13px; color: #4b5563; line-height: 1.6;">
        ${params.educationalNote}
      </div>

      <div style="text-align: center; margin: 28px 0;">
        <a href="${params.bookingUrl}"
           style="display: inline-block; background: #0d9488; color: #fff; text-decoration: none;
                  font-size: 15px; font-weight: 600; padding: 14px 32px; border-radius: 10px;">
          Book a Virtual Consultation
        </a>
      </div>

      <p style="color: #9ca3af; font-size: 12px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
        This report is for educational purposes only and does not constitute a medical diagnosis.
        Please consult a licensed prosthodontist for professional advice.
        <br><br>
        Global Smile Prosthodontics — Vijayawada, India
      </p>
    </div>
  `;
}

export function statusUpdateHtml(gpName: string, patientName: string, status: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #0d9488;">Referral Status Update</h2>
      <p>Dear Dr. ${gpName},</p>
      <p>Your referral for <strong>${patientName}</strong> has been updated to: <strong>${status.replace("_", " ")}</strong>.</p>
      <p>Log in to your portal for details.</p>
      <p style="color: #71717a; font-size: 12px;">This is an automated message from Global Smile.</p>
    </div>
  `;
}
