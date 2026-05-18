"use client";

/* eslint-disable react/no-unescaped-entities */
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
  Lock,
  VideoCamera,
  ArrowUpRight,
  Presentation
} from "@phosphor-icons/react";

import MilestoneCards from "@/components/marketing/MilestoneCards";
import SavingsTeaser from "@/components/marketing/SavingsTeaser";
import SpecialtiesGrid from "@/components/marketing/SpecialtiesGrid";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";

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
    href: "/teleconsultation",
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

export default function Home() {
  return (
    <div className="flex-1 bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        
        <motion.div
          className="relative max-w-6xl mx-auto px-6 py-32 md:py-48 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.2, duration: 1.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-teal/5 border border-brand-teal/10 text-[10px] font-bold text-brand-teal mb-12 uppercase"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
            Specialist Trust Engine
          </motion.div>

          <h1 className="text-[clamp(3.5rem,10vw,7.5rem)] font-bold tracking-tighter text-gray-900 mb-8 leading-[0.9]">
            Clinical Mastery. <br />
            <span className="text-gray-900/40 font-light italic">Radical Transparency.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
            Architecting the future of prosthodontics for the global patient. <br />
            <span className="text-gray-900 font-medium">Precision restoration, built on a chain of digital trust.</span>
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/auth/signin"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-brand-ink text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-teal transition-all shadow-xl shadow-brand-ink/10 active:scale-[0.98] group min-h-[56px]"
            >
              Start Clinical Journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" weight="bold" />
            </Link>
            <a
              href="/pitch_deck.html"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-ink px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-ink hover:text-white transition-all shadow-xl shadow-brand-gold/20 active:scale-[0.98] group min-h-[56px]"
            >
              View Pitch Deck
              <Presentation size={18} weight="bold" />
            </a>
            <Link
              href="/trust"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-gray-600 px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-[0.98] group min-h-[56px]"
            >
              <span className="group-hover:underline decoration-brand-teal/30 underline-offset-4 decoration-2">Verify Credentials</span>
            </Link>
          </motion.div>

          <div className="mt-32 pt-16 border-t border-gray-100 flex flex-wrap justify-center gap-x-24 gap-y-12">
             {stats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="text-left space-y-2">
                  <p className="text-4xl font-bold text-gray-900 tracking-tight font-mono">{stat.value}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="border-b border-gray-100 bg-gray-50/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12 text-gray-400 hover:text-gray-900 transition-colors duration-700">
           <div className="font-bold text-[10px] tracking-[0.3em] flex items-center gap-2"><ShieldCheck size={16} /> NABH ACCREDITED</div>
           <div className="font-bold text-[10px] tracking-[0.3em] flex items-center gap-2"><ShieldCheck size={16} /> ISO 9001:2015</div>
           <div className="font-bold text-[10px] tracking-[0.3em] flex items-center gap-2"><ShieldCheck size={16} /> DCI REGISTERED</div>
           <div className="font-bold text-[10px] tracking-[0.3em] flex items-center gap-2"><ShieldCheck size={16} /> 500+ INTL PATIENTS</div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <MilestoneCards />

      {/* ── Capabilities ── */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4 max-w-2xl">
            <h2 className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.4em]">Core Infrastructure</h2>
            <p className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tighter leading-none">Built for Total Clinical Trust.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-2xl shadow-brand-teal/5">
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className="group relative flex flex-col bg-white p-10 hover:bg-gray-50/50 transition-colors h-full"
                >
                  <div className="flex-1 space-y-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-900 group-hover:bg-brand-teal group-hover:text-white transition-colors duration-500">
                      <Icon size={24} weight="bold" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed font-light">
                        {mod.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-10 mt-auto flex items-center justify-between border-t border-gray-100/0 group-hover:border-gray-100 transition-colors">
                     <span className="text-[9px] font-bold text-brand-teal uppercase tracking-[0.2em] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {mod.action}
                     </span>
                     <ArrowUpRight size={20} className="text-gray-300 group-hover:text-brand-teal transition-colors" weight="bold" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Specialties ── */}
      <SpecialtiesGrid />

      {/* ── Journey Stages ── */}
      <section className="bg-gray-50/50 py-32 px-6 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">The Flywheel</h2>
              <p className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tighter">Your Treatment Roadmap</p>
            </div>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-teal uppercase tracking-widest hover:text-brand-ink transition-colors"
            >
              Begin Stage 01 <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <div key={step.stage} className="relative space-y-6 group">
                <div className="flex items-center gap-4">
                   <div className={`text-3xl font-bold transition-colors duration-500 font-mono leading-none ${i === 0 ? "text-brand-teal" : "text-gray-200 group-hover:text-brand-teal"}`}>
                     {step.stage}
                   </div>
                   {i < steps.length - 1 && (
                     <div className="hidden md:block h-px bg-gray-200 flex-1 group-hover:bg-brand-teal/30 transition-colors" />
                   )}
                </div>
                <div className={`space-y-3 pl-2 border-l transition-colors duration-500 ${i === 0 ? "border-brand-teal" : "border-gray-200 group-hover:border-brand-teal"}`}>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Savings ── */}
      <SavingsTeaser />

      {/* ── Testimonials ── */}
      <VideoTeaser />

      {/* ── Specialist CTA ── */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto bg-brand-ink rounded-[3rem] overflow-hidden relative shadow-2xl shadow-brand-ink/10">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-teal/10 rounded-full -mr-80 -mt-80 blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-brand-gold/5 rounded-full -ml-60 -mb-60 blur-[120px]" />
          
          <div className="relative p-16 md:p-24 text-center space-y-12">
             <div className="inline-block p-5 rounded-2xl bg-white/5 border border-white/10 text-white mb-2 backdrop-blur-sm">
               <VideoCamera size={40} weight="thin" />
             </div>
             <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">
                  High-Complexity <br /> Rehabilitation?
                </h2>
                <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Discuss your case with Dr. Prakash in a secure, one-on-one video diagnostic call. 
                  Get clinical clarity before you book your flight.
                </p>
             </div>
             <Link
                href="/teleconsultation"
                className="inline-flex items-center gap-3 rounded-xl bg-brand-teal text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-ink transition-all shadow-xl shadow-brand-teal/20 active:scale-[0.98]"
              >
                Schedule Specialist Call
                <ArrowRight size={16} weight="bold" />
              </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-20">
            <div className="md:col-span-5 space-y-6 pr-8">
               <span className="text-xl font-bold text-gray-900 tracking-tighter flex items-center gap-2">
                 <div className="h-6 w-6 bg-brand-teal rounded-md flex items-center justify-center text-white"><Tooth size={14} weight="bold" /></div>
                 GLOBAL SMILE
               </span>
               <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
                The world's first trust-chain infrastructure for specialist prosthodontics and dental tourism.
               </p>
            </div>
            <div className="md:col-span-2 space-y-6">
              <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Navigation</p>
              <nav className="flex flex-col gap-4 text-xs font-medium text-gray-500">
                <Link href="/auth/signin" className="hover:text-brand-teal transition-colors">Journey Hub</Link>
                <Link href="/calculator" className="hover:text-brand-teal transition-colors">Value Calculator</Link>
                <Link href="/trust" className="hover:text-brand-teal transition-colors">Trust Audit</Link>
              </nav>
            </div>
            <div className="md:col-span-2 space-y-6">
               <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Compliance</p>
               <nav className="flex flex-col gap-4 text-xs font-medium text-gray-500">
                <Link href="/privacy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-brand-teal transition-colors">DCI Registration</Link>
                <Link href="#" className="hover:text-brand-teal transition-colors">NABH Status</Link>
              </nav>
            </div>
            <div className="md:col-span-3 space-y-6">
               <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">Contact</p>
               <nav className="flex flex-col gap-4 text-xs font-medium text-gray-500">
                <span className="text-gray-900">Vijayawada, India</span>
                <a href="mailto:care@globalsmile.in" className="hover:text-brand-teal transition-colors">care@globalsmile.in</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">
               &copy; {new Date().getFullYear()} Global Smile Centre. Specialist Prosthodontics.
             </p>
             <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">
               Clinical transparency engine for educational purposes.
             </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
