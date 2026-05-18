"use client";

import { PlayCircle, VideoCamera, ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function VideoTestimonial() {
  const [showOverlay, setShowOverlay] = useState(true);

  const videoUrl = process.env.NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL;

  return (
    <section className="space-y-8 h-full flex flex-col">
      <div className="flex items-center gap-6">
         <h2 className="text-2xl font-bold text-gray-900 tracking-tight shrink-0 flex items-center gap-3">
            <VideoCamera size={28} className="text-brand-teal" weight="fill" />
            Outcome Audit
         </h2>
         <div className="h-px bg-gray-100 flex-1" />
      </div>

      <div className="relative flex-1 bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm group hover:shadow-2xl hover:shadow-brand-teal/5 transition-all flex flex-col">
        <div className="aspect-video relative bg-brand-ink overflow-hidden">
          {videoUrl ? (
            <>
              <video
                className="w-full h-full object-cover"
                controls
                poster="/clinic/reception.svg"
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center space-y-6">
              <div className="relative">
                <VideoCamera size={56} className="text-brand-teal/40" weight="thin" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <div className="h-3 w-3 bg-brand-gold rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                </motion.div>
              </div>
              <div className="space-y-2">
                <p className="text-white text-lg font-bold tracking-tight">
                  Clinical Case Study
                </p>
                <p className="text-white/40 text-xs font-light leading-relaxed max-w-xs mx-auto">
                  Patient shared journey and restorative results. Verification in progress.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-white/30 uppercase tracking-widest">
                <ShieldCheck size={12} weight="bold" /> Pending Clinical Review
              </div>
            </div>
          )}

          {showOverlay && videoUrl && (
            <button
              onClick={() => setShowOverlay(false)}
              className="absolute inset-0 flex items-center justify-center bg-brand-ink/40 group cursor-pointer backdrop-blur-[2px]"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-white group-hover:scale-110 transition-transform"
              >
                <PlayCircle size={80} weight="fill" className="text-white/90 drop-shadow-2xl" />
              </motion.div>
            </button>
          )}
        </div>

        <div className="p-8 bg-gray-50/50 flex-1">
          <div className="flex flex-col gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-[0.3em]">Case GS-V082</p>
              <p className="text-base font-bold text-gray-900 tracking-tight leading-tight">
                Full-Arch Rehabilitation Journey
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
               <p className="text-[10px] text-gray-400 font-light italic">Verified Patient Record</p>
               <span className="text-[10px] font-mono font-bold text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">02:34</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
