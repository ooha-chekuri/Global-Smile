"use client";

import { generateItinerary } from "@/lib/calculator-utils";
import type { TreatmentType } from "@/types";
import { Clock, CalendarCheck } from "@phosphor-icons/react";

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-bold text-gray-900 text-xl tracking-tight">
            Logistical Roadmap
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <CalendarCheck size={14} className="text-brand-teal" weight="fill" /> Day 01: Arrival & Clinical Intake
          </p>
        </div>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-100 before:to-transparent">
        {itinerary.map((item, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Dot */}
            <div className="flex items-center justify-center w-4 h-4 rounded-full border border-white bg-gray-50 shadow-sm absolute left-0 md:left-1/2 md:-ml-2 group-hover:scale-125 transition-transform duration-500 z-10">
               <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
            </div>

            {/* Content */}
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] bg-gray-50/50 border border-gray-100 p-6 rounded-2xl group-hover:bg-white group-hover:border-brand-teal/30 group-hover:shadow-xl group-hover:shadow-brand-teal/5 transition-all duration-500">
               <div className="flex items-center justify-between mb-2">
                  <time className="text-[10px] font-mono font-bold text-brand-teal flex items-center gap-1.5">
                     <Clock size={12} weight="bold" /> {item.time}
                  </time>
               </div>
               <p className="text-sm text-gray-600 font-light leading-relaxed">{item.activity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
