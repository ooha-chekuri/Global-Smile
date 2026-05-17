import { VideoCamera, ShieldCheck, Clock, Globe } from "@phosphor-icons/react";
import BookingForm from "@/components/teleconsultation/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Teleconsultation — Global Smile Prosthodontics",
  description: "Schedule a video consultation with our prosthodontic specialists. Available for international and local patients.",
};

const FEATURES = [
  { icon: VideoCamera, label: "Video Consultation", desc: "Face-to-face discussion via secure video link" },
  { icon: ShieldCheck, label: "Expert Opinion", desc: "Board-certified prosthodontist evaluation" },
  { icon: Clock, label: "Flexible Scheduling", desc: "Morning and afternoon slots available" },
  { icon: Globe, label: "International Patients", desc: "Treatment planning before you travel to India" },
];

export default function TeleconsultationPage() {
  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <VideoCamera size={40} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Book a Teleconsultation
          </h1>
          <p className="text-teal-100 text-lg">
            Discuss your dental concerns with a specialist from the comfort of your home.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {FEATURES.map((f) => (
            <div key={f.label} className="bg-white border rounded-xl p-4 text-center">
              <f.icon size={28} className="text-teal-600 mx-auto mb-2" />
              <p className="font-medium text-gray-800 text-sm">{f.label}</p>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Request a Consultation
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Fill in the form below and we will send you a meeting link within 24 hours.
          </p>
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
