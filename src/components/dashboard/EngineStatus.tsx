import { cn } from "@/lib/utils";
import { Shield, Cpu, FlaskConical, Target, Eye } from "lucide-react";
import { type EngineStatus as EngineStatusType, type EngineName } from "@/types";

const engineConfig: Record<
  EngineName,
  { icon: typeof Shield; description: string; codename: string }
> = {
  Guardian: {
    icon: Shield,
    description: "Compliance & Domain Health",
    codename: "A",
  },
  Architect: {
    icon: Cpu,
    description: "AI Campaign Design",
    codename: "B",
  },
  Scientist: {
    icon: FlaskConical,
    description: "Campaign Optimization",
    codename: "C",
  },
  Hunter: {
    icon: Target,
    description: "Reply-Based Lead Expansion",
    codename: "G",
  },
  Sentinel: {
    icon: Eye,
    description: "Website Visitor Intelligence",
    codename: "H",
  },
};

const statusColors = {
  operational: {
    dot: "bg-neon-mint",
    text: "text-neon-mint",
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/20",
    label: "Operational",
  },
  degraded: {
    dot: "bg-energy-orange",
    text: "text-energy-orange",
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/20",
    label: "Degraded",
  },
  offline: {
    dot: "bg-red-400",
    text: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    label: "Offline",
  },
};

interface EngineStatusProps {
  engines: EngineStatusType[];
}

export function EngineStatus({ engines }: EngineStatusProps) {
  return (
    <div className="rounded-xl border border-graphite bg-midnight-blue/60 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-sora font-semibold text-white">
          Engine Status
        </h3>
        <div className="flex items-center gap-2 text-xs text-steel">
          <span className="h-2 w-2 rounded-full bg-neon-mint animate-pulse" />
          Last checked: Just now
        </div>
      </div>

      <div className="space-y-3">
        {engines.map((engine) => {
          const config = engineConfig[engine.name];
          const status = statusColors[engine.status];
          const Icon = config.icon;

          return (
            <div
              key={engine.name}
              className={cn(
                "flex items-center gap-4 rounded-lg border p-4 transition-all duration-200",
                status.border,
                status.bg,
                "hover:border-electric-cyan/30"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  "bg-deep-space/50 border border-graphite"
                )}
              >
                <Icon className={cn("h-5 w-5", status.text)} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-deep-space/50 text-steel">
                    {config.codename}
                  </span>
                  <h4 className="font-medium text-white">{engine.name}</h4>
                </div>
                <p className="text-sm text-steel truncate">{config.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", status.dot)} />
                <span className={cn("text-sm font-medium", status.text)}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
