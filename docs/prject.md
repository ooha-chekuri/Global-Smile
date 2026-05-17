# Global Smile — Integrated Patient Acquisition & Trust Engine

---

## PRD.md — Product Requirements Document

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

---

---

## MARKET.md — Market Analysis & Strategy

### Market Sizing

**Global Dental Tourism Market:**
- 2024 valuation: ~$6.8 billion
- 2030 projected: ~$14.2 billion
- CAGR: ~13.1%
- Primary source countries: USA, UK, Australia, Germany, Canada
- Primary destination countries: India, Thailand, Mexico, Hungary, Turkey

**India-Specific:**
- India ranks among top 5 dental tourism destinations globally
- Average cost advantage: 60–80% cheaper than Western markets for equivalent quality procedures
- Full-mouth implant rehabilitation: $25,000–$40,000 in USA vs. $5,000–$9,000 in India
- Medical tourism (dental sub-segment) contributes ~$9 billion to India's economy annually

**Vijayawada Opportunity:**
- Underrepresented in dental tourism despite strong infrastructure
- Tier-2 city cost advantage over Chennai/Hyderabad: 20–30% lower operating costs
- Proximity to Rajiv Gandhi International Airport (Hyderabad, ~3.5 hrs) and Vijayawada Airport (direct flights from Middle East, Southeast Asia)
- Growing NRI population from Andhra Pradesh — strong diaspora pull

---

### Competitive Landscape

| Competitor Type | Strength | Weakness | Our Edge |
|---|---|---|---|
| Premium Dental Chains (Apollo, Clove) | Brand trust, multi-city | Impersonal, high overhead | Specialist-only focus, direct doctor access |
| International Dental Tourism Aggregators (DentaVacation, MyMediTravel) | Large reach | No practice loyalty, commoditizes provider | Owned platform, no commission leakage |
| Local Vijayawada Clinics | Price | No digital presence, no international reach | Full digital trust stack |
| Bangkok / Phuket Dental Hubs | Established tourism ecosystem | Higher cost than India, language barrier for Indian diaspora | Cultural/linguistic alignment for NRI segment |

---

### Target Segments & Sizing

**Segment 1: International Dental Tourists (Primary)**
- Demographics: 35–65, Western country residents, Indian diaspora (NRI/PIO) globally
- Psychographics: Cost-conscious but quality-anxious, research-heavy decision makers, trust-driven
- Pain points: Transparency, post-op support, coordination complexity
- Acquisition channels: Google Search, YouTube (procedure explainers), NRI community Facebook groups, Reddit (r/DentalImplants, r/syringe), Indian diaspora WhatsApp networks
- Revenue potential per patient: ₹3,00,000–₹12,00,000 per case

**Segment 2: High-Value Local Patients (Secondary)**
- Demographics: 30–60, Vijayawada/Andhra Pradesh, upper-middle to affluent
- Psychographics: Aspiring, image-conscious, prefer specialists over generalists, willing to pay for outcomes
- Pain points: Don't know specialist prosthodontics exists, conflate cosmetic dentistry with vanity
- Acquisition channels: Instagram, local Facebook, referrals from GPs, corporate wellness tie-ups
- Revenue potential per patient: ₹50,000–₹5,00,000 per case

**Segment 3: Referring General Dentists (Enabler Segment)**
- Demographics: GPs within 100km radius (Vijayawada, Guntur, Krishna, Prakasam districts)
- Psychographics: Want to retain patient relationship, need easy handoff, want to be seen as thorough
- Value proposition: They don't lose the patient, they gain a specialist partner
- Acquisition: Direct outreach, IDA chapter meetings, CE webinars
- Revenue multiplier: Each active referrer = 2–5 cases/month

---

### Go-To-Market Strategy

**Phase 1 — Digital Foundation (Months 1–3)**
- Launch Global Smile PWA with all 4 modules
- SEO content strategy: "dental implants cost India," "full mouth rehabilitation Vijayawada," "dental tourism India 2025"
- Google My Business optimization (multilingual: English + Telugu)
- YouTube channel: procedure walkthroughs, patient journey vlogs (consented), "Ask the Prosthodontist" series
- WhatsApp Business number as primary international contact point

