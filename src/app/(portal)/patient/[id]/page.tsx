import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { referrals, milestones } from "../../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const stageLabels: Record<string, string> = {
  impressions: "Impressions completed",
  temporaries: "Temporaries placed",
  "final-fit": "Final restoration fitted",
  "follow-up": "Follow-up completed",
};

const treatmentLabels: Record<string, string> = {
  "full-arch": "Full-Arch Restoration",
  "implants-single": "Single Implant",
  veneers: "Veneers",
  "crowns-bridges": "Crowns & Bridges",
  maxillofacial: "Maxillofacial Surgery",
};

export default async function PatientJourneyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Please sign in to view this page.</p>
      </div>
    );
  }

  const { id } = await params;
  const referral = await db
    .select()
    .from(referrals)
    .where(eq(referrals.id, Number(id)))
    .then((rows) => rows[0] ?? null);

  if (!referral) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Referral not found.</p>
          <Link
            href="/referral/dashboard"
            className="text-teal-600 hover:underline text-sm"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (
    session.user.role !== "specialist" &&
    referral.referringDentistId !== Number(session.user.id)
  ) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">You do not have access to this referral.</p>
      </div>
    );
  }

  const recentMilestones = await db
    .select()
    .from(milestones)
    .where(eq(milestones.isAnonymized, true))
    .orderBy(milestones.createdAt)
    .limit(4);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link
        href={
          session.user.role === "specialist"
            ? "/dashboard"
            : "/referral/dashboard"
        }
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-teal-600 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {referral.patientName}
        </h1>
        <p className="text-sm text-gray-500">
          Referral #{referral.id} —{" "}
          {new Date(referral.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">Referral Details</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Chief Complaint</span>
            <p className="text-gray-700 mt-0.5">{referral.chiefComplaint}</p>
          </div>
          <div>
            <span className="text-gray-400">Urgency</span>
            <p className="text-gray-700 mt-0.5 capitalize">{referral.urgency}</p>
          </div>
          <div>
            <span className="text-gray-400">Status</span>
            <p className="text-gray-700 mt-0.5 capitalize">
              {referral.status.replace("_", " ")}
            </p>
          </div>
          {referral.closureSummary && (
            <div className="sm:col-span-2">
              <span className="text-gray-400">Closure Summary</span>
              <p className="text-gray-700 mt-0.5">{referral.closureSummary}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold text-gray-800">Milestones</h2>
        {recentMilestones.length === 0 ? (
          <p className="text-sm text-gray-400">
            No milestones recorded yet.
          </p>
        ) : (
          <div className="space-y-2">
            {recentMilestones.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 text-sm text-gray-600"
              >
                <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
                <span>
                  Patient from{" "}
                  <span className="font-medium text-gray-800">
                    {m.patientCity}
                  </span>{" "}
                  —{" "}
                  {treatmentLabels[m.treatmentType] ?? m.treatmentType} —{" "}
                  {stageLabels[m.stage] ?? m.stage} ✓
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
