"use client";

import { VideoCamera, ShieldCheck, Clock, Globe } from "@phosphor-icons/react";

const FEATURES = [
  { icon: VideoCamera, label: "Video Consultation", desc: "Face-to-face discussion via secure video link" },
  { icon: ShieldCheck, label: "Expert Opinion", desc: "Board-certified prosthodontist evaluation" },
  { icon: Clock, label: "Flexible Scheduling", desc: "Morning and afternoon slots available" },
  { icon: Globe, label: "International Patients", desc: "Treatment planning before you travel to India" },
];

export default function TeleconsultationFeatures() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {FEATURES.map((f) => (
        <div key={f.label} className="bg-white border rounded-xl p-4 text-center">
          <f.icon size={28} className="text-teal-600 mx-auto mb-2" />
          <p className="font-medium text-gray-800 text-sm">{f.label}</p>
          <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
