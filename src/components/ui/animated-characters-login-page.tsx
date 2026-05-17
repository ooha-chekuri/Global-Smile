"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { Eye, EyeOff, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CharacterPosition = {
  faceX: number;
  faceY: number;
  bodySkew: number;
};

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!pupilRef.current || (forceLookX !== undefined && forceLookY !== undefined)) return;

      const pupil = pupilRef.current.getBoundingClientRect();
      const pupilCenterX = pupil.left + pupil.width / 2;
      const pupilCenterY = pupil.top + pupil.height / 2;
      const deltaX = event.clientX - pupilCenterX;
      const deltaY = event.clientY - pupilCenterY;
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
      const angle = Math.atan2(deltaY, deltaX);

      setPupilPosition({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [forceLookX, forceLookY, maxDistance]);

  const effectivePupilPosition =
    forceLookX !== undefined && forceLookY !== undefined
      ? { x: forceLookX, y: forceLookY }
      : pupilPosition;

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${effectivePupilPosition.x}px, ${effectivePupilPosition.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!eyeRef.current || (forceLookX !== undefined && forceLookY !== undefined)) return;

      const eye = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;
      const deltaX = event.clientX - eyeCenterX;
      const deltaY = event.clientY - eyeCenterY;
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
      const angle = Math.atan2(deltaY, deltaX);

      setPupilPosition({ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [forceLookX, forceLookY, maxDistance]);

  const effectivePupilPosition =
    forceLookX !== undefined && forceLookY !== undefined
      ? { x: forceLookX, y: forceLookY }
      : pupilPosition;

  return (
    <div
      ref={eyeRef}
      className="flex items-center justify-center rounded-full transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${effectivePupilPosition.x}px, ${effectivePupilPosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

interface ToothRowProps {
  count?: number;
  toothWidth?: number;
  toothHeight?: number;
  className?: string;
}

const ToothRow = ({ count = 5, toothWidth = 8, toothHeight = 10, className }: ToothRowProps) => (
  <div className={className} aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        className="block rounded-b-[3px] border-x border-b border-black/10 bg-white shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]"
        style={{ width: `${toothWidth}px`, height: `${toothHeight}px` }}
      />
    ))}
  </div>
);

type DemoCredential = {
  label: string;
  email: string;
  password: string;
  role?: string;
};

interface AnimatedCharactersLoginPageProps {
  brandName?: string;
  defaultEmail?: string;
  defaultPassword?: string;
  demoCredentials?: DemoCredential[];
  onSubmit?: (email: string, password: string, remember: boolean) => Promise<string | void>;
}

function calculateCharacterPosition(
  ref: RefObject<HTMLDivElement | null>,
  pointerX: number,
  pointerY: number,
): CharacterPosition {
  if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

  const rect = ref.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 3;
  const deltaX = pointerX - centerX;
  const deltaY = pointerY - centerY;
  const faceX = Math.max(-15, Math.min(15, deltaX / 20));
  const faceY = Math.max(-10, Math.min(10, deltaY / 30));
  const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

  return { faceX, faceY, bodySkew };
}

