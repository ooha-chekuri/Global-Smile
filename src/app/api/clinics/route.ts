import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dentists } from "../../../../drizzle/schema";
import { eq, ilike, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    console.log(`[Clinics API] Fetching clinics for city: ${city || "All"}`);

    let query = db.select({
      id: dentists.id,
      name: dentists.name,
      clinicName: dentists.clinicName,
      city: dentists.city,
    }).from(dentists);

    if (city) {
      // @ts-ignore - ilike exists in drizzle
      query = query.where(ilike(dentists.city, `%${city}%`));
    }

    const results = await query.limit(5);
    console.log(`[Clinics API] Found ${results.length} clinics in database`);
    return NextResponse.json(results);
  } catch (error) {
    console.error("[Clinics API] Database error:", error);
    return NextResponse.json({ error: "Failed to fetch clinics" }, { status: 500 });
  }
}
