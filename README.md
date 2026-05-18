# Global Smile

Integrated patient acquisition, trust, and care-navigation platform for specialist prosthodontics in Vijayawada, India.

Global Smile helps international dental tourists, local patients, and referring dentists understand specialist treatment possibilities, compare costs, verify clinical trust signals, and move into a guided consultation or referral flow.

## Core Modules

### AI Treatment Visualizer

Patients upload smile photos, describe their concern, and receive an educational Value-Added Report. The report includes concern category, complexity tier, restorative readiness score, possible treatment pathways, clinical disclaimers, uploaded images, and a downloadable PDF.

The report is educational only and does not provide diagnosis or treatment prescription.

### Patient Journey Portal

Authenticated patients can continue through a guided flow with stage tracking, report history, visualizer access, treatment-cost context, and next-step calls to action.

### Dental Tourism Calculator

The calculator compares estimated treatment, travel, hotel, and companion costs for Vijayawada against international benchmark cities. It presents potential savings and itinerary-oriented planning context.

### Trust Portal

The trust experience surfaces credentials, sterilization standards, clinical milestones, patient proof points, and practice credibility signals in a structured way for patients evaluating care remotely.

### Referral Ecosystem

General dentists can access a protected GP portal for referral workflows, patient handoff, referral tracking, and status visibility.

### Animated Authentication

The sign-in experience uses a custom animated character login page with shadcn-style UI primitives and NextAuth credentials login.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- Styling: Tailwind CSS 4
- UI primitives: shadcn-style components, Radix UI, lucide-react
- Animation: Framer Motion and CSS-driven interactive UI
- Auth: NextAuth.js
- Database: Neon Serverless Postgres
- ORM: Drizzle ORM
- AI: Gemini API
- PDF: jsPDF and html2canvas
- Email: Resend
- Payments: Razorpay
- File storage: Vercel Blob with local public fallback

## Key Routes

- `/` - main marketing entry
- `/auth/signin` - animated sign-in page
- `/auth/signup` - patient/doctor signup
- `/visualizer` - AI report generation flow
- `/calculator` - dental tourism cost comparison
- `/trust` - trust and verification portal
- `/teleconsultation` - virtual consultation booking
- `/referral/dashboard` - GP referral dashboard
- `/patient/dashboard` - patient journey dashboard

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Environment Variables

Create a `.env` file with the project secrets used by the app:

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=
RESEND_API_KEY=
BLOB_READ_WRITE_TOKEN=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
```

`BLOB_READ_WRITE_TOKEN` is optional for local development. When it is missing, uploaded images are written to `public/temp-uploads`.

## Database

Drizzle schema lives in `drizzle/schema.ts`.

Useful commands:

```bash
npm run seed
npm run seed-milestones
npm run seed-all
```

## PDF Reports

The Value-Added Report PDF includes:

- Patient name and report date
- Uploaded smile photos
- Patient concern summary
- Analysis summary
- Possible treatment pathways
- Educational note
- Disclaimer
- Clickable consultation CTA

## Product Positioning

Global Smile is not a generic dental aggregator. It is practice-owned trust infrastructure for specialist prosthodontic care, built around transparency, education, and continuity from first interest to consultation and referral.
