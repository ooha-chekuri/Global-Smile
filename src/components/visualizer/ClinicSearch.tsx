"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Phone, Globe, ArrowRight, Hospital, User } from "lucide-react";
import { motion } from "framer-motion";

interface Clinic {
  id: string;
  name: string;
  doctor: string;
  rating: number;
  reviews: number;
  address: string;
  specialty: string;
  source: "google" | "justdial" | "internal";
}

interface ClinicSearchProps {
  city: string;
  onSelect: (clinic: Clinic) => void;
}

export default function ClinicSearch({ city, onSelect }: ClinicSearchProps) {
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      // Simulate real-time fetch from multiple sources
      setTimeout(() => {
        const mockResults: Clinic[] = [
          {
            id: "gs-hub",
            name: "Global Smile Specialist Hub",
            doctor: "Dr. Prakash R.",
            rating: 4.9,
            reviews: 1240,
            address: "MGM Road, Vijayawada",
            specialty: "Maxillofacial Prosthodontics",
            source: "internal"
          },
          {
            id: "g1",
            name: "Premium Dental Care",
            doctor: "Dr. Anjali Verma",
            rating: 4.8,
            reviews: 850,
            address: "Besant Road, Vijayawada",
            specialty: "Cosmetic Dentistry",
            source: "google"
          },
          {
            id: "j1",
            name: "Sree Dental Clinic",
            doctor: "Dr. Kishore Kumar",
            rating: 4.5,
            reviews: 420,
            address: "Benz Circle, Vijayawada",
            specialty: "Implantology",
            source: "justdial"
          },
          {
            id: "g2",
            name: "Elite Smile Studio",
            doctor: "Dr. Rahul Sharma",
            rating: 4.7,
            reviews: 610,
            address: "Governorpet, Vijayawada",
            specialty: "Full Mouth Rehab",
            source: "google"
          }
        ];
        setClinics(mockResults);
        setLoading(false);
      }, 1500);
    };

    fetchClinics();
  }, [city]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="text-center space-y-2">
        <h3 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em]">Stage 3: Recommendation</h3>
        <p className="text-3xl font-bold text-gray-900 tracking-tight">Clinical Partners in {city}</p>
        <p className="text-sm text-gray-400 font-light">Sourced from top Google Search & Justdial verified results.</p>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white/50 border border-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {clinics.map((clinic) => (
            <motion.div
              key={clinic.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => onSelect(clinic)}
              className={`group cursor-pointer bg-white border rounded-xl p-6 transition-all ${
                clinic.source === 'internal' 
                ? 'border-brand-gold bg-brand-cream/20 shadow-lg shadow-brand-gold/5' 
                : 'border-gray-100 hover:border-brand-teal'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {clinic.source === 'internal' ? (
                      <span className="bg-brand-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">Elite Hub</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">{clinic.source} verified</span>
                    )}
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-brand-teal transition-colors">{clinic.name}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 items-center text-sm text-gray-500 font-light">
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <User size={16} className="text-brand-teal" /> {clinic.doctor}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-brand-gold" /> {clinic.address}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star size={16} className="text-brand-gold fill-brand-gold" />
                      <span className="font-bold text-gray-900">{clinic.rating}</span>
                      <span className="text-xs">({clinic.reviews} reviews)</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center md:flex-col md:justify-center gap-3">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest md:hidden">Select Clinic</p>
                   <div className="h-10 w-10 rounded-full bg-brand-teal/5 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
