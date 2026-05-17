"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Component as AnimatedCharactersLoginPage } from "@/components/ui/animated-characters-login-page";

const PATIENT_CREDENTIALS = {
  label: "Demo Patient",
  email: "patient@globalsmile.in",
  password: "demo1234",
  role: "Patient",
};

const DENTIST_CREDENTIALS = [
  {
    label: "Dr. Sharma",
    email: "dentist@globalsmile.in",
    password: "demo1234",
    role: "GP Dentist",
  },
  {
    label: "Dr. Patel",
    email: "specialist@globalsmile.in",
    password: "demo1234",
    role: "Prosthodontist",
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"patient" | "dentist">("patient");

  const handlePatientSubmit = useCallback(
    async (email: string, password: string, _remember: boolean) => {
      console.log(`[Sign-In] Initiating patient authentication for: ${email}`);
      const result = await signIn("credentials", {
        email,
        password,
        userType: "patient",
        redirect: false,
      });
      if (result?.error) {
        console.warn(`[Sign-In] Patient authentication failed: ${result.error}`);
        return "Invalid email or password";
      }
      console.log("[Sign-In] Patient authentication successful. Redirecting to /patient/dashboard...");
      router.push("/patient/dashboard");
      router.refresh();
    },
    [router]
  );

  const handleDentistSubmit = useCallback(
    async (email: string, password: string, _remember: boolean) => {
      console.log(`[Sign-In] Initiating dentist authentication for: ${email}`);
      const result = await signIn("credentials", {
        email,
        password,
        userType: "dentist",
        redirect: false,
      });
      if (result?.error) {
        console.warn(`[Sign-In] Dentist authentication failed: ${result.error}`);
        return "Invalid email or password";
      }
      console.log("[Sign-In] Dentist authentication successful. Redirecting to /referral/dashboard...");
      router.push("/referral/dashboard");
      router.refresh();
    },
    [router]
  );

  return (
    <div className="flex-1 flex">
      <AnimatedCharactersLoginPage
        key={tab}
        brandName="Global Smile"
        defaultEmail={tab === "patient" ? PATIENT_CREDENTIALS.email : ""}
        defaultPassword={tab === "patient" ? PATIENT_CREDENTIALS.password : ""}
        demoCredentials={tab === "patient" ? [PATIENT_CREDENTIALS] : DENTIST_CREDENTIALS}
        onSubmit={tab === "patient" ? handlePatientSubmit : handleDentistSubmit}
        tab={tab}
        onTabChange={setTab}
      />
    </div>
  );
}
