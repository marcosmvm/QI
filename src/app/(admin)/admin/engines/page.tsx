import { createClient } from "@/lib/supabase/server";
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
  Zap,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { EngineStatusCard } from "@/components/admin/EngineStatusCard";

export const dynamic = "force-dynamic";

type EngineName = "Guardian" | "Architect" | "Scientist" | "Hunter" | "Sentinel";
type EngineStatus = "operational" | "degraded" | "offline";

interface EngineInfo {
  name: EngineName;
  codename: string;
  description: string;
  webhookEndpoint: string;
  status: EngineStatus;
  lastHeartbeat: Date | null;
  executions24h: number;
  errors24h: number;
  avgExecutionTime: number | null;
}

// Engine configuration
const engineConfig: Record<
  EngineName,
  { codename: string; description: string; webhookEndpoint: string; icon: typeof Shield }
> = {
  Guardian: {
    codename: "A",
    description: "Compliance & domain health verification",
    webhookEndpoint: "/webhook/check-domain-health",
    icon: Shield,
  },
  Architect: {
    codename: "B",
    description: "AI-powered campaign design",
    webhookEndpoint: "/webhook/build-campaign",
    icon: Cpu,
  },
  Scientist: {
    codename: "C",
    description: "Campaign monitoring & optimization",
    webhookEndpoint: "/webhook/campaign-metrics",
    icon: FlaskConical,
  },
  Hunter: {
    codename: "G",
    description: "Reply-based lead expansion",
    webhookEndpoint: "/webhook/instantly-reply",
    icon: Target,
  },
  Sentinel: {
    codename: "H",
    description: "Website visitor intelligence",
    webhookEndpoint: "/webhook/visitor-identified",
    icon: Eye,
  },
};

// Fetch engine health from n8n or database
async function getEngineHealth(): Promise<EngineInfo[]> {
  // In production, this would query n8n API or engine_health table
  // For now, we'll simulate with realistic data

  const engines: EngineInfo[] = [
    {
      name: "Guardian",
      codename: "A",
      description: engineConfig.Guardian.description,
      webhookEndpoint: engineConfig.Guardian.webhookEndpoint,
      status: "operational",
      lastHeartbeat: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      executions24h: 847,
      errors24h: 0,
      avgExecutionTime: 1250,
    },
    {
      name: "Architect",
      codename: "B",
      description: engineConfig.Architect.description,
      webhookEndpoint: engineConfig.Architect.webhookEndpoint,
      status: "operational",
      lastHeartbeat: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      executions24h: 23,
      errors24h: 0,
      avgExecutionTime: 4500,
    },
    {
      name: "Scientist",
      codename: "C",
      description: engineConfig.Scientist.description,
      webhookEndpoint: engineConfig.Scientist.webhookEndpoint,
      status: "operational",
      lastHeartbeat: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      executions24h: 156,
      errors24h: 2,
      avgExecutionTime: 890,
    },
    {
      name: "Hunter",
      codename: "G",
      description: engineConfig.Hunter.description,
      webhookEndpoint: engineConfig.Hunter.webhookEndpoint,
      status: "operational",
      lastHeartbeat: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      executions24h: 312,
      errors24h: 0,
      avgExecutionTime: 2100,
    },
    {
      name: "Sentinel",
      codename: "H",
      description: engineConfig.Sentinel.description,
      webhookEndpoint: engineConfig.Sentinel.webhookEndpoint,
      status: "operational",
      lastHeartbeat: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
      executions24h: 89,
      errors24h: 0,
      avgExecutionTime: 1800,
    },
  ];

  return engines;
}

// Calculate system health overview
function getSystemHealth(engines: EngineInfo[]) {
  const operational = engines.filter((e) => e.status === "operational").length;
  const degraded = engines.filter((e) => e.status === "degraded").length;
  const offline = engines.filter((e) => e.status === "offline").length;
  const totalExecutions = engines.reduce((sum, e) => sum + e.executions24h, 0);
  const totalErrors = engines.reduce((sum, e) => sum + e.errors24h, 0);
  const errorRate = totalExecutions > 0 ? (totalErrors / totalExecutions) * 100 : 0;

  return {
    operational,
    degraded,
    offline,
    totalExecutions,
    totalErrors,
    errorRate,
    overallStatus: (
      offline > 0 ? "critical" : degraded > 0 ? "degraded" : "healthy"
    ) as "healthy" | "degraded" | "critical",
  };
}

