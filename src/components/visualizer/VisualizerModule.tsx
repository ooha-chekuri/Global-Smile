"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PhotoUpload from "@/components/visualizer/PhotoUpload";
import PatientForm from "@/components/visualizer/PatientForm";
import ReportCard from "@/components/visualizer/ReportCard";
import VisualizerPDF from "@/components/visualizer/VisualizerPDF";
import type { PatientFormData } from "@/components/visualizer/PatientForm";
import type { GeminiReport } from "@/types";

interface VisualizerModuleProps {
  onReportGenerated?: () => void;
  initialName?: string;
  initialEmail?: string;
  initialPhone?: string;
}

export default function VisualizerModule({ 
  onReportGenerated, 
  initialName = "", 
  initialEmail = "", 
  initialPhone = "" 
}: VisualizerModuleProps) {
  const router = useRouter();
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [report, setReport] = useState<GeminiReport | null>(null);
  const [patientName, setPatientName] = useState(initialName);
  const [patientCity, setPatientCity] = useState("");
  const [concernText, setConcernText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const reportRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitForm = async (data: PatientFormData) => {
    setIsSubmitting(true);
    setError("");
    setPatientName(data.name || initialName);
    setPatientCity(data.homeCity);
    setConcernText(data.concernText);

    console.log("[Visualizer Module] Submitting assessment form...", {
      city: data.homeCity,
      photos: photoUrls.length,
    });

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
        console.warn(`[Visualizer Module] API failed: ${err.error}`);
        throw new Error(err.error ?? "Something went wrong");
      }

      const result = await res.json();
      console.log("[Visualizer Module] Report generated and stored in DB:", result.complexityTier);
      
      const { reportId: _, ...reportData } = result;
      setReport(reportData as GeminiReport);

      // Trigger server-side refresh to update dashboard state
      router.refresh();

      if (onReportGenerated) onReportGenerated();

      setTimeout(() => {
        console.log("[Visualizer Module] Scrolling to report...");
        reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error("[Visualizer Module] Critical error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {!report && (
        <div className="bg-white border border-gray-100 rounded-lg p-8 md:p-12 space-y-10 shadow-sm">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-teal-500 pl-4">
              1. Clinical Records
            </h2>
            <PhotoUpload
              onUploadComplete={setPhotoUrls}
              disabled={isSubmitting}
            />
          </div>

          <div className="border-t border-gray-50 pt-10 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-teal-500 pl-4">
              2. Patient Context
            </h2>
            <PatientForm
              onSubmit={handleSubmitForm}
              isSubmitting={isSubmitting}
              defaultValues={{
                name: initialName,
                email: initialEmail,
                phone: initialPhone,
              }}
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-md p-4 text-xs font-medium text-red-600">
              {error}
            </div>
          )}
        </div>
      )}

      {report && (
        <div ref={reportRef} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white border border-gray-100 rounded-lg p-8 md:p-12 shadow-sm">
            {/* Photos Overview */}
            {photoUrls.length > 0 && (
              <div className="mb-10 pb-10 border-b border-gray-50">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Submitted Records</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {photoUrls.map((url, i) => (
                    <div key={i} className="shrink-0 group relative">
                      <img
                        src={url}
                        alt={`Record ${i + 1}`}
                        className="w-40 h-32 object-cover rounded-md border border-gray-100 group-hover:border-teal-200 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ReportCard report={report} patientCity={patientCity} minimal={true} />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-20">
            <button
              onClick={() => {
                setReport(null);
                setPhotoUrls([]);
              }}
              className="text-xs font-bold text-gray-400 hover:text-teal-600 uppercase tracking-widest transition-colors"
            >
              &larr; Generate New Assessment
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
    </div>
  );
}
