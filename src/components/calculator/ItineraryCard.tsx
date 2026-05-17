"use client";

import { generateItinerary } from "@/lib/calculator-utils";
import type { TreatmentType } from "@/types";

interface ItineraryCardProps {
  patientName: string;
  treatmentType: TreatmentType;
}

export default function ItineraryCard({
  patientName,
  treatmentType,
}: ItineraryCardProps) {
  const itinerary = generateItinerary(patientName, treatmentType);

  return (
    <div className="border rounded-xl p-5 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-800 text-lg">
          Your 12-Hour Quick-Start Itinerary
        </h3>
        <p className="text-sm text-gray-500">
          Day 1 in Vijayawada — {patientName}
        </p>
      </div>
      <div className="relative pl-6 border-l-2 border-teal-200 space-y-4">
        {itinerary.map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[29px] top-0.5 h-4 w-4 rounded-full bg-teal-500 border-2 border-white" />
            <div className="flex gap-3">
              <span className="text-xs font-mono text-gray-400 mt-0.5 min-w-[3rem]">
                {item.time}
              </span>
              <p className="text-sm text-gray-700">{item.activity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