**Phase 2 — Community Infiltration (Months 3–6)**
- NRI community outreach: partner with Telugu Association chapters in USA/UK/Australia
- Engage dental tourism Facebook groups as educational contributor (not advertiser)
- Reddit AMAs on r/DentalImplants, r/dentistry
- Influencer partnership: Indian health/lifestyle YouTubers in diaspora markets
- GP referral program launch: onboard first 20 referring dentists in AP

**Phase 3 — Paid Acquisition & Conversion Optimization (Months 6–12)**
- Google Ads: high-intent keywords ("dental implants India cost," "full arch restoration India")
- Meta Ads: Retargeting visitors who used the Tourism Calculator but didn't book
- A/B test landing pages: Cost-savings angle vs. Quality-trust angle
- Email nurture sequence: 7-touch journey from report download to consultation booking

**Phase 4 — Scale & Partnership (Year 2)**
- Partner with dental aggregator platforms as a verified premium listing
- Corporate dental tie-ups with IT companies (Hyderabad/Bengaluru corridor)
- International insurance panel empanelment (for diaspora patients with Indian-origin insurance)
- Explore franchise model: license "Global Smile" platform to other tier-2 specialist practices in India

---

### Revenue Model

| Stream | Model | Estimated Monthly (Year 1) |
|---|---|---|
| International patient cases | Fee-for-service (high-value) | ₹8,00,000–₹15,00,000 |
| Local specialist cases | Fee-for-service | ₹3,00,000–₹6,00,000 |
| Referral program (GP network) | Revenue share (5–8% to GP — optional, ethical) | Indirect, drives volume |
| Tourism package (coordination fee) | ₹5,000–₹15,000/patient coordination fee | ₹50,000–₹1,50,000 |
| Platform licensing (Year 2+) | SaaS to other practices | ₹20,000–₹50,000/month/practice |

---

### Positioning Statement

> **Global Smile is not a dental tourism booking site. It is a trust infrastructure for a specialist practice — making world-class prosthodontic care in Vijayawada as legible, verifiable, and accessible as booking a flight.**

**Brand Pillars:**
1. **Radical Transparency** — Every credential, every milestone, every cost — visible
2. **Specialist Depth** — Not general dentistry. Prosthodontics, maxillofacial, implantology at the highest level
3. **Cultural Intelligence** — Built for NRI patients who want India's value without India's opacity
4. **Continuity of Care** — The relationship doesn't end at discharge. Post-op is part of the product.

---

---

## README.md

### Global Smile — Integrated Patient Acquisition & Trust Engine

**Hackathon Project | MedTech + HealthTech Track**

---

#### What is Global Smile?

Global Smile is a full-stack web platform that transforms a specialized prosthodontic practice in Vijayawada, India into a transparent, globally accessible destination for high-complexity dental care. It targets two underserved markets simultaneously: international dental tourists seeking cost-effective specialist care, and local high-value patients who need to understand what specialist prosthodontics can do for them.

---

#### The Problem

Prosthodontists and maxillofacial specialists in Tier-2 Indian cities are invisible to international patients who desperately need them. International patients face:
- No cost transparency before committing to travel
- No way to verify clinical standards remotely
- No post-operative support coordination after returning home
- No clear picture of what treatment is even possible for their condition

Local patients face:
- No awareness that specialist prosthodontics exists beyond "the dentist"
- No easy referral pathway from their GP to a specialist
- High anxiety about cost with no framing of long-term value

---

#### The Solution — 4 Integrated Modules

**1. AI Treatment Visualizer**
Patients upload photos + describe their concern. Claude API analyzes the inputs against a curated treatment taxonomy and generates a plain-language "Value-Added Report" showing restorative possibilities, complexity tier, and a CTA to book a virtual consultation. No diagnosis. Maximum interest.

**2. Dental Tourism Calculator**
A dynamic module that computes the true cost of treatment + travel + stay in Vijayawada vs. New York, London, and Sydney. Outputs a bold "Net Savings" figure and generates a personalized 12-hour Quick-Start itinerary for Day 1 of the patient's first visit. Turns "is it worth it?" from a doubt into a data-backed yes.

