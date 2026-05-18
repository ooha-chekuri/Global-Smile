import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { reports, patients, teleconsultations } from "../../../../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import DashboardClient from "./DashboardClient";
import { JourneyStage } from "@/components/dashboard/JourneyTracker";
import TrustPortal from "@/components/trust/TrustPortal";

export default async function PatientDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");
  if (session.user.role !== "patient") redirect("/referral/dashboard");

  const patientId = parseInt(session.user.id);

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

  const nextAppointment = await db
    .select()
    .from(teleconsultations)
    .where(eq(teleconsultations.patientEmail, session.user.email!))
    .orderBy(desc(teleconsultations.createdAt))
    .limit(1)
    .then(r => r[0] ?? null);

  return (
    <div className="flex-1 bg-background min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DashboardClient 
          session={session}
          initialStage={patientRecord.currentStage as JourneyStage}
          reports={patientReports}
          homeCity={patientRecord.homeCity || ""}
          trustPortal={<TrustPortal standalone={false} />}
          nextAppointment={nextAppointment ? {
            date: nextAppointment.preferredDate.toISOString(),
            time: nextAppointment.preferredTime,
          } : null}
        />
      </main>
    </div>
  );
}
