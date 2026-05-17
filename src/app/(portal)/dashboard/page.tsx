"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, FileText, CheckCircle, Clock, Calendar, ArrowRight } from "lucide-react";

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
  closed: "bg-teal-50 text-teal-600 border-teal-100",
};

export default function SpecialistDashboard() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex-1 bg-white min-h-screen">
      <section className="border-b border-gray-100 bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-2">Practice Management</p>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Specialist Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-light">
            Manage incoming referrals and clinical assessments.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Users size={14} /> Incoming Referral Queue
          </h2>
          <span className="text-[10px] font-bold bg-teal-50 text-teal-600 px-2 py-0.5 rounded-sm uppercase tracking-widest">
            {referrals.length} Active Cases
          </span>
        </div>

        {loading && (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-50 rounded-lg animate-pulse border border-gray-100" />
            ))}
          </div>
        )}

        {!loading && referrals.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-lg bg-gray-50/30">
            <Clock size={40} className="mx-auto text-gray-300 mb-4" strokeWidth={1} />
            <p className="text-gray-400 font-light italic text-sm">No referrals in the queue.</p>
          </div>
        )}

        {!loading && referrals.length > 0 && (
          <div className="space-y-4">
            {referrals.map((ref) => (
              <div key={ref.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-teal-200 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                       <h3 className="font-bold text-gray-900 text-lg tracking-tight">
                        {ref.patientName}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-wider ${
                          statusColors[ref.status] ?? "bg-gray-50 text-gray-500 border-gray-200"
                        }`}
                      >
                        {ref.status.replace("_", " ")}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      <FileText size={14} className="inline mr-1 text-gray-300" /> {ref.chiefComplaint}
                    </p>

                    <div className="flex items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-2">
                      <span className="flex items-center gap-1.5"><Clock size={12} /> Ref #{ref.id}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(ref.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 md:flex-col md:w-40">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 hidden md:block">Update Status</p>
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(ref.id, s)}
                        disabled={s === ref.status}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-md border uppercase tracking-wider transition-all text-center ${
                          s === ref.status
                            ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                            : "bg-white border-gray-100 text-gray-400 hover:border-teal-200 hover:text-teal-600"
                        }`}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
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