**3. Trust-Chain Verification Dashboard**
A live, structured display of the practice's credentials, sterilization protocols, anonymized patient journey milestones, and post-operative care coordination. Designed to answer every trust objection an international patient has — without a single sales pitch.

**4. Local Referral Ecosystem**
A secure portal for referring general dentists to hand off complex cases with one-click simplicity. Includes patient consent management, encrypted record transfer, referral status tracking, and case closure summaries. Keeps the GP in the loop without violating privacy.

---

#### Tech Stack

- **Frontend:** React 18, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, Supabase
- **AI:** Anthropic Claude API (claude-sonnet-4)
- **Communications:** WhatsApp Business API, Resend
- **PDF:** jsPDF + html2canvas
- **Hosting:** Vercel + Railway
- **CDN:** Cloudflare

---

#### Market Context

- Global dental tourism market: $6.8B (2024) → $14.2B (2030), CAGR 13.1%
- India's cost advantage: 60–80% cheaper than USA/UK for equivalent specialist procedures
- Vijayawada: underrepresented in dental tourism despite strong clinical infrastructure and lower operating costs than Chennai/Hyderabad
- Primary international target: NRI/diaspora + Western patients aged 35–65 with complex restorative needs

---

#### Key Differentiators

- Not an aggregator. Not a booking platform. A practice-owned trust infrastructure.
- Specialist-only positioning (prosthodontics, not general dentistry)
- Post-operative continuity built into the product, not bolted on
- Designed for the NRI segment's specific psychology: they want India's value with Western-standard transparency
- Local referral network as a growth flywheel, not just a feature

---

#### Team Focus Areas for Build

| Track | Primary Owner |
|---|---|
| AI Visualizer + Report Generation | AI/ML Engineer + Backend |
| Tourism Calculator + Itinerary Engine | Full-Stack |
| Trust Dashboard + Credential CMS | Frontend + Design |
| Referral Portal + Auth + Privacy | Backend + Security |
| Branding, Copy, UX Flow | Design + Product |

---

#### Hackathon MVP Deliverables

- Functional AI Visualizer with Claude API integration
- Working Tourism Calculator with 3-city comparison and itinerary output
- Trust Dashboard with static + semi-dynamic content
- Referral portal with form submission, status tracker, and email notification
- Deployed, shareable URL
- 3-minute demo video

---

#### Vision

Every specialist practice in a Tier-2 Indian city deserves the infrastructure to compete globally. Global Smile is the proof of concept that trust, transparency, and technology — not location — determine where patients choose to heal.

---

### Prompt to Continue in a New Chat

---

> I'm building a hackathon project called **"Global Smile"** — an Integrated Patient Acquisition & Trust Engine for a specialized prosthodontic practice in Vijayawada, India targeting international dental tourists and local high-value patients.
>
> The platform has 4 modules:
> 1. **AI Treatment Visualizer** — patients upload photos + describe concerns → Claude API generates a "Value-Added Report" (no diagnosis, just restorative possibilities + complexity tier + consultation CTA)
> 2. **Dental Tourism Calculator** — compares total cost (treatment + travel + stay) in Vijayawada vs. New York, London, Sydney → outputs net savings + a 12-hour Day 1 itinerary
> 3. **Trust-Chain Verification Dashboard** — live credential wall, sterilization transparency, anonymized patient journey milestones, post-op care coordination
> 4. **Local Referral Ecosystem** — secure GP-to-specialist referral portal with encrypted record transfer, consent management, status tracking
>
> Tech stack: React 18 + Tailwind, Node.js + Supabase, Anthropic Claude API (claude-sonnet-4), WhatsApp Business API, Vercel + Railway.
>
> I have the PRD, market analysis, and README complete. Now I need you to help me with: **[INSERT NEXT TASK — e.g., "build the React component for the Tourism Calculator," or "write the Claude API prompt for the AI Visualizer," or "design the Supabase schema for the referral portal"]**