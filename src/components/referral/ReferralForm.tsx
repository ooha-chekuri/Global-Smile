"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const referralSchema = z.object({
  patientName: z.string().min(2, "Patient name is required"),
  patientEmail: z.string().email().optional().or(z.literal("")),
  patientPhone: z.string().optional().or(z.literal("")),
  chiefComplaint: z.string().min(10, "Please describe the chief complaint"),
  urgency: z.enum(["normal", "urgent", "emergency"]),
  recordsUrl: z.string().optional().or(z.literal("")),
});

type ReferralFormData = z.infer<typeof referralSchema>;

interface ReferralFormProps {
  onSuccess: () => void;
}

export default function ReferralForm({ onSuccess }: ReferralFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
  });

  const onSubmit = async (data: ReferralFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to submit referral");
      }

      reset();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Patient Name
        </label>
        <input
          type="text"
          {...register("patientName")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
        />
        {errors.patientName && (
          <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Email
          </label>
          <input
            type="email"
            {...register("patientEmail")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Phone
          </label>
          <input
            type="tel"
            {...register("patientPhone")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chief Complaint
        </label>
        <textarea
          {...register("chiefComplaint")}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none resize-none"
        />
        {errors.chiefComplaint && (
          <p className="text-red-500 text-xs mt-1">{errors.chiefComplaint.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Urgency
        </label>
        <select
          {...register("urgency")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="emergency">Emergency</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Submit Referral"}
      </button>
    </form>
  );
}
