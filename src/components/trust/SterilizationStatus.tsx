"use client";

import { STERILIZATION_LOG } from "@/lib/credentials";
import { ShieldCheck, CalendarCheck, SealCheck } from "@phosphor-icons/react";

export default function SterilizationStatus() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
         <h2 className="text-2xl font-bold text-gray-900 tracking-tight shrink-0 flex items-center gap-3">
            <ShieldCheck size={28} className="text-brand-teal" weight="fill" />
            Aseptic Integrity
         </h2>
         <div className="h-px bg-gray-100 flex-1" />
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-teal/5 transition-all">
        <div className="absolute top-0 right-0 h-1 w-full bg-brand-teal/10 group-hover:bg-brand-teal/30 transition-colors" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
           <div className="flex items-center gap-8">
              <div className={`h-24 w-24 rounded-full flex items-center justify-center relative shadow-inner ${
                STERILIZATION_LOG.isAllClear ? "bg-brand-teal/5 text-brand-teal" : "bg-amber-50 text-amber-600"
              }`}>
                <div className={`h-12 w-12 rounded-full border-[6px] border-current animate-ping opacity-10 absolute`} />
                <div className={`h-16 w-16 rounded-full border-[12px] border-current opacity-5 absolute`} />
                <SealCheck size={40} weight="fill" />
              </div>
              
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/5 border border-brand-teal/10">
                   <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
                   <span className="text-brand-teal text-[10px] font-bold uppercase tracking-[0.2em]">Live Protocol Status</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
                  {STERILIZATION_LOG.isAllClear ? "Aseptic Chain Cleared" : "Audit in Progress"}
                </p>
                <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-2">
                   <span className="flex items-center gap-2"><CalendarCheck size={14} weight="bold" /> Last Audit: {STERILIZATION_LOG.lastAuditDate}</span>
                   <span className="flex items-center gap-2"><ShieldCheck size={14} weight="bold" /> NABH Standards</span>
                </div>
              </div>
           </div>

           <div className="max-w-md space-y-4">
             <p className="text-sm text-gray-500 font-light leading-relaxed">
               Our sterilization protocols exceed international WHO standards. Every clinical cycle is 
               monitored via <span className="text-gray-900 font-medium">Class 4 indicators</span> and autoclave-sterilized in sealed surgical packs to ensure zero clinical cross-contamination.
             </p>
             <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full w-[100%] bg-brand-teal shadow-[0_0_8px_rgba(13,148,136,0.3)]" />
             </div>
             <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em]">Integrity Level: 100% Specialist Standard</p>
           </div>
        </div>
      </div>
    </section>
  );
}
