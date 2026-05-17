# CLAUDE.md — Global Smile Project

> This file is the single source of truth for Claude Code working on this project.
> Read every section before writing any code or making any decisions.

---

## Project Overview

**Global Smile** is an Integrated Patient Acquisition & Trust Engine for a specialized
prosthodontic practice in Vijayawada, India. It targets international dental tourists and
local high-value patients through 4 core modules:

1. **AI Treatment Visualizer** — photo upload + Gemini API → Value-Added Report (no diagnosis)
2. **Dental Tourism Calculator** — cost comparison (Vijayawada vs NY/London/Sydney) + Day 1 itinerary
3. **Trust-Chain Dashboard** — credentials, sterilization logs, anonymized patient milestones
4. **Local Referral Ecosystem** — GP-to-specialist secure referral portal

---

## Tech Stack (Non-Negotiable)

```
Framework:     Next.js 16 (App Router — not Pages Router)
Language:      TypeScript (strict mode, no `any`)
Styling:       Tailwind CSS v4
Animation:     Framer Motion
ORM:           Drizzle ORM
Database:      Neon DB (Serverless PostgreSQL)
Auth:          NextAuth.js v5
AI:            Google Gemini API (free tier — gemini-1.5-flash)
PDF:           jsPDF + html2canvas (client-side only)
Email:         Resend
Storage:       Vercel Blob (patient photo uploads)
Hosting:       Vercel
```

---

## Project Structure

```
global-smile/
├── CLAUDE.md                        ← you are here
├── .env.local                       ← never commit this
├── .env.example                     ← commit this with placeholder keys
├── next.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── drizzle/
│   └── schema.ts                    ← all DB tables defined here
├── public/
│   └── fonts/                       ← local fonts if needed
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← root layout, global fonts
│   │   ├── page.tsx                 ← landing page
│   │   ├── (marketing)/             ← route group, no auth
│   │   │   ├── visualizer/          ← Module 1
│   │   │   ├── calculator/          ← Module 2
│   │   │   └── trust/               ← Module 3 (public view)
│   │   ├── (portal)/                ← route group, auth required
│   │   │   ├── dashboard/           ← practice admin dashboard
│   │   │   ├── referral/            ← Module 4 — GP referral portal
│   │   │   └── patient/[id]/        ← individual patient journey view
│   │   └── api/
│   │       ├── visualizer/route.ts  ← Gemini API call
│   │       ├── calculator/route.ts  ← cost computation logic
│   │       ├── referral/route.ts    ← referral CRUD
│   │       └── auth/[...nextauth]/route.ts
│   ├── components/
│   │   ├── ui/                      ← base design system components
│   │   ├── visualizer/              ← Module 1 components
│   │   ├── calculator/              ← Module 2 components
│   │   ├── trust/                   ← Module 3 components
│   │   └── referral/                ← Module 4 components
│   ├── lib/
│   │   ├── db.ts                    ← Neon + Drizzle client
│   │   ├── gemini.ts                ← Gemini API wrapper
│   │   ├── auth.ts                  ← NextAuth config
│   │   ├── resend.ts                ← email helpers
│   │   └── cost-data.ts             ← static treatment cost tables
│   └── types/
│       └── index.ts                 ← shared TypeScript interfaces
```

---

## Environment Variables

Create `.env.local` with these keys. Never commit real values.

```bash
# Database
DATABASE_URL=postgresql://...neon.tech/globalsmile

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# AI
GEMINI_API_KEY=

# Storage
BLOB_READ_WRITE_TOKEN=

# Email
RESEND_API_KEY=

# WhatsApp (optional for hackathon)
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
```

---

## Database Schema (Drizzle)

All tables live in `drizzle/schema.ts`. Key entities:

```typescript
// patients — created when AI Visualizer report is requested
patients: {
  id, name, email, phone,
  homeCity,           // for calculator
  consentPhotoUse,    // GDPR/DPDP required boolean
  photoDeleteAfter,   // auto-delete timestamp (90 days)
  createdAt
}

// reports — AI Visualizer output
reports: {
  id, patientId,
  concernText,        // patient's typed description
  photoUrl,           // Vercel Blob URL (temp)
  complexityTier,     // 'mild' | 'moderate' | 'complex'
  reportJson,         // full Gemini response parsed
  createdAt
}

// referrals — Module 4
referrals: {
  id, referringDentistId, patientId,
  chiefComplaint, urgency,
  recordsUrl,         // encrypted blob URL
  status,             // 'pending' | 'reviewing' | 'scheduled' | 'in_progress' | 'closed'
  closureSummary,     // sent back to GP on case close
  createdAt, updatedAt
}

// dentists — referring GPs (portal users)
dentists: {
  id, name, email, clinicName,
  city, registrationNumber,
  hashedPassword,     // NextAuth credentials provider
  createdAt
}

// milestones — Trust Dashboard (Module 3)
milestones: {
  id,
  patientCity,        // anonymized — city only, no name
  treatmentType,      // 'full-arch' | 'implants' | 'veneers' etc.
  stage,              // 'impressions' | 'temporaries' | 'final-fit' etc.
  isAnonymized,       // must be true before showing publicly
  createdAt
}
```

