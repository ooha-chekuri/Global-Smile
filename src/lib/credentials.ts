export interface Credential {
  title: string;
  issuer: string;
  verifiedOn: string;
  verificationUrl?: string;
  category: "qualification" | "certification" | "membership";
}

export const CREDENTIALS: Credential[] = [
  {
    title: "MDS in Prosthodontics",
    issuer: "Dr. NTR University of Health Sciences, Vijayawada",
    verifiedOn: "2018",
    verificationUrl: "#",
    category: "qualification",
  },
  {
    title: "Fellow, International College of Prosthodontists",
    issuer: "ICP",
    verifiedOn: "2020",
    verificationUrl: "#",
    category: "membership",
  },
  {
    title: "ISO 9001:2025 Certification",
    issuer: "Bureau Veritas",
    verifiedOn: "2025",
    verificationUrl: "#",
    category: "certification",
  },
  {
    title: "NABH Accreditation (Hospital Standards)",
    issuer: "National Accreditation Board for Hospitals",
    verifiedOn: "2024",
    verificationUrl: "#",
    category: "certification",
  },
  {
    title: "Dental Council of India Registration",
    issuer: "DCI",
    verifiedOn: "2016",
    verificationUrl: "#",
    category: "qualification",
  },
  {
    title: "Member, Indian Prosthodontic Society",
    issuer: "IPS",
    verifiedOn: "2016",
    category: "membership",
  },
  {
    title: "Fellow, Academy of General Dentistry",
    issuer: "FAGD",
    verifiedOn: "2022",
    category: "membership",
  },
  {
    title: "Advanced Implantology Certification",
    issuer: "ITI International Team for Implantology",
    verifiedOn: "2021",
    category: "qualification",
  },
];

export const STERILIZATION_LOG = {
  isAllClear: true,
  lastAuditDate: "2026-05-10",
  nextAuditDate: "2026-05-17",
};
