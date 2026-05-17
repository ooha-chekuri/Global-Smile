"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  SignIn,
  User,
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
  IdentificationBadge,
} from "@phosphor-icons/react";

const DEMO_CREDENTIALS = [
  {
    label: "GP Dentist",
    email: "dentist@globalsmile.in",
    password: "demo1234",
    name: "Dr. Sharma",
    role: "GP Dentist",
  },
  {
    label: "Specialist",
    email: "specialist@globalsmile.in",
    password: "demo1234",
    name: "Dr. Patel",
    role: "Prosthodontist",
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/referral/dashboard");
    router.refresh();
  };

  const fillDemo = (creds: typeof DEMO_CREDENTIALS[number]) => {
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gray-50">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-teal-600 mb-6 transition-colors"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white mb-4">
              <SignIn size={24} weight="bold" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">GP Portal Sign In</h1>
            <p className="text-sm text-gray-500 mt-1">
              Access the referral ecosystem for general dentists
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  weight="bold"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@clinic.com"
                  required
                  className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  weight="bold"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-gray-300 pl-10 pr-10 py-2.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Signing in...
                </>
              ) : (
                <>
                  <SignIn size={18} weight="bold" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* ── Demo Credentials ── */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <IdentificationBadge size={16} className="text-amber-600" weight="fill" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Demo Credentials
              </p>
            </div>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map((creds) => (
                <button
                  key={creds.email}
                  type="button"
                  onClick={() => fillDemo(creds)}
                  className="w-full text-left rounded-xl border border-dashed border-amber-200 bg-amber-50/50 px-4 py-3 hover:bg-amber-50 hover:border-amber-300 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors">
                        {creds.name}
                      </p>
                      <p className="text-xs text-gray-400">{creds.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-gray-500">{creds.email}</p>
                      <p className="text-xs font-mono text-gray-400">{creds.password}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Click a demo account to auto-fill, then sign in
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