---

## Module Implementation Guide

### Module 1 — AI Treatment Visualizer

**Route:** `/visualizer`
**API:** `POST /api/visualizer`

Flow:
1. Client uploads photo → Vercel Blob → get URL
2. Client submits form (concern text + photo URL + consent checkbox)
3. API route calls Gemini with structured prompt (see below)
4. Response parsed into `{ complexityTier, pathways[], restorationScore, disclaimer }`
5. Client renders report UI + offers PDF download (jsPDF, client-side)
6. CTA: "Book a Virtual Consultation" → WhatsApp link / booking form

**Gemini Prompt Structure (in `lib/gemini.ts`):**
```
System: You are a dental education assistant. You help patients understand 
restorative dental possibilities in plain language. You NEVER diagnose, prescribe 
treatment, or make medical recommendations. Always end with a disclaimer.

User: A patient describes their concern as: "{concernText}". 
Based on common prosthodontic presentations matching this description, 
respond ONLY with valid JSON:
{
  "complexityTier": "mild|moderate|complex",
  "possiblePathways": ["string", ...],  // max 3, plain language
  "restorationScore": number,           // 1-10 informational scale
  "educationalNote": "string",          // 2-3 sentences, neutral
  "disclaimer": "string"               // always include
}
```

**Key rules:**
- Never pass the photo to Gemini for analysis — use it only for the report PDF cover
- Validate file type (jpg/png only) and size (max 5MB) client-side before upload
- Show consent modal before any upload with plain-language explanation
- Store `consentPhotoUse: true` in DB before Blob upload proceeds

---

### Module 2 — Dental Tourism Calculator

**Route:** `/calculator`
**API:** `POST /api/calculator` (optional — can be pure client-side)

Static cost data lives in `lib/cost-data.ts`:

```typescript
export const TREATMENT_COSTS = {
  'full-arch': {
    vijayawada: { min: 450000, max: 900000 },   // INR
    newYork:    { min: 2500000, max: 4000000 },
    london:     { min: 2000000, max: 3500000 },
    sydney:     { min: 1800000, max: 3000000 },
  },
  'implants-single': { ... },
  'veneers':         { ... },
  'crowns-bridges':  { ... },
  'maxillofacial':   { ... },
}

export const FLIGHT_ESTIMATES = {
  newYork:  { economy: 80000, business: 250000 },  // INR round trip
  london:   { economy: 60000, business: 200000 },
  sydney:   { economy: 70000, business: 220000 },
}

export const HOTEL_ESTIMATES = {
  threestar: 3500,   // INR per night
  fourstar:  6500,
  fivestar:  12000,
}
```

Output:
- Treatment cost in home city (range)
- Treatment + travel + stay in Vijayawada (TCDT)
- **Net Savings** (hero number — bold, large)
- 12-hour Day 1 itinerary (static template, personalized with name + treatment type)
- PDF export button (jsPDF client-side)

---

### Module 3 — Trust-Chain Dashboard

**Route:** `/trust`

Sections (in order):
1. **Credential Wall** — static JSON in `lib/credentials.ts`, rendered as cards
2. **Sterilization Status** — weekly boolean flag from DB (`isAllClear: boolean`)
3. **Photo Carousel** — static images in `/public/clinic/`
4. **Live Milestones** — fetched from `milestones` table, filtered `isAnonymized: true`
5. **Google Reviews Embed** — use Places API embed or iframe
6. **Video Testimonial** — `<video>` tag, hosted on Vercel Blob

Server Component for milestone fetch (App Router):
```typescript
// src/app/(marketing)/trust/page.tsx
export default async function TrustPage() {
  const milestones = await db.select().from(milestonesTable)
    .where(eq(milestonesTable.isAnonymized, true))
    .orderBy(desc(milestonesTable.createdAt))
    .limit(6)
  // ...
}
```

---

### Module 4 — Local Referral Ecosystem

**Routes:** `/referral` (GP portal, auth required)

Two user types via NextAuth:
- `DENTIST` — referring GP, can submit + track own referrals
- `SPECIALIST` — practice staff, sees all referrals queue

GP flow:
1. Login → `/referral/dashboard` — see own referral history + statuses
2. New referral → form: patient name, DOB, chief complaint, urgency, records upload, consent checkbox
3. Submit → `POST /api/referral` → creates DB record + sends email to practice (Resend) + confirmation to GP

Specialist flow:
1. Login → `/dashboard` → queue of incoming referrals
2. Update status → triggers email to GP (Resend) with milestone update
3. Close case → `closureSummary` field → email to GP

**Privacy rules (enforce in API routes):**
- GP can only query their own referrals (`WHERE referringDentistId = session.user.id`)
- Records URL signed with 24-hour expiry (Vercel Blob `getDownloadUrl` with expiry)
- Patient name never shown in milestone public view (use city + treatment type only)

---

## Code Quality Rules

These are non-negotiable. Do not skip them.

