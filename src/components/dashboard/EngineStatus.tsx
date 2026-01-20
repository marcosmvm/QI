import { cn } from "@/lib/utils";
import { Shield, Cpu, FlaskConical, Target, Eye, Activity, MoreHorizontal } from "lucide-react";
import { type EngineStatus as EngineStatusType, type EngineName } from "@/types";

const engineConfig: Record<
  EngineName,
  { icon: typeof Shield; description: string; codename: string; color: string }
> = {
  Guardian: {
    icon: Shield,
    description: "Compliance & Domain Health",
    codename: "A",
    color: "#4ADE80",
  },
  Architect: {
    icon: Cpu,
    description: "AI Campaign Design",
    codename: "B",
    color: "#60A5FA",
  },
  Scientist: {
    icon: FlaskConical,
    description: "Campaign Optimization",
    codename: "C",
    color: "#F59E0B",
  },
  Hunter: {
    icon: Target,
    description: "Reply-Based Lead Expansion",
    codename: "G",
    color: "#EF4444",
  },
  Sentinel: {
    icon: Eye,
    description: "Website Visitor Intelligence",
    codename: "H",
    color: "#8B5CF6",
  },
};

const statusColors = {
  operational: {
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    label: "Online",
  },
  degraded: {
    dot: "bg-amber-500",
    text: "text-amber-600",
    bg: "bg-amber-50",
    label: "Degraded",
  },
  offline: {
    dot: "bg-red-500",
    text: "text-red-600",
    bg: "bg-red-50",
    label: "Offline",
  },
};

interface EngineStatusProps {
  engines: EngineStatusType[];
}

export function EngineStatus({ engines }: EngineStatusProps) {
  const operationalCount = engines.filter(e => e.status === "operational").length;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10">
            <Activity className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-slate-900">
              AI Engines
            </h3>
            <p className="text-xs text-slate-500">
              {operationalCount}/{engines.length} operational
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
          <MoreHorizontal className="h-5 w-5 text-slate-400" />
        </button>
      </div>

      {/* Status Summary */}
      <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-50 rounded-xl">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-sm font-medium text-emerald-700">All systems operational</span>
      </div>

      {/* Engine List */}
      <div className="space-y-3">
        {engines.map((engine) => {
          const config = engineConfig[engine.name];
          const status = statusColors[engine.status];
          const Icon = config.icon;

          return (
            <div
              key={engine.name}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${config.color}15` }}
              >
                <Icon className="h-5 w-5" style={{ color: config.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-slate-900 text-sm">{engine.name}</h4>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                    {config.codename}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{config.description}</p>
              </div>

              <div className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                status.bg,
                status.text
              )}>
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  status.dot,
                  engine.status === "operational" && "animate-pulse"
                )} />
                {status.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
