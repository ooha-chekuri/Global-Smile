/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { 
  Scan, 
  Hospital, 
  ShieldCheck, 
  Calculator, 
  CheckCircle,
  VideoCamera
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

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
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
      <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isCompleted = i < currentIndex;
          const isActive = i === currentIndex;

          return (
            <div key={stage.id} className="flex items-center flex-1 last:flex-none">
              <div 
                onClick={() => i <= currentIndex && onStageChange(stage.id)}
                className={`flex flex-col items-center gap-3 cursor-pointer transition-all ${
                  isActive ? 'scale-105' : 'hover:opacity-80'
                }`}
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                  isCompleted 
                  ? 'bg-brand-teal border-brand-teal text-white shadow-lg shadow-brand-teal/20' 
                  : isActive 
                  ? 'bg-white border-brand-gold text-brand-gold shadow-xl shadow-brand-gold/10 scale-110' 
                  : 'bg-gray-50 border-gray-100 text-gray-300'
                }`}>
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                       <CheckCircle size={28} weight="bold" />
                    </motion.div>
                  ) : (
                    <Icon size={28} weight={isActive ? "bold" : "thin"} />
                  )}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                  isActive ? 'text-brand-gold' : isCompleted ? 'text-brand-teal' : 'text-gray-300'
                }`}>
                  {stage.label}
                </span>
              </div>
              
              {i < stages.length - 1 && (
                <div className="flex-1 px-4 mb-8">
                  <div className="h-[2px] w-full bg-gray-50 rounded-full relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 bg-brand-teal"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
