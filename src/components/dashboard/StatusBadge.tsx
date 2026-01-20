"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon, Check, AlertTriangle, XCircle, Clock, Zap } from "lucide-react";

type BadgeVariant = "success" | "warning" | "error" | "info" | "pending" | "active";

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  showIcon?: boolean;
  showDot?: boolean;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  className?: string;
}

const variantConfig: Record<
  BadgeVariant,
  { icon: LucideIcon; colors: string; dot: string; label: string }
> = {
  success: {
    icon: Check,
    colors: "bg-neon-mint/15 text-neon-mint border-neon-mint/30",
    dot: "bg-neon-mint",
    label: "Success",
  },
  warning: {
    icon: AlertTriangle,
    colors: "bg-energy-orange/15 text-energy-orange border-energy-orange/30",
    dot: "bg-energy-orange",
    label: "Warning",
  },
  error: {
    icon: XCircle,
    colors: "bg-rose/15 text-rose border-rose/30",
    dot: "bg-rose",
    label: "Error",
  },
  info: {
    icon: Zap,
    colors: "bg-electric-cyan/15 text-electric-cyan border-electric-cyan/30",
    dot: "bg-electric-cyan",
    label: "Info",
  },
  pending: {
    icon: Clock,
    colors: "bg-steel/15 text-steel border-steel/30",
    dot: "bg-steel",
    label: "Pending",
  },
  active: {
    icon: Zap,
    colors: "bg-quantum-violet/15 text-quantum-violet border-quantum-violet/30",
    dot: "bg-quantum-violet",
    label: "Active",
  },
};

const sizeConfig = {
  sm: {
    badge: "px-2 py-0.5 text-[10px]",
    icon: "h-3 w-3",
    dot: "h-1.5 w-1.5",
  },
  md: {
    badge: "px-2.5 py-1 text-xs",
    icon: "h-3.5 w-3.5",
    dot: "h-2 w-2",
  },
  lg: {
    badge: "px-3 py-1.5 text-sm",
    icon: "h-4 w-4",
    dot: "h-2.5 w-2.5",
  },
};

export function StatusBadge({
  variant,
  label,
  showIcon = false,
  showDot = true,
  size = "md",
  pulse = false,
  className,
}: StatusBadgeProps) {
  const config = variantConfig[variant];
  const sizes = sizeConfig[size];
  const Icon = config.icon;
  const displayLabel = label || config.label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border font-semibold",
        config.colors,
        sizes.badge,
        className
      )}
    >
      {showDot && (
        <span className="relative flex">
          {pulse && (
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                config.dot
              )}
            />
          )}
          <span className={cn("relative rounded-full", config.dot, sizes.dot)} />
        </span>
      )}
      {showIcon && !showDot && <Icon className={sizes.icon} />}
      {displayLabel}
    </span>
  );
}
