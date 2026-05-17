"use client";

import type { CalculatorResult } from "@/types";
import { getCityLabel, getTreatmentLabel } from "@/lib/cost-data";

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
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-1">Net Savings</p>
        <p className="text-4xl font-bold text-teal-600">
          {formatINR(result.netSavings)}
        </p>
        <p className="text-lg text-teal-500 font-semibold">
          Save {result.savingsPercentage}%
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Even after flights and hotel, you save approximately {formatINR(result.netSavings)}{" "}
          compared to {getCityLabel(homeCity)}
        </p>
      </div>

      <div className="border-t pt-4 space-y-3">
        <h3 className="font-semibold text-gray-800">Cost Breakdown</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {getTreatmentLabel(treatmentType)} in {getCityLabel(homeCity)}
            </span>
            <span className="font-medium">
              {formatINR(result.homeCost.min)} – {formatINR(result.homeCost.max)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              {getTreatmentLabel(treatmentType)} in Vijayawada
            </span>
            <span className="font-medium text-teal-600">
              {formatINR(result.vijayawadaCost.min)} – {formatINR(result.vijayawadaCost.max)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Round-trip Flights</span>
            <span className="font-medium">{formatINR(result.flightCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Hotel Stay</span>
            <span className="font-medium">{formatINR(result.hotelCost)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total Cost of Dental Tourism (TCDT)</span>
            <span className="text-teal-600">{formatINR(result.totalTCDT)}</span>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-teal-800">
        <strong>Smart Travel Investment:</strong> Your {getCityLabel(homeCity)} quote is{" "}
        {formatINR(Math.round((result.homeCost.min + result.homeCost.max) / 2))}. Vijayawada full
        treatment + {""}trip: ~{formatINR(result.totalTCDT)}. Difference:{" "}
        {formatINR(result.netSavings)}. That&apos;s a holiday that pays for itself.
      </div>
    </div>
  );
}
