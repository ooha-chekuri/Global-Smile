"use client";

import { useState } from "react";
import JourneyTracker, { JourneyStage } from "@/components/dashboard/JourneyTracker";
import VisualizerModule from "@/components/visualizer/VisualizerModule";
import ClinicSearch from "@/components/visualizer/ClinicSearch";
import CostAnalysisModule from "@/components/calculator/CostAnalysisModule";
import BookingForm from "@/components/teleconsultation/BookingForm";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CaretLeft, CheckCircle, VideoCamera } from "@phosphor-icons/react";
import type { GeminiReport } from "@/types";

interface DashboardClientProps {
  session: any;
  initialStage: JourneyStage;
  reports: any[];
  homeCity: string;
  trustPortal: ReactNode;
}

export default function DashboardClient({ 
  session, 
  initialStage, 
  reports,
  homeCity,
  trustPortal
}: DashboardClientProps) {
  const [stage, setStage] = useState<JourneyStage>(initialStage);
  const [selectedReport, setSelectedReport] = useState<any>(reports[0] || null);

  const updateStage = async (newStage: JourneyStage) => {
    setStage(newStage);
    try {
      await fetch("/api/patient/stage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });
    } catch (e) {
      console.error("Failed to persist stage:", e);
    }
  };

  const handleReportGenerated = () => {
    window.location.reload();
  };

  const handleClinicSelect = (clinic: any) => {
    console.log("Selected clinic:", clinic);
    updateStage("trust");
  };

  return (
    <div className="space-y-10 pb-20 max-w-6xl mx-auto px-4">
      {/* ── Premium Header ── */}
      <section className="bg-brand-ink rounded-[2rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-brand-teal/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-10 items-end">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
               <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">
                Live Patient Journey Hub
              </span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                Hello, <br />
                <span className="text-brand-gold italic">{session.user.name.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm">
                Your clinical blueprint is actively processing. Complete all 5 stages for world-class dental restoration.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
             <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm space-y-1">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Case Status</p>
                <p className="text-2xl font-bold text-brand-gold tracking-tight capitalize">{stage.replace('-', ' ')} Phase</p>
             </div>
             <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">GS-REF-{session.user.id.padStart(4, '0')}</p>
          </div>
        </div>
      </section>

      <JourneyTracker currentStage={stage} onStageChange={setStage} />

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {stage === "scan" && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
               {reports.length > 0 ? (
                 <div className="space-y-8">
                   <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-l-4 border-brand-teal pl-4">Your Assessments</h2>
                      <button 
                        onClick={() => setSelectedReport(null)}
                        className="bg-brand-cream border border-brand-gold/20 text-brand-gold text-[10px] font-bold px-4 py-1.5 rounded-sm hover:bg-brand-gold hover:text-white transition-all uppercase tracking-widest"
                      >
                        Create New Scan +
                      </button>
                   </div>
                   
                   {!selectedReport ? (
                      <VisualizerModule 
                        initialName={session.user.name} 
                        initialEmail={session.user.email} 
                        onReportGenerated={handleReportGenerated}
                      />
                   ) : (
                      <div className="grid lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1 space-y-3">
                           {reports.map((r) => {
                             const data = JSON.parse(r.reportJson);
                             const active = selectedReport?.id === r.id;
                             return (
                               <div 
                                 key={r.id}
                                 onClick={() => setSelectedReport(r)}
                                 className={`p-5 border rounded-2xl cursor-pointer transition-all ${
                                   active ? 'border-brand-gold bg-brand-cream/30 shadow-lg shadow-brand-gold/10' : 'border-gray-100 bg-white hover:border-brand-teal/30'
                                 }`}
                               >
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">GS-A{r.id}</p>
                                    <p className="text-sm font-bold text-gray-900 truncate">{data.concernCategory}</p>
                                    <p className="text-[10px] text-gray-400 font-mono">{new Date(r.createdAt).toLocaleDateString("en-US")}</p>
                                 </div>
                               </div>
                             );
                           })}
                        </div>
                        <div className="lg:col-span-3 space-y-8">
                           <div className="bg-brand-teal rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-brand-teal/10">
                              <div className="space-y-1">
                                 <h3 className="text-lg font-bold tracking-tight">Stage Complete: Assessment Ready</h3>
                                 <p className="text-teal-100 text-sm font-light">Continue to locate specialist partners in your city.</p>
                              </div>
                              <button 
                                onClick={() => updateStage("recommendation")}
                                className="bg-brand-gold text-brand-ink px-10 py-3 rounded-md text-sm font-bold hover:bg-white transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2"
                              >
                                Find Local Clinics <ArrowRight size={18} />
                              </button>
                           </div>
                           <div className="bg-white border border-gray-100 rounded-[2rem] p-10 shadow-sm overflow-hidden relative">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[2rem]" />
                              <VisualizerModule 
                                key={selectedReport.id}
                                initialName={session.user.name} 
                                initialEmail={session.user.email}
                              />
                           </div>
                        </div>
                      </div>
                   )}
                 </div>
               ) : (
                 <div className="space-y-10">
                    <div className="text-center space-y-4">
                       <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Initiate Treatment Scan</h2>
                       <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
                          Our specialist AI requires clinical records to map your restorative possibilities. 
                          Upload your photos to begin Stage 1.
                       </p>
                    </div>
                    <VisualizerModule 
                      initialName={session.user.name} 
                      initialEmail={session.user.email} 
                      onReportGenerated={handleReportGenerated}
                    />
                 </div>
               )}
            </motion.div>
          )}

          {stage === "recommendation" && (
            <motion.div
              key="recommendation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => updateStage("scan")}
                  className="h-10 w-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-teal hover:border-brand-teal transition-all"
                >
                  <CaretLeft size={20} />
                </button>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Back to scan</p>
              </div>
              <ClinicSearch city={homeCity || "Vijayawada"} onSelect={handleClinicSelect} />
            </motion.div>
          )}

          {stage === "trust" && (
            <motion.div
              key="trust"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex justify-between items-center bg-brand-cream border border-brand-gold/10 p-6 rounded-2xl">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => updateStage("recommendation")}
                      className="h-10 w-10 rounded-full border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all"
                    >
                      <CaretLeft size={20} />
                    </button>
                    <div>
                       <h4 className="text-sm font-bold text-gray-900">Clinical Verification</h4>
                       <p className="text-xs text-gray-500 font-light italic">Audit our standards before calculating costs.</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => updateStage("cost")}
                  className="bg-brand-teal text-white px-8 py-3 rounded-md text-sm font-bold hover:bg-brand-ink transition-all shadow-lg shadow-brand-teal/20 flex items-center gap-2"
                >
                  Confirm Standards & Continue <ArrowRight size={18} />
                </button>
              </div>
              {trustPortal}
            </motion.div>
          )}

          {stage === "cost" && (
            <motion.div
              key="cost"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                <button 
                  onClick={() => updateStage("trust")}
                  className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-brand-teal uppercase tracking-widest"
                >
                  <CaretLeft size={14} /> Back to Trust
                </button>
                <button 
                  onClick={() => updateStage("action")}
                  className="bg-brand-gold text-brand-ink px-10 py-3 rounded-md text-sm font-bold hover:bg-brand-ink hover:text-white transition-all shadow-lg shadow-brand-gold/10 flex items-center gap-2"
                >
                  Finalize Journey <ArrowRight size={18} />
                </button>
              </div>
              <CostAnalysisModule 
                treatmentType={selectedReport ? JSON.parse(selectedReport.reportJson).concernCategory : "full-arch"} 
                homeCity={homeCity || "London"} 
              />
            </motion.div>
          )}

          {stage === "action" && (
            <motion.div
              key="action"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-16 bg-brand-cream/30 rounded-[3rem] border border-brand-gold/10"
            >
               <div className="text-center space-y-6 mb-12 px-6">
                  <div className="inline-block p-4 rounded-full bg-brand-teal/10 text-brand-teal mb-4">
                     <VideoCamera size={48} weight="thin" />
                  </div>
                  <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.4em]">Activation Stage</h2>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter leading-none">Your Specialist <br /> Consultation</p>
                  <p className="text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
                    Verification complete. Cost report finalized. <br />
                    Select your diagnostic slot with Dr. Prakash.
                  </p>
               </div>

               <div className="max-w-xl mx-auto px-6">
                  <div className="flex items-center gap-6 justify-center mb-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                     <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-teal" /> Secure Channel</span>
                     <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-teal" /> Specialist MD Only</span>
                     <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-teal" /> Confidential</span>
                  </div>
                  <BookingForm />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
