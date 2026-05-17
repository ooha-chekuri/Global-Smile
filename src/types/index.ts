import type {
  patients,
  reports,
  dentists,
  referrals,
  milestones,
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

export interface GeminiReport {
  complexityTier: "mild" | "moderate" | "complex";
  possiblePathways: string[];
  restorationScore: number;
  educationalNote: string;
  disclaimer: string;
}

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
