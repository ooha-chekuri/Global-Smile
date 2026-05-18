"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  User, 
  Envelope, 
  Phone, 
  NotePencil, 
  WarningCircle, 
  PaperPlaneTilt,
  IdentificationCard
} from "@phosphor-icons/react";

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
    defaultValues: {
      urgency: "normal"
    }
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Patient Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              {...register("patientName")}
              placeholder="Enter legal name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/30 pl-10 pr-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/5 outline-none transition-all"
            />
          </div>
          {errors.patientName && (
            <p className="text-red-500 text-[10px] font-medium mt-1 ml-1">{errors.patientName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Case Urgency
          </label>
          <div className="relative">
            <WarningCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              {...register("urgency")}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/30 pl-10 pr-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/5 outline-none transition-all appearance-none"
            >
              <option value="normal">Normal (Routine)</option>
              <option value="urgent">Urgent (72h)</option>
              <option value="emergency">Emergency (Immediate)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Contact Email (optional)
          </label>
          <div className="relative">
            <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="email"
              {...register("patientEmail")}
              placeholder="patient@email.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/30 pl-10 pr-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/5 outline-none transition-all"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
            Primary Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="tel"
              {...register("patientPhone")}
              placeholder="+91"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/30 pl-10 pr-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/5 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
          Chief Complaint & Clinical Findings
        </label>
        <div className="relative">
          <NotePencil className="absolute left-3 top-4 text-gray-400" size={18} />
          <textarea
            {...register("chiefComplaint")}
            rows={4}
            placeholder="Describe clinical presentation and specific restorative concerns..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/30 pl-10 pr-4 py-3 text-sm focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/5 outline-none transition-all resize-none"
          />
        </div>
        {errors.chiefComplaint && (
          <p className="text-red-500 text-[10px] font-medium mt-1 ml-1">{errors.chiefComplaint.message}</p>
        )}
      </div>

      <div className="pt-2">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-start gap-3">
           <IdentificationCard size={20} className="text-brand-teal mt-0.5" weight="fill" />
           <p className="text-[10px] text-gray-500 leading-relaxed font-light">
            By submitting this form, you certify that patient consent has been obtained for specialist referral and clinical record sharing under the DPDP Act.
           </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-brand-ink px-8 py-4 text-xs font-bold text-white hover:bg-brand-teal disabled:opacity-50 transition-all uppercase tracking-[0.2em] shadow-xl shadow-brand-ink/10 flex items-center justify-center gap-3"
      >
        {isSubmitting ? "Processing Handoff..." : <><PaperPlaneTilt size={18} weight="bold" /> Submit Specialist Referral</>}
      </button>
    </form>
  );
}
