"use client";

import type { GeminiReport } from "@/types";

interface ReportCardProps {
  report: GeminiReport;
}

const tierColors: Record<string, { bg: string; text: string; label: string }> = {
  mild: { bg: "bg-green-100", text: "text-green-800", label: "Mild" },
  moderate: { bg: "bg-amber-100", text: "text-amber-800", label: "Moderate" },
  complex: { bg: "bg-red-100", text: "text-red-800", label: "Complex" },
};

export default function ReportCard({ report }: ReportCardProps) {
  const tier = tierColors[report.complexityTier] ?? tierColors.moderate;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Value-Added Report
        </h2>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${tier.bg} ${tier.text}`}
        >
          {tier.label} Complexity
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-500">Restoration Readiness Score</span>
          <span className="text-sm font-semibold text-teal-600">
            {report.restorationScore}/10
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal-500 h-2 rounded-full transition-all"
            style={{ width: `${report.restorationScore * 10}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-2">
          Possible Treatment Pathways
        </h3>
        <ul className="space-y-2">
          {report.possiblePathways.map((pathway, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0" />
              {pathway}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {report.educationalNote}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs text-amber-700 leading-relaxed">
          {report.disclaimer}
        </p>
      </div>

      <div className="text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 transition-colors"
        >
          Book a Virtual Consultation
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}
