"use client";

import { useState, useEffect, useCallback } from "react";
import StatusTracker from "@/components/referral/StatusTracker";
import ReferralForm from "@/components/referral/ReferralForm";

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Referrals</h1>
          <p className="text-sm text-gray-500">
            Track and manage your patient referrals
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition-colors"
        >
          {showForm ? "Cancel" : "New Referral"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Refer a Patient
          </h2>
          <ReferralForm
            onSuccess={() => {
              setShowForm(false);
              loadReferrals();
            }}
          />
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-gray-400">Loading referrals...</div>
      )}

      {!loading && referrals.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400">No referrals yet. Submit your first one!</p>
        </div>
      )}

      {!loading && referrals.length > 0 && (
        <div className="space-y-4">
          {referrals.map((ref) => (
            <div key={ref.id} className="bg-white border rounded-xl p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{ref.patientName}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Ref #{ref.id} — {new Date(ref.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    ref.urgency === "emergency"
                      ? "bg-red-100 text-red-700"
                      : ref.urgency === "urgent"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ref.urgency}
                </span>
              </div>
              <p className="text-sm text-gray-600">{ref.chiefComplaint}</p>
              <StatusTracker currentStatus={ref.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
