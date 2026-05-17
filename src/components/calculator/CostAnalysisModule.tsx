"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Hotel, Utensils, Car, Users, Download, ArrowRight } from "lucide-react";
import {
  TREATMENT_COSTS,
  FLIGHT_ESTIMATES,
  HOTEL_ESTIMATES,
  DAILY_MEALS_ESTIMATE,
  DAILY_TRANSPORT_ESTIMATE,
  getTreatmentLabel,
  getCityLabel,
} from "@/lib/cost-data";

const INR_TO_USD = 0.012;
const INRAmount = (amount: number) =>
  "₹" + amount.toLocaleString("en-IN");

const USDAmount = (amount: number) =>
  "$" + (amount * INR_TO_USD).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function formatBoth(amount: number) {
  return `${INRAmount(amount)} (${USDAmount(amount)})`;
}

type TreatmentKey = keyof typeof TREATMENT_COSTS;
type CityKey = keyof typeof FLIGHT_ESTIMATES;
type TravelClass = "economy" | "business";
type HotelClass = keyof typeof HOTEL_ESTIMATES;

const TREATMENT_OPTIONS = Object.keys(TREATMENT_COSTS) as TreatmentKey[];
const CITY_OPTIONS = Object.keys(FLIGHT_ESTIMATES) as CityKey[];
const HOTEL_OPTIONS: { key: HotelClass; label: string }[] = [
  { key: "threestar", label: "3-Star" },
  { key: "fourstar", label: "4-Star" },
  { key: "fivestar", label: "5-Star" },
];
const TRAVEL_OPTIONS: { key: TravelClass; label: string }[] = [
  { key: "economy", label: "Economy" },
  { key: "business", label: "Business" },
];

const itinerary = [
  { time: "08:00", activity: "Airport pickup by Global Smile concierge", detail: "Luxury SUV transfer to your hotel" },
  { time: "10:30", activity: "Priority Check-in & Rest", detail: "Pre-arranged accommodation for recovery comfort" },
  { time: "13:00", activity: "Executive Lunch", detail: "Curated nutritious meal near the clinic" },
  { time: "15:00", activity: "Initial Specialist Consultation", detail: "Full diagnostic workup: CBCT, panoramic X-rays, clinical records" },
  { time: "18:00", activity: "Treatment Plan Presentation", detail: "One-on-one session with Dr. Prakash to finalize timeline & cost" },
  { time: "20:00", activity: "WhatsApp Concierge Activation", detail: "Direct line for 24/7 care coordination during your stay" },
];

