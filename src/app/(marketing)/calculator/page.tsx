"use client";

import { useState, useRef } from "react";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import ResultsDisplay from "@/components/calculator/ResultsDisplay";
import ItineraryCard from "@/components/calculator/ItineraryCard";
import PDFExport from "@/components/calculator/PDFExport";
import ShareButton from "@/components/calculator/ShareButton";
import { calculateSavings } from "@/lib/calculator-utils";
import type { CalculatorInput, CalculatorResult } from "@/types";

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
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Dental Tourism Calculator
          </h1>
          <p className="text-teal-100 text-lg">
            See how much you save with world-class prosthodontic care in Vijayawada
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Compare Your Costs
          </h2>
          <CalculatorForm onCalculate={handleCalculate} isCalculating={isCalculating} />
        </div>

        <div ref={resultsRef}>
          {isCalculating && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto" />
                <p className="text-gray-500 text-sm">Calculating your savings...</p>
              </div>
            </div>
          )}

          {result && lastInput && !isCalculating && (
            <div ref={resultsRef} className="space-y-6">
              <ResultsDisplay
                result={result}
                treatmentType={lastInput.treatmentType}
                homeCity={lastInput.homeCity}
              />
              <ItineraryCard
                patientName="Your"
                treatmentType={lastInput.treatmentType}
              />
              <div className="flex justify-end gap-3">
                <ShareButton
                  text={`I could save ${result.savingsPercentage}% on ${lastInput.treatmentType.replace("-", " ")} treatment in Vijayawada! Check your savings at Global Smile.`}
                />
                <PDFExport contentRef={resultsRef as React.RefObject<HTMLDivElement | null>} />
              </div>
            </div>
          )}

          {!result && !isCalculating && (
            <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-200 rounded-xl p-12">
              <div className="text-center text-gray-400">
                <svg className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p>Fill in the form to see your savings</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
