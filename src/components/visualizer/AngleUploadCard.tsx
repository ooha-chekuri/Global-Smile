"use client";

import { useState, useRef } from "react";
import { Camera, FolderOpen, X } from "@phosphor-icons/react";
import WebcamCapture from "./WebcamCapture";

interface AngleUploadCardProps {
  label: string;
  description: string;
  onPhoto: (file: File, label: string) => void;
  onRemove: (label: string) => void;
  preview?: string | null;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function AngleUploadCard({
  label,
  description,
  onPhoto,
  onRemove,
  preview,
}: AngleUploadCardProps) {
  const [showWebcam, setShowWebcam] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError("");
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG/PNG accepted");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Max 5MB");
      return;
    }
    onPhoto(file, label);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (e.target) e.target.value = "";
  };

  const handleWebcamCapture = (blob: Blob) => {
    const file = new File([blob], `${label.replace(/\s+/g, "-")}.jpg`, {
      type: "image/jpeg",
    });
    handleFile(file);
  };

  return (
    <>
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all ${
          preview
            ? "border-teal-400 bg-teal-50/30"
            : "border-gray-300 hover:border-teal-400 bg-gray-50/50"
        }`}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={label}
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
            <button
              onClick={() => onRemove(label)}
              className="absolute top-2 right-2 bg-white/90 rounded-full p-1 text-gray-600 hover:text-red-500 shadow-sm"
              aria-label="Remove photo"
            >
              <X size={16} />
            </button>
            <p className="text-xs text-teal-700 font-medium mt-2">{label}</p>
          </div>
        ) : (
          <>
            <div className="aspect-[4/3] flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
              <p className="text-xs text-gray-400 mb-4">{description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowWebcam(true)}
                  className="flex items-center gap-1.5 bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-teal-700 transition-colors"
                >
                  <Camera size={14} />
                  Camera
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-300 transition-colors"
                >
                  <FolderOpen size={14} />
                  Upload
                </button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </>
        )}

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>

      {showWebcam && (
        <WebcamCapture
          onCapture={handleWebcamCapture}
          onClose={() => setShowWebcam(false)}
        />
      )}
    </>
  );
}
