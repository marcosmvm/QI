import { cn } from "@/lib/utils";
import { Shield, Cpu, FlaskConical, Target, Eye, Activity } from "lucide-react";
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
    dot: "bg-emerald",
    text: "text-emerald",
    bg: "bg-emerald/10",
    border: "border-emerald/20",
    label: "Operational",
  },
  degraded: {
    dot: "bg-accent-yellow",
    text: "text-accent-yellow",
    bg: "bg-accent-yellow/10",
    border: "border-accent-yellow/20",
    label: "Degraded",
  },
  offline: {
    dot: "bg-rose",
    text: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/20",
    label: "Offline",
  },
};

interface EngineStatusProps {
  engines: EngineStatusType[];
}

export function EngineStatus({ engines }: EngineStatusProps) {
  const operationalCount = engines.filter(e => e.status === "operational").length;

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6 transition-all duration-300 hover:border-primary-blue/20 hover:shadow-card-hover">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-blue/10 border border-primary-blue/20">
            <Activity className="h-5 w-5 text-primary-blue" />
          </div>
          <div>
            <h3 className="text-lg font-poppins font-semibold text-white">
              Engine Status
            </h3>
            <p className="text-xs text-steel">
              {operationalCount}/{engines.length} engines active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-steel bg-deep-space/50 px-3 py-1.5 rounded-lg border border-white/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
          </span>
          Live
        </div>
      </div>

      <div className="space-y-2.5">
        {engines.map((engine) => {
          const config = engineConfig[engine.name];
          const status = statusColors[engine.status];
          const Icon = config.icon;

          return (
            <div
              key={engine.name}
              className={cn(
                "flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 group",
                status.border,
                status.bg,
                "hover:border-primary-blue/30 hover:bg-primary-blue/5"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  "bg-deep-space/60 border border-white/10 group-hover:border-white/20 transition-colors"
                )}
              >
                <Icon className={cn("h-5 w-5", status.text)} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-steel border border-white/5">
                    {config.codename}
                  </span>
                  <h4 className="font-medium text-white">{engine.name}</h4>
                </div>
                <p className="text-sm text-steel truncate mt-0.5">{config.description}</p>
              </div>

              <div className="flex items-center gap-2.5 bg-deep-space/40 px-3 py-1.5 rounded-lg border border-white/5">
                <span className={cn(
                  "h-2 w-2 rounded-full",
                  status.dot,
                  engine.status === "operational" && "animate-pulse"
                )} />
                <span className={cn("text-xs font-semibold", status.text)}>
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
