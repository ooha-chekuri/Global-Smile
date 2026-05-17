"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VideoCamera, Calendar, Clock, Phone, CheckCircle } from "@phosphor-icons/react";

const bookingSchema = z.object({
  patientName: z.string().min(2, "Name is required"),
  patientEmail: z.string().email("Valid email required"),
  patientPhone: z.string().optional(),
  preferredDate: z.string().min(1, "Date is required"),
  preferredTime: z.string().min(1, "Time is required"),
  reason: z.string().min(10, "Please describe your concern (min 10 characters)"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setError("");
    try {
      const res = await fetch("/api/teleconsultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Booking failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white border rounded-xl p-8 text-center">
        <CheckCircle size={48} className="text-teal-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Teleconsultation Booked!
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We have received your request. Our team will review it and send a video
          meeting link to your email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white border rounded-xl p-6 md:p-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input
          {...register("patientName")}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          placeholder="Your name"
        />
        {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <div className="relative">
            <input
              {...register("patientEmail")}
              type="email"
              className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
              placeholder="you@example.com"
            />
            <Phone size={16} className="absolute left-2.5 top-3 text-gray-400" />
          </div>
          {errors.patientEmail && <p className="text-red-500 text-xs mt-1">{errors.patientEmail.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            {...register("patientPhone")}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
          <div className="relative">
            <input
              {...register("preferredDate")}
              type="date"
              className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
            <Calendar size={16} className="absolute left-2.5 top-3 text-gray-400" />
          </div>
          {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time *</label>
          <div className="relative">
            <select
              {...register("preferredTime")}
              className="w-full pl-8 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
            <Clock size={16} className="absolute left-2.5 top-3 text-gray-400" />
          </div>
          {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Consultation *</label>
        <textarea
          {...register("reason")}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
          placeholder="Describe your dental concern or what you'd like to discuss..."
        />
        {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
        <textarea
          {...register("notes")}
          rows={2}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none"
          placeholder="Any specific questions or information..."
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Booking...
          </>
        ) : (
          <>
            <VideoCamera size={18} />
            Book Teleconsultation
          </>
        )}
      </button>
    </form>
  );
}
