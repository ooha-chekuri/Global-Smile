import { db } from "@/lib/db";
import { milestones } from "../../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { ChartLineUp, CheckCircle, MapPin } from "@phosphor-icons/react/dist/ssr";

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
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Journey Milestones
        </h2>
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center text-gray-400 font-light italic text-sm">
          <p>Analyzing active patient data... Live milestones pending.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-10">
      <div className="flex items-center gap-6">
         <h2 className="text-2xl font-bold text-gray-900 tracking-tight shrink-0 flex items-center gap-3">
            <ChartLineUp size={28} className="text-brand-teal" weight="fill" />
            Active Milestone Log
         </h2>
         <div className="h-px bg-gray-100 flex-1" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-5 shadow-sm hover:border-brand-teal transition-all group hover:shadow-xl hover:shadow-brand-teal/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gray-50 rounded-bl-[2rem] -mr-10 -mt-10 group-hover:bg-brand-teal/5 transition-colors" />
            
            <div className="flex items-center justify-between relative z-10">
               <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-50 border border-gray-100">
                  <div className="h-1 w-1 rounded-full bg-brand-gold animate-pulse" />
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    Live Record
                  </span>
               </div>
               <span className="text-[9px] font-mono font-medium text-gray-300">
                  {new Date(m.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
               </span>
            </div>
            
            <div className="space-y-3 relative z-10">
              <div className="space-y-1">
                 <p className="text-base font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <MapPin size={16} weight="fill" className="text-brand-teal/40" /> {m.patientCity}
                 </p>
                 <p className="text-xs text-gray-400 font-light uppercase tracking-widest">
                    {treatmentLabels[m.treatmentType] ?? m.treatmentType}
                 </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
               <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">
                 {stageLabels[m.stage] ?? m.stage}
               </span>
               <CheckCircle size={18} weight="bold" className="text-brand-teal shadow-[0_0_10px_rgba(13,148,136,0.3)]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
