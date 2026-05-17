"use client";

import { useState, useRef } from "react";

interface PhotoUploadProps {
  onUploadComplete: (url: string) => void;
  disabled?: boolean;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function PhotoUpload({ onUploadComplete, disabled }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showConsent, setShowConsent] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) return "Only JPG and PNG files are accepted.";
    if (file.size > MAX_SIZE) return "File size must be under 5MB.";
    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setPendingFile(file);
    setShowConsent(true);
  };

  const handleConsentAccept = async () => {
    if (!pendingFile || !consentGiven) return;
    setUploading(true);
    setShowConsent(false);

    try {
      const formData = new FormData();
      formData.append("file", pendingFile);
      formData.append("filename", pendingFile.name);
      formData.append("contentType", pendingFile.type);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onUploadComplete(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload a Photo of Your Smile
      </label>
      <input
        ref={fileRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileSelect}
        disabled={disabled || uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 disabled:opacity-50"
      />
      <p className="text-xs text-gray-400">JPG or PNG, max 5MB</p>

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-teal-600">
          <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full" />
          Uploading...
        </div>
      )}

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {showConsent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Photo Consent
            </h3>
            <p className="text-sm text-gray-600">
              Your photo will be used only to generate this report and will be
              included in the PDF. Photos are stored securely and automatically
              deleted after 90 days. We never share your photos with third
              parties or use them for AI training without separate consent.
            </p>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                I consent to my photo being used for this educational report. I
                understand this is not a medical diagnosis.
              </span>
            </label>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowConsent(false);
                  setPendingFile(null);
                  setConsentGiven(false);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConsentAccept}
                disabled={!consentGiven}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
