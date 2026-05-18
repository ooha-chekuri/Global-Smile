"use client";

import { 
  Clock, 
  MagnifyingGlass, 
  CalendarCheck, 
  HourglassMedium, 
  CheckCircle 
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

const steps = ["pending", "reviewing", "scheduled", "in_progress", "closed"] as const;

const stepConfig: Record<string, { label: string; icon: React.ElementType }> = {
  pending: { label: "Pending", icon: Clock },
  reviewing: { label: "Review", icon: MagnifyingGlass },
  scheduled: { label: "Booking", icon: CalendarCheck },
  in_progress: { label: "Clinical", icon: HourglassMedium },
  closed: { label: "Success", icon: CheckCircle },
};

interface StatusTrackerProps {
  currentStatus: string;
}

export default function StatusTracker({ currentStatus }: StatusTrackerProps) {
  const currentIndex = steps.indexOf(currentStatus as typeof steps[number]);

  return (
    <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
        {steps.map((step, i) => {
          const config = stepConfig[step];
          const Icon = config.icon;
          const isComplete = i < currentIndex;
          const isCurrent = step === currentStatus;

          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 transition-all">
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isCurrent
                      ? "bg-white border-brand-gold text-brand-gold shadow-lg shadow-brand-gold/10 scale-110"
                      : isComplete
                      ? "bg-brand-teal border-brand-teal text-white"
                      : "bg-white border-gray-100 text-gray-300"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle size={20} weight="bold" />
                  ) : (
                    <Icon size={20} weight={isCurrent ? "bold" : "thin"} />
                  )}
                </div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${
                    isCurrent
                      ? "text-brand-gold"
                      : isComplete
                      ? "text-brand-teal"
                      : "text-gray-300"
                  }`}
                >
                  {config.label}
                </span>
              </div>
              
              {i < steps.length - 1 && (
                <div className="flex-1 px-2 mb-6">
                  <div className="h-[1px] w-full bg-gray-100 rounded-full relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: i < currentIndex ? "100%" : "0%" }}
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
