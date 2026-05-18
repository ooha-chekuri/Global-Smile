"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkle, List, X, CaretRight, Presentation } from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/calculator", label: "Calculator" },
  { href: "/teleconsultation", label: "Specialist Consult" },
  { href: "/trust", label: "Trust Audit" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="h-9 w-9 bg-brand-teal rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand-teal/20 group-hover:scale-105 transition-transform">
              <Sparkle size={20} weight="bold" />
            </div>
            <span className="font-bold text-gray-900 tracking-tight text-lg group-hover:text-brand-teal transition-colors">
              Global Smile <span className="text-brand-gold font-light italic">Centre</span>
            </span>
          </Link>

          <a 
            href="/pitch_deck.html" 
            target="_blank"
            className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[9px] font-bold text-brand-gold uppercase tracking-[0.2em] hover:bg-brand-gold hover:text-white transition-all group/pitch"
          >
            <Presentation size={14} weight="bold" className="group-hover/pitch:scale-110 transition-transform" />
            Pitch Deck
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-full ${
                  active
                    ? "text-brand-teal bg-brand-teal/5"
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className="h-4 w-px bg-gray-100 mx-4" />
          
          <Link
            href="/auth/signin"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-ink text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-brand-teal transition-all shadow-xl shadow-brand-ink/10 active:scale-95 group"
          >
            Journey Hub
            <CaretRight size={12} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </nav>

        <button
          className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-gray-100 text-gray-500 hover:bg-gray-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-6 py-8 space-y-4">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                      active
                        ? "text-brand-teal bg-teal-50"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/auth/signin"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-4 rounded-xl bg-brand-ink text-white text-center text-xs font-bold uppercase tracking-widest"
              >
                Launch Journey Hub
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
