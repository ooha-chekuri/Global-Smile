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
    title: "AI Treatment Scan",
    description:
      "Upload photos to receive a preliminary specialist report on restorative possibilities and complexity. No diagnosis, total clarity.",
    href: "/auth/signin",
    icon: MagicWand,
    action: "Initiate Scan",
  },
  {
    title: "Partner Verification",
    description:
      "Verify our specialist credentials, NABH/ISO protocols, and live patient milestones with total clinical transparency.",
    href: "/trust",
    icon: ShieldCheck,
    action: "Verify Standards",
  },
  {
    title: "Savings Analysis",
    description:
      "Compare costs in Vijayawada vs. your home city. See net savings including flights and 5-star recovery accommodation.",
    href: "/calculator",
    icon: Calculator,
    action: "Run Calculator",
  },
  {
    title: "Specialist Consultation",
    description:
      "Book a secure diagnostic video call with our clinical leads. Finalize your plan from the comfort of your home.",
    href: "/auth/signin",
    icon: VideoCamera,
    action: "Book Call",
  },
];

const steps = [
  {
    stage: "01",
    title: "Clinical Scan",
    description: "Secure record upload for specialist AI assessment of restorative possibilities.",
  },
  {
    stage: "02",
    title: "Regional Plan",
    description: "Receive recommendations for verified clinical partners in your home city.",
  },
  {
    stage: "03",
    title: "Trust Audit",
    description: "Verify our clinical protocols, credentials, and live sterilization logs.",
  },
  {
    stage: "04",
    title: "Value Analysis",
    description: "Calculate your net savings compared to London, NYC, or Sydney quotes.",
  },
  {
    stage: "05",
    title: "Specialist Action",
    description: "Book your diagnostic call and finalize your treatment roadmap.",
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
    <div className="flex-1 bg-brand-ivory">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-brand-cream/20 border-b border-brand-gold/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.05)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-teal/0 via-brand-gold/40 to-brand-teal/0" />
        
        <motion.div
          className="relative max-w-5xl mx-auto px-6 py-28 md:py-48 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.2, duration: 1.5 }}
            className="inline-flex items-center gap-2 border border-brand-gold/20 bg-white/50 rounded-sm px-6 py-1.5 text-[10px] font-bold text-brand-gold mb-12 uppercase tracking-[0.4em]"
          >
            <div className="h-1 w-1 rounded-full bg-brand-gold animate-pulse" />
            Specialist Trust Engine
          </motion.div>

          <h1 className="text-[clamp(3rem,10vw,6.5rem)] font-bold tracking-tighter text-brand-ink mb-10 leading-[0.88]">
            Clinical Mastery. <br />
            <span className="text-brand-gold italic">Radical Transparency.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto mb-20 leading-relaxed font-light">
            Architecting the future of prosthodontics for the global patient. <br />
            <span className="text-brand-ink font-medium">Precision restoration, built on a chain of digital trust.</span>
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/auth/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 rounded-md bg-brand-teal text-brand-cream px-12 py-5 text-sm font-bold hover:bg-brand-ink transition-all shadow-2xl shadow-brand-teal/20 active:scale-[0.98] group"
            >
              Start Clinical Journey
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" weight="bold" />
            </Link>
            <Link
              href="/trust"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-brand-gold/30 bg-white text-brand-muted px-12 py-5 text-sm font-bold hover:bg-brand-cream hover:text-brand-ink transition-all active:scale-[0.98]"
            >
              Verify Credentials
            </Link>
          </motion.div>

          <div className="mt-32 pt-16 border-t border-brand-gold/10 flex flex-wrap justify-center gap-x-20 gap-y-8">
             {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-left space-y-1">
                  <p className="text-3xl font-bold text-brand-ink tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="border-b border-brand-gold/10 bg-white/50 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
           <div className="font-bold text-[10px] tracking-[0.3em]">NABH ACCREDITED</div>
           <div className="font-bold text-[10px] tracking-[0.3em]">ISO 9001:2015</div>
           <div className="font-bold text-[10px] tracking-[0.3em]">DCI REGISTERED</div>
           <div className="font-bold text-[10px] tracking-[0.3em]">500+ INTL PATIENTS</div>
        </div>
      </section>

      {/* ── Journey Stages ── */}
      <section className="bg-white py-32 px-6 border-b border-gray-50">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.3em]">The Flywheel</h2>
            <p className="text-4xl font-bold text-gray-900 tracking-tight">Your Treatment Roadmap</p>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {steps.map((step) => (
              <div key={step.stage} className="relative space-y-6 group">
                <div className="text-5xl font-bold text-gray-100 group-hover:text-teal-600/10 transition-colors duration-500 font-mono leading-none">{step.stage}</div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.4em]">Core Infrastructure</h2>
          <p className="text-5xl font-bold text-brand-ink tracking-tight">Built for Total Trust</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
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
                  className="group relative block rounded-2xl border border-brand-gold/10 bg-brand-cream/10 p-12 hover:border-brand-gold/30 hover:bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-brand-gold/5"
                >
                  <div className="flex flex-col gap-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-teal text-brand-cream group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-brand-teal/20">
                      <Icon size={32} weight="light" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-brand-ink tracking-tight">
                        {mod.title}
                      </h3>
                      <p className="text-brand-muted leading-relaxed font-light">
                        {mod.description}
                      </p>
                      <div className="pt-4 inline-flex items-center gap-2 text-xs font-bold text-brand-gold uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                        {mod.action} <ArrowRight size={14} weight="bold" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Specialist CTA ── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="relative p-12 md:p-20 text-center space-y-10">
             <VideoCamera size={48} className="mx-auto text-teal-500" weight="thin" />
             <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                  High-Complexity <br /> Rehabilitation?
                </h2>
                <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Discuss your case with Dr. Prakash in a secure, one-on-one video diagnostic call. 
                  Get clinical clarity before you book your flight.
                </p>
             </div>
             <Link
                href="/teleconsultation"
                className="inline-flex items-center gap-3 rounded-md bg-white text-gray-900 px-12 py-5 text-sm font-bold hover:bg-teal-50 transition-all active:scale-[0.98]"
              >
                Schedule Specialist Call
                <ArrowRight size={18} weight="bold" />
              </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
               <span className="text-2xl font-bold text-teal-600 tracking-tighter">GLOBAL SMILE</span>
               <p className="text-sm text-gray-400 font-light leading-relaxed">
                The world's first trust-chain infrastructure for specialist prosthodontics and dental tourism.
               </p>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Navigation</p>
              <nav className="flex flex-col gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Link href="/auth/signin" className="hover:text-teal-600 transition-colors">Journey Hub</Link>
                <Link href="/calculator" className="hover:text-teal-600 transition-colors">Calculator</Link>
                <Link href="/trust" className="hover:text-teal-600 transition-colors">Trust Dashboard</Link>
              </nav>
            </div>
            <div className="space-y-6">
               <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Compliance</p>
               <nav className="flex flex-col gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-teal-600 transition-colors">DCI Registration</Link>
                <Link href="#" className="hover:text-teal-600 transition-colors">NABH Status</Link>
              </nav>
            </div>
            <div className="space-y-6">
               <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Contact</p>
               <nav className="flex flex-col gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span className="text-gray-900">Vijayawada, India</span>
                <a href="mailto:care@globalsmile.in" className="hover:text-teal-600 transition-colors">care@globalsmile.in</a>
              </nav>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-50 text-center text-[9px] text-gray-300 uppercase tracking-[0.3em] leading-relaxed max-w-4xl mx-auto">
            &copy; {new Date().getFullYear()} Global Smile Centre. Specialist Prosthodontics & Maxillofacial Rehabilitation. <br />
            Clinical transparency engine for educational purposes. Not medical advice.
          </div>
        </div>
      </footer>
    </div>
  );
}
