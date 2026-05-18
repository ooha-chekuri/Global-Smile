"use client";

import { Tooth, Sparkle, ShieldCheck, Microscope, AppWindow, Crosshair } from "@phosphor-icons/react";

const SPECIALTIES = [
  { title: "Full-Arch Rehabilitation", icon: Tooth, desc: "Total restorative solutions for edentulous cases using digital workflows." },
  { title: "Single-Site Implants", icon: Sparkle, desc: "Precision placement using guided surgical protocols and high-stability fixtures." },
  { title: "Maxillofacial Prosthetics", icon: ShieldCheck, desc: "Complex rehabilitation for oncological and traumatic clinical presentation." },
  { title: "Digital Veneers", icon: Crosshair, desc: "Micro-invasive aesthetic restoration utilizing CAD/CAM material precision." },
  { title: "Advanced Endodontics", icon: Microscope, desc: "Specialist root canal therapy under high-magnification clinical loupes." },
  { title: "Surgical Periodontics", icon: AppWindow, desc: "Management of periodontal health through regenerative and laser protocols." },
];

export default function SpecialtiesGrid() {
  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.4em]">Clinical Scope</h2>
          <p className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter">Specialist Treatment Focus</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SPECIALTIES.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="space-y-6 group p-8 border border-gray-100 rounded-[2.5rem] hover:border-brand-teal transition-all">
                <div className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-brand-teal group-hover:text-white transition-all duration-500">
                  <Icon size={28} weight="bold" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{s.title}</h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
