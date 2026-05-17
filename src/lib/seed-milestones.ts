import { db } from "./db";
import { milestones } from "../../drizzle/schema";
import { count } from "drizzle-orm";

const SAMPLE_MILESTONES = [
  { patientCity: "Frankfurt", treatmentType: "full-arch" as const, stage: "final-fit" as const, isAnonymized: true },
  { patientCity: "London", treatmentType: "implants-single" as const, stage: "temporaries" as const, isAnonymized: true },
  { patientCity: "New York", treatmentType: "veneers" as const, stage: "impressions" as const, isAnonymized: true },
  { patientCity: "Sydney", treatmentType: "crowns-bridges" as const, stage: "follow-up" as const, isAnonymized: true },
  { patientCity: "Toronto", treatmentType: "full-arch" as const, stage: "temporaries" as const, isAnonymized: true },
  { patientCity: "Dubai", treatmentType: "maxillofacial" as const, stage: "impressions" as const, isAnonymized: true },
];

export async function seedMilestones() {
  const [row] = await db.select({ value: count() }).from(milestones);
  if (row.value > 0) {
    console.log(`⏭️  Milestones already seeded (${row.value} existing), skipping.`);
    return;
  }

  for (const m of SAMPLE_MILESTONES) {
    await db.insert(milestones).values(m);
  }
  console.log("✅ Milestones seeded:", SAMPLE_MILESTONES.length);
}

const isMainFile = process.argv[1]?.endsWith("/seed-milestones.ts") || process.argv[1]?.endsWith("\\seed-milestones.ts");
if (isMainFile) {
  seedMilestones()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Milestone seed failed:", err);
      process.exit(1);
    });
}
