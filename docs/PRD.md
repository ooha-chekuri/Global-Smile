# PRD.md — Product Requirements Document

### Overview

**Product Name:** Global Smile
**Type:** Web-first Progressive Web App (PWA)
**Target Users:** International dental tourists, local high-value patients, referring general dentists, prosthodontist practice staff
**Core Problem:** A specialized prosthodontic practice in Vijayawada needs to convert skeptical international leads and shift local patient mindset — through transparency, trust, and cost clarity.

---

### Goals & Success Metrics

| Goal | KPI | Target |
|---|---|---|
| International lead conversion | Lead-to-consultation rate | >15% |
| Local referral volume | Referrals/month from GPs | 30+ |
| Patient trust score | Post-visit NPS | >70 |
| Tourism package uptake | International bookings/month | 10+ |
| Dashboard engagement | Avg. session time on journey page | >4 min |

---

### User Personas

**Persona 1 — Marcus (42, London)**
Needs full-mouth rehabilitation. NHS waitlist is 18 months. Budget-conscious but quality-anxious. Researches obsessively before committing.

**Persona 2 — Priya (35, Vijayawada)**
Has been told she needs implants. Perceives specialist care as "too expensive" or "only for cosmetic vanity." Needs education and trust.

**Persona 3 — Dr. Ravi (GP, Guntur)**
Sees complex maxillofacial cases he can't handle. No clean referral system. Worries about losing the patient relationship.

---

### Module 1 — AI Treatment Visualizer

**Purpose:** Convert cold traffic into warm leads by showing restorative possibility before any commitment.

**User Flow:**
1. Patient lands on homepage → clicks "See Your Smile Potential"
2. Uploads 1–3 photos (front smile, side profile, bite)
3. Fills lightweight form: chief concern, age bracket, prior dental history (yes/no flags)
4. AI generates a "Value-Added Report" within 60 seconds
5. Report shows: concern category, possible treatment pathways, estimated complexity tier (Mild / Moderate / Complex), and a CTA to book a virtual consultation

**What the AI does NOT do:**
- No clinical diagnosis
- No treatment prescription
- No before/after simulation with patient's actual face (liability)

**What it DOES do:**
- Pattern-matches concern keywords + image metadata to a curated treatment library
- Outputs plain-language possibilities: "Patients with similar concerns often explore options like ceramic veneers, implant-supported bridges, or full-arch restoration."
- Assigns a "Restoration Readiness Score" (informational, not medical)
- Triggers an automated email with the report + consultation booking link

**Technical Stack:**
- Frontend: React + Tailwind
- Image handling: Client-side compression before upload, stored with consent token
- AI layer: Claude API (claude-sonnet-4) with structured prompt + concern taxonomy
- Report generation: PDF rendered client-side via jsPDF
- Backend: Node.js + Supabase (auth + storage)

**Privacy & Compliance:**
- Explicit photo consent checkbox with plain-language explanation
- Photos never used for training without separate opt-in
- GDPR + India DPDP Act compliant data handling
- Auto-delete photos after 90 days unless patient opts in to retain

---

### Module 2 — Dental Tourism Calculator

**Purpose:** Eliminate the #1 objection: "Is it actually worth traveling to India?"

**Core Feature — Cost Comparison Engine:**

Inputs (patient-selected):
- Treatment type (dropdown: Full-mouth rehab / Implants / Veneers / Maxillofacial / Crowns & Bridges)
- Home city (New York / London / Sydney / Toronto / Dubai / Other)
- Travel class preference (Economy / Business)
- Stay duration preference (1 week / 2 weeks / 3 weeks)
- Companion traveling (Yes / No)

