"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { AgeBracket, PriorDentalHistory } from "@/types";

const patientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  ageBracket: z.enum(["18-30", "31-45", "46-60", "60+"] as const),
  priorDentalHistory: z.array(z.string()).optional(),
  concernText: z.string().min(10, "Please describe your concern in more detail"),
  consentEducational: z.boolean().refine((val) => val === true, {
    message: "You must confirm this is for educational purposes only",
  }),
});

export type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  isSubmitting: boolean;
}

const AGE_BRACKETS: AgeBracket[] = ["18-30", "31-45", "46-60", "60+"];

const HISTORY_OPTIONS: { value: PriorDentalHistory; label: string }[] = [
  { value: "Previous crowns or bridges", label: "Previous crowns or bridges" },
  { value: "Previous implants", label: "Previous implants" },
  { value: "Gum disease treatment", label: "Gum disease treatment" },
  { value: "Orthodontic treatment", label: "Orthodontic treatment (braces/aligners)" },
  { value: "Tooth extraction(s)", label: "Tooth extraction(s)" },
  { value: "None", label: "None of the above" },
];

export default function PatientForm({ onSubmit, isSubmitting }: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      priorDentalHistory: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone (optional)
          </label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
            placeholder="+1 234 567 890"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age Bracket
          </label>
          <select
            {...register("ageBracket")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none bg-white"
          >
            <option value="">Select age range</option>
            {AGE_BRACKETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.ageBracket && <p className="text-red-500 text-xs mt-1">{errors.ageBracket.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prior Dental History (select all that apply)
        </label>
        <div className="space-y-2">
          {HISTORY_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                value={opt.value}
                {...register("priorDentalHistory")}
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Describe Your Dental Concern
        </label>
        <textarea
          {...register("concernText")}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none resize-none"
          placeholder="I have been experiencing difficulty chewing on my right side. My crown feels loose and there's some sensitivity..."
        />
        {errors.concernText && (
          <p className="text-red-500 text-xs mt-1">{errors.concernText.message}</p>
        )}
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("consentEducational")}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
        />
        <span className="text-sm text-gray-600">
          I understand this is an educational report and not a medical diagnosis.
          I will consult a licensed prosthodontist for professional advice.
        </span>
      </label>
      {errors.consentEducational && (
        <p className="text-red-500 text-xs">{errors.consentEducational.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Generating Your Report..." : "Generate My Report"}
      </button>
    </form>
  );
}
