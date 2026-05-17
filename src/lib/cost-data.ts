export const TREATMENT_COSTS = {
  "full-arch": {
    vijayawada: { min: 450000, max: 900000 },
    newYork: { min: 2500000, max: 4000000 },
    london: { min: 2000000, max: 3500000 },
    sydney: { min: 1800000, max: 3000000 },
  },
  "implants-single": {
    vijayawada: { min: 30000, max: 80000 },
    newYork: { min: 300000, max: 500000 },
    london: { min: 250000, max: 450000 },
    sydney: { min: 220000, max: 400000 },
  },
  veneers: {
    vijayawada: { min: 15000, max: 35000 },
    newYork: { min: 150000, max: 300000 },
    london: { min: 120000, max: 250000 },
    sydney: { min: 100000, max: 220000 },
  },
  "crowns-bridges": {
    vijayawada: { min: 10000, max: 25000 },
    newYork: { min: 100000, max: 250000 },
    london: { min: 80000, max: 200000 },
    sydney: { min: 70000, max: 180000 },
  },
  maxillofacial: {
    vijayawada: { min: 80000, max: 200000 },
    newYork: { min: 500000, max: 1200000 },
    london: { min: 400000, max: 1000000 },
    sydney: { min: 350000, max: 900000 },
  },
} as const;

export const FLIGHT_ESTIMATES = {
  newYork: { economy: 80000, business: 250000 },
  london: { economy: 60000, business: 200000 },
  sydney: { economy: 70000, business: 220000 },
} as const;

export const HOTEL_ESTIMATES = {
  threestar: 3500,
  fourstar: 6500,
  fivestar: 12000,
} as const;

export const DAILY_MEALS_ESTIMATE = 1500;
export const DAILY_TRANSPORT_ESTIMATE = 1000;

export function getTreatmentLabel(key: string): string {
  const labels: Record<string, string> = {
    "full-arch": "Full-Arch Restoration",
    "implants-single": "Single Implant",
    veneers: "Veneers",
    "crowns-bridges": "Crowns & Bridges",
    maxillofacial: "Maxillofacial Surgery",
  };
  return labels[key] ?? key;
}

export function getCityLabel(key: string): string {
  const labels: Record<string, string> = {
    newYork: "New York",
    london: "London",
    sydney: "Sydney",
  };
  return labels[key] ?? key;
}
