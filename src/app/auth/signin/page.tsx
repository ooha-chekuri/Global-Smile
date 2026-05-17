"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Component as AnimatedCharactersLoginPage } from "@/components/ui/animated-characters-login-page";

const DEMO_CREDENTIALS = [
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

  const handleSubmit = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return "Invalid email or password";
    }

    router.push("/referral/dashboard");
    router.refresh();
  };

  return (
    <AnimatedCharactersLoginPage
      brandName="Global Smile"
      demoCredentials={DEMO_CREDENTIALS}
      onSubmit={handleSubmit}
    />
  );
}
