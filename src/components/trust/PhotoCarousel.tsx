"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CaretLeft, CaretRight, Camera } from "@phosphor-icons/react";

const CLINIC_PHOTOS = [
  { src: "/clinic/reception.svg", alt: "Clinic Reception" },
  { src: "/clinic/operatory.svg", alt: "Treatment Operatory" },
  { src: "/clinic/sterilization.svg", alt: "Sterilization Room" },
  { src: "/clinic/waiting.svg", alt: "Patient Waiting Area" },
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % CLINIC_PHOTOS.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + CLINIC_PHOTOS.length) % CLINIC_PHOTOS.length);

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
         <h2 className="text-2xl font-bold text-gray-900 tracking-tight shrink-0 flex items-center gap-3">
            <Camera size={28} className="text-brand-teal" weight="fill" />
            Clinic Audit
         </h2>
         <div className="h-px bg-gray-100 flex-1" />
      </div>

      <div className="relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm group hover:shadow-2xl hover:shadow-brand-teal/5 transition-all">
        <div className="aspect-video relative bg-gray-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={CLINIC_PHOTOS[current].src}
                alt={CLINIC_PHOTOS[current].alt}
                fill
                className="object-contain p-12 grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
                   Infrastructure Point {current + 1}
                </p>
                <p className="text-lg font-bold text-gray-900 tracking-tight italic">
                  {CLINIC_PHOTOS[current].alt}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-xl p-3 text-gray-400 hover:text-brand-teal hover:border-brand-teal hover:shadow-xl transition-all z-10"
            aria-label="Previous photo"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-xl p-3 text-gray-400 hover:text-brand-teal hover:border-brand-teal hover:shadow-xl transition-all z-10"
            aria-label="Next photo"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>

        <div className="flex justify-center gap-3 p-6 bg-gray-50/30 border-t border-gray-50">
          {CLINIC_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "bg-brand-teal w-8" : "bg-gray-200 w-4 hover:bg-gray-300"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