export default async function EnginesPage() {
  const engines = await getEngineHealth();
  const systemHealth = getSystemHealth(engines);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Engine Monitoring</h1>
          <p className="text-steel mt-1">
            Monitor the health and performance of all AI engines
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-graphite text-silver rounded-lg hover:bg-midnight-blue/30 transition-colors">
          <RefreshCw className="h-4 w-4" />
          Refresh Status
        </button>
      </div>

      {/* System Health Overview */}
      <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-sora font-semibold text-white">
            System Health Overview
          </h2>
          <SystemStatusBadge status={systemHealth.overallStatus} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-neon-mint/10 border border-neon-mint/30 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-neon-mint" />
            </div>
            <p className="text-2xl font-sora font-bold text-neon-mint">
              {systemHealth.operational}
            </p>
            <p className="text-xs text-neon-mint">Operational</p>
          </div>

          <div className="text-center p-4 bg-energy-orange/10 border border-energy-orange/30 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-energy-orange" />
            </div>
            <p className="text-2xl font-sora font-bold text-energy-orange">
              {systemHealth.degraded}
            </p>
            <p className="text-xs text-energy-orange">Degraded</p>
          </div>

          <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <p className="text-2xl font-sora font-bold text-red-400">
              {systemHealth.offline}
            </p>
            <p className="text-xs text-red-400">Offline</p>
          </div>

          <div className="text-center p-4 bg-electric-cyan/10 border border-electric-cyan/30 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-electric-cyan" />
            </div>
            <p className="text-2xl font-sora font-bold text-electric-cyan">
              {systemHealth.totalExecutions.toLocaleString()}
            </p>
            <p className="text-xs text-electric-cyan">24h Executions</p>
          </div>

          <div className="text-center p-4 bg-quantum-violet/10 border border-quantum-violet/30 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-quantum-violet" />
            </div>
            <p className="text-2xl font-sora font-bold text-quantum-violet">
              {systemHealth.totalErrors}
            </p>
            <p className="text-xs text-quantum-violet">24h Errors</p>
          </div>

          <div className="text-center p-4 bg-steel/10 border border-steel/30 rounded-xl">
            <p className="text-2xl font-sora font-bold text-silver">
              {systemHealth.errorRate.toFixed(2)}%
            </p>
            <p className="text-xs text-steel mt-2">Error Rate</p>
          </div>
        </div>
      </div>

      {/* Engine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engines.map((engine) => (
          <EngineStatusCard
            key={engine.name}
            name={engine.name}
            codename={engine.codename}
            status={engine.status}
            lastHeartbeat={engine.lastHeartbeat}
            executions24h={engine.executions24h}
            errors24h={engine.errors24h}
          />
        ))}
      </div>

      {/* Engine Details Table */}
      <div className="mt-8 bg-midnight-blue/30 border border-graphite/50 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-graphite/50">
          <h3 className="text-lg font-sora font-semibold text-white">
            Engine Details
          </h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-graphite/50">
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Engine
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Webhook Endpoint
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                Avg. Execution Time
              </th>
              <th className="text-left text-xs font-medium text-steel uppercase tracking-wider px-6 py-4">
                24h Success Rate
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite/30">
            {engines.map((engine) => {
              const Icon = engineConfig[engine.name].icon;
              const successRate =
                engine.executions24h > 0
                  ? ((engine.executions24h - engine.errors24h) /
                      engine.executions24h) *
                    100
                  : 100;

              return (
                <tr
                  key={engine.name}
                  className="hover:bg-midnight-blue/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-electric-cyan" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {engine.name}
                        </p>
                        <p className="text-xs text-steel">
                          Engine {engine.codename}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <EngineStatusBadge status={engine.status} />
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs text-steel bg-deep-space/50 px-2 py-1 rounded">
                      {engine.webhookEndpoint}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-silver">
                      {engine.avgExecutionTime
                        ? `${(engine.avgExecutionTime / 1000).toFixed(1)}s`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        successRate >= 99
                          ? "text-neon-mint"
                          : successRate >= 95
                          ? "text-silver"
                          : "text-energy-orange"
                      }`}
                    >
                      {successRate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SystemStatusBadge({
  status,
}: {
  status: "healthy" | "degraded" | "critical";
}) {
  const config = {
    healthy: {
      label: "All Systems Operational",
      color: "text-neon-mint",
      bg: "bg-neon-mint/10",
      border: "border-neon-mint/30",
      icon: CheckCircle2,
    },
    degraded: {
      label: "Partial Degradation",
      color: "text-energy-orange",
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/30",
      icon: AlertTriangle,
    },
    critical: {
      label: "System Issues Detected",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: XCircle,
    },
  };

  const { label, color, bg, border, icon: Icon } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${bg} ${border} ${color}`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </span>
  );
}

function EngineStatusBadge({ status }: { status: EngineStatus }) {
  const config = {
    operational: {
      label: "Operational",
      color: "text-neon-mint",
      bg: "bg-neon-mint/10",
      border: "border-neon-mint/30",
    },
    degraded: {
      label: "Degraded",
      color: "text-energy-orange",
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/30",
    },
    offline: {
      label: "Offline",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
    },
  };

  const { label, color, bg, border } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full border ${bg} ${border} ${color}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "operational"
            ? "bg-neon-mint"
            : status === "degraded"
            ? "bg-energy-orange"
            : "bg-red-400"
        }`}
      />
      {label}
    </span>
  );
}
