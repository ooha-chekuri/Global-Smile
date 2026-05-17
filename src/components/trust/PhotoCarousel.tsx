"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CLINIC_PHOTOS = [
  { src: "/clinic/reception.jpg", alt: "Clinic Reception" },
  { src: "/clinic/operatory.jpg", alt: "Treatment Operatory" },
  { src: "/clinic/sterilization.jpg", alt: "Sterilization Room" },
  { src: "/clinic/waiting.jpg", alt: "Patient Waiting Area" },
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % CLINIC_PHOTOS.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + CLINIC_PHOTOS.length) % CLINIC_PHOTOS.length);

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Our Clinic
      </h2>
      <div className="relative bg-white border rounded-xl overflow-hidden">
        <div className="aspect-video relative bg-gray-100 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center text-gray-400"
            >
              <div className="text-center">
                <svg className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">{CLINIC_PHOTOS[current].alt}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 p-4">
          {CLINIC_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === current ? "bg-teal-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
