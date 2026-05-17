"use client";

import { useState, useCallback } from "react";
import AngleUploadCard from "./AngleUploadCard";

interface PhotoUploadProps {
  onUploadComplete: (urls: string[]) => void;
  disabled?: boolean;
}

const ANGLE_LABELS = [
  { label: "Front Smile", description: "Face forward, natural smile", key: "front-smile" },
  { label: "Side Profile", description: "Turn slightly to show side view", key: "side-profile" },
  { label: "Bite View", description: "Open mouth to show teeth", key: "bite-view" },
];

export default function PhotoUpload({ onUploadComplete, disabled }: PhotoUploadProps) {
  const [photos, setPhotos] = useState<Record<string, { file: File; preview: string }>>({});
  const [uploading, setUploading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [error, setError] = useState("");

  const handlePhoto = useCallback((file: File, label: string) => {
    const preview = URL.createObjectURL(file);
    setPhotos((prev) => ({ ...prev, [label]: { file, preview } }));
  }, []);

  const handleRemove = useCallback((label: string) => {
    setPhotos((prev) => {
      const next = { ...prev };
      if (next[label]) URL.revokeObjectURL(next[label].preview);
      delete next[label];
      return next;
    });
  }, []);

  const handleUpload = async () => {
    const entries = Object.entries(photos);
    if (entries.length === 0) {
      setError("Please add at least one photo");
      return;
    }
    if (!consentGiven) {
      setError("You must consent to photo use");
      return;
    }

    setError("");
    setUploading(true);
    setShowConsent(false);

    try {
      const urls: string[] = [];
      for (const [, { file }] of entries) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", file.name);
        formData.append("contentType", file.type);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        urls.push(data.url);
      }

      Object.values(photos).forEach((p) => URL.revokeObjectURL(p.preview));
      onUploadComplete(urls);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const hasPhotos = Object.keys(photos).length > 0;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Photos of Your Smile
      </label>
      <p className="text-xs text-gray-400 -mt-2 mb-1">
        Add at least one photo. Each slot supports webcam or file upload.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {ANGLE_LABELS.map(({ label, description, key }) => (
          <AngleUploadCard
            key={key}
            label={label}
            description={description}
            onPhoto={(file) => handlePhoto(file, key)}
            onRemove={() => handleRemove(key)}
            preview={photos[key]?.preview ?? null}
          />
        ))}
      </div>

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-teal-600">
          <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full" />
          Uploading {Object.keys(photos).length} photo(s)...
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {hasPhotos && !uploading && (
        <>
          {!showConsent ? (
            <button
              onClick={() => setShowConsent(true)}
              disabled={disabled}
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              Continue to Consent
            </button>
          ) : (
            <div className="bg-white border rounded-xl p-4 space-y-3">
              <p className="text-xs text-gray-600">
                Your photos will be used only to generate this report and will be
                included in the PDF. Stored securely and auto-deleted after 90 days.
              </p>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-xs text-gray-700">
                  I consent to my photos being used for this educational report.
                  I understand this is not a medical diagnosis.
                </span>
              </label>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConsent(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!consentGiven}
                  className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload &amp; Generate Report
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
