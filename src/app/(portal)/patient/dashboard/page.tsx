import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { reports, patients } from "../../../../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import DashboardClient from "./DashboardClient";
import { JourneyStage } from "@/components/dashboard/JourneyTracker";
import TrustPortal from "@/components/trust/TrustPortal";

export default async function PatientDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");
  if (session.user.role !== "patient") redirect("/referral/dashboard");

  const patientId = parseInt(session.user.id);

  // Fetch complete patient record for journey state
  const patientRecord = await db
    .select()
    .from(patients)
    .where(eq(patients.id, patientId))
    .then(r => r[0]);

  if (!patientRecord) redirect("/auth/signin");

  const patientReports = await db
    .select()
    .from(reports)
    .where(eq(reports.patientId, patientId))
    .orderBy(desc(reports.createdAt));

  return (
    <div className="flex-1 bg-background min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DashboardClient 
          session={session}
          initialStage={patientRecord.currentStage as JourneyStage}
          reports={patientReports}
          homeCity={patientRecord.homeCity || ""}
          trustPortal={<TrustPortal standalone={false} />}
        />
      </main>
    </div>
  );
}
