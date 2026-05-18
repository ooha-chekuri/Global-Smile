"use client";

import { useState } from "react";
import { VideoCamera, Phone, Warning, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";

interface PostOpCareProps {
  patientName: string;
}

const CARE_STEPS = [
  { day: "Day 1–3", label: "Rest & Recovery", status: "completed" as const, detail: "Avoid strenuous activity. Soft diet recommended." },
  { day: "Day 4–7", label: "Follow-Up Check", status: "in-progress" as const, detail: "Remote photo check via WhatsApp. Upload wound photo." },
  { day: "Week 2", label: "Suture Review", status: "pending" as const, detail: "Virtual consultation to assess healing progress." },
  { day: "Week 4+", label: "Long-Term Monitoring", status: "pending" as const, detail: "Monthly check-ins via teleconsultation for 3 months." },
];

const ESCALATION_PATH = [
  "Persistent bleeding beyond 24 hours",
  "Severe pain not managed by prescribed medication",
  "Signs of infection (fever, swelling, discharge)",
  "Reaction to medication",
];

export default function PostOpCare({ patientName }: PostOpCareProps) {
  const [showEscalation, setShowEscalation] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em]">Post-Operative Care</h3>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">Your Recovery Protocol</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
          <Phone size={24} weight="thin" />
        </div>
      </div>

      <p className="text-sm text-gray-500 font-light leading-relaxed">
        Welcome to your personalised recovery plan, {patientName.split(' ')[0]}. 
        Follow these milestones and connect with Dr. Prakash at any point.
      </p>

      {/* Care Timeline */}
      <div className="space-y-4">
        {CARE_STEPS.map((step, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                step.status === "completed"
                  ? "bg-brand-teal border-brand-teal text-white"
                  : step.status === "in-progress"
                  ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                  : "bg-gray-50 border-gray-200 text-gray-300"
              }`}>
                {step.status === "completed" ? <CheckCircle size={16} weight="fill" /> : i + 1}
              </div>
              {i < CARE_STEPS.length - 1 && <div className="w-px flex-1 bg-gray-100 group-hover:bg-brand-teal/20 transition-colors" />}
            </div>
            <div className="pb-6 flex-1">
              <p className="text-sm font-bold text-gray-900">{step.label}</p>
              <p className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">{step.day}</p>
              <p className="text-xs text-gray-400 font-light mt-1">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Teleconsultation + Photo Upload */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/teleconsultation"
          className="flex items-center justify-center gap-3 bg-brand-teal text-white rounded-xl py-4 text-sm font-bold hover:bg-brand-ink transition-all shadow-lg shadow-brand-teal/20"
        >
          <VideoCamera size={20} /> Book Teleconsultation
        </Link>
        <button className="flex items-center justify-center gap-3 border-2 border-dashed border-brand-gold/30 text-brand-gold rounded-xl py-4 text-sm font-bold hover:bg-brand-cream transition-all">
          Upload Wound Photo <ArrowRight size={18} />
        </button>
      </div>

      {/* Escalation Path */}
      <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-6 space-y-4">
        <button
          onClick={() => setShowEscalation(!showEscalation)}
          className="flex items-center gap-3 text-sm font-bold text-amber-800"
        >
          <Warning size={20} className="text-amber-600" weight="fill" />
          When to Contact Us Immediately
          <ArrowRight size={16} className={`ml-auto transition-transform ${showEscalation ? "rotate-90" : ""}`} />
        </button>
        {showEscalation && (
          <ul className="space-y-2">
            {ESCALATION_PATH.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-amber-700 font-light">
                <span className="mt-1 h-1 w-1 rounded-full bg-amber-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
        <p className="text-[10px] text-amber-600 font-medium">
          Emergency Contact: +91 12345 67890 (24/7)
        </p>
      </div>
    </div>
  );
}
