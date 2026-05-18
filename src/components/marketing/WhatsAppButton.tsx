"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const whatsappNumber = "911234567890"; // Mock number
  const message = "Hello, I am interested in a specialist consultation at Global Smile Centre.";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] h-16 w-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group"
      title="Chat on WhatsApp"
    >
      <WhatsappLogo size={36} weight="fill" />
      <span className="absolute right-full mr-4 bg-brand-ink text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
        Clinical Concierge
      </span>
    </motion.a>
  );
}
