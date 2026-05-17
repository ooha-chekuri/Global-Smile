CREATE TYPE "public"."consultation_status" AS ENUM('pending', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "teleconsultations" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_name" varchar(255) NOT NULL,
	"patient_email" varchar(255) NOT NULL,
	"patient_phone" varchar(50),
	"preferred_date" timestamp NOT NULL,
	"preferred_time" varchar(20) NOT NULL,
	"reason" text NOT NULL,
	"notes" text,
	"status" "consultation_status" DEFAULT 'pending' NOT NULL,
	"meeting_link" varchar(1024),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
