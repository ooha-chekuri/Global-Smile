"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  TREATMENT_COSTS,
  getTreatmentLabel,
  getCityLabel,
} from "@/lib/cost-data";
import type { CalculatorInput } from "@/types";

const calculatorSchema = z.object({
  treatmentType: z.enum(["full-arch", "implants-single", "veneers", "crowns-bridges", "maxillofacial"]),
  homeCity: z.enum(["newYork", "london", "sydney"]),
  travelClass: z.enum(["economy", "business"]),
  stayDuration: z.number().min(3).max(30),
  companion: z.boolean(),
  hotelClass: z.enum(["threestar", "fourstar", "fivestar"]),
});

interface CalculatorFormProps {
  onCalculate: (data: CalculatorInput) => void;
  isCalculating: boolean;
}

export default function CalculatorForm({ onCalculate, isCalculating }: CalculatorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorInput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      treatmentType: "full-arch",
      homeCity: "newYork",
      travelClass: "economy",
      stayDuration: 7,
      companion: false,
      hotelClass: "fourstar",
    },
  });

  return (
    <form onSubmit={handleSubmit(onCalculate)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Treatment Type
        </label>
        <select
          {...register("treatmentType")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
        >
          {Object.keys(TREATMENT_COSTS).map((key) => (
            <option key={key} value={key}>
              {getTreatmentLabel(key)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Home City
        </label>
        <select
          {...register("homeCity")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
        >
          {(["newYork", "london", "sydney"] as const).map((city) => (
            <option key={city} value={city}>
              {getCityLabel(city)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Travel Class
          </label>
          <select
            {...register("travelClass")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hotel Class
          </label>
          <select
            {...register("hotelClass")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
          >
            <option value="threestar">3-Star</option>
            <option value="fourstar">4-Star</option>
            <option value="fivestar">5-Star</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stay Duration (days)
        </label>
        <input
          type="number"
          {...register("stayDuration", { valueAsNumber: true })}
          min={3}
          max={30}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
        />
        {errors.stayDuration && (
          <p className="text-red-500 text-xs mt-1">{errors.stayDuration.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="companion"
          {...register("companion")}
          className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
        <label htmlFor="companion" className="text-sm text-gray-700">
          Traveling with a companion
        </label>
      </div>

      <button
        type="submit"
        disabled={isCalculating}
        className="w-full rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isCalculating ? "Calculating..." : "Calculate Your Savings"}
      </button>
    </form>
  );
}
