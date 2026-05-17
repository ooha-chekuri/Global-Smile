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
