import { db } from "@/lib/db";
import { milestones } from "../../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

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

export default async function MilestoneFeed() {
  const items = await db
    .select()
    .from(milestones)
    .where(eq(milestones.isAnonymized, true))
    .orderBy(desc(milestones.createdAt))
    .limit(6);

  if (items.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Patient Journey Milestones
        </h2>
        <div className="bg-white border rounded-xl p-8 text-center text-gray-400">
          <p>No milestones to show yet. Check back soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Patient Journey Milestones
      </h2>
      <div className="space-y-3">
        {items.map((m) => (
          <div
            key={m.id}
            className="bg-white border rounded-xl p-4 flex items-center gap-3"
          >
            <div className="h-2 w-2 rounded-full bg-teal-500 shrink-0" />
            <div className="text-sm">
              <span className="font-medium text-gray-800">
                Patient from {m.patientCity}
              </span>
              <span className="text-gray-400 mx-2">—</span>
              <span className="text-gray-600">
                {treatmentLabels[m.treatmentType] ?? m.treatmentType}
              </span>
              <span className="text-gray-400 mx-2">—</span>
              <span className="text-teal-600">
                {stageLabels[m.stage] ?? m.stage} ✓
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
