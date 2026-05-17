import { NextResponse } from "next/server";
import { seedDemoCredentials } from "@/lib/seed";
import { seedMilestones } from "@/lib/seed-milestones";

export async function GET() {
  try {
    await seedDemoCredentials();
    await seedMilestones();
    return NextResponse.json({ ok: true, message: "Seed complete" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
