"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendUp, Globe, ArrowRight } from "@phosphor-icons/react";

const COMPARISONS = [
  { city: "London", saving: "₹12,40,000", percentage: 72 },
  { city: "New York", saving: "₹18,90,000", percentage: 78 },
  { city: "Sydney", saving: "₹11,10,000", percentage: 68 },
];

export default function SavingsTeaser() {
  return (
    <section className="py-32 bg-gray-50/50 border-y border-gray-100 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Economic Audit</h2>
            <p className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter leading-none">The Value <br /> Equation.</p>
          </div>
          <p className="text-gray-500 text-xl font-light leading-relaxed max-w-md">
            World-class specialist care is not a luxury. By decentralizing from major global hubs, we return clinical value to the patient.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-3 text-xs font-bold text-brand-teal uppercase tracking-[0.2em] hover:text-brand-ink transition-colors group"
          >
            Run Custom Analysis <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" weight="bold" />
          </Link>
        </div>

        <div className="grid gap-4">
          {COMPARISONS.map((c, i) => (
            <motion.div
              key={c.city}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-brand-teal transition-colors">
                  <Globe size={24} weight="bold" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">VS. {c.city} Median</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">Save {c.saving}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-brand-gold">
                  <TrendUp size={20} weight="bold" />
                  <p className="text-xl font-bold font-mono tracking-tighter">{c.percentage}%</p>
                </div>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Net Benefit</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
