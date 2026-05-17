"use client";

import { useState, useRef } from "react";
import PhotoUpload from "@/components/visualizer/PhotoUpload";
import PatientForm from "@/components/visualizer/PatientForm";
import ReportCard from "@/components/visualizer/ReportCard";
import VisualizerPDF from "@/components/visualizer/VisualizerPDF";
import type { PatientFormData } from "@/components/visualizer/PatientForm";
import type { GeminiReport } from "@/types";

export default function VisualizerPage() {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [report, setReport] = useState<GeminiReport | null>(null);
  const [patientName, setPatientName] = useState("");
  const [concernText, setConcernText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const reportRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitForm = async (data: PatientFormData) => {
    setIsSubmitting(true);
    setError("");
    setPatientName(data.name);
    setConcernText(data.concernText);

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

      const result = await res.json();
      const { patientId: _, ...reportData } = result;
      setReport(reportData as GeminiReport);

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
          <p className="text-teal-200 text-sm uppercase tracking-wider mb-2">Preliminary Analysis — First Step</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            See Your Smile Potential
          </h1>
          <p className="text-teal-100 text-lg">
            Upload your photos and describe your concern to explore restorative possibilities
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
              {/* Photos */}
              {photoUrls.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Your Photos</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {photoUrls.map((url, i) => (
                      <div key={i} className="shrink-0">
                        <img
                          src={url}
                          alt={`Upload ${i + 1}`}
                          className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
              <VisualizerPDF
                photoUrls={photoUrls}
                report={report}
                patientName={patientName}
                concernText={concernText}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
