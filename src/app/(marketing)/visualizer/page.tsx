"use client";

import { useState, useRef } from "react";
import PhotoUpload from "@/components/visualizer/PhotoUpload";
import PatientForm from "@/components/visualizer/PatientForm";
import ReportCard from "@/components/visualizer/ReportCard";
import PDFExport from "@/components/calculator/PDFExport";
import type { PatientFormData } from "@/components/visualizer/PatientForm";
import type { GeminiReport } from "@/types";

export default function VisualizerPage() {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [report, setReport] = useState<GeminiReport | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const reportRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitForm = async (data: PatientFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/visualizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          photoUrls,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Something went wrong");
      }

      const result: GeminiReport = await res.json();
      setReport(result);

      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            AI Treatment Visualizer
          </h1>
          <p className="text-teal-100 text-lg">
            Upload a photo and describe your concern to see restorative possibilities
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        {!report && (
          <div className="space-y-8">
            <div className="bg-white border rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Tell Us About Your Concern
              </h2>

              <PhotoUpload
                onUploadComplete={setPhotoUrls}
                disabled={isSubmitting}
              />

              <div className="border-t pt-6">
                <PatientForm
                  onSubmit={handleSubmitForm}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        )}

        {report && (
          <div ref={reportRef} className="space-y-6">
            <div className="bg-white border rounded-xl p-6">
              <ReportCard report={report} />
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setReport(null);
                  setPhotoUrls([]);
                }}
                className="text-sm text-teal-600 hover:text-teal-700 underline"
              >
                Generate Another Report
              </button>
              <PDFExport contentRef={reportRef as React.RefObject<HTMLDivElement | null>} filename="global-smile-treatment-report" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
