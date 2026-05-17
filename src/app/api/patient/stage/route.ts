import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { patients } from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { stage, clinicId, doctorId } = await req.json();
    
    await db.update(patients)
      .set({ 
        currentStage: stage,
        selectedClinicId: clinicId || undefined,
        selectedDoctorId: doctorId || undefined
      })
      .where(eq(patients.id, parseInt(session.user.id)));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Stage API] Update failed:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
