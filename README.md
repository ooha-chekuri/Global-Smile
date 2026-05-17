# README.md

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

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Backend:** Next.js Route Handlers
- **Database:** Neon DB (Serverless Postgres)
- **ORM:** Drizzle ORM
- **Auth:** NextAuth.js (referral portal)
- **AI:** Gemini API
- **PDF:** jsPDF + html2canvas
- **Email:** Resend
- **WhatsApp:** WhatsApp Business API
- **Hosting:** Vercel
- **CDN:** Cloudflare (optional)

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
