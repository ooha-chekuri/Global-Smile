"use client";

import { motion } from "framer-motion";
import { CREDENTIALS } from "@/lib/credentials";

const categoryLabels: Record<string, string> = {
  qualification: "Qualifications",
  certification: "Certifications",
  membership: "Memberships",
};

export default function CredentialWall() {
  const categories = ["qualification", "certification", "membership"] as const;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Credential Wall
      </h2>
      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {categoryLabels[cat]}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {CREDENTIALS.filter((c) => c.category === cat).map((cred, i) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {cred.issuer}
                      </p>
                    </div>
                    {cred.verificationUrl && (
                      <a
                        href={cred.verificationUrl}
                        className="shrink-0 text-teal-600 hover:text-teal-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Verified: {cred.verifiedOn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
