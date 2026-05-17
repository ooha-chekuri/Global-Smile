"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Our Clinic
      </h2>
      <div className="relative bg-white border rounded-xl overflow-hidden">
        <div className="aspect-video relative bg-teal-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={CLINIC_PHOTOS[current].src}
                alt={CLINIC_PHOTOS[current].alt}
                fill
                className="object-contain p-4"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-4">
                <p className="text-white text-sm font-medium">
                  {CLINIC_PHOTOS[current].alt}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-md"
            aria-label="Previous photo"
          >
            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-md"
            aria-label="Next photo"
          >
            <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 p-4">
          {CLINIC_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === current ? "bg-teal-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
