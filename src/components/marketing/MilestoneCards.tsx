"use client";

import { motion } from "framer-motion";
import { CheckCircle, MapPin, Clock } from "@phosphor-icons/react";

const MILESTONES = [
  { city: "London, UK", treatment: "Full-Arch Restoration", stage: "Final Fit", week: 12 },
  { city: "New York, USA", treatment: "Single Implant", stage: "Healing", week: 4 },
  { city: "Sydney, AU", treatment: "Veneers", stage: "Digital Design", week: 1 },
  { city: "Dubai, UAE", treatment: "Maxillofacial", stage: "Consultation", week: 0 },
];

export default function MilestoneCards() {
  return (
    <section className="py-24 bg-white px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <h2 className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.4em]">Live Social Proof</h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">Global Patient Milestones</p>
          <p className="text-gray-500 font-light text-lg">Real-time status of anonymized clinical journeys.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-gray-100 rounded-3xl bg-gray-50/30 hover:border-brand-teal transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <MapPin size={16} weight="fill" className="text-brand-teal/40" /> {m.city}
                </div>
                <div className="h-2 w-2 rounded-full bg-brand-teal animate-pulse shadow-[0_0_8px_rgba(13,148,136,0.5)]" />
              </div>
              <div className="space-y-4">
                <p className="text-lg font-bold text-gray-900 tracking-tight leading-tight">{m.treatment}</p>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stage</p>
                    <p className="text-xs font-bold text-brand-teal uppercase tracking-widest flex items-center gap-1.5">
                      <CheckCircle size={14} weight="bold" /> {m.stage}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Timeline</p>
                    <p className="text-xs font-mono text-gray-600">Week {m.week}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
