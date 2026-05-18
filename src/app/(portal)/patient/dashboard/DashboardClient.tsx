/* eslint-disable @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
"use client";

import { useState } from "react";
import JourneyTracker, { JourneyStage } from "@/components/dashboard/JourneyTracker";
import VisualizerModule from "@/components/visualizer/VisualizerModule";
import ClinicSearch from "@/components/visualizer/ClinicSearch";
import CostAnalysisModule from "@/components/calculator/CostAnalysisModule";
import BookingForm from "@/components/teleconsultation/BookingForm";
import DashboardAnalytics from "@/components/dashboard/DashboardAnalytics";
import PostOpCare from "@/components/dashboard/PostOpCare";
import VisualizerPDF from "@/components/visualizer/VisualizerPDF";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CaretLeft, 
  CheckCircle, 
  VideoCamera, 
  WhatsappLogo,
  FileText,
  Clock,
  Plus
} from "@phosphor-icons/react";
import type { GeminiReport } from "@/types";
import Link from "next/link";

interface DashboardClientProps {
  session: any;
  initialStage: JourneyStage;
  reports: any[];
  homeCity: string;
  trustPortal: ReactNode;
  nextAppointment: { date: string; time: string } | null;
}

export default function DashboardClient({ 
  session, 
  initialStage, 
  reports,
  homeCity,
  trustPortal,
  nextAppointment
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

  const latestReportDate = reports.length > 0
    ? new Date(reports[0].createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  const reportDetail = selectedReport
    ? (() => {
        try { return JSON.parse(selectedReport.reportJson) as GeminiReport; }
        catch { return null; }
      })()
    : null;

  return (
    <div className="space-y-8 pb-32 max-w-7xl mx-auto px-6 pt-8">
      {/* ── Refined Dashboard Header ── */}
      <section className="bg-brand-ink rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-brand-teal/20 border border-white/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/15 rounded-full -mr-40 -mt-40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full -ml-32 -mb-32 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
               <div className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
               <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.3em]">
                Patient Journey Hub
              </span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
                Welcome back, <br />
                <span className="text-brand-gold">{session.user.name.split(' ')[0]}</span>
              </h1>
              <p className="text-white/40 text-base font-light leading-relaxed max-w-md mx-auto md:mx-0">
                Your clinical roadmap is ready. Complete all stages to finalize your world-class dental restoration in Vijayawada.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-sm">
             <div className="px-6 py-4 text-center md:text-right border-r border-white/10">
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Current Protocol</p>
                <p className="text-xl font-bold text-brand-gold tracking-tight capitalize">{stage.replace('-', ' ')}</p>
             </div>
             <div className="px-6 py-4 hidden sm:block">
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] mb-1">Case Identifier</p>
                <p className="text-sm font-mono text-white/60 font-medium">GS-REF-{session.user.id.padStart(4, '0')}</p>
             </div>
          </div>
        </div>
      </section>

      {/* ── Journey Navigation ── */}
      <JourneyTracker currentStage={stage} onStageChange={setStage} />

      {/* ── Analytics Layer ── */}
      <DashboardAnalytics
        reportsCount={reports.length}
        latestReportDate={latestReportDate}
        currentStage={stage}
        nextAppointment={nextAppointment}
      />

      <div className="max-w-6xl mx-auto">
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
                      <div className="space-y-1">
                        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                           <FileText size={18} className="text-brand-teal" /> Your Clinical Assessments
                        </h2>
                        <p className="text-[10px] text-gray-400 font-light">Select a scan to view restorative possibilities.</p>
                      </div>
                      <button 
                        onClick={() => setSelectedReport(null)}
                        className="bg-white border border-gray-200 text-gray-900 text-[10px] font-bold px-5 py-2 rounded-xl hover:border-brand-teal hover:text-brand-teal transition-all uppercase tracking-widest flex items-center gap-2 shadow-sm"
                      >
                        <Plus size={14} weight="bold" /> New Scan
                      </button>
                   </div>
                   
                   {!selectedReport ? (
                      <VisualizerModule 
                        initialName={session.user.name} 
                        initialEmail={session.user.email} 
                        onReportGenerated={handleReportGenerated}
                      />
                   ) : (
                      <div className="grid lg:grid-cols-12 gap-10">
                        {/* Reports Sidebar */}
                        <div className="lg:col-span-3 space-y-4">
                           {reports.map((r) => {
                             const data = JSON.parse(r.reportJson);
                             const active = selectedReport?.id === r.id;
                             return (
                               <div 
                                 key={r.id}
                                 onClick={() => setSelectedReport(r)}
                                 className={`p-6 border rounded-[1.5rem] cursor-pointer transition-all relative overflow-hidden group ${
                                   active 
                                   ? 'border-brand-teal bg-white shadow-xl shadow-brand-teal/5' 
                                   : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-brand-teal/30 hover:shadow-lg'
                                 }`}
                               >
                                 {active && <div className="absolute top-0 right-0 w-12 h-12 bg-brand-teal rounded-bl-[1.5rem] flex items-center justify-center text-white scale-75 -mr-2 -mt-2">
                                    <CheckCircle size={16} weight="bold" />
                                 </div>}
                                 <div className="space-y-2">
                                    <p className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-brand-teal' : 'text-gray-400'}`}>Scan ID {r.id}</p>
                                    <p className="text-sm font-bold text-gray-900 truncate leading-tight">{data.concernCategory}</p>
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                                       <Clock size={12} /> {new Date(r.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                                    </div>
                                 </div>
                               </div>
                             );
                           })}
                        </div>

                        {/* Report Detail View */}
                        <div className="lg:col-span-9 space-y-8">
                           <div className="bg-brand-ink rounded-[2rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl shadow-brand-ink/20 relative overflow-hidden border border-white/5">
                              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                              <div className="space-y-2 relative z-10 text-center md:text-left">
                                 <h3 className="text-xl font-bold tracking-tight">Ready for Stage 2?</h3>
                                 <p className="text-white/40 text-sm font-light">Locate verified specialist partners in your city to continue.</p>
                              </div>
                              <button 
                                onClick={() => updateStage("recommendation")}
                                className="bg-brand-teal text-white px-10 py-4 rounded-xl text-sm font-bold hover:bg-white hover:text-brand-ink transition-all shadow-xl shadow-brand-teal/20 flex items-center gap-3 relative z-10"
                              >
                                Find Local Clinics <ArrowRight size={18} weight="bold" />
                              </button>
                           </div>

                           {/* Main Report Content */}
                           <div className="bg-white border border-gray-100 rounded-[2.5rem] p-12 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-teal/5 transition-all">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[2.5rem] group-hover:bg-brand-teal/5 transition-colors" />
                              
                              {reportDetail && (
                                <div className="space-y-10 relative z-10">
                                  <div className="flex flex-wrap items-center gap-4">
                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border ${
                                      reportDetail.complexityTier === "mild" ? "bg-green-50 text-green-700 border-green-100" :
                                      reportDetail.complexityTier === "complex" ? "bg-red-50 text-red-700 border-red-100" :
                                      "bg-amber-50 text-amber-700 border-amber-100"
                                    }`}>
                                      {reportDetail.complexityTier} Complexity Tier
                                    </span>
                                    <div className="px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full flex items-center gap-2">
                                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Restoration Readiness</span>
                                       <span className="text-xs font-bold text-gray-900">{reportDetail.restorationScore}/10</span>
                                    </div>
                                  </div>

                                  <div className="grid md:grid-cols-2 gap-12">
                                     <div className="space-y-8">
                                        <div>
                                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">Concern Category</h4>
                                          <p className="text-2xl font-bold text-gray-900 tracking-tight leading-none">{reportDetail.concernCategory}</p>
                                        </div>

                                        <div>
                                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Possible Pathways</h4>
                                          <ul className="space-y-3">
                                            {reportDetail.possiblePathways.map((p, i) => (
                                              <li key={i} className="flex items-start gap-4 text-sm text-gray-600 font-light group/item">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-teal shrink-0 shadow-[0_0_8px_rgba(13,148,136,0.3)] group-hover/item:scale-150 transition-transform" />
                                                <span className="group-hover/item:text-gray-900 transition-colors">{p}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                     </div>

                                     <div className="space-y-8">
                                        <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100/50 relative">
                                          <FileText size={40} weight="thin" className="absolute top-4 right-4 text-gray-200" />
                                          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Specialist Note</h4>
                                          <p className="text-base text-gray-600 italic leading-relaxed font-light">"{reportDetail.educationalNote}"</p>
                                        </div>

                                        <div className="bg-amber-50/20 border border-amber-100/30 rounded-2xl p-6">
                                          <p className="text-[10px] text-amber-700/70 leading-relaxed font-medium uppercase tracking-wider mb-2">Legal Disclaimer</p>
                                          <p className="text-xs text-amber-700/60 leading-relaxed font-light">{reportDetail.disclaimer}</p>
                                        </div>
                                     </div>
                                  </div>

                                  {/* Refined Action Bar */}
                                  <div className="flex flex-wrap items-center gap-4 pt-10 border-t border-gray-100">
                                    <VisualizerPDF
                                      photoUrls={selectedReport.photoUrl ? [selectedReport.photoUrl] : []}
                                      report={reportDetail}
                                      patientName={session.user.name}
                                      concernText={selectedReport.concernText}
                                    />
                                    <Link
                                      href="/teleconsultation"
                                      className="inline-flex items-center gap-3 bg-brand-ink text-white px-8 py-4 rounded-xl text-sm font-bold hover:bg-brand-teal transition-all shadow-xl shadow-brand-ink/10"
                                    >
                                      <VideoCamera size={20} weight="bold" /> Book Consult
                                    </Link>
                                    <a
                                      href="https://wa.me/911234567890"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-xl shadow-[#25D366]/20"
                                    >
                                      <WhatsappLogo size={20} weight="fill" /> WhatsApp
                                    </a>
                                  </div>
                                </div>
                              )}
                           </div>
                        </div>
                      </div>
                   )}
                 </div>
               ) : (
                 <div className="space-y-12 py-10">
                    <div className="text-center space-y-4">
                       <div className="h-16 w-16 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center mx-auto mb-6">
                          <Plus size={32} />
                       </div>
                       <h2 className="text-4xl font-bold text-gray-900 tracking-tight leading-none">Initiate Treatment Scan</h2>
                       <p className="text-gray-400 font-light max-w-xl mx-auto leading-relaxed text-lg">
                          Our specialist protocol requires clinical records to map your restorative possibilities. 
                          Upload your photos to begin Stage 1.
                       </p>
                    </div>
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                      <VisualizerModule 
                        initialName={session.user.name} 
                        initialEmail={session.user.email} 
                        onReportGenerated={handleReportGenerated}
                      />
                    </div>
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
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => updateStage("scan")}
                  className="h-12 w-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-teal hover:border-brand-teal hover:shadow-lg transition-all"
                >
                  <CaretLeft size={24} weight="bold" />
                </button>
                <div className="space-y-1">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stage 2</p>
                   <h2 className="text-xl font-bold text-gray-900 tracking-tight">Locate Partners in {homeCity || "Vijayawada"}</h2>
                </div>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <ClinicSearch city={homeCity || "Vijayawada"} onSelect={handleClinicSelect} />
              </div>
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
              <div className="flex flex-col md:flex-row justify-between items-center bg-brand-cream border border-brand-gold/20 p-8 rounded-[2.5rem] gap-8 shadow-lg shadow-brand-gold/5">
                 <div className="flex items-center gap-6">
                    <button 
                      onClick={() => updateStage("recommendation")}
                      className="h-12 w-12 rounded-full bg-white border border-brand-gold/20 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white hover:shadow-lg transition-all shadow-sm"
                    >
                      <CaretLeft size={24} weight="bold" />
                    </button>
                    <div className="space-y-1">
                       <h4 className="text-xl font-bold text-gray-900 tracking-tight">Clinical Verification Wall</h4>
                       <p className="text-sm text-gray-500 font-light italic">Audit our sterilization and clinical protocols.</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => updateStage("cost")}
                  className="bg-brand-ink text-white px-10 py-4 rounded-xl text-sm font-bold hover:bg-brand-teal transition-all shadow-xl shadow-brand-ink/10 flex items-center gap-3"
                >
                  Confirm & Continue <ArrowRight size={18} weight="bold" />
                </button>
              </div>
              <div className="bg-white p-2 rounded-[3rem] border border-gray-100 shadow-sm">
                {trustPortal}
              </div>
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
              <div className="flex justify-between items-center border-b border-gray-100 pb-10">
                <button 
                  onClick={() => updateStage("trust")}
                  className="flex items-center gap-3 text-[10px] font-bold text-gray-400 hover:text-brand-teal uppercase tracking-[0.3em] transition-colors"
                >
                  <CaretLeft size={16} weight="bold" /> Back to Trust Wall
                </button>
                <div className="text-center hidden md:block">
                   <h2 className="text-xl font-bold text-gray-900 tracking-tight">Treatment Value Calculator</h2>
                   <p className="text-xs text-gray-400 font-light">Global cost comparison analysis.</p>
                </div>
                <button 
                  onClick={() => updateStage("action")}
                  className="bg-brand-gold text-brand-ink px-10 py-4 rounded-xl text-sm font-bold hover:bg-brand-ink hover:text-white transition-all shadow-xl shadow-brand-gold/20 flex items-center gap-3"
                >
                  Finalize Journey <ArrowRight size={18} weight="bold" />
                </button>
              </div>
              <CostAnalysisModule 
                treatmentType={selectedReport ? (() => { try { return JSON.parse(selectedReport.reportJson).concernCategory; } catch { return "full-arch"; } })() : "full-arch"} 
                homeCity={homeCity || "London"} 
              />
            </motion.div>
          )}

          {stage === "action" && (
            <motion.div
              key="action"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-16 pt-10"
            >
              {/* Refined Activation Section */}
              <div className="py-24 bg-brand-ink rounded-[4rem] text-white relative overflow-hidden shadow-2xl shadow-brand-ink/40 border border-white/5">
                 <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-teal/10 rounded-full -mr-80 -mt-80 blur-[150px]" />
                 <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-gold/5 rounded-full -ml-60 -mb-60 blur-[120px]" />
                 
                 <div className="relative z-10 text-center space-y-8 mb-16 px-6">
                    <div className="inline-block p-6 rounded-3xl bg-white/5 border border-white/10 text-brand-gold mb-4 backdrop-blur-md shadow-2xl">
                       <VideoCamera size={56} weight="thin" />
                    </div>
                    <div className="space-y-3">
                       <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.5em]">Activation Stage</h2>
                       <p className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">Your Clinical <br /> Consultation</p>
                    </div>
                    <p className="text-white/40 font-light max-w-xl mx-auto leading-relaxed text-lg">
                      Verification complete. Value report finalized. <br />
                      Secure your diagnostic slot with our lead prosthodontist.
                    </p>
                 </div>

                 <div className="max-w-xl mx-auto px-6 relative z-10">
                    <div className="flex flex-wrap items-center gap-6 justify-center mb-12 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                       <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><CheckCircle size={16} className="text-brand-teal" weight="bold" /> Secure Channel</span>
                       <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><CheckCircle size={16} className="text-brand-teal" weight="bold" /> Specialist MD Only</span>
                       <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"><CheckCircle size={16} className="text-brand-teal" weight="bold" /> Confidential</span>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl">
                       <BookingForm />
                    </div>
                 </div>
              </div>

              {/* Post-Op Care - Professional Section */}
              <div className="pt-10">
                <PostOpCare patientName={session.user.name} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
