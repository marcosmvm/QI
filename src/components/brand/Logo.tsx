"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
}

// Seedling icon that forms an X shape
function SeedlingIcon({
  className,
  variant = "light"
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const gradientId = variant === "light" ? "gradient-icon-light" : "gradient-icon-dark";
  const innerColor = variant === "light" ? "#ffffff" : "#080c08";
  const gradientStart = variant === "light" ? "#059669" : "#22c55e";
  const gradientEnd = variant === "light" ? "#10b981" : "#4ade80";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="24" cy="24" r="24" fill={`url(#${gradientId})`}/>
      <path d="M24 38V18" stroke={innerColor} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M24 24C17.5 24 12.5 19 12.5 12.5C19 12.5 24 17.5 24 24Z" fill={innerColor}/>
      <path d="M24 24C30.5 24 35.5 19 35.5 12.5C29 12.5 24 17.5 24 24Z" fill={innerColor}/>

      <defs>
        <linearGradient id={gradientId} x1="0" y1="48" x2="48" y2="0">
          <stop offset="0%" stopColor={gradientStart}/>
          <stop offset="100%" stopColor={gradientEnd}/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
  size = "md",
  variant = "light"
}: LogoProps) {
  const sizes = {
    sm: { icon: "h-8 w-8", text: "text-lg", gap: "gap-2" },
    md: { icon: "h-10 w-10", text: "text-xl", gap: "gap-3" },
    lg: { icon: "h-12 w-12", text: "text-2xl", gap: "gap-3" },
    xl: { icon: "h-14 w-14", text: "text-3xl", gap: "gap-4" },
  };

  const s = sizes[size];

  // Text colors based on variant
  const xColor = variant === "light" ? "text-emerald-pro-600" : "text-xgrowth-500";
  const textColor = variant === "light" ? "text-light-text" : "text-white";

  return (
    <Link href="/" className={cn("flex items-center", s.gap, className)}>
      <SeedlingIcon className={s.icon} variant={variant} />
      {showText && (
        <span className={cn("font-bold tracking-tight", s.text, variant === "light" ? "font-figtree" : "font-sora")}>
          <span className={xColor}>X</span>
          <span className={textColor}>GrowthOS</span>
        </span>
      )}
    </Link>
  );
}

export function LogoIcon({
  className,
  variant = "light"
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <SeedlingIcon
      className={cn("h-10 w-10", className)}
      variant={variant}
    />
  );
}

// Full logo SVG for exports/downloads
export function LogoFull({ variant = "light" }: { variant?: "light" | "dark" }) {
  const gradientId = variant === "light" ? "gradient-full-light" : "gradient-full-dark";
  const innerColor = variant === "light" ? "#ffffff" : "#080c08";
  const xColor = variant === "light" ? "#059669" : "#22c55e";
  const textColor = variant === "light" ? "#0f172a" : "#ffffff";
  const gradientStart = variant === "light" ? "#059669" : "#22c55e";
  const gradientEnd = variant === "light" ? "#10b981" : "#4ade80";
  const fontFamily = variant === "light" ? "Figtree, sans-serif" : "Sora, sans-serif";

  return (
    <svg width="200" height="48" viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Icon */}
      <circle cx="24" cy="24" r="24" fill={`url(#${gradientId})`}/>
      <path d="M24 38V18" stroke={innerColor} strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M24 24C17.5 24 12.5 19 12.5 12.5C19 12.5 24 17.5 24 24Z" fill={innerColor}/>
      <path d="M24 24C30.5 24 35.5 19 35.5 12.5C29 12.5 24 17.5 24 24Z" fill={innerColor}/>

      {/* Wordmark */}
      <text x="56" y="32" fontFamily={fontFamily} fontWeight="700" fontSize="24" letterSpacing="-0.5">
        <tspan fill={xColor}>X</tspan>
        <tspan fill={textColor}>GrowthOS</tspan>
      </text>

      <defs>
        <linearGradient id={gradientId} x1="0" y1="48" x2="48" y2="0">
          <stop offset="0%" stopColor={gradientStart}/>
          <stop offset="100%" stopColor={gradientEnd}/>
        </linearGradient>
      </defs>
    </svg>
  );
}
