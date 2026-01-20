"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-8 w-8", iconSize: "h-4 w-4", text: "text-base", subtext: "text-[10px]" },
    md: { icon: "h-10 w-10", iconSize: "h-5 w-5", text: "text-lg", subtext: "text-xs" },
    lg: { icon: "h-12 w-12", iconSize: "h-6 w-6", text: "text-xl", subtext: "text-sm" },
  };

  const s = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-gradient-to-br from-electric-cyan to-quantum-violet shadow-glow-sm",
          s.icon
        )}
      >
        <Zap className={cn("text-white", s.iconSize)} />
      </div>
      {showText && (
        <div>
          <h1 className={cn("font-sora font-bold text-white tracking-tight", s.text)}>
            Quantum
          </h1>
          <p className={cn("text-steel font-medium -mt-0.5", s.subtext)}>Insights</p>
        </div>
      )}
    </Link>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-cyan to-quantum-violet shadow-glow-sm",
        className
      )}
    >
      <Zap className="h-5 w-5 text-white" />
    </div>
  );
}
