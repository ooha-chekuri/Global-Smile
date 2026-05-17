import type {
  patients,
  reports,
  dentists,
  referrals,
  milestones,
  teleconsultations,
} from "../../drizzle/schema";

export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;

export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;

export type Dentist = typeof dentists.$inferSelect;
export type NewDentist = typeof dentists.$inferInsert;

export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;

export type Milestone = typeof milestones.$inferSelect;
export type NewMilestone = typeof milestones.$inferInsert;

export type Teleconsultation = typeof teleconsultations.$inferSelect;
export type NewTeleconsultation = typeof teleconsultations.$inferInsert;

export interface GeminiReport {
  complexityTier: "mild" | "moderate" | "complex";
  concernCategory: string;
  possiblePathways: string[];
  restorationScore: number;
  educationalNote: string;
  disclaimer: string;
}

export type AgeBracket = "18-30" | "31-45" | "46-60" | "60+";

export type PriorDentalHistory =
  | "Previous crowns or bridges"
  | "Previous implants"
  | "Gum disease treatment"
  | "Orthodontic treatment"
  | "Tooth extraction(s)"
  | "None";

export type TreatmentType = "full-arch" | "implants-single" | "veneers" | "crowns-bridges" | "maxillofacial";
export type HomeCity = "newYork" | "london" | "sydney";
export type TravelClass = "economy" | "business";
export type HotelClass = "threestar" | "fourstar" | "fivestar";

export interface CalculatorInput {
  treatmentType: TreatmentType;
  homeCity: HomeCity;
  travelClass: TravelClass;
  stayDuration: number;
  companion: boolean;
  hotelClass: HotelClass;
}

export interface CalculatorResult {
  homeCost: { min: number; max: number };
  vijayawadaCost: { min: number; max: number };
  flightCost: number;
  hotelCost: number;
  totalTCDT: number;
  netSavings: number;
  savingsPercentage: number;
}
