"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooth, List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/visualizer", label: "Visualizer" },
  { href: "/calculator", label: "Calculator" },
  { href: "/teleconsultation", label: "Consult" },
  { href: "/trust", label: "Trust" },
  { href: "/auth/signin", label: "Sign In" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-teal-700 hover:text-teal-600 transition-colors"
        >
          <Tooth size={22} weight="bold" />
          <span>Global Smile</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-teal-700"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {link.label}
                {active && (
                  <motion.div
                    layoutId="header-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-teal-600"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          className="md:hidden p-2 text-gray-500 hover:text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
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
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-teal-700 bg-teal-50"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