- **TypeScript strict mode** — `"strict": true` in tsconfig. No `any`, no `// @ts-ignore`
- **Server vs Client** — default to Server Components. Add `"use client"` only when you need hooks or browser APIs
- **Error handling** — every API route must return typed errors: `{ error: string, code: string }`
- **Loading states** — every async UI interaction needs a loading state (Suspense or local state)
- **Form validation** — use `zod` for all form schemas, both client and server
- **No inline styles** — Tailwind classes only. Never `style={{ }}` except for dynamic values
- **No `console.log` in production code** — use a proper logger or remove before commit
- **Image optimization** — always use Next.js `<Image />`, never `<img>`
- **Route protection** — `(portal)` route group must have middleware checking session

---

## Middleware (Auth Protection)

```typescript
// middleware.ts (root)
export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/referral/:path*", "/patient/:path*"]
}
```

---

## Build Order (Hackathon Priority)

Work in this sequence. Do not jump ahead.

```
Phase 1 — Foundation
  □ next.js 16 project init with TypeScript
  □ Tailwind v4 config
  □ Neon DB connection + Drizzle schema + migrate
  □ NextAuth v5 with credentials provider (dentist login)
  □ .env.example committed

Phase 2 — Module 2 (Calculator) — highest conversion value, no external API needed
  □ cost-data.ts with all treatment + travel static data
  □ /calculator page — form UI
  □ calculation logic (pure functions, easily testable)
  □ 12-hour itinerary generator (template-based)
  □ PDF export (jsPDF)

Phase 3 — Module 1 (AI Visualizer) — needs Gemini key
  □ Vercel Blob upload flow with consent modal
  □ /api/visualizer route handler with Gemini call
  □ Report UI component
  □ PDF report export

Phase 4 — Module 3 (Trust Dashboard)
  □ Credential data in lib/credentials.ts
  □ Milestone DB seeded with sample anonymized data
  □ Trust page Server Component
  □ Photo carousel (Framer Motion)

Phase 5 — Module 4 (Referral Portal)
  □ Dentist login + NextAuth session
  □ Referral form with Zod validation
  □ /api/referral CRUD routes
  □ Status tracker UI
  □ Resend email on status change

Phase 6 — Polish
  □ Landing page (/) with all 4 module CTAs
  □ Mobile responsiveness audit
  □ Error boundaries on all async sections
  □ Deploy to Vercel
```

---

## Claude Code Skills to Use

Tell Claude Code explicitly to apply these approaches:

**For any DB work:**
> "Use Drizzle ORM with Neon. Define types from the schema using `typeof table.$inferSelect`.
> Use prepared statements for any user-input queries."

**For any API route:**
> "Write as a Next.js 16 Route Handler. Validate input with Zod before any DB call.
> Return `NextResponse.json({ error, code }, { status })` for all errors."

**For any form:**
> "Use React Hook Form + Zod resolver. Show inline field errors.
> Disable submit button during loading. Show toast on success/error."

**For any Server Component with DB fetch:**
> "Fetch in the Server Component directly using the Drizzle db client.
> Wrap in Suspense with a skeleton fallback."

**For Gemini calls:**
> "Call via `lib/gemini.ts` wrapper. Always parse response with JSON.parse inside try/catch.
> If parse fails, return a graceful fallback report, never crash the page."

**For file uploads:**
> "Use Vercel Blob `put()` with client upload pattern.
> Validate MIME type and size (max 5MB) before calling put.
> Store the returned URL in the DB, never the raw file."

---

## Key Constraints (Do Not Violate)

1. **No medical diagnosis** — Gemini prompt must include explicit no-diagnosis instruction. Add a visible disclaimer on every report.
2. **Photo consent is mandatory** — Block upload if `consentPhotoUse` checkbox is unchecked. Store consent timestamp in DB.
3. **Patient data isolation** — GPs see only their own referrals. Enforce in SQL `WHERE` clause, not just UI.
4. **Anonymized milestones only** — Never show patient name, email, or phone in the Trust Dashboard.
5. **DPDP Act** — Add a privacy policy page. Include data retention periods in the policy (photos: 90 days, reports: 1 year).
6. **Gemini free tier rate limits** — 15 RPM on Flash. Add a simple in-memory queue or return a friendly "high demand" message if rate-limited.

---

## Useful Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Drizzle: generate migration from schema changes
npx drizzle-kit generate

# Drizzle: push migration to Neon
npx drizzle-kit migrate

# Drizzle: open Drizzle Studio (DB browser)
npx drizzle-kit studio

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

---

## First Command to Run in Claude Code

```
Initialize a Next.js 16 project with TypeScript strict mode, Tailwind CSS v4, 
and App Router. Install: drizzle-orm, @neondatabase/serverless, drizzle-kit, 
next-auth@beta, @auth/drizzle-adapter, zod, react-hook-form, 
@hookform/resolvers, framer-motion, jspdf, html2canvas, resend, 
@vercel/blob. Create the folder structure from CLAUDE.md exactly. 
Create .env.example with all required keys as placeholders. 
Create drizzle/schema.ts with all 5 tables defined.
```
```