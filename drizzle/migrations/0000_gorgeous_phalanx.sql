CREATE TYPE "public"."complexity_tier" AS ENUM('mild', 'moderate', 'complex');--> statement-breakpoint
CREATE TYPE "public"."milestone_stage" AS ENUM('impressions', 'temporaries', 'final-fit', 'follow-up');--> statement-breakpoint
CREATE TYPE "public"."referral_status" AS ENUM('pending', 'reviewing', 'scheduled', 'in_progress', 'closed');--> statement-breakpoint
CREATE TYPE "public"."treatment_type" AS ENUM('full-arch', 'implants-single', 'veneers', 'crowns-bridges', 'maxillofacial');--> statement-breakpoint
CREATE TABLE "dentists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"clinic_name" varchar(255),
	"city" varchar(255),
	"registration_number" varchar(255),
	"hashed_password" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'dentist' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "dentists_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_city" varchar(255) NOT NULL,
	"treatment_type" "treatment_type" NOT NULL,
	"stage" "milestone_stage" NOT NULL,
	"is_anonymized" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"home_city" varchar(255),
	"consent_photo_use" boolean DEFAULT false NOT NULL,
	"photo_delete_after" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" serial PRIMARY KEY NOT NULL,
	"referring_dentist_id" integer NOT NULL,
	"patient_name" varchar(255) NOT NULL,
	"patient_email" varchar(255),
	"patient_phone" varchar(50),
	"chief_complaint" text NOT NULL,
	"urgency" varchar(50) DEFAULT 'normal' NOT NULL,
	"records_url" varchar(1024),
	"status" "referral_status" DEFAULT 'pending' NOT NULL,
	"closure_summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"concern_text" text NOT NULL,
	"photo_url" varchar(1024),
	"complexity_tier" "complexity_tier" NOT NULL,
	"report_json" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referring_dentist_id_dentists_id_fk" FOREIGN KEY ("referring_dentist_id") REFERENCES "public"."dentists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;