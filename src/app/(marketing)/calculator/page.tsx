"use client";

import { useState, useRef } from "react";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import ResultsDisplay from "@/components/calculator/ResultsDisplay";
import ItineraryCard from "@/components/calculator/ItineraryCard";
import PDFExport from "@/components/calculator/PDFExport";
import ShareButton from "@/components/calculator/ShareButton";
import { calculateSavings } from "@/lib/calculator-utils";
import type { CalculatorInput, CalculatorResult } from "@/types";
import { Calculator, ChartBar, Receipt } from "@phosphor-icons/react";

export default function CalculatorPage() {
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [lastInput, setLastInput] = useState<CalculatorInput | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleCalculate = (data: CalculatorInput) => {
    setIsCalculating(true);
    setLastInput(data);

    setTimeout(() => {
      const calcResult = calculateSavings(data);
      setResult(calcResult);
      setIsCalculating(false);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 600);
  };

  return (
    <div className="flex-1 bg-gray-50/50">
      <section className="bg-white border-b border-gray-100 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/5 border border-brand-teal/10">
             <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
             <span className="text-brand-teal text-[10px] font-bold uppercase tracking-[0.2em]">Protocol Step 03: Net Value Analysis</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-gray-900 tracking-tight leading-none">
            Treatment Value <span className="text-brand-gold italic">Engine</span>
          </h1>
          <p className="text-gray-400 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Compute real-world savings for specialist care in Vijayawada 
            vs. London, New York, or Sydney — including logistical overheads.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10">
          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
             <div className="h-10 w-10 rounded-xl bg-brand-teal text-white flex items-center justify-center shadow-lg shadow-brand-teal/20">
                <Receipt size={24} weight="bold" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Clinical Parameters
            </h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm">
             <CalculatorForm onCalculate={handleCalculate} isCalculating={isCalculating} />
          </div>
        </div>

        <div ref={resultsRef} className="lg:col-span-7 relative">
          {isCalculating && (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] space-y-6 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
              <div className="relative">
                 <div className="animate-spin h-12 w-12 border-2 border-brand-teal border-t-transparent rounded-full" />
                 <Calculator size={20} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-brand-teal" />
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Auditing Global Cost Data...</p>
            </div>
          )}

          {result && lastInput && !isCalculating && (
            <div ref={resultsRef} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <div className="h-10 w-10 rounded-xl bg-brand-gold text-brand-ink flex items-center justify-center shadow-lg shadow-brand-gold/20">
                   <ChartBar size={24} weight="bold" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight text-brand-gold">Comparative Analysis</h2>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-[2.5rem] p-1 shadow-sm overflow-hidden">
                 <ResultsDisplay
                   result={result}
                   treatmentType={lastInput.treatmentType}
                   homeCity={lastInput.homeCity}
                 />
              </div>

              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                <ItineraryCard
                  patientName="Audit"
                  treatmentType={lastInput.treatmentType}
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-4 pt-4">
                <ShareButton
                  text={`I could save ${result.savingsPercentage}% on ${lastInput.treatmentType.replace("-", " ")} treatment in Vijayawada! Audit your savings at Global Smile.`}
                />
                <PDFExport contentRef={resultsRef as React.RefObject<HTMLDivElement | null>} />
              </div>
            </div>
          )}

          {!result && !isCalculating && (
            <div className="flex flex-col items-center justify-center h-full min-h-[500px] border border-dashed border-gray-200 rounded-[2.5rem] bg-white p-12 text-center shadow-inner group hover:border-brand-teal/20 transition-colors">
              <div className="shrink-0 h-24 w-24 bg-gray-50 text-gray-200 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                 <Calculator size={48} weight="thin" />
              </div>
              <div className="space-y-2">
                 <p className="text-gray-900 font-bold text-lg tracking-tight">Awaiting Parameters</p>
                 <p className="text-sm text-gray-400 font-light max-w-xs mx-auto leading-relaxed">
                   Enter your clinical and travel data to <br /> 
                   generate a comparative value report.
                 </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

