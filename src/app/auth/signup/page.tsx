"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Mail, Sparkles, Eye, EyeOff, User, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type CharacterPosition = {
  faceX: number;
  faceY: number;
  bodySkew: number;
};

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
}: {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const getPos = () => {
    if (!ref.current) return { x: 0, y: 0 };
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = getPos();

  return (
    <div
      ref={ref}
      className="rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: pupilColor,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const getPos = () => {
    if (!ref.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
  };

  const pos = getPos();

  return (
    <div
      ref={ref}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: size,
        height: isBlinking ? 2 : size,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: pupilSize,
            height: pupilSize,
            backgroundColor: pupilColor,
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

const ToothRow = ({
  count = 5,
  toothWidth = 8,
  toothHeight = 10,
}: {
  count?: number;
  toothWidth?: number;
  toothHeight?: number;
}) => (
  <div className="flex justify-center gap-px" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className="block rounded-b-[3px] border-x border-b border-black/10 bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]"
        style={{ width: toothWidth, height: toothHeight }}
      />
    ))}
  </div>
);

function calcPos(
  ref: React.RefObject<HTMLDivElement | null>,
  pointerX: number,
  pointerY: number,
): CharacterPosition {
  if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
  const r = ref.current.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 3;
  const dx = pointerX - cx;
  const dy = pointerY - cy;
  return {
    faceX: Math.max(-15, Math.min(15, dx / 20)),
    faceY: Math.max(-10, Math.min(10, dy / 30)),
    bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
  };
}

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const t = window.setTimeout(() => {
        setIsPurpleBlinking(true);
        window.setTimeout(() => {
          setIsPurpleBlinking(false);
          schedule();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const t = window.setTimeout(() => {
        setIsBlackBlinking(true);
        window.setTimeout(() => {
          setIsBlackBlinking(false);
          schedule();
        }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => window.clearTimeout(t);
  }, []);

  const pPos = calcPos(purpleRef, mouseX, mouseY);
  const bPos = calcPos(blackRef, mouseX, mouseY);
  const yPos = calcPos(yellowRef, mouseX, mouseY);
  const oPos = calcPos(orangeRef, mouseX, mouseY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!agree) {
      setError("You must agree to the Terms & Privacy Policy");
      return;
    }
    setLoading(true);
    console.log(`[Sign-Up] Initiating registration for: ${email}`);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.warn(`[Sign-Up] Registration API failed: ${data.error}`);
        throw new Error(data.error ?? "Sign up failed");
      }

      console.log("[Sign-Up] Registration successful. Initiating automatic sign-in...");

      const result = await signIn("credentials", {
        email,
        password,
        userType: "patient",
        redirect: false,
      });

      if (result?.error) {
        console.warn(`[Sign-Up] Automatic sign-in failed: ${result.error}`);
        throw new Error("Account created but login failed. Please sign in.");
      }

      console.log("[Sign-Up] Flow complete. Redirecting to /patient/dashboard...");
      router.push("/patient/dashboard");
      router.refresh();
    } catch (err) {
      console.error("[Sign-Up] Error encountered:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Characters */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground lg:flex">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <Sparkles className="size-4" />
            </div>
            <span>Global Smile</span>
          </div>
        </div>

        <div className="relative z-20 flex h-[500px] items-end justify-center">
          <div className="relative" style={{ width: 550, height: 400 }}>
            {/* Purple */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 70,
                width: 180,
                height: isFocused ? 440 : 400,
                backgroundColor: "#6C3FF5",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform: isFocused
                  ? `skewX(${pPos.bodySkew - 12}deg) translateX(40px)`
                  : `skewX(${pPos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: isFocused ? 55 : `${45 + pPos.faceX}px`,
                  top: isFocused ? 65 : `${40 + pPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={18} pupilSize={7} maxDistance={5} pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isFocused ? 3 : undefined}
                  forceLookY={isFocused ? 4 : undefined}
                />
                <EyeBall
                  size={18} pupilSize={7} maxDistance={5} pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isFocused ? 3 : undefined}
                  forceLookY={isFocused ? 4 : undefined}
                />
              </div>
            </div>

            {/* Black */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 240,
                width: 120,
                height: 310,
                backgroundColor: "#2D2D2D",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform: isFocused
                  ? `skewX(${bPos.bodySkew * 1.5 + 10}deg) translateX(20px)`
                  : `skewX(${bPos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: isFocused ? 32 : `${26 + bPos.faceX}px`,
                  top: isFocused ? 12 : `${32 + bPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16} pupilSize={6} maxDistance={4} pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={isFocused ? 0 : undefined}
                  forceLookY={isFocused ? -4 : undefined}
                />
                <EyeBall
                  size={16} pupilSize={6} maxDistance={4} pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={isFocused ? 0 : undefined}
                  forceLookY={isFocused ? -4 : undefined}
                />
              </div>
            </div>

            {/* Orange */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 0,
                width: 240,
                height: 200,
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transform: `skewX(${oPos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: `${82 + oPos.faceX}px`,
                  top: `${90 + oPos.faceY}px`,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
            </div>

            {/* Yellow */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 310,
                width: 140,
                height: 230,
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transform: `skewX(${yPos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: `${52 + yPos.faceX}px`,
                  top: `${40 + yPos.faceY}px`,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
              <div
                className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                style={{
                  left: `${40 + yPos.faceX}px`,
                  top: `${88 + yPos.faceY}px`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/70">
          <a href="/privacy" className="transition-colors hover:text-primary-foreground">Privacy Policy</a>
          <a href="#" className="transition-colors hover:text-primary-foreground">Terms of Service</a>
          <a href="mailto:hello@globalsmile.in" className="transition-colors hover:text-primary-foreground">Contact</a>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute right-1/4 top-1/4 size-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      {/* Right - Sign Up Form */}
      <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-[420px]">
          <div className="mb-12 flex items-center justify-center gap-2 text-lg font-semibold lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <span>Global Smile</span>
          </div>

          <div className="mb-10 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-sm text-muted-foreground">Join us on your smile journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="h-12 border-border/60 bg-background pl-10 focus:border-primary"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  className="h-12 border-border/60 bg-background pl-10 focus:border-primary"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone (optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="h-12 border-border/60 bg-background pl-10 focus:border-primary"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  required
                  minLength={6}
                  className="h-12 border-border/60 bg-background pr-10 focus:border-primary"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-1">
              <Checkbox
                id="agree"
                checked={agree}
                onCheckedChange={(value) => setAgree(value === true)}
              />
              <Label htmlFor="agree" className="text-xs font-normal leading-relaxed cursor-pointer">
                I agree to the{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                {" "}and{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
              </Label>
            </div>

            {error && (
              <div className="rounded-lg border border-red-900/30 bg-red-950/20 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <Button type="submit" className="h-12 w-full text-base font-medium" size="lg" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <Button
              variant="outline"
              className="h-12 w-full border-border/60 bg-background hover:bg-accent"
              type="button"
            >
              <Mail className="mr-2 size-5" />
              Sign up with Google
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="font-medium text-foreground hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
