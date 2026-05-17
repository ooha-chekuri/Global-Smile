"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

function PatientLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      userType: "patient",
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/portal/dashboard");
    router.refresh();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            placeholder="Your password"
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-teal-600 hover:text-teal-700 font-medium">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"patient" | "dentist">("patient");

  const handleDentistSubmit = useCallback(
    async (email: string, password: string) => {
      const result = await signIn("credentials", {
        email,
        password,
        userType: "dentist",
        redirect: false,
      });
      if (result?.error) return "Invalid email or password";
      router.push("/referral/dashboard");
      router.refresh();
      return undefined;
    },
    [router]
  );

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setTab("patient")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === "patient"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            I&apos;m a Patient
          </button>
          <button
            onClick={() => setTab("dentist")}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === "dentist"
                ? "bg-white text-teal-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            I&apos;m a Dentist
          </button>
        </div>

        {tab === "patient" ? (
          <div className="bg-white border rounded-xl p-8 shadow-sm">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">Patient Sign In</h1>
              <p className="text-sm text-gray-500 mt-1">
                Access your reports and consultations
              </p>
            </div>
            <PatientLogin />
          </div>
        ) : (
          <AnimatedCharactersLoginPage
            brandName="Global Smile"
            demoCredentials={DEMO_CREDENTIALS}
            onSubmit={handleDentistSubmit}
          />
        )}
      </div>
    </div>
  );
}
