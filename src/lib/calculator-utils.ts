import {
  TREATMENT_COSTS,
  FLIGHT_ESTIMATES,
  HOTEL_ESTIMATES,
  DAILY_MEALS_ESTIMATE,
  DAILY_TRANSPORT_ESTIMATE,
} from "./cost-data";
import type {
  TreatmentType,
  CalculatorInput,
  CalculatorResult,
} from "@/types";

export function calculateSavings(input: CalculatorInput): CalculatorResult {
  const treatmentCosts = TREATMENT_COSTS[input.treatmentType];
  const homeCost = treatmentCosts[input.homeCity];
  const vijayawadaCost = treatmentCosts.vijayawada;

  const vijayawadaAvg =
    (vijayawadaCost.min + vijayawadaCost.max) / 2;
  const flightData = FLIGHT_ESTIMATES[input.homeCity];
  const flightCost = input.companion
    ? flightData[input.travelClass] * 2
    : flightData[input.travelClass];

  const hotelRate = HOTEL_ESTIMATES[input.hotelClass];
  const hotelCost = hotelRate * input.stayDuration;

  const mealsCost = DAILY_MEALS_ESTIMATE * input.stayDuration * (input.companion ? 2 : 1);
  const transportCost = DAILY_TRANSPORT_ESTIMATE * input.stayDuration * (input.companion ? 2 : 1);

  const totalTCDT = vijayawadaAvg + flightCost + hotelCost + mealsCost + transportCost;
  const homeAvg = (homeCost.min + homeCost.max) / 2;
  const netSavings = homeAvg - totalTCDT;
  const savingsPercentage = Math.round((netSavings / homeAvg) * 100);

  return {
    homeCost,
    vijayawadaCost,
    flightCost,
    hotelCost,
    totalTCDT: Math.round(totalTCDT),
    netSavings: Math.round(netSavings),
    savingsPercentage,
  };
}

export function generateItinerary(
  patientName: string,
  treatmentType: TreatmentType
): { time: string; activity: string }[] {
  return [
    { time: "06:00", activity: "Arrive at Vijayawada Airport — driver meets you at arrivals holding a name board" },
    { time: "07:00", activity: "Check-in at hotel — rest and freshen up" },
    { time: "09:00", activity: "Breakfast at hotel — complimentary" },
    { time: "10:00", activity: `Initial consultation at Global Smile Clinic — ${getTreatmentLabel(treatmentType)} assessment, X-rays, CBCT scan` },
    { time: "13:00", activity: "Lunch at a curated local restaurant (Thalassery or Andhra cuisine)" },
    { time: "14:30", activity: "City orientation — Prakasam Barrage, Bhavani Island, or local landmark visit" },
    { time: "17:00", activity: "Return to clinic — treatment plan presentation & Q&A with your prosthodontist" },
    { time: "19:00", activity: "Evening at leisure — explore local market or relax at hotel" },
    { time: "20:00", activity: "Welcome dinner — curated dining experience" },
    { time: "21:30", activity: "Concierge hands you a WhatsApp contact card — 24/7 support throughout your stay" },
  ];
}

function getTreatmentLabel(key: string): string {
  const labels: Record<string, string> = {
    "full-arch": "Full-Arch Restoration",
    "implants-single": "Single Implant",
    veneers: "Veneers",
    "crowns-bridges": "Crowns & Bridges",
    maxillofacial: "Maxillofacial Surgery",
  };
  return labels[key] ?? key;
}
