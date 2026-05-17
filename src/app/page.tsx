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
    <div className="flex-1">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
        <motion.div
          className="relative max-w-5xl mx-auto px-4 py-28 md:py-36 text-center"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-teal-100 mb-6"
          >
            <MagicWand size={16} weight="fill" />
            AI-Powered Dental Intelligence
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
            World-Class Prosthodontics in{" "}
            <span className="text-teal-200">Vijayawada</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transparency. Trust. Technology. See why patients from around the
            world choose Global Smile for complex restorative dental care.
          </p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="/visualizer"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-teal-700 px-7 py-3.5 font-semibold hover:bg-teal-50 hover:shadow-lg hover:shadow-teal-500/20 transition-all"
            >
              <MagicWand size={20} weight="bold" />
              See Your Smile Potential
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-400/50 text-teal-100 px-7 py-3.5 font-semibold hover:bg-teal-600/40 hover:border-teal-300 transition-all"
            >
              <Calculator size={20} weight="bold" />
              Calculate Your Savings
            </Link>
          </motion.div>
        </motion.div>

        <div className="h-16 bg-gradient-to-t from-white to-transparent relative" />
      </section>

      {/* ── Module Cards ── */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10 pb-16">
        <div className="grid md:grid-cols-2 gap-5">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  href={mod.href}
                  className={`group relative block rounded-2xl border border-gray-200 bg-white p-7 hover:shadow-xl ${mod.gradient} transition-all hover:-translate-y-1`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.04] bg-gradient-to-br ${mod.color} transition-opacity`}
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} text-white`}
                    >
                      <Icon size={22} weight="bold" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {mod.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="shrink-0 mt-1 text-gray-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all"
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
      <section className="bg-gray-50 border-y py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12"
            {...fadeUp}
          >
            Why Global Smile?
          </motion.h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow"
                >
                  <Icon
                    size={28}
                    className="mx-auto mb-2 text-teal-600"
                    weight="bold"
                  />
                  <p className="text-2xl font-bold text-teal-700">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 text-center">
        <motion.div className="max-w-2xl mx-auto" {...fadeUp}>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Ready to Transform Your Smile?
          </h2>
          <p className="text-gray-500 mb-8">
            Start with a free AI-powered treatment preview — no commitment, no
            pressure.
          </p>
          <Link
            href="/visualizer"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 text-white px-8 py-3.5 font-semibold hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/25 transition-all"
          >
            <MagicWand size={20} weight="bold" />
            Start Your Journey
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t bg-gray-50 py-10 px-4 text-center text-sm text-gray-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-semibold text-teal-600">Global Smile</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/trust" className="hover:text-gray-600 transition-colors">
              Trust Dashboard
            </Link>
            <Link href="/auth/signin" className="hover:text-gray-600 transition-colors">
              GP Portal
            </Link>
          </div>
          <span>&copy; {new Date().getFullYear()} Global Smile — Educational platform, not medical advice.</span>
        </div>
      </footer>
    </div>
  );
}
