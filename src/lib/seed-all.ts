import { seedDemoCredentials } from "./seed";
import { seedMilestones } from "./seed-milestones";

async function seedAll() {
  console.log("🌱 Running full seed...\n");
  await seedDemoCredentials();
  await seedMilestones();
  console.log("\n✅ Seed complete.");
  process.exit(0);
}

seedAll().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
