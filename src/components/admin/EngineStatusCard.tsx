"use client";

import { cn } from "@/lib/utils";
import {
  Shield,
  Cpu,
  FlaskConical,
  Target,
  Eye,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
} from "lucide-react";
import Link from "next/link";

type EngineStatus = "operational" | "degraded" | "offline";
type EngineName = "Guardian" | "Architect" | "Scientist" | "Hunter" | "Sentinel";

interface EngineStatusCardProps {
  name: EngineName;
  codename: string;
  status: EngineStatus;
  lastHeartbeat: Date | null;
  executions24h: number;
  errors24h: number;
  className?: string;
}

const engineIcons: Record<EngineName, typeof Shield> = {
  Guardian: Shield,
  Architect: Cpu,
  Scientist: FlaskConical,
  Hunter: Target,
  Sentinel: Eye,
};

const engineColors: Record<EngineName, string> = {
  Guardian: "emerald-pro-600",
  Architect: "emerald-pro-500",
  Scientist: "emerald-pro-400",
  Hunter: "energy-orange",
  Sentinel: "emerald-pro-500",
};

const statusConfig: Record<
  EngineStatus,
  { icon: typeof CheckCircle2; color: string; label: string; bgColor: string }
> = {
  operational: {
    icon: CheckCircle2,
    color: "text-emerald-pro-400",
    label: "Operational",
    bgColor: "bg-emerald-pro-400/10",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-energy-orange",
    label: "Degraded",
    bgColor: "bg-energy-orange/10",
  },
  offline: {
    icon: XCircle,
    color: "text-red-400",
    label: "Offline",
    bgColor: "bg-red-500/10",
  },
};

function formatTimeAgo(date: Date | null): string {
  if (!date) return "Never";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function EngineStatusCard({
  name,
  codename,
  status,
  lastHeartbeat,
  executions24h,
  errors24h,
  className,
}: EngineStatusCardProps) {
  const Icon = engineIcons[name];
  const color = engineColors[name];
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  return (
    <Link
      href={`/admin/engines/${name.toLowerCase()}`}
      className={cn(
        "block rounded-xl border border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/30 p-4 transition-all duration-200 hover:border-border-default dark:border-graphite/80 hover:bg-light-bg-secondary dark:bg-midnight-blue/50",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-10 w-10 rounded-lg border flex items-center justify-center",
              `bg-${color}/10 border-${color}/30`
            )}
            style={{
              backgroundColor: `var(--color-${color}, #00D4FF)1a`,
              borderColor: `var(--color-${color}, #00D4FF)4d`,
            }}
          >
            <Icon
              className="h-5 w-5"
              style={{ color: `var(--color-${color}, #00D4FF)` }}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text dark:text-white">{name}</h3>
            <p className="text-xs text-light-text-muted dark:text-steel">Engine {codename}</p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2 py-1",
            statusInfo.bgColor
          )}
        >
          <StatusIcon className={cn("h-3.5 w-3.5", statusInfo.color)} />
          <span className={cn("text-xs font-medium", statusInfo.color)}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-light-text-muted dark:text-steel">Last Heartbeat</p>
          <p className="text-sm font-medium text-light-text-secondary dark:text-silver mt-0.5">
            {formatTimeAgo(lastHeartbeat)}
          </p>
        </div>
        <div>
          <p className="text-xs text-light-text-muted dark:text-steel">24h Executions</p>
          <p className="text-sm font-medium text-light-text-secondary dark:text-silver mt-0.5">
            {executions24h.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-light-text-muted dark:text-steel">24h Errors</p>
          <p
            className={cn(
              "text-sm font-medium mt-0.5",
              errors24h > 0 ? "text-energy-orange" : "text-light-text-secondary dark:text-silver"
            )}
          >
            {errors24h}
          </p>
        </div>
      </div>

      {status !== "operational" && (
        <div className="mt-3 flex items-center gap-2 text-xs text-energy-orange">
          <Activity className="h-3.5 w-3.5" />
          <span>Requires attention</span>
        </div>
      )}
    </Link>
  );
}

// Compact version for dashboard
export function EngineStatusCompact({
  name,
  status,
  errors24h,
}: {
  name: EngineName;
  status: EngineStatus;
  errors24h: number;
}) {
  const Icon = engineIcons[name];
  const statusInfo = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-light-text-muted dark:text-steel" />
        <span className="text-sm text-light-text-secondary dark:text-silver">{name}</span>
      </div>
      <div className="flex items-center gap-3">
        {errors24h > 0 && (
          <span className="text-xs text-energy-orange">{errors24h} errors</span>
        )}
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            status === "operational"
              ? "bg-emerald-pro-400"
              : status === "degraded"
              ? "bg-energy-orange"
              : "bg-red-400"
          )}
        />
      </div>
    </div>
  );
}
