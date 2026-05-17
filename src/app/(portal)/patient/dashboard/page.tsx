import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { reports, teleconsultations } from "../../../../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export default async function PatientDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");
  if (session.user.role !== "patient") redirect("/referral/dashboard");

  const patientReports = await db
    .select()
    .from(reports)
    .where(eq(reports.patientId, parseInt(session.user.id)))
    .orderBy(desc(reports.createdAt))
    .limit(10);

  const patientTeleconsultations = await db
    .select()
    .from(teleconsultations)
    .where(eq(teleconsultations.patientEmail, session.user.email!))
    .orderBy(desc(teleconsultations.createdAt))
    .limit(10);

  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome, {session.user.name}
          </h1>
          <p className="text-teal-100 mt-1">Your treatment journey at a glance.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* AI Reports */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Your AI Reports</h2>
            <Link
              href="/visualizer"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Generate New &rarr;
            </Link>
          </div>

          {patientReports.length === 0 ? (
            <div className="bg-white border rounded-xl p-6 text-center text-gray-400 text-sm">
              No reports yet.{" "}
              <Link href="/visualizer" className="text-teal-600 hover:underline">
                Generate your first AI treatment preview
              </Link>
            </div>
          ) : (
            <div className="grid gap-3">
              {patientReports.map((r) => (
                <div key={r.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      Report #{r.id} — {r.complexityTier} complexity
                    </p>
                    <p className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium capitalize">
                    {r.complexityTier}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teleconsultations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Teleconsultations</h2>
            <Link
              href="/teleconsultation"
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Book New &rarr;
            </Link>
          </div>

          {patientTeleconsultations.length === 0 ? (
            <div className="bg-white border rounded-xl p-6 text-center text-gray-400 text-sm">
              No consultations booked.{" "}
              <Link href="/teleconsultation" className="text-teal-600 hover:underline">
                Schedule a video call
              </Link>
            </div>
          ) : (
            <div className="grid gap-3">
              {patientTeleconsultations.map((t) => (
                <div key={t.id} className="bg-white border rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {t.preferredDate
                        ? new Date(t.preferredDate).toLocaleDateString()
                        : "Date TBD"}{" "}
                      at {t.preferredTime}
                    </p>
                    <p className="text-xs text-gray-400">{t.reason.slice(0, 60)}...</p>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-medium capitalize">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