function LoginPage({
  brandName = "Global Smile",
  defaultEmail = "",
  defaultPassword = "",
  demoCredentials = [],
  onSubmit,
}: AnimatedCharactersLoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const [purplePos, setPurplePos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [blackPos, setBlackPos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [yellowPos, setYellowPos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [orangePos, setOrangePos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const lookingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPurplePos(calculateCharacterPosition(purpleRef, event.clientX, event.clientY));
      setBlackPos(calculateCharacterPosition(blackRef, event.clientX, event.clientY));
      setYellowPos(calculateCharacterPosition(yellowRef, event.clientX, event.clientY));
      setOrangePos(calculateCharacterPosition(orangeRef, event.clientX, event.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

    const scheduleBlink = () => {
      const blinkTimeout = window.setTimeout(() => {
        setIsPurpleBlinking(true);
        window.setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

    const scheduleBlink = () => {
      const blinkTimeout = window.setTimeout(() => {
        setIsBlackBlinking(true);
        window.setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (password.length === 0 || !showPassword) return;

    const peekInterval = window.setTimeout(() => {
      setIsPurplePeeking(true);
      window.setTimeout(() => setIsPurplePeeking(false), 800);
    }, Math.random() * 3000 + 2000);

    return () => window.clearTimeout(peekInterval);
  }, [password, showPassword, isPurplePeeking]);

  const handleFieldFocus = () => {
    setIsTyping(true);
    setIsLookingAtEachOther(true);

    if (lookingTimerRef.current) {
      window.clearTimeout(lookingTimerRef.current);
    }

    lookingTimerRef.current = window.setTimeout(() => {
      setIsLookingAtEachOther(false);
      lookingTimerRef.current = null;
    }, 800);
  };

  const handleFieldBlur = () => {
    setIsTyping(false);
    setIsLookingAtEachOther(false);
  };

  const handlePasswordVisibility = () => {
    setShowPassword((current) => {
      if (current) setIsPurplePeeking(false);
      return !current;
    });
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length === 0) setIsPurplePeeking(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const result = onSubmit
      ? await onSubmit(email, password, remember)
      : email === "erik@gmail.com" && password === "1234"
        ? undefined
        : "Invalid email or password. Please try again.";

    if (result) setError(result);
    setIsLoading(false);
  };

  const fillDemo = (credential: DemoCredential) => {
    setEmail(credential.email);
    setPassword(credential.password);
    setError("");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground lg:flex">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <Sparkles className="size-4" />
            </div>
            <span>{brandName}</span>
          </div>
        </div>

        <div className="relative z-20 flex h-[500px] items-end justify-center">
          <div className="relative" style={{ width: "550px", height: "400px" }}>
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "70px",
                width: "180px",
                height: isTyping || (password.length > 0 && !showPassword) ? "440px" : "400px",
                backgroundColor: "#6C3FF5",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform:
                  password.length > 0 && showPassword
                    ? "skewX(0deg)"
                    : isTyping || (password.length > 0 && !showPassword)
                      ? `skewX(${purplePos.bodySkew - 12}deg) translateX(40px)`
                      : `skewX(${purplePos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? "20px"
                      : isLookingAtEachOther
                        ? "55px"
                        : `${45 + purplePos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? "35px"
                      : isLookingAtEachOther
                        ? "65px"
                        : `${40 + purplePos.faceY}px`,
                }}
              >
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
              </div>
              <div
                className="absolute overflow-hidden rounded-b-full bg-[#2D2D2D] transition-all duration-700 ease-in-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? "39px"
                      : isLookingAtEachOther
                        ? "70px"
                        : `${62 + purplePos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? "72px"
                      : isLookingAtEachOther
                        ? "102px"
                        : `${78 + purplePos.faceY}px`,
                  width: "58px",
                  height: "18px",
                }}
              >
                <ToothRow count={5} toothWidth={9} toothHeight={9} className="flex justify-center gap-px" />
              </div>
            </div>

            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "240px",
                width: "120px",
                height: "310px",
                backgroundColor: "#2D2D2D",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform:
                  password.length > 0 && showPassword
                    ? "skewX(0deg)"
                    : isLookingAtEachOther
                      ? `skewX(${blackPos.bodySkew * 1.5 + 10}deg) translateX(20px)`
                      : isTyping || (password.length > 0 && !showPassword)
                        ? `skewX(${blackPos.bodySkew * 1.5}deg)`
                        : `skewX(${blackPos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? "10px"
                      : isLookingAtEachOther
                        ? "32px"
                        : `${26 + blackPos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? "28px"
                      : isLookingAtEachOther
                        ? "12px"
                        : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
              </div>
              <div
                className="absolute overflow-hidden rounded-b-full bg-white shadow-sm transition-all duration-700 ease-in-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? "31px"
                      : isLookingAtEachOther
                        ? "52px"
                        : `${46 + blackPos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? "62px"
                      : isLookingAtEachOther
                        ? "46px"
                        : `${64 + blackPos.faceY}px`,
                  width: "44px",
                  height: "14px",
                }}
              >
                <ToothRow count={4} toothWidth={8} toothHeight={8} className="flex justify-center gap-px" />
              </div>
            </div>

            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "0px",
                width: "240px",
                height: "200px",
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transform:
                  password.length > 0 && showPassword
                    ? "skewX(0deg)"
                    : `skewX(${orangePos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword ? "50px" : `${82 + orangePos.faceX}px`,
                  top:
                    password.length > 0 && showPassword ? "85px" : `${90 + orangePos.faceY}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
              </div>
              <div
                className="absolute overflow-hidden rounded-b-full bg-[#2D2D2D] transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword ? "64px" : `${96 + orangePos.faceX}px`,
                  top:
                    password.length > 0 && showPassword ? "116px" : `${122 + orangePos.faceY}px`,
                  width: "72px",
                  height: "22px",
                }}
              >
                <ToothRow count={6} toothWidth={9} toothHeight={10} className="flex justify-center gap-px" />
              </div>
            </div>

            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "310px",
                width: "140px",
                height: "230px",
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transform:
                  password.length > 0 && showPassword
                    ? "skewX(0deg)"
                    : `skewX(${yellowPos.bodySkew}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword ? "20px" : `${52 + yellowPos.faceX}px`,
                  top:
                    password.length > 0 && showPassword ? "35px" : `${40 + yellowPos.faceY}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="#2D2D2D"
                  forceLookX={password.length > 0 && showPassword ? -5 : undefined}
                  forceLookY={password.length > 0 && showPassword ? -4 : undefined}
                />
              </div>
              <div
                className="absolute overflow-hidden rounded-b-full bg-[#2D2D2D] transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword ? "14px" : `${38 + yellowPos.faceX}px`,
                  top:
                    password.length > 0 && showPassword ? "84px" : `${84 + yellowPos.faceY}px`,
                  width: "74px",
                  height: "24px",
                }}
              >
                <ToothRow count={6} toothWidth={9} toothHeight={11} className="flex justify-center gap-px" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/70">
          <a href="/privacy" className="transition-colors hover:text-primary-foreground">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-primary-foreground">
            Terms of Service
          </a>
          <a href="mailto:hello@globalsmile.in" className="transition-colors hover:text-primary-foreground">
            Contact
          </a>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute right-1/4 top-1/4 size-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-[420px]">
          <div className="mb-12 flex items-center justify-center gap-2 text-lg font-semibold lg:hidden">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="size-4 text-primary" />
            </div>
            <span>{brandName}</span>
          </div>

          <div className="mb-10 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome back!</h1>
            <p className="text-sm text-muted-foreground">Please enter your details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="dentist@globalsmile.in"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                onFocus={handleFieldFocus}
                onBlur={handleFieldBlur}
                required
                className="h-12 border-border/60 bg-background focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(event) => handlePasswordChange(event.target.value)}
                  onFocus={handleFieldFocus}
                  onBlur={handleFieldBlur}
                  required
                  className="h-12 border-border/60 bg-background pr-10 focus:border-primary"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(value) => setRemember(value === true)}
                />
                <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">
                  Remember for 30 days
                </Label>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="rounded-lg border border-red-900/30 bg-red-950/20 p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <Button type="submit" className="h-12 w-full text-base font-medium" size="lg" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Log in"}
            </Button>
          </form>

          <div className="mt-6">
            <Button variant="outline" className="h-12 w-full border-border/60 bg-background hover:bg-accent" type="button">
              <Mail className="mr-2 size-5" />
              Log in with Google
            </Button>
          </div>

          {demoCredentials.length > 0 && (
            <div className="mt-8 space-y-2 border-t border-border pt-6">
              {demoCredentials.map((credential) => (
                <button
                  key={credential.email}
                  type="button"
                  onClick={() => fillDemo(credential)}
                  className="w-full rounded-lg border border-dashed border-primary/25 bg-primary/5 px-4 py-3 text-left transition-colors hover:bg-primary/10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{credential.label}</p>
                      {credential.role && (
                        <p className="text-xs text-muted-foreground">{credential.role}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-muted-foreground">{credential.email}</p>
                      <p className="text-xs font-mono text-muted-foreground">{credential.password}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-foreground hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Component = LoginPage;
