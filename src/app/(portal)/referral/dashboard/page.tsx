/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import StatusTracker from "@/components/referral/StatusTracker";
import ReferralForm from "@/components/referral/ReferralForm";
import { 
  UsersThree, 
  Plus, 
  FileText, 
  Clock, 
  Calendar,
  CheckCircle,
  Warning,
  MagnifyingGlass,
  Funnel
} from "@phosphor-icons/react";

interface Referral {
  id: number;
  patientName: string;
  chiefComplaint: string;
  urgency: string;
  status: string;
  createdAt: string;
}

export default function ReferralDashboard() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadReferrals = useCallback(async () => {
    try {
      const res = await fetch("/api/referral");
      if (res.ok) {
        const data = await res.json();
        setReferrals(data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReferrals();
  }, [loadReferrals]);

  const filteredReferrals = referrals.filter(r => 
    r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">GP Portal</p>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                My Patient Referrals
              </h1>
              <p className="text-gray-500 text-lg font-light">
                Track status and manage your specialist hand-offs.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                onClick={() => setShowForm(!showForm)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                  showForm 
                  ? "bg-brand-cream text-brand-gold border border-brand-gold/20" 
                  : "bg-brand-teal text-white shadow-lg shadow-brand-teal/20 hover:bg-brand-ink"
                }`}
              >
                {showForm ? "Cancel Request" : <><Plus size={18} weight="bold" /> New Referral</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-brand-teal/5 border border-brand-teal/10 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-brand-teal text-white flex items-center justify-center shadow-lg shadow-brand-teal/20">
                   <UsersThree size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sent Referrals</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{referrals.length}</p>
                </div>
             </div>
             <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                   <Clock size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Review</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{referrals.filter(r => r.status === 'reviewing').length}</p>
                </div>
             </div>
             <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                   <CheckCircle size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scheduled</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{referrals.filter(r => r.status === 'scheduled').length}</p>
                </div>
             </div>
             <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-gray-400 text-white flex items-center justify-center shadow-lg shadow-gray-400/20">
                   <CheckCircle size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Closed Cases</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{referrals.filter(r => r.status === 'closed').length}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {showForm && (
          <div className="bg-white border border-brand-teal/20 rounded-[2rem] p-10 shadow-2xl shadow-brand-teal/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/5 rounded-bl-[3rem]" />
            <div className="relative z-10 space-y-8">
               <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Clinical Referral Form
                  </h2>
                  <p className="text-gray-400 text-sm font-light">Enter patient details and clinical findings for specialist review.</p>
               </div>
               <ReferralForm
                onSuccess={() => {
                  setShowForm(false);
                  loadReferrals();
                }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <FileText size={16} /> History of Case Handoffs
          </h2>
          <div className="flex items-center gap-4">
             <div className="relative">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-white border border-gray-100 rounded-lg text-[10px] focus:outline-none focus:border-brand-teal w-48 shadow-sm"
                />
             </div>
             <span className="text-[10px] font-bold bg-white border border-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
              {filteredReferrals.length} Results
            </span>
          </div>
        </div>

        {loading && (
          <div className="grid gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {!loading && filteredReferrals.length === 0 && (
          <div className="text-center py-32 border border-dashed border-gray-200 rounded-[2rem] bg-white">
            <Clock size={48} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
            <div className="space-y-1">
               <p className="text-gray-900 font-bold tracking-tight">No referral history</p>
               <p className="text-gray-400 font-light text-sm">Submit your first referral to begin tracking.</p>
            </div>
          </div>
        )}

        {!loading && filteredReferrals.length > 0 && (
          <div className="grid gap-6">
            {filteredReferrals.map((ref) => (
              <div key={ref.id} className="bg-white border border-gray-200 rounded-[1.5rem] p-8 hover:border-brand-teal transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[3rem] -mr-8 -mt-8 group-hover:bg-brand-teal/5 transition-colors" />
                
                <div className="flex flex-col gap-8 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-4">
                          <h3 className="font-bold text-gray-900 text-xl tracking-tight group-hover:text-brand-teal transition-colors">
                            {ref.patientName}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                              ref.urgency === "emergency" || ref.urgency === "High"
                                ? "bg-red-50 text-red-600 border-red-100"
                                : ref.urgency === "urgent" || ref.urgency === "Moderate"
                                ? "bg-amber-50 text-amber-600 border-amber-100"
                                : "bg-gray-50 text-gray-500 border-gray-200"
                            }`}
                          >
                            {ref.urgency} Priority
                          </span>
                       </div>
                       <p className="text-sm text-gray-500 leading-relaxed font-light max-w-2xl">
                          {ref.chiefComplaint}
                       </p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Case ID</p>
                        <p className="text-xs font-mono font-medium text-gray-600">GS-REF-{ref.id.toString().padStart(4, '0')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sent Date</p>
                        <p className="text-xs font-medium text-gray-600">{new Date(ref.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Current Progress Protocol</p>
                    <StatusTracker currentStatus={ref.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