export default function CostAnalysisModule({
  treatmentType: initialTreatment,
  homeCity: initialCity,
}: {
  treatmentType: string;
  homeCity: string;
}) {
  const [treatmentType, setTreatmentType] = useState<TreatmentKey>(
    TREATMENT_OPTIONS.includes(initialTreatment as TreatmentKey) ? (initialTreatment as TreatmentKey) : "full-arch"
  );
  const [homeCity, setHomeCity] = useState<CityKey>(
    CITY_OPTIONS.includes(initialCity as CityKey) ? (initialCity as CityKey) : "newYork"
  );
  const [travelClass, setTravelClass] = useState<TravelClass>("economy");
  const [hotelClass, setHotelClass] = useState<HotelClass>("fourstar");
  const [stayDays, setStayDays] = useState(7);
  const [companion, setCompanion] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

  const tc = TREATMENT_COSTS[treatmentType];
  const fe = FLIGHT_ESTIMATES[homeCity];
  const he = HOTEL_ESTIMATES[hotelClass];

  const homeMin = tc[homeCity].min;
  const homeMax = tc[homeCity].max;
  const vijayawadaMin = tc.vijayawada.min;
  const vijayawadaMax = tc.vijayawada.max;

  const multiplier = companion ? 2 : 1;
  const flightCost = fe[travelClass] * multiplier;
  const hotelCost = he * stayDays * multiplier;
  const mealsCost = DAILY_MEALS_ESTIMATE * stayDays * multiplier;
  const transportCost = DAILY_TRANSPORT_ESTIMATE * stayDays * multiplier;

  const totalGSMin = vijayawadaMin + flightCost + hotelCost + mealsCost + transportCost;
  const totalGSMax = vijayawadaMax + flightCost + hotelCost + mealsCost + transportCost;

  const savingsMin = homeMin - totalGSMax;
  const savingsMax = homeMax - totalGSMin;
  const savingsPctMin = Math.round((savingsMin / homeMax) * 100);
  const savingsPctMax = Math.round((savingsMax / homeMin) * 100);

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h3 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em]">Stage 3: Cost Analysis</h3>
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Dental Tourism Calculator</h2>
        <p className="text-gray-400 font-light max-w-2xl mx-auto">
          Compute the true cost of world-class prosthodontic care in Vijayawada vs. {getCityLabel(homeCity)} — including flights and stay.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-6 h-fit">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-l-4 border-brand-gold pl-4">
            Your Parameters
          </h4>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Treatment Type</label>
            <select
              value={treatmentType}
              onChange={(e) => setTreatmentType(e.target.value as TreatmentKey)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
            >
              {TREATMENT_OPTIONS.map((k) => (
                <option key={k} value={k}>{getTreatmentLabel(k)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Home City</label>
            <select
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value as CityKey)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
            >
              {CITY_OPTIONS.map((k) => (
                <option key={k} value={k}>{getCityLabel(k)}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Travel Class</label>
            <div className="flex gap-2">
              {TRAVEL_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setTravelClass(opt.key)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    travelClass === opt.key
                      ? "bg-brand-teal text-white shadow-md shadow-brand-teal/20"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hotel Class</label>
            <div className="flex gap-2">
              {HOTEL_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setHotelClass(opt.key)}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    hotelClass === opt.key
                      ? "bg-brand-gold text-brand-ink shadow-md shadow-brand-gold/20"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stay Duration (days)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={stayDays}
              onChange={(e) => setStayDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold transition-all"
            />
          </div>

          <label className="flex items-center gap-4 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={companion}
                onChange={(e) => setCompanion(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-7 rounded-full transition-all ${
                companion ? "bg-brand-teal" : "bg-gray-200"
              }`}>
                <div className={`h-5 w-5 bg-white rounded-full shadow-md absolute top-1 transition-all ${
                  companion ? "left-6" : "left-1"
                }`} />
              </div>
            </div>
            <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors flex items-center gap-2">
              <Users size={16} className="text-brand-gold" /> Traveling with a companion
            </span>
          </label>

          <button
            onClick={() => setCalculated(true)}
            className="w-full bg-brand-teal text-white py-4 rounded-xl text-sm font-bold hover:bg-brand-ink transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2"
          >
            Calculate Your Savings <ArrowRight size={18} />
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          {!calculated ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-sm flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-3 max-w-sm">
                <CalculatorIcon />
                <p className="text-gray-400 font-light">
                  Enter your treatment and travel details to generate a comparative cost report.
                </p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Comparison Table */}
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="text-left px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Line Item</th>
                      <th className="text-right px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{getCityLabel(homeCity)}</th>
                      <th className="text-right px-6 py-4 text-[10px] font-bold text-brand-teal uppercase tracking-widest">Vijayawada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 capitalize">{getTreatmentLabel(treatmentType)}</td>
                      <td className="px-6 py-5 text-right text-sm text-gray-500">{formatBoth(homeMin)} – {formatBoth(homeMax)}</td>
                      <td className="px-6 py-5 text-right text-sm text-brand-teal font-bold">{formatBoth(vijayawadaMin)} – {formatBoth(vijayawadaMax)}</td>
                    </tr>
                    <tr className="bg-brand-cream/10">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 flex items-center gap-2"><Plane size={14} className="text-brand-gold" /> Return Flight ({travelClass === "business" ? "Business" : "Economy"})</td>
                      <td className="px-6 py-5 text-right text-sm text-gray-400">—</td>
                      <td className="px-6 py-5 text-right text-sm text-brand-teal font-bold">{formatBoth(flightCost)}</td>
                    </tr>
                    <tr className="bg-brand-cream/10">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 flex items-center gap-2"><Hotel size={14} className="text-brand-gold" /> Hotel Stay ({stayDays} nights)</td>
                      <td className="px-6 py-5 text-right text-sm text-gray-400">—</td>
                      <td className="px-6 py-5 text-right text-sm text-brand-teal font-bold">{formatBoth(hotelCost)}</td>
                    </tr>
                    <tr className="bg-brand-cream/10">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 flex items-center gap-2"><Utensils size={14} className="text-brand-gold" /> Meals</td>
                      <td className="px-6 py-5 text-right text-sm text-gray-400">—</td>
                      <td className="px-6 py-5 text-right text-sm text-brand-teal font-bold">{formatBoth(mealsCost)}</td>
                    </tr>
                    <tr className="bg-brand-cream/10">
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 flex items-center gap-2"><Car size={14} className="text-brand-gold" /> Local Transport</td>
                      <td className="px-6 py-5 text-right text-sm text-gray-400">—</td>
                      <td className="px-6 py-5 text-right text-sm text-brand-teal font-bold">{formatBoth(transportCost)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-brand-ink text-white">
                      <td className="px-6 py-6 text-base font-bold">Total Investment</td>
                      <td className="px-6 py-6 text-right text-base font-light opacity-50">{formatBoth(homeMin)} – {formatBoth(homeMax)}</td>
                      <td className="px-6 py-6 text-right text-2xl font-bold text-brand-gold">{formatBoth(totalGSMin)} – {formatBoth(totalGSMax)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Savings + Itinerary */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-brand-teal rounded-xl p-6 text-white space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-teal-200 uppercase tracking-[0.2em]">Net Savings</h4>
                    <p className="text-2xl font-bold tracking-tight">
                      {INRAmount(savingsMin)} – {INRAmount(savingsMax)}
                    </p>
                    <p className="text-xs text-teal-50/70">
                      {USDAmount(savingsMin)} – {USDAmount(savingsMax)}
                    </p>
                  </div>
                  <p className="text-sm text-teal-50/70 font-light leading-relaxed">
                    You save <span className="font-bold text-white">{savingsPctMin}–{savingsPctMax}%</span> compared to treatment in {getCityLabel(homeCity)}.
                  </p>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:gap-4 transition-all text-teal-200">
                    Download PDF Analysis <Download size={14} />
                  </button>
                </div>

                <div className="bg-white border border-brand-gold/20 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">12-Hour Quick-Start</h4>
                    <button
                      onClick={() => setShowItinerary(!showItinerary)}
                      className="text-[10px] font-bold text-brand-gold uppercase tracking-widest hover:underline"
                    >
                      {showItinerary ? "Hide Details" : "View Full Itinerary"}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {itinerary.slice(0, showItinerary ? 6 : 3).map((item, i) => (
                      <div key={i} className="flex gap-3 group">
                        <span className="text-[10px] font-mono text-brand-gold font-bold w-10 shrink-0 mt-0.5">{item.time}</span>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-brand-teal transition-colors">{item.activity}</p>
                          <p className="text-xs text-gray-400 font-light">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalculatorIcon() {
  return (
    <svg className="w-16 h-16 mx-auto text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}
