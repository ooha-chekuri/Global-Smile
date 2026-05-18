"use client";

import type { CalculatorResult } from "@/types";
import { getCityLabel, getTreatmentLabel } from "@/lib/cost-data";
import { TrendUp, Globe, Airplane, Bed, CurrencyCircleDollar } from "@phosphor-icons/react";

interface ResultsDisplayProps {
  result: CalculatorResult;
  treatmentType: string;
  homeCity: string;
}

function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}

export default function ResultsDisplay({ result, treatmentType, homeCity }: ResultsDisplayProps) {
  return (
    <div className="space-y-10 p-8 md:p-12">
      <div className="text-center space-y-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Audit: Net Savings Assessment</p>
        <div className="space-y-1">
           <p className="text-6xl font-bold text-brand-teal tracking-tighter">
             {formatINR(result.netSavings)}
           </p>
           <div className="flex items-center justify-center gap-2 text-brand-gold">
              <TrendUp size={24} weight="bold" />
              <p className="text-2xl font-bold tracking-tight">
                Save {result.savingsPercentage}%
              </p>
           </div>
        </div>
        <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm mx-auto">
          Audit indicates a total net benefit of {formatINR(result.netSavings)} compared to median specialist quotes in {getCityLabel(homeCity)}.
        </p>
      </div>

      <div className="space-y-6 pt-10 border-t border-gray-100">
        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.3em] flex items-center gap-2">
           <CurrencyCircleDollar size={18} className="text-brand-teal" /> Cost Breakdown Ledger
        </h3>
        <div className="space-y-5">
          <div className="flex justify-between items-end group">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                 <Globe size={14} /> Home City Median
              </p>
              <p className="text-sm font-medium text-gray-600">
                {getTreatmentLabel(treatmentType)} in {getCityLabel(homeCity)}
              </p>
            </div>
            <p className="text-base font-bold text-gray-900 font-mono">
              {formatINR(result.homeCost.max)}
            </p>
          </div>

          <div className="flex justify-between items-end group">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest flex items-center gap-1.5">
                 <TrendUp size={14} weight="bold" /> Vijayawada Specialist
              </p>
              <p className="text-sm font-medium text-gray-600">
                Full restoration clinical fee
              </p>
            </div>
            <p className="text-base font-bold text-brand-teal font-mono">
              {formatINR(result.vijayawadaCost.max)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-4 pb-2">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                 <Airplane size={14} /> Air Logistics
              </p>
              <p className="text-sm font-bold text-gray-900 font-mono">{formatINR(result.flightCost)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                 <Bed size={14} /> Recovery Stay
              </p>
              <p className="text-sm font-bold text-gray-900 font-mono">{formatINR(result.hotelCost)}</p>
            </div>
          </div>

          <div className="bg-brand-ink rounded-2xl p-6 text-white flex justify-between items-center shadow-xl shadow-brand-ink/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/10 rounded-full -mr-12 -mt-12 blur-2xl" />
            <div className="space-y-1 relative z-10">
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Total Capital Deployment (TCDT)</p>
              <p className="text-xs text-white/60 font-light italic">Clinical fee + Flights + 5-star Hotel</p>
            </div>
            <p className="text-2xl font-bold text-brand-gold font-mono relative z-10">{formatINR(result.totalTCDT)}</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-cream/30 border border-brand-gold/10 rounded-2xl p-6">
        <p className="text-sm text-brand-ink leading-relaxed font-light">
          <strong className="font-bold text-brand-gold uppercase text-[10px] tracking-widest block mb-2">Audit Verdict</strong>
          Your {getCityLabel(homeCity)} quote for {getTreatmentLabel(treatmentType)} is {formatINR(result.homeCost.max)}. 
          By electing for Vijayawada specialist care, you secure world-class rehabilitation and a luxury recovery journey while retaining <span className="text-brand-teal font-bold">{formatINR(result.netSavings)}</span> in net capital.
        </p>
      </div>
    </div>
  );
}
