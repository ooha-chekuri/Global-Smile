"use client";

import { useState, useRef } from "react";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import ResultsDisplay from "@/components/calculator/ResultsDisplay";
import ItineraryCard from "@/components/calculator/ItineraryCard";
import PDFExport from "@/components/calculator/PDFExport";
import ShareButton from "@/components/calculator/ShareButton";
import { calculateSavings } from "@/lib/calculator-utils";
import type { CalculatorInput, CalculatorResult } from "@/types";
import { Calculator } from "@phosphor-icons/react";

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
    <div className="flex-1 bg-white">
      <section className="border-b border-gray-100 bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Stage 3: Cost Analysis</p>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-gray-900 tracking-tight mb-4">
            Dental Tourism Calculator
          </h1>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            Compute the true cost of world-class prosthodontic care in Vijayawada 
            vs. London, New York, or Sydney — including flights and stay.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
             <h2 className="text-xl font-bold text-gray-900">
              Your Parameters
            </h2>
          </div>
          <CalculatorForm onCalculate={handleCalculate} isCalculating={isCalculating} />
        </div>

        <div ref={resultsRef} className="relative">
          {isCalculating && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-6">
              <div className="animate-spin h-10 w-10 border-2 border-teal-500 border-t-transparent rounded-full" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recomputing Net Savings...</p>
            </div>
          )}

          {result && lastInput && !isCalculating && (
            <div ref={resultsRef} className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <h2 className="text-xl font-bold text-gray-900">Savings Analysis</h2>
              </div>
              <ResultsDisplay
                result={result}
                treatmentType={lastInput.treatmentType}
                homeCity={lastInput.homeCity}
              />
              <ItineraryCard
                patientName="Your"
                treatmentType={lastInput.treatmentType}
              />
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <ShareButton
                  text={`I could save ${result.savingsPercentage}% on ${lastInput.treatmentType.replace("-", " ")} treatment in Vijayawada! Check your savings at Global Smile.`}
                />
                <PDFExport contentRef={resultsRef as React.RefObject<HTMLDivElement | null>} />
              </div>
            </div>
          )}

          {!result && !isCalculating && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-dashed border-gray-200 rounded-lg bg-gray-50/30 p-12 text-center">
              <div className="shrink-0 h-16 w-16 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center mb-6">
                 <Calculator size={32} weight="thin" />
              </div>
              <p className="text-sm text-gray-400 font-light italic">
                Enter your treatment and travel details to <br /> 
                generate a comparative cost report.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

