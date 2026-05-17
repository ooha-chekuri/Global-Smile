import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const complexityTierEnum = pgEnum("complexity_tier", [
  "mild",
  "moderate",
  "complex",
]);

export const referralStatusEnum = pgEnum("referral_status", [
  "pending",
  "reviewing",
  "scheduled",
  "in_progress",
  "closed",
]);

export const milestoneStageEnum = pgEnum("milestone_stage", [
  "impressions",
  "temporaries",
  "final-fit",
  "follow-up",
]);

export const treatmentTypeEnum = pgEnum("treatment_type", [
  "full-arch",
  "implants-single",
  "veneers",
  "crowns-bridges",
  "maxillofacial",
]);

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  homeCity: varchar("home_city", { length: 255 }),
  consentPhotoUse: boolean("consent_photo_use").notNull().default(false),
  photoDeleteAfter: timestamp("photo_delete_after"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .notNull()
    .references(() => patients.id),
  concernText: text("concern_text").notNull(),
  photoUrl: varchar("photo_url", { length: 1024 }),
  complexityTier: complexityTierEnum("complexity_tier").notNull(),
  reportJson: text("report_json").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const dentists = pgTable("dentists", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  clinicName: varchar("clinic_name", { length: 255 }),
  city: varchar("city", { length: 255 }),
  registrationNumber: varchar("registration_number", { length: 255 }),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("dentist"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referringDentistId: integer("referring_dentist_id")
    .notNull()
    .references(() => dentists.id),
  patientName: varchar("patient_name", { length: 255 }).notNull(),
  patientEmail: varchar("patient_email", { length: 255 }),
  patientPhone: varchar("patient_phone", { length: 50 }),
  chiefComplaint: text("chief_complaint").notNull(),
  urgency: varchar("urgency", { length: 50 }).notNull().default("normal"),
  recordsUrl: varchar("records_url", { length: 1024 }),
  status: referralStatusEnum("status").notNull().default("pending"),
  closureSummary: text("closure_summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  patientCity: varchar("patient_city", { length: 255 }).notNull(),
  treatmentType: treatmentTypeEnum("treatment_type").notNull(),
  stage: milestoneStageEnum("stage").notNull(),
  isAnonymized: boolean("is_anonymized").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const consultationStatusEnum = pgEnum("consultation_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export const teleconsultations = pgTable("teleconsultations", {
  id: serial("id").primaryKey(),
  patientName: varchar("patient_name", { length: 255 }).notNull(),
  patientEmail: varchar("patient_email", { length: 255 }).notNull(),
  patientPhone: varchar("patient_phone", { length: 50 }),
  preferredDate: timestamp("preferred_date").notNull(),
  preferredTime: varchar("preferred_time", { length: 20 }).notNull(),
  reason: text("reason").notNull(),
  notes: text("notes"),
  status: consultationStatusEnum("status").notNull().default("pending"),
  meetingLink: varchar("meeting_link", { length: 1024 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
