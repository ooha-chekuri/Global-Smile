"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Camera, X } from "@phosphor-icons/react";

interface WebcamCaptureProps {
  onCapture: (blob: Blob) => void;
  onClose: () => void;
}

export default function WebcamCapture({ onCapture, onClose }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = useCallback(async () => {
    setError("");
    try {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
    } catch {
      setError("Camera access denied or not available.");
    }
  }, [facingMode, stream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setCaptured(dataUrl);

    if (stream) stream.getTracks().forEach((t) => t.stop());
  };

  const retake = () => {
    setCaptured(null);
    startCamera();
  };

  const confirm = async () => {
    if (!captured) return;
    const res = await fetch(captured);
    const blob = await res.blob();
    onCapture(blob);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Camera size={18} />
            Take Photo
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="aspect-[4/3] bg-black relative">
          {!captured ? (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-contain" />
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm p-4 text-center">
                  {error}
                </div>
              )}
            </>
          ) : (
            <img src={captured} alt="Captured" className="w-full h-full object-contain" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="p-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setFacingMode((m) => (m === "user" ? "environment" : "user"))}
            className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 border rounded-lg"
          >
            Flip Camera
          </button>

          <div className="flex gap-2">
            {captured ? (
              <>
                <button onClick={retake} className="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50">
                  Retake
                </button>
                <button onClick={confirm} className="px-6 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700">
                  Use Photo
                </button>
              </>
            ) : (
              <button
                onClick={capture}
                disabled={!!error}
                className="px-6 py-2 text-sm text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Camera size={16} />
                Capture
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
