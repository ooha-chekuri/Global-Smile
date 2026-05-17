ALTER TABLE "patients" ADD COLUMN "hashed_password" varchar(255);--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_email_unique" UNIQUE("email");