import { db } from "./db";
import { milestones } from "../../drizzle/schema";

const SAMPLE_MILESTONES = [
  { patientCity: "Frankfurt", treatmentType: "full-arch" as const, stage: "final-fit" as const, isAnonymized: true },
  { patientCity: "London", treatmentType: "implants-single" as const, stage: "temporaries" as const, isAnonymized: true },
  { patientCity: "New York", treatmentType: "veneers" as const, stage: "impressions" as const, isAnonymized: true },
  { patientCity: "Sydney", treatmentType: "crowns-bridges" as const, stage: "follow-up" as const, isAnonymized: true },
  { patientCity: "Toronto", treatmentType: "full-arch" as const, stage: "temporaries" as const, isAnonymized: true },
  { patientCity: "Dubai", treatmentType: "maxillofacial" as const, stage: "impressions" as const, isAnonymized: true },
];

export async function seedMilestones() {
  for (const m of SAMPLE_MILESTONES) {
    await db.insert(milestones).values(m);
  }
  console.log("✅ Milestones seeded:", SAMPLE_MILESTONES.length);
}

seedMilestones()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Milestone seed failed:", err);
    process.exit(1);
  });
