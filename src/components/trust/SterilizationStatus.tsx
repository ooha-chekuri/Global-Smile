"use client";

import { STERILIZATION_LOG } from "@/lib/credentials";

export default function SterilizationStatus() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Sterilization & Safety
      </h2>
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div
            className={`h-4 w-4 rounded-full ${
              STERILIZATION_LOG.isAllClear ? "bg-green-500" : "bg-amber-500"
            }`}
          />
          <div>
            <p className="font-semibold text-gray-800">
              {STERILIZATION_LOG.isAllClear
                ? "All Clear"
                : "Audit Pending"}
            </p>
            <p className="text-sm text-gray-500">
              Last audit: {STERILIZATION_LOG.lastAuditDate}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Our sterilization protocols exceed WHO standards. All instruments are
          autoclave-sterilized, single-use where applicable, and tracked via
          digital log. Weekly audits ensure compliance.
        </p>
      </div>
    </section>
  );
}
