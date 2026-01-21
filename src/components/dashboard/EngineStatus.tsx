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

const statusColors = {
  operational: {
    dot: "bg-success",
    text: "text-success",
  },
  degraded: {
    dot: "bg-warning",
    text: "text-warning",
  },
  offline: {
    dot: "bg-error",
    text: "text-error",
  },
};

interface EngineStatusProps {
  engines: EngineStatusType[];
}

export function EngineStatus({ engines }: EngineStatusProps) {
  const operationalCount = engines.filter(e => e.status === "operational").length;

  return (
    <div className="rounded-lg border border-border bg-white p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">AI Engines</h3>
        <p className="text-xs text-foreground-muted">
          {operationalCount}/{engines.length} operational
        </p>
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
              className="flex items-center gap-3"
            >
              <Icon className="h-4 w-4 text-foreground-muted" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{engine.name}</p>
                <p className="text-xs text-foreground-muted">{config.description}</p>
              </div>
              <span className={cn("h-2 w-2 rounded-full", status.dot)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
