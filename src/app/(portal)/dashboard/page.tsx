"use client";

import { useState, useEffect, useCallback } from "react";

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
  pending: "bg-gray-100 text-gray-600",
  reviewing: "bg-blue-100 text-blue-700",
  scheduled: "bg-purple-100 text-purple-700",
  in_progress: "bg-amber-100 text-amber-700",
  closed: "bg-green-100 text-green-700",
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
            Specialist Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Incoming Referral Queue
        </p>
      </div>

      {loading && (
        <div className="text-center py-8 text-gray-400">Loading referrals...</div>
      )}

      {!loading && referrals.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400">No referrals in the queue.</p>
        </div>
      )}

      {!loading && referrals.length > 0 && (
        <div className="space-y-4">
          {referrals.map((ref) => (
            <div key={ref.id} className="bg-white border rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {ref.patientName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Ref #{ref.id} — {new Date(ref.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    statusColors[ref.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ref.status.replace("_", " ")}
                </span>
              </div>
              <p className="text-sm text-gray-600">{ref.chiefComplaint}</p>
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(ref.id, s)}
                    disabled={s === ref.status}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      s === ref.status
                        ? "bg-teal-600 text-white border-teal-600"
                        : "border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-600"
                    }`}
                  >
                    {s.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
