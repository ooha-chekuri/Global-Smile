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
    .limit(8);

  if (items.length === 0) {
    return (
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Journey Milestones
        </h2>
        <div className="bg-white border border-gray-100 rounded-xl p-12 text-center text-gray-400 font-light italic text-sm">
          <p>Analyzing active patient data... Live milestones pending.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
         <h2 className="text-xl font-bold text-gray-900 tracking-tight shrink-0">
            Live Case Progress
         </h2>
         <div className="h-px bg-brand-gold/20 flex-1" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-gray-50 rounded-lg p-5 flex flex-col gap-3 shadow-sm hover:border-brand-teal transition-all group"
          >
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Anonymized Record
               </span>
               <span className="text-[10px] font-mono text-teal-600 bg-teal-50 px-2 py-0.5 rounded-sm">
                  {new Date(m.createdAt).toLocaleDateString()}
               </span>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="h-2 w-2 rounded-full bg-brand-gold mt-2 shrink-0 group-hover:scale-150 transition-transform" />
              <div className="space-y-1">
                 <p className="text-sm font-bold text-gray-900 leading-tight">
                    Patient from {m.patientCity}
                 </p>
                 <p className="text-xs text-gray-500 font-light">
                    {treatmentLabels[m.treatmentType] ?? m.treatmentType}
                 </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
               <span className="text-xs font-medium text-teal-600">
                 {stageLabels[m.stage] ?? m.stage}
               </span>
               <span className="text-teal-600 font-bold">✓</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
