"use client";

import { motion } from "framer-motion";
import { CREDENTIALS } from "@/lib/credentials";
import { SealCheck, ArrowSquareOut } from "@phosphor-icons/react";

const categoryLabels: Record<string, string> = {
  qualification: "Clinical Qualifications",
  certification: "Accreditations",
  membership: "Specialist Societies",
};

export default function CredentialWall() {
  const categories = ["qualification", "certification", "membership"] as const;

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-6">
         <div className="h-px bg-gray-100 flex-1" />
         <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <SealCheck size={28} className="text-brand-teal" weight="fill" />
            Clinical Credentials
         </h2>
         <div className="h-px bg-gray-100 flex-1" />
      </div>
      
      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat} className="space-y-6">
            <h3 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em] ml-1">
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
                  className="bg-white border border-gray-100 rounded-2xl p-8 hover:border-brand-teal transition-all shadow-sm hover:shadow-xl hover:shadow-brand-teal/5 group"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 text-base leading-tight group-hover:text-brand-teal transition-colors">
                        {cred.title}
                      </h4>
                      <p className="text-sm text-gray-400 font-light italic leading-relaxed">
                        {cred.issuer}
                      </p>
                    </div>
                    {cred.verificationUrl && (
                      <a
                        href={cred.verificationUrl}
                        className="shrink-0 h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-brand-teal hover:text-white transition-all shadow-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Verify Credential"
                      >
                        <ArrowSquareOut size={20} weight="bold" />
                      </a>
                    )}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-teal shadow-[0_0_8px_rgba(13,148,136,0.5)]" />
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          Verified Audit
                        </p>
                     </div>
                     <p className="text-[9px] font-mono text-gray-300 font-medium">
                       {cred.verifiedOn}
                     </p>
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
