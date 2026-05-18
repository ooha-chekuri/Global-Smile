/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, react/no-unescaped-entities */
"use client";

import type { GeminiReport } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Phone, Hospital, ArrowRight, Calculator } from "lucide-react";

interface ReportCardProps {
  report: GeminiReport;
  patientCity?: string;
  minimal?: boolean;
}

interface Clinic {
  id: number;
  name: string;
  clinicName: string;
  city: string;
}

const tierColors: Record<string, { bg: string; text: string; label: string }> = {
  mild: { bg: "bg-green-50", text: "text-green-700", label: "Mild" },
  moderate: { bg: "bg-amber-50", text: "text-amber-700", label: "Moderate" },
  complex: { bg: "bg-red-50", text: "text-red-700", label: "Complex" },
};

export default function ReportCard({ report, patientCity, minimal = false }: ReportCardProps) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patientCity && !minimal) {
      console.log(`[Report Card] Fetching partner clinics for: ${patientCity}`);
      setLoading(true);
      fetch(`/api/clinics?city=${encodeURIComponent(patientCity)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(`[Report Card] Found ${data.length} local partner clinics.`);
          setClinics(data);
        })
        .catch((err) => {
          console.error("[Report Card] Clinic fetch failed:", err);
          setClinics([]);
        })
        .finally(() => setLoading(false));
    }
  }, [patientCity]);

  const tier = tierColors[report.complexityTier] ?? tierColors.moderate;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.2em] mb-4">Value-Added Assessment</p>
        <div className="flex items-center justify-center gap-4 mb-2">
           <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Your Clinical Preview
          </h2>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${tier.bg} ${tier.text} border border-current/20`}
          >
            {tier.label} Complexity
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Concern Category</h3>
            <p className="text-lg font-semibold text-gray-900">{report.concernCategory}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Restoration Readiness</h3>
              <span className="text-sm font-bold text-teal-600">
                {report.restorationScore}/10
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-teal-600 h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${report.restorationScore * 10}%` }}
              />
            </div>
          </div>

          <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-5">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Possible Pathways</h3>
            <ul className="space-y-3">
              {report.possiblePathways.map((pathway, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-light">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-teal-500 shrink-0" />
                  {pathway}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
           <div className="border border-teal-50 bg-white rounded-lg p-6">
            <h3 className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-3">Specialist Note</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-light italic">
              "{report.educationalNote}"
            </p>
          </div>

          <div className="border border-amber-100 bg-amber-50/20 rounded-lg p-5">
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Clinical Disclaimer</h3>
            <p className="text-[11px] text-amber-800 leading-relaxed font-light">
              {report.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Clinics Section */}
      {!minimal && (
        <div className="border-t border-gray-100 pt-10 space-y-6">
          <div className="text-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Stage 2: Clinical Recommendation</h3>
            <p className="text-lg font-bold text-gray-900">Partner Clinics in {patientCity || 'Your Region'}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Always show the specialist hub */}
            <div className="border border-teal-200 bg-teal-50/30 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1 uppercase tracking-tight">
                  <Hospital size={16} /> Specialist Hub
                </div>
                <h4 className="font-bold text-gray-900">Global Smile Centre</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={12} /> Vijayawada, India
                </p>
                <p className="text-xs text-teal-600 font-medium mt-3 bg-white border border-teal-100 px-2 py-0.5 rounded-sm inline-block">
                  Maxillofacial & Prosthodontic Focus
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-2">
                 <Link
                  href="/trust"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-teal-200 bg-white text-teal-700 px-4 py-2 text-xs font-bold hover:bg-teal-50 transition-all"
                >
                  Verify Standards <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Dynamic partner clinics */}
            {loading ? (
              <div className="border border-gray-100 rounded-lg p-5 animate-pulse space-y-3">
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-3 w-1/2 bg-gray-50 rounded" />
                <div className="h-8 w-full bg-gray-100 rounded mt-4" />
              </div>
            ) : clinics.length > 0 ? (
              clinics.map((clinic) => (
                <div key={clinic.id} className="border border-gray-200 bg-white rounded-lg p-5 flex flex-col justify-between hover:border-teal-200 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] mb-1 uppercase tracking-wider">
                      <MapPin size={12} /> Local Partner
                    </div>
                    <h4 className="font-bold text-gray-900">{clinic.clinicName}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Dr. {clinic.name} &bull; {clinic.city}
                    </p>
                  </div>
                  <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 text-gray-600 px-4 py-2 text-xs font-bold hover:bg-gray-50 transition-all">
                    Contact Clinic
                  </button>
                </div>
              ))
            ) : (
              <div className="border border-dashed border-gray-200 rounded-lg p-5 flex flex-col items-center justify-center text-center">
                <p className="text-xs text-gray-400 font-light italic">
                  No local GP partners listed in {patientCity}. 
                </p>
                <Link href="/referral/dashboard" className="text-[10px] font-bold text-teal-600 mt-2 uppercase tracking-wide hover:underline">
                  Join the Network
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next Strategic Steps */}
      {!minimal && (
        <div className="border-t border-gray-100 pt-10 grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Stage 3: Trust & Costs</h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Verify our clinical protocols and calculate the total cost of your travel before booking.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/trust"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-gray-600 px-6 py-3 text-sm font-bold hover:bg-gray-50 transition-all"
              >
                <Hospital size={18} />
                Verify Practice Standards
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white text-gray-600 px-6 py-3 text-sm font-bold hover:bg-gray-50 transition-all"
              >
                <Calculator size={18} />
                Calculate Travel Savings
              </Link>
            </div>
          </div>

          <div className="bg-teal-600 rounded-lg p-8 text-white flex flex-col justify-center text-center sm:text-left">
            <h3 className="text-xs font-bold text-teal-200 uppercase tracking-[0.2em] mb-2">Stage 4: Conversion</h3>
            <p className="text-xl font-bold mb-4">Ready to Proceed?</p>
            <Link
              href="/teleconsultation"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white text-teal-700 px-8 py-4 text-sm font-bold hover:bg-teal-50 transition-all active:scale-[0.98]"
            >
              Book Virtual Consultation <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}

