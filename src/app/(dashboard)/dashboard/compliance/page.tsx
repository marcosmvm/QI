"use client";

import { MetricsCard } from "@/components/dashboard";
import { cn } from "@/lib/utils";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Globe,
  Mail,
  RefreshCw,
} from "lucide-react";

// Mock domain health data
const mockDomains = [
  {
    domain: "outreach1.quantuminsights.io",
    score: 95,
    status: "healthy",
    lastCheck: "2 minutes ago",
  },
  {
    domain: "outreach2.quantuminsights.io",
    score: 88,
    status: "warning",
    lastCheck: "5 minutes ago",
  },
  {
    domain: "outreach3.quantuminsights.io",
    score: 92,
    status: "healthy",
    lastCheck: "3 minutes ago",
  },
];

const recentAlerts = [
  {
    type: "warning",
    message: "DMARC not configured for outreach2.quantuminsights.io",
    time: "2 hours ago",
  },
  {
    type: "success",
    message: "Domain outreach1.quantuminsights.io passed all health checks",
    time: "4 hours ago",
  },
  {
    type: "info",
    message: "Weekly compliance report generated",
    time: "1 day ago",
  },
];

export default function CompliancePage() {
  return (
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Compliance</h1>
        <p className="text-sm text-foreground-secondary mt-1">
          Domain health and deliverability monitoring
        </p>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Domains Monitored"
          value="3"
        />
        <MetricsCard
          title="Avg Health Score"
          value="92"
          suffix="%"
          change={2.5}
        />
        <MetricsCard
          title="DNC List Size"
          value="15,420"
        />
        <MetricsCard
          title="Deliverability"
          value="94.5"
          suffix="%"
          change={1.2}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Domain Health Table */}
        <div className="col-span-8 rounded-lg border border-border bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h3 className="text-base font-semibold text-foreground">Domain Health</h3>
              <p className="text-xs text-foreground-muted">Monitor your sending domains</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-primary hover:underline">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          <div className="divide-y divide-border">
            {mockDomains.map((domain) => (
              <div key={domain.domain} className="flex items-center px-6 py-4">
                <Globe className="h-4 w-4 text-foreground-muted mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{domain.domain}</p>
                  <p className="text-xs text-foreground-muted">Last check: {domain.lastCheck}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      domain.score >= 90 ? "text-success" : "text-warning"
                    )}
                  >
                    {domain.score}%
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium",
                      domain.status === "healthy" ? "text-success" : "text-warning"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        domain.status === "healthy" ? "bg-success" : "bg-warning"
                      )}
                    />
                    {domain.status === "healthy" ? "Healthy" : "Warning"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="col-span-4 rounded-lg border border-border bg-white">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Recent Alerts</h3>
            <p className="text-xs text-foreground-muted">{recentAlerts.length} alerts</p>
          </div>

          <div className="divide-y divide-border">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 px-6 py-4">
                {alert.type === "warning" ? (
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                ) : alert.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                ) : (
                  <Shield className="h-4 w-4 text-primary mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
