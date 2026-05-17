"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MagicWand,
  Calculator,
  ShieldCheck,
  ArrowRight,
  CurrencyCircleDollar,
  Tooth,
  Eye,
  ArrowsClockwise,
  ChartLine,
  UserCircle,
  Lock,
  VideoCamera,
} from "@phosphor-icons/react";

const modules = [
  {
    title: "AI Treatment Visualizer",
    description:
      "Upload a photo and describe your concern. Get a plain-language report showing restorative possibilities, complexity tier, and next steps.",
    href: "/visualizer",
    icon: MagicWand,
    color: "from-teal-500 to-emerald-600",
    gradient: "group-hover:shadow-teal-500/25",
  },
  {
    title: "Dental Tourism Calculator",
    description:
      "Compare treatment costs in Vijayawada vs. New York, London, and Sydney. See your net savings including flights and stay.",
    href: "/calculator",
    icon: Calculator,
    color: "from-emerald-500 to-teal-600",
    gradient: "group-hover:shadow-emerald-500/25",
  },
  {
    title: "Trust Dashboard",
    description:
      "Verify our credentials, sterilization protocols, and live anonymized patient milestones. Total transparency.",
    href: "/trust",
    icon: ShieldCheck,
    color: "from-cyan-500 to-teal-600",
    gradient: "group-hover:shadow-cyan-500/25",
  },
  {
    title: "GP Referral Portal",
    description:
      "Secure referral portal for general dentists. Submit cases, track status, and receive closure summaries.",
    href: "/auth/signin",
    icon: UserCircle,
    color: "from-teal-600 to-teal-800",
    gradient: "group-hover:shadow-teal-600/25",
  },
];

const stats = [
  { icon: CurrencyCircleDollar, value: "60-80%", label: "Cost Savings vs. US/UK" },
  { icon: Tooth, value: "MDS", label: "Specialist Prosthodontists" },
  { icon: Eye, value: "100%", label: "Treatment Transparency" },
  { icon: ArrowsClockwise, value: "30+", label: "Referring GPs Network" },
  { icon: ChartLine, value: "13%", label: "Dental Tourism CAGR" },
  { icon: Lock, value: "DPDP", label: "Data Privacy Compliant" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export default function Home() {
  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(13,148,136,0.03)_0%,transparent_50%)]" />
        <motion.div
          className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-teal-100 bg-teal-50/50 rounded-md px-3 py-1 text-xs font-medium text-teal-800 mb-8 tracking-wide uppercase"
          >
            <MagicWand size={14} weight="bold" />
            Specialist Prosthodontic Intelligence
          </motion.div>

          <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
            Global Standard Care, <br />
            <span className="text-teal-600">Locally Anchored.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Transparency. Trust. Precision. Experience the world-class expertise of 
            prosthodontic specialists in Vijayawada, built for the global patient.
          </p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/visualizer"
              className="inline-flex items-center gap-2 rounded-md bg-teal-600 text-white px-8 py-3.5 text-sm font-semibold hover:bg-teal-700 transition-all active:scale-[0.98]"
            >
              <MagicWand size={18} weight="bold" />
              Visualize Treatment
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white text-gray-600 px-8 py-3.5 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
            >
              <Calculator size={18} weight="bold" />
              Savings Calculator
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Module Cards ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={mod.href}
                  className="group relative block rounded-lg border border-gray-100 bg-white p-8 hover:border-teal-200 hover:bg-teal-50/30 transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-md border border-teal-100 bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                      <Icon size={24} weight="bold" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">
                        {mod.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="shrink-0 mt-1 text-gray-200 group-hover:text-teal-600 group-hover:translate-x-1 transition-all"
                      weight="bold"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gray-50/50 border-y border-gray-100 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Why Global Smile</h2>
            <p className="text-3xl md:text-4xl font-bold text-gray-900">Clinical Excellence at Scale</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-lg border border-gray-100 p-6 flex flex-col items-center text-center"
                >
                  <Icon
                    size={32}
                    className="mb-4 text-teal-600/80"
                    weight="light"
                  />
                  <p className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Teleconsultation CTA ── */}
      <section className="py-24 px-6">
        <motion.div 
          className="max-w-4xl mx-auto border border-teal-100 rounded-lg p-12 text-center bg-teal-50/20"
          {...fadeUp}
        >
          <VideoCamera size={40} className="mx-auto mb-6 text-teal-600" weight="thin" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Remote Clinical Assessment
          </h2>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Consult with a specialist prosthodontist via encrypted video. 
            Perfect for initial diagnostic discussions and international travel planning.
          </p>
          <Link
            href="/teleconsultation"
            className="inline-flex items-center gap-2 rounded-md bg-white border border-teal-200 text-teal-700 px-10 py-4 text-sm font-semibold hover:bg-teal-50 transition-all active:scale-[0.98]"
          >
            <VideoCamera size={20} weight="bold" />
            Book Specialist Consultation
          </Link>
        </motion.div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-6 text-center bg-gray-900 text-white">
        <motion.div className="max-w-2xl mx-auto" {...fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Verify Your Treatment Plan
          </h2>
          <p className="text-gray-400 mb-12 text-lg font-light leading-relaxed">
            Upload your case for a preliminary specialist review. 
            Experience radical transparency before you fly.
          </p>
          <Link
            href="/visualizer"
            className="inline-flex items-center gap-2 rounded-md bg-teal-500 text-white px-10 py-4 text-sm font-bold hover:bg-teal-400 transition-all active:scale-[0.98]"
          >
            <MagicWand size={20} weight="bold" />
            Get Preliminary Report
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <span className="text-xl font-bold text-teal-600 tracking-tighter">GLOBAL SMILE</span>
            <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
              <Link href="/teleconsultation" className="hover:text-teal-600 transition-colors">Teleconsultation</Link>
              <Link href="/trust" className="hover:text-teal-600 transition-colors">Trust</Link>
              <Link href="/auth/signin" className="hover:text-teal-600 transition-colors">GP Portal</Link>
            </div>
          </div>
          <div className="text-center text-[10px] text-gray-300 uppercase tracking-[0.2em] leading-relaxed">
            &copy; {new Date().getFullYear()} Global Smile. Specialized Prosthodontics & Maxillofacial Rehabilitation. <br />
            An educational platform for clinical transparency. Not a substitute for professional medical diagnosis.
          </div>
        </div>
      </footer>
    </div>
  );
}

