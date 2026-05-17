import type { Metadata } from "next";
import TeleconsultationFeatures from "@/components/teleconsultation/TeleconsultationFeatures";
import BookingForm from "@/components/teleconsultation/BookingForm";

export const metadata: Metadata = {
  title: "Book a Teleconsultation — Global Smile Prosthodontics",
  description: "Schedule a video consultation with our prosthodontic specialists. Available for international and local patients.",
};

export default function TeleconsultationPage() {
  return (
    <div className="flex-1">
      <section className="bg-gradient-to-br from-teal-600 to-teal-800 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Book a Teleconsultation
          </h1>
          <p className="text-teal-100 text-lg">
            Discuss your dental concerns with a specialist from the comfort of your home.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <TeleconsultationFeatures />

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
