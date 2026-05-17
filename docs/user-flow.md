# User Flow — Global Smile

> Complete walkthrough of every user journey across all 4 modules.
> Last updated: May 2026

---

## Table of Contents

1. [International Patient — Organic Discovery](#1-international-patient--organic-discovery)
2. [AI Treatment Visualizer Flow](#2-ai-treatment-visualizer-flow)
3. [Dental Tourism Calculator Flow](#3-dental-tourism-calculator-flow)
4. [Trust Dashboard Flow](#4-trust-dashboard-flow)
5. [GP Referral Portal Flow](#5-gp-referral-portal-flow)
6. [Specialist Dashboard Flow](#6-specialist-dashboard-flow)

---

## 1. International Patient — Organic Discovery

```
Google Search ──> Landing Page ──> Visualizer ──> Calculator ──> Trust ──> WhatsApp/Book
```

**Entry points:**
- Google: "dental implants India cost", "full mouth rehabilitation Vijayawada"
- Social media / NRI community groups
- Direct referral

**Landing page modules visible:**
| Module | CTA Button |
|--------|-----------|
| AI Treatment Visualizer | "See Your Smile Potential" |
| Dental Tourism Calculator | "Calculate Your Savings" |
| Trust Dashboard | (via nav link) |
| GP Referral Portal | "GP Portal" (footer link) |

**Key decision path:** The patient typically moves Visualizer → Calculator → Trust before booking. Each module reduces a specific objection.

---

## 2. AI Treatment Visualizer Flow

```
Landing Page ──> /visualizer ──> Upload Photo ──> Consent Modal ──> Fill Concern Form ──> Generate Report ──> View Report ──> Download PDF / Book Consultation
```

### Step-by-step

| Step | User Action | System Response | Edge Cases |
|------|------------|----------------|------------|
| 1 | Clicks "See Your Smile Potential" | Navigates to `/visualizer` | — |
| 2 | Clicks file input, selects JPG/PNG | Client-side validates type & size (max 5MB) | Invalid type/size → inline error |
| 3 | File selected | Consent modal appears | User cancels → file cleared |
| 4 | Checks consent checkbox + clicks Upload | `PUT /api/visualizer/upload` → Vercel Blob → URL returned | Upload fails → error toast |
| 5 | Fills name, email, phone, concern text, checks educational consent | Zod validation on submit | Validation errors → inline field messages |
| 6 | Clicks "Generate My Report" | `POST /api/visualizer` → stores patient in DB → calls Gemini API → stores report in DB → returns JSON | Gemini rate-limited → fallback report returned; DB error → 500 with typed error |
| 7 | Views report | ReportCard renders: complexity tier badge, restoration score bar, pathways list, educational note, disclaimer | — |
| 8 | CTA to book | Opens WhatsApp link / booking form | — |
| 9 | Clicks "Download PDF" | jsPDF + html2canvas generates PDF client-side | Silent fail if canvas fails |

### Consent Flow (Privacy Critical)

```
[File Selected]
       │
       ▼
┌─────────────────────────────┐
│   Photo Consent Modal       │
│                             │
│   "Your photo will be       │
│    used only for this       │
│    report. Auto-deleted     │
│    after 90 days."          │
│                             │
│   ☐ I consent               │
│                             │
│      [Cancel]  [Upload]     │
└─────────────────────────────┘
       │
       ▼ (only if checked)
  Vercel Blob Upload
```

### Data Stored

| Table | Fields |
|-------|--------|
| `patients` | name, email, phone, consentPhotoUse=true, photoDeleteAfter=now+90d |
| `reports` | patientId, concernText, photoUrl, complexityTier, reportJson |

---

## 3. Dental Tourism Calculator Flow

```
Landing Page ──> /calculator ──> Fill Form ──> Calculate ──> View Savings ──> View Itinerary ──> Download PDF / Share WhatsApp
```

### Step-by-step

| Step | User Action | System Response |
|------|------------|----------------|
| 1 | Selects treatment type (dropdown) | Form updates dynamically (default: Full-Arch) |
| 2 | Selects home city (dropdown) | Updates flight estimates |
| 3 | Selects travel class, hotel class | Updates cost calculations |
| 4 | Sets stay duration (3-30 days) | Updates hotel + meal costs |
| 5 | Toggles companion checkbox | Doubles flight/hotel/meal costs |
| 6 | Clicks "Calculate Your Savings" | 600ms simulation delay → `calculateSavings()` pure function runs |
| 7 | Sees Results section scroll into view | Hero "Net Savings" number, breakdown table, ROI framing box |
| 8 | Scrolls to Itinerary | 12-hour Day 1 timeline with personalized activities |
| 9 | Clicks "Download PDF" | jsPDF captures results + itinerary |
| 10 | Clicks WhatsApp share | Opens `wa.me` link with pre-filled message |

### Calculation Logic

```typescript
function calculateSavings(input): CalculatorResult {
  treatmentCostHome = TREATMENT_COSTS[treatmentType][homeCity].avg
  treatmentCostVJA = TREATMENT_COSTS[treatmentType].vijayawada.avg
  flightCost = FLIGHT_ESTIMATES[homeCity][travelClass] * (companion ? 2 : 1)
  hotelCost = HOTEL_ESTIMATES[hotelClass] * stayDuration
  mealsCost = DAILY_MEALS_ESTIMATE * stayDuration * (companion ? 2 : 1)
  transportCost = DAILY_TRANSPORT_ESTIMATE * stayDuration * (companion ? 2 : 1)

  totalTCDT = treatmentCostVJA + flightCost + hotelCost + mealsCost + transportCost
  netSavings = treatmentCostHome - totalTCDT
  savingsPercentage = (netSavings / treatmentCostHome) * 100
}
```

### Input Form (Zod Schema)

```typescript
calculatorSchema = z.object({
  treatmentType: z.enum(["full-arch", "implants-single", "veneers", "crowns-bridges", "maxillofacial"]),
  homeCity:       z.enum(["newYork", "london", "sydney"]),
  travelClass:    z.enum(["economy", "business"]),
  stayDuration:   z.number().min(3).max(30),
  companion:      z.boolean(),
  hotelClass:     z.enum(["threestar", "fourstar", "fivestar"]),
});
```

---

## 4. Trust Dashboard Flow

```
Landing Page ──> /trust ──> Scroll through sections
```

### Page Structure (top to bottom)

```
┌─────────────────────────────────┐
│  Hero: "Trust-Chain Dashboard"  │
├─────────────────────────────────┤
│  Section 1: Credential Wall     │
│  ├─ Qualifications (MDS, etc.)  │
│  ├─ Certifications (ISO, NABH)  │
│  └─ Memberships (ICP, IPS, etc) │
│    Each card: title, issuer,    │
│    verified date, verify link   │
├─────────────────────────────────┤
│  Section 2: Sterilization       │
│  ├─ Status: All Clear / Pending │
│  ├─ Last audit date             │
│  └─ Protocol description text   │
├─────────────────────────────────┤
│  Section 3: Clinic Photo        │
│  Carousel                       │
│  ├─ Left/right arrows           │
│  ├─ Dot indicators              │
│  └─ Framer Motion AnimatePresence│
├─────────────────────────────────┤
│  Section 4: Milestone Feed      │
│  (Server Component, DB-backed)  │
│  ├─ Fetches from milestones     │
│  │  WHERE isAnonymized = true   │
│  │  ORDER BY createdAt DESC     │
│  │  LIMIT 6                     │
│  └─ Shows: "Patient from        │
│     {city} — {treatment} —      │
│     {stage} ✓"                  │
├─────────────────────────────────┤
│  Section 5: Google Reviews      │
│  (placeholder for embed)        │
├─────────────────────────────────┤
│  Section 6: Video Testimonial   │
│  (placeholder for video)        │
└─────────────────────────────────┘
```

### Suspense Boundary

`MilestoneFeed` is wrapped in `<Suspense fallback="Loading milestones...">` since it's an async Server Component.

---

## 5. GP Referral Portal Flow

```
Landing Page ──> /auth/signin ──> Login ──> /referral/dashboard
                                        │
                                        ├─ View referral history
                                        └─ New Referral ──> Fill form ──> Submit ──> Confirmation email
```

### Authentication

| Detail | Value |
|--------|-------|
| Auth Provider | NextAuth v5 (Credentials) |
| Session Strategy | JWT |
| Protected Routes | `/referral/*`, `/dashboard/*`, `/patient/*` |
| Middleware | `middleware.ts` matches on path patterns |
| Sign-out | `/api/auth/signout` (GET) |

### Sign-In Page

```
URL: /auth/signin

Form fields:
  ┌─ Email (with User icon) ──────────────────┐
  └────────────────────────────────────────────┘
  ┌─ Password (with Lock icon, show/hide) ────┐
  └────────────────────────────────────────────┘
  [Sign In button]

─── Demo Credentials ──────────────────────────
┌─ Dr. Sharma — GP Dentist                    ┐
│  dentist@globalsmile.in / demo1234           │
└──────────────────────────────────────────────┘
┌─ Dr. Patel — Prosthodontist (Specialist)    ┐
│  specialist@globalsmile.in / demo1234        │
└──────────────────────────────────────────────┘
Click a demo account to auto-fill fields.
```

### Referral Submission Flow

| Step | User Action | System Response |
|------|------------|----------------|
| 1 | Clicks "New Referral" | ReferralForm component renders |
| 2 | Fills patient name, email, phone | Zod validates on submit |
| 3 | Types chief complaint (min 10 chars) | Textarea with character validation |
| 4 | Selects urgency (Normal / Urgent / Emergency) | Dropdown |
| 5 | Clicks "Submit Referral" | `POST /api/referral` → inserts DB record → sends confirmation email via Resend |
| 6 | Sees form reset + list refresh | New referral appears in history with "Pending Review" status |
| 7 | Views referral card | StatusTracker shows 5-step progress: Pending → Reviewing → Scheduled → In Progress → Closed |

### Referral Status Lifecycle

```
Pending ──> Reviewing ──> Scheduled ──> In Progress ──> Closed
                ↑              ↑              ↑              ↑
            Specialist    Specialist    Specialist    Specialist
            reviews       schedules     begins        closes case
```

### Email Notifications

| Trigger | Recipient | Template | Content |
|---------|-----------|----------|---------|
| Referral submitted | Referring GP | `referralConfirmationHtml` | Confirmation with ref # |
| Status updated | Referring GP | `statusUpdateHtml` | New status + link to portal |

### Privacy Enforcement

- GP queries are filtered: `WHERE referringDentistId = session.user.id`
- Specialist sees all referrals (role-based check)
- Patient names never appear in public milestones

---

## 6. Specialist Dashboard Flow

```
Login (as specialist@globalsmile.in) ──> /dashboard
                                              │
                                         ┌────┴────┐
                                         │ Queue   │
                                         │ of all  │
                                         │referrals│
                                         └─────────┘
                                              │
                                         Click status
                                         button to
                                         update
```

| Step | User Action | System Response |
|------|------------|----------------|
| 1 | Logs in with specialist credentials | Session has `role: "specialist"` |
| 2 | Lands on `/dashboard` (redirected from portal layout) | `GET /api/referral` returns ALL referrals (unfiltered) |
| 3 | Reviews a referral card | Shows patient name, complaint, urgency badge, current status |
| 4 | Clicks a status button (e.g. "reviewing") | `PATCH /api/referral` → updates DB → sends Resend email to GP |
| 5 | List refreshes with new status | Status button highlights current step |

### Role Handling

```typescript
// In GET /api/referral
if (session.user.role === "specialist") {
  return all referrals (no filter)
} else {
  return only WHERE referringDentistId = session.user.id
}
```

---

## Database Schema (Reference)

| Table | Key Fields | Purpose |
|-------|-----------|---------|
| `patients` | id, name, email, phone, homeCity, consentPhotoUse, photoDeleteAfter | Visualizer patients |
| `reports` | id, patientId, concernText, photoUrl, complexityTier, reportJson | AI-generated reports |
| `dentists` | id, name, email, clinicName, city, hashedPassword, role | Portal users |
| `referrals` | id, referringDentistId, patientName, chiefComplaint, urgency, status, closureSummary | Referral records |
| `milestones` | id, patientCity, treatmentType, stage, isAnonymized | Trust dashboard feed |

---

## Route Map

| Route | Type | Auth | Purpose |
|-------|------|------|---------|
| `/` | Static | No | Landing page |
| `/visualizer` | Static | No | AI Treatment Visualizer |
| `/calculator` | Static | No | Dental Tourism Calculator |
| `/trust` | Static | No | Trust Dashboard |
| `/auth/signin` | Static | No | Portal login (GP + Specialist) |
| `/referral/dashboard` | Dynamic | Yes (GP/Specialist) | GP referral management |
| `/dashboard` | Dynamic | Yes (Specialist) | Specialist incoming queue |
| `/privacy` | Static | No | Privacy policy |
| `/api/auth/[...nextauth]` | API | — | NextAuth handler |
| `/api/visualizer` | API | No | Gemini report generation |
| `/api/referral` | API | Yes | Referral CRUD + status updates |

---

## Data Flow Summary

```
                    ┌──────────┐
                    │  Visitor │
                    └────┬─────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
        ┌─────────┐ ┌────────┐ ┌───────────┐
        │Visualizer│ │Calculator│ │  Trust   │
        │ Gemini   │ │ Pure fn  │ │  DB read │
        │ DB write │ │ No DB    │ │          │
        └────┬─────┘ └────────┘ └───────────┘
             │                          ▲
             ▼                          │
        ┌──────────┐            ┌──────────────┐
        │  Patient │            │  Milestones  │
        │  DB Row  │            │  DB Table    │
        └──────────┘            └──────────────┘

                    ┌──────────┐
                    │  Dentist │ (GP or Specialist)
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │  NextAuth│
                    │  JWT     │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
                    │  Referral│
                    │  CRUD    │
                    │  Resend  │
                    └──────────┘
```
