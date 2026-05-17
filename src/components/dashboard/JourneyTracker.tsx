"use client";

import { useState } from "react";
import { 
  Scan, 
  Hospital, 
  ShieldCheck, 
  Calculator, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { VideoCamera } from "@phosphor-icons/react";

export type JourneyStage = "scan" | "recommendation" | "trust" | "cost" | "action";

interface JourneyTrackerProps {
  currentStage: JourneyStage;
  onStageChange: (stage: JourneyStage) => void;
}

const stages: { id: JourneyStage; label: string; icon: any }[] = [
  { id: "scan", label: "Scan", icon: Scan },
  { id: "recommendation", label: "Plan", icon: Hospital },
  { id: "trust", label: "Trust", icon: ShieldCheck },
  { id: "cost", label: "Value", icon: Calculator },
  { id: "action", label: "Action", icon: VideoCamera },
];

export default function JourneyTracker({ currentStage, onStageChange }: JourneyTrackerProps) {
  const currentIndex = stages.findIndex(s => s.id === currentStage);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isCompleted = i < currentIndex;
          const isActive = i === currentIndex;
          const isPending = i > currentIndex;

          return (
            <div key={stage.id} className="flex items-center flex-1 last:flex-none">
              <div 
                onClick={() => i <= currentIndex && onStageChange(stage.id)}
                className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                  isActive ? 'scale-110' : 'hover:opacity-80'
                }`}
              >
                <div className={`h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted 
                  ? 'bg-brand-teal border-brand-teal text-white' 
                  : isActive 
                  ? 'bg-white border-brand-gold text-brand-gold shadow-lg shadow-brand-gold/20' 
                  : 'bg-gray-50 border-gray-100 text-gray-300'
                }`}>
                  {isCompleted ? <CheckCircle2 size={24} /> : <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  isActive ? 'text-brand-gold' : isCompleted ? 'text-brand-teal' : 'text-gray-300'
                }`}>
                  {stage.label}
                </span>
              </div>
              
              {i < stages.length - 1 && (
                <div className="flex-1 px-4 mb-6">
                  <div className={`h-[2px] w-full rounded-full transition-all duration-1000 ${
                    isCompleted ? 'bg-brand-teal' : 'bg-gray-100'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
