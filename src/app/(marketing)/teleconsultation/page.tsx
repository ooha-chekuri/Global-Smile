import type { Metadata } from "next";
import TeleconsultationFeatures from "@/components/teleconsultation/TeleconsultationFeatures";
import BookingForm from "@/components/teleconsultation/BookingForm";
import { VideoCamera } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Book a Teleconsultation — Global Smile Centre",
  description: "Schedule a secure video diagnostic consultation with our prosthodontic specialists. Available for international and local patients.",
};

export default function TeleconsultationPage() {
  return (
    <div className="flex-1 bg-gray-50/50">
      <section className="bg-brand-ink text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-teal/10 rounded-full -mr-80 -mt-80 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-gold/5 rounded-full -ml-60 -mb-60 blur-[120px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
             <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
             <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em]">Specialist Diagnostic Hub</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tighter leading-[0.9]">
            Clinical <span className="text-brand-gold italic">Video Consult</span>
          </h1>
          <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Discuss complex restorative cases directly with our clinical leads. 
            Secure, HIPAA-aligned video diagnostic from any global location.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 space-y-24">
        <TeleconsultationFeatures />

        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-block p-5 rounded-2xl bg-brand-teal/5 text-brand-teal mb-2">
               <VideoCamera size={40} weight="thin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Request Diagnostic Slot
            </h2>
            <p className="text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
              Submit your case overview. Our clinical coordinator will secure your slot within 24 hours.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-4 shadow-2xl shadow-brand-ink/5">
             <div className="bg-gray-50/30 border border-gray-100 rounded-[2rem] p-8 md:p-12">
                <BookingForm />
             </div>
          </div>
          <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">
            End-to-End Encrypted Session
          </p>
        </div>
      </section>
    </div>
  );
}
