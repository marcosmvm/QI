import { cn } from "@/lib/utils";
import { Shield, Cpu, FlaskConical, Target, Eye } from "lucide-react";
import { type EngineStatus as EngineStatusType, type EngineName } from "@/types";

const engineConfig: Record<EngineName, { icon: typeof Shield; description: string }> = {
  Guardian: {
    icon: Shield,
    description: "Compliance & Deliverability",
  },
  Architect: {
    icon: Cpu,
    description: "Campaign Design",
  },
  Scientist: {
    icon: FlaskConical,
    description: "Optimization",
  },
  Hunter: {
    icon: Target,
    description: "Lead Expansion",
  },
  Sentinel: {
    icon: Eye,
    description: "Visitor Intelligence",
  },
};

// Brand Board v1.0 - Status Colors
const statusColors = {
  operational: {
    dot: "bg-emerald-pro-400",
    text: "text-emerald-pro-400",
  },
  degraded: {
    dot: "bg-energy-orange",
    text: "text-energy-orange",
  },
  offline: {
    dot: "bg-alert-red",
    text: "text-alert-red",
  },
};

interface EngineStatusProps {
  engines: EngineStatusType[];
}

// Brand Board v1.0 - Standard Card Pattern
export function EngineStatus({ engines }: EngineStatusProps) {
  const operationalCount = engines.filter(e => e.status === "operational").length;

  return (
    <div className="bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-xl p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">AI Engines</h3>
        <p className="text-sm text-slate-900 dark:text-slate-200">
          {operationalCount}/{engines.length} operational
        </p>
      </div>

      {/* Engine List */}
      <div className="space-y-4">
        {engines.map((engine) => {
          const config = engineConfig[engine.name];
          const status = statusColors[engine.status];
          const Icon = config.icon;

          return (
            <div
              key={engine.name}
              className="flex items-center gap-3"
            >
              <Icon className="h-5 w-5 text-slate-900 dark:text-slate-200" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{engine.name}</p>
                <p className="text-xs text-slate-900 dark:text-slate-200">{config.description}</p>
              </div>
              <span className={cn("h-2 w-2 rounded-full", status.dot)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
