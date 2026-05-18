"use client";

import { PlayCircle, VideoCamera, ShieldCheck } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function VideoTeaser() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Outcome Audit</h2>
            <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter leading-none">Clinical Case Studies</p>
            <p className="text-gray-500 font-light text-lg">Direct evidence of restorative outcomes from our verified specialist network.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-video rounded-[2.5rem] bg-brand-ink overflow-hidden group cursor-pointer shadow-2xl shadow-brand-ink/20 border border-white/5">
             <div className="absolute inset-0 bg-[url('/clinic/reception.svg')] bg-cover bg-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-transparent opacity-80" />
             
             <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-white"
                >
                  <PlayCircle size={80} weight="fill" className="drop-shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity" />
                </motion.div>
             </div>

             <div className="absolute bottom-0 left-0 p-8 space-y-2">
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-brand-teal text-white text-[9px] font-bold uppercase tracking-widest w-fit">
                   Full-Arch Restoration
                </div>
                <p className="text-xl font-bold text-white tracking-tight">Patient from Manchester, UK</p>
                <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                   <span>Duration: 12 Days</span>
                   <span>Audit Clear ✓</span>
                </div>
             </div>
          </div>

          <div className="flex flex-col justify-center space-y-10 p-8 md:p-12 border border-gray-100 rounded-[2.5rem] bg-gray-50/30">
             <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                   <ShieldCheck size={24} weight="bold" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight italic">"The transparency gave me the confidence to fly 5,000 miles for surgery."</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                   Verified patient outcomes are audited by our clinical lead. We provide full HIPAA-compliant case presentations upon request during your video diagnostic.
                </p>
             </div>
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-lg">RK</div>
                <div>
                   <p className="font-bold text-gray-900 tracking-tight">Rajesh K.</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hyderabad, India</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
