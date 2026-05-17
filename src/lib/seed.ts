import { db } from "./db";
import { dentists } from "../../drizzle/schema";
import { hash } from "bcryptjs";

const DEMO_DENTISTS = [
  {
    name: "Dr. Sharma",
    email: "dentist@globalsmile.in",
    clinicName: "Sharma Dental Clinic",
    city: "Guntur",
    registrationNumber: "DCI-2024-001",
    password: "demo1234",
    role: "dentist",
  },
  {
    name: "Dr. Patel",
    email: "specialist@globalsmile.in",
    clinicName: "Global Smile Prosthodontics",
    city: "Vijayawada",
    registrationNumber: "DCI-2018-042",
    password: "demo1234",
    role: "specialist",
  },
];

export async function seedDemoCredentials() {
  for (const d of DEMO_DENTISTS) {
    const hashedPassword = await hash(d.password, 12);
    await db
      .insert(dentists)
      .values({
        name: d.name,
        email: d.email,
        clinicName: d.clinicName,
        city: d.city,
        registrationNumber: d.registrationNumber,
        hashedPassword,
        role: d.role,
      })
      .onConflictDoNothing({ target: dentists.email });
  }

  console.log("✅ Demo credentials seeded:");
  DEMO_DENTISTS.forEach((d) => {
    console.log(`   ${d.role}: ${d.email} / ${d.password}`);
  });
}

const isMainFile = process.argv[1]?.endsWith("/seed.ts") || process.argv[1]?.endsWith("\\seed.ts");
if (isMainFile) {
  seedDemoCredentials()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seed failed:", err);
      process.exit(1);
    });
}
