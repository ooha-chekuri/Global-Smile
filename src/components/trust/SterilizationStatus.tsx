"use client";

import { STERILIZATION_LOG } from "@/lib/credentials";

export default function SterilizationStatus() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
         <h2 className="text-xl font-bold text-gray-900 tracking-tight shrink-0">
            Aseptic Environment
         </h2>
         <div className="h-px bg-brand-gold/20 flex-1" />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-1 w-full bg-teal-500/20" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center shadow-inner ${
                STERILIZATION_LOG.isAllClear ? "bg-teal-50 text-teal-600" : "bg-amber-50 text-amber-600"
              }`}>
                <div className={`h-8 w-8 rounded-full border-4 border-current animate-pulse opacity-20`} />
                <div className={`absolute h-4 w-4 rounded-full bg-current`} />
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900 tracking-tight">
                  {STERILIZATION_LOG.isAllClear ? "Protocol: Active & Cleared" : "Audit in Progress"}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   <span>NABH Compliant</span>
                   <span className="h-1 w-1 rounded-full bg-gray-200" />
                   <span>Last Audit: {STERILIZATION_LOG.lastAuditDate}</span>
                </div>
              </div>
           </div>

           <div className="max-w-md">
             <p className="text-sm text-gray-500 font-light leading-relaxed">
               Our sterilization protocols exceed international WHO standards. Every clinical cycle is 
               monitored via Class 4 indicators and autoclave-sterilized in sealed surgical packs.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
}
