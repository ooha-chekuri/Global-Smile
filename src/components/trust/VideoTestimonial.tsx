"use client";

import { PlayCircle, VideoCamera } from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function VideoTestimonial() {
  const [showOverlay, setShowOverlay] = useState(true);

  const videoUrl = process.env.NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL;

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Video Testimonials
      </h2>
      <p className="text-gray-500 mb-6">
        Hear from patients who have transformed their smiles.
      </p>

      <div className="relative bg-white border rounded-xl overflow-hidden">
        <div className="aspect-video relative bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <div className="relative mb-4">
                <VideoCamera size={64} className="text-teal-300/60" weight="thin" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="h-4 w-4 bg-green-400 rounded-full" />
                </motion.div>
              </div>
              <p className="text-teal-100 text-lg font-medium mb-1">
                Patient Testimonial
              </p>
              <p className="text-teal-300/70 text-sm text-center max-w-md">
                A short video featuring a patient sharing their dental journey
                and experience at Global Smile Prosthodontics.
              </p>
              <p className="mt-4 text-xs text-teal-400/50 border border-teal-500/20 rounded-full px-4 py-1.5">
                Video coming soon &mdash; upload to Vercel Blob and set
                NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL
              </p>
            </div>
          )}

          {showOverlay && videoUrl && (
            <button
              onClick={() => setShowOverlay(false)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 group cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-white group-hover:scale-110 transition-transform"
              >
                <PlayCircle size={72} weight="fill" className="text-white/90 drop-shadow-lg" />
              </motion.div>
            </button>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Full-Arch Rehabilitation Journey
              </p>
              <p className="text-xs text-gray-400">Patient testimonial &mdash; Global Smile Prosthodontics</p>
            </div>
            <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">2:34</span>
          </div>
        </div>
      </div>
    </section>
  );
}