Outputs (dynamic, real-time calculated):
- Treatment cost in home city (range, sourced from public healthcare cost databases + periodic manual updates)
- Treatment cost in Vijayawada (practice's actual price list, updatable by admin)
- Return flights estimate (integrated with a flight API or static range updated monthly)
- Accommodation estimate (3-star / 4-star / 5-star options near practice)
- Local transport, meals estimate
- **Total Cost of Dental Tourism (TCDT)**
- **Net Savings Amount + Savings Percentage**
- **"Even after your flights and hotel, you save approximately $X"** — hero number, bold, prominent

**12-Hour Quick-Start Itinerary Generator:**

For first-time visitors, auto-generates a suggested Day 1 plan:
- Airport pickup coordination note
- Check-in + rest window
- Initial consultation slot (3 hours including X-rays, CBCT, records)
- Lunch recommendation (curated, near clinic)
- City orientation (Prakasam Barrage, local landmark) — builds comfort
- Evening: treatment plan presentation + Q&A with doctor
- Concierge contact card (WhatsApp)

This itinerary is downloadable as a PDF and shareable via WhatsApp.

**Add-On: ROI Framing**
- "Your London implant quote: £4,200. Vijayawada full treatment + 10-day trip: ~£1,800. Difference: £2,400. That's a holiday that pays for itself."
- Framed as "Smart Travel Investment," not "cheap dentistry"

---

### Module 3 — Trust-Chain Verification Dashboard

**Purpose:** Make the practice's clinical standards visible, verifiable, and emotionally reassuring to international patients who can't visit in person first.

**Dashboard Sections:**

**A. Live Credential Wall**
- Doctor's qualifications, MDS (Prosthodontics), fellowship memberships
- Clinic certifications: ISO, NABH status, sterilization audit badges
- Each credential has a "Verified On" date — shows currency, not just existence
- Link to verifying body where possible (e.g., Dental Council of India registration number, clickable)

**B. Sterilization Transparency Feed**
- Weekly uploaded sterilization log summary (not raw data — a visual "All Clear" / "Audit Pending" status indicator)
- Photo carousel of autoclave equipment, sealed instrument packs, operatory setup
- Short 30-second video: "A Day in Our Sterilization Room" — shot once, updated quarterly

**C. Patient Journey Milestones (Anonymous)**
- Real-time anonymized milestone tracker for consented active patients
- Example display: "Patient from Frankfurt — Week 3 of Full-Arch Restoration — Impressions completed, temporaries placed ✓"
- Shows practice is actively treating international cases right now
- No names, no photos — just city, treatment type, milestone stage

**D. Post-Operative Care Coordination Panel**
- For international patients post-departure: shows their follow-up protocol
- Teleconsultation booking embedded
- Wound check photo upload to treating doctor
- Clear escalation path: "If you experience X, do Y, contact us at Z"
- Integrates with WhatsApp Business API for async communication

**E. Review Authenticity Layer**
- Google Reviews embedded (live, not screenshots)
- Video testimonials with patient consent badge visible
- "This patient consented to share their experience on [date]" — transparency signal

---

### Module 4 — Local Referral Ecosystem

**Purpose:** Make Dr. Ravi (the local GP) feel like a partner, not a patient-loser.

**Referral Portal Features:**

**For Referring Dentist:**
- Secure login (separate from patient portal)
- "Refer a Patient" form: patient demographics, chief complaint, relevant X-rays/records upload, urgency flag, preferred contact method
- Referral status tracker: Pending Review → Consultation Scheduled → Treatment In Progress → Case Closed
- Case closure summary sent back to referring dentist (within scope of patient consent)
- Continuing education: monthly case study newsletter opt-in ("See how we handled the case you referred last month" — anonymized)

**For Practice:**
- Referral dashboard: incoming queue, follow-up reminders
- Referring dentist directory with relationship score (volume, recency)
- Auto-acknowledgment to referring dentist within 2 hours of referral receipt

**For Patient:**
- Continuity messaging: "Dr. Ravi has shared your records with our specialist team. You're in good hands, and Dr. Ravi will be kept informed throughout."
- Reduces anxiety of "abandonment" by the familiar GP

**Privacy Architecture:**
- Patient signs digital consent at GP's clinic (DocuSign-lite flow)
- Records transferred over encrypted channel (not email)
- Referring dentist sees only milestone updates, not full clinical notes
- Patient can revoke sharing at any time

---

### Technical Architecture Summary

```
Framework:      Next.js 15 (App Router)
Styling:        Tailwind CSS + Framer Motion
Backend:        Next.js Route Handlers (no separate Express needed)
Database:       Neon DB (Serverless Postgres)
ORM:            Drizzle ORM (lightweight, great with Neon)
Auth:           NextAuth.js (for referral portal GP logins)
AI:             Gemini API (free tier)
PDF:            jsPDF + html2canvas (client-side, no change)
Email:          Resend
WhatsApp:       WhatsApp Business API (via route handler)
Hosting:        Vercel (everything — no Railway needed)
CDN:            Cloudflare (optional, Vercel's CDN is solid enough)
```

---

### MVP Scope (Hackathon Build)

| Feature | MVP | Post-Hackathon |
|---|---|---|
| AI Visualizer (text-based report) | ✅ | Image analysis upgrade |
| Tourism Calculator | ✅ | Live flight API |
| Trust Dashboard (static credentials) | ✅ | Live milestone tracker |
| Referral Portal (form + status) | ✅ | Full bidirectional notes |
| Post-op teleconsultation | ❌ | Phase 2 |
| Payment integration | ❌ | Phase 2 |
