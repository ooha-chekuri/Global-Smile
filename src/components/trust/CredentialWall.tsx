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
    <section className="space-y-10">
      <div className="flex items-center gap-3">
         <div className="h-px bg-brand-gold/20 flex-1" />
         <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Clinical Credentials
         </h2>
         <div className="h-px bg-brand-gold/20 flex-1" />
      </div>
      
      <div className="space-y-12">
        {categories.map((cat) => (
          <div key={cat} className="space-y-4">
            <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">
              {categoryLabels[cat]}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {CREDENTIALS.filter((c) => c.category === cat).map((cred, i) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-100 rounded-lg p-6 hover:border-brand-teal transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm leading-tight">
                        {cred.title}
                      </h4>
                      <p className="text-xs text-gray-400 font-light italic">
                        {cred.issuer}
                      </p>
                    </div>
                    {cred.verificationUrl && (
                      <a
                        href={cred.verificationUrl}
                        className="shrink-0 h-8 w-8 rounded-full bg-brand-teal/5 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-white transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Verify Credential"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                     <p className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">
                       Verified: {cred.verifiedOn}
                     </p>
                     <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
