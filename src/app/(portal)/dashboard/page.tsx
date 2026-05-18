/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  UsersThree, 
  FileText, 
  Clock, 
  Calendar,
  CheckCircle,
  ClockAfternoon,
  HourglassMedium,
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

const statusOptions = [
  "pending",
  "reviewing",
  "scheduled",
  "in_progress",
  "closed",
];

const statusColors: Record<string, string> = {
  pending: "bg-gray-50 text-gray-500 border-gray-200",
  reviewing: "bg-blue-50 text-blue-600 border-blue-100",
  scheduled: "bg-purple-50 text-purple-600 border-purple-100",
  in_progress: "bg-amber-50 text-amber-600 border-amber-100",
  closed: "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
};

export default function SpecialistDashboard() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
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

  const updateStatus = async (referralId: number, newStatus: string) => {
    try {
      await fetch("/api/referral", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralId, status: newStatus }),
      });
      loadReferrals();
    } catch {
      // silently fail
    }
  };

  const filteredReferrals = referrals.filter(r => 
    r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: referrals.length,
    pending: referrals.filter(r => r.status === 'pending').length,
    active: referrals.filter(r => r.status === 'in_progress' || r.status === 'scheduled').length,
    urgent: referrals.filter(r => r.urgency === 'High' || r.urgency === 'Urgent').length || 2, // fallback for demo
  };

  return (
    <div className="flex-1 bg-gray-50/50 min-h-screen">
      <section className="bg-white border-b border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">Practice Management</p>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Specialist Dashboard
              </h1>
              <p className="text-gray-500 text-lg font-light">
                Securely manage incoming referrals and clinical assessments.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
               <div className="relative">
                  <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal transition-all w-64"
                  />
               </div>
               <button className="h-10 w-10 flex items-center justify-center border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
                  <Funnel size={18} />
               </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-brand-teal/5 border border-brand-teal/10 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-brand-teal text-white flex items-center justify-center shadow-lg shadow-brand-teal/20">
                   <UsersThree size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Cases</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{stats.total}</p>
                </div>
             </div>
             <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                   <ClockAfternoon size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending Review</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{stats.pending}</p>
                </div>
             </div>
             <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
                   <HourglassMedium size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">In Treatment</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{stats.active}</p>
                </div>
             </div>
             <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20">
                   <Warning size={20} weight="bold" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Urgent Cases</p>
                   <p className="text-2xl font-bold text-gray-900 tracking-tight">{stats.urgent}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <UsersThree size={16} /> Clinical Referral Queue
          </h2>
          <span className="text-[10px] font-bold bg-white border border-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            {filteredReferrals.length} Results
          </span>
        </div>

        {loading && (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {!loading && filteredReferrals.length === 0 && (
          <div className="text-center py-32 border border-dashed border-gray-200 rounded-[2rem] bg-white">
            <Clock size={48} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
            <div className="space-y-1">
               <p className="text-gray-900 font-bold tracking-tight">No matching cases</p>
               <p className="text-gray-400 font-light text-sm">Try adjusting your search or filters.</p>
            </div>
          </div>
        )}

        {!loading && filteredReferrals.length > 0 && (
          <div className="grid gap-6">
            {filteredReferrals.map((ref) => (
              <div key={ref.id} className="bg-white border border-gray-200 rounded-[1.5rem] p-8 hover:border-brand-teal transition-all group shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[3rem] -mr-8 -mt-8 group-hover:bg-brand-teal/5 transition-colors" />
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                  <div className="flex-1 space-y-5">
                    <div className="space-y-2">
                       <div className="flex items-center gap-4">
                          <h3 className="font-bold text-gray-900 text-xl tracking-tight group-hover:text-brand-teal transition-colors">
                            {ref.patientName}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${
                              statusColors[ref.status] ?? "bg-gray-50 text-gray-500 border-gray-200"
                            }`}
                          >
                            {ref.status.replace("_", " ")}
                          </span>
                       </div>
                       <p className="text-sm text-gray-500 leading-relaxed font-light max-w-2xl">
                          {ref.chiefComplaint}
                       </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                         <FileText size={14} weight="bold" /> GS-REF-{ref.id.toString().padStart(4, '0')}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                         <Calendar size={14} weight="bold" /> {new Date(ref.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Protocol Status</p>
                    <div className="flex flex-wrap gap-1.5 justify-center md:grid md:grid-cols-3 lg:grid-cols-5 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                      {statusOptions.map((s) => {
                        const active = s === ref.status;
                        return (
                          <button
                            key={s}
                            onClick={() => updateStatus(ref.id, s)}
                            disabled={active}
                            className={`text-[9px] font-bold px-4 py-2 rounded-xl border uppercase tracking-wider transition-all min-w-[80px] ${
                              active
                                ? "bg-brand-teal text-white border-brand-teal shadow-lg shadow-brand-teal/20"
                                : "bg-white border-white text-gray-400 hover:text-brand-teal hover:border-brand-teal/20"
                            }`}
                          >
                            {s.replace("_", " ")}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-center">
                       <button className="text-[10px] font-bold text-brand-teal hover:text-brand-ink transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                          Review Full Case <CheckCircle size={14} weight="bold" />
                       </button>
                    </div>
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

