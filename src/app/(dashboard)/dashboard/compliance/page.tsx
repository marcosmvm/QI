"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { ProgressRing, StatusBadge } from "@/components/dashboard";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Globe,
  Mail,
  Lock,
  Server,
  Search,
  ExternalLink,
  TrendingUp,
  Activity,
  ArrowRight,
  Clock,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock domain health data
const mockDomains = [
  {
    domain: "outreach1.quantuminsights.io",
    score: 95,
    status: "healthy",
    lastCheck: "2 minutes ago",
    checks: {
      spf: true,
      dkim: true,
      dmarc: true,
      mx: true,
      blacklist: false,
      age: 730,
    },
  },
  {
    domain: "outreach2.quantuminsights.io",
    score: 88,
    status: "warning",
    lastCheck: "5 minutes ago",
    checks: {
      spf: true,
      dkim: true,
      dmarc: false,
      mx: true,
      blacklist: false,
      age: 365,
    },
  },
  {
    domain: "outreach3.quantuminsights.io",
    score: 92,
    status: "healthy",
    lastCheck: "3 minutes ago",
    checks: {
      spf: true,
      dkim: true,
      dmarc: true,
      mx: true,
      blacklist: false,
      age: 540,
    },
  },
];

const complianceMetrics = [
  { label: "Domains Monitored", value: "3", icon: Globe },
  { label: "Average Health Score", value: "92%", icon: Shield },
  { label: "DNC List Size", value: "15,420", icon: Mail },
  { label: "Last Full Scan", value: "Today 9:00 AM", icon: RefreshCw },
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

// Campaign compliance data
const campaignCompliance = [
  {
    id: "1",
    name: "Q1 Enterprise Outreach",
    status: "compliant",
    bounceRate: 1.5,
    complaintRate: 0.02,
    unsubscribeRate: 0.8,
    lastChecked: "2 hours ago",
  },
  {
    id: "2",
    name: "SaaS Decision Makers",
    status: "compliant",
    bounceRate: 2.0,
    complaintRate: 0.03,
    unsubscribeRate: 1.1,
    lastChecked: "3 hours ago",
  },
  {
    id: "3",
    name: "Healthcare IT Leaders",
    status: "warning",
    bounceRate: 3.2,
    complaintRate: 0.08,
    unsubscribeRate: 1.5,
    lastChecked: "1 hour ago",
  },
];

// Compliance trends
const complianceTrends = {
  deliverability: { current: 94.5, previous: 92.1, trend: "up" },
  bounceRate: { current: 1.8, previous: 2.1, trend: "down" },
  complaintRate: { current: 0.03, previous: 0.04, trend: "down" },
  dncCompliance: { current: 100, previous: 100, trend: "stable" },
};

export default function CompliancePage() {
  const [isChecking, setIsChecking] = useState(false);
  const [dncEmail, setDncEmail] = useState("");
  const [dncResult, setDncResult] = useState<{ checked: boolean; isOnDNC: boolean } | null>(null);

  const handleDNCCheck = async () => {
    if (!dncEmail) return;
    setIsChecking(true);

    // TODO: Replace with actual n8n webhook call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setDncResult({
      checked: true,
      isOnDNC: Math.random() > 0.7, // Simulate random result
    });
    setIsChecking(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return { bg: "bg-neon-mint/20", text: "text-neon-mint", border: "border-neon-mint/30" };
      case "warning":
        return { bg: "bg-energy-orange/20", text: "text-energy-orange", border: "border-energy-orange/30" };
      case "critical":
        return { bg: "bg-red-400/20", text: "text-red-400", border: "border-red-400/30" };
      default:
        return { bg: "bg-steel/20", text: "text-steel", border: "border-steel/30" };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-neon-mint";
    if (score >= 80) return "text-energy-orange";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen">
      <Header title="Compliance" subtitle="Guardian Engine - Domain health & compliance monitoring" />

      <div className="p-6 space-y-6">
        {/* Guardian Engine Status Banner */}
        <div className="rounded-xl border border-neon-mint/30 bg-gradient-to-r from-neon-mint/10 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-neon-mint/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-neon-mint" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-sora font-semibold text-white">Guardian Engine</h3>
                  <StatusBadge variant="success" label="Operational" pulse />
                </div>
                <p className="text-sm text-steel">Continuously monitoring compliance across all campaigns</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-steel">Overall Health Score</p>
                <p className="text-2xl font-bold text-neon-mint">92/100</p>
              </div>
              <ProgressRing value={92} size="md" color="mint" />
              <Link href="/dashboard/ai-engines/guardian">
                <Button variant="outline" size="sm" className="gap-2">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {complianceMetrics.map((metric, index) => (
            <div
              key={index}
              className="rounded-xl border border-graphite bg-midnight-blue/60 p-6"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-electric-cyan/10 border border-electric-cyan/30">
                  <metric.icon className="h-6 w-6 text-electric-cyan" />
                </div>
                <div>
                  <p className="text-sm text-steel">{metric.label}</p>
                  <p className="text-2xl font-sora font-bold text-white">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Domain health */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-electric-cyan" />
                  <h3 className="text-lg font-sora font-semibold text-white">
                    Domain Health Status
                  </h3>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh All
                </Button>
              </div>

              <div className="space-y-4">
                {mockDomains.map((domain) => {
                  const statusColors = getStatusColor(domain.status);
                  return (
                    <div
                      key={domain.domain}
                      className={cn(
                        "rounded-lg border p-4",
                        statusColors.border,
                        "bg-deep-space/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Globe className={cn("h-5 w-5", statusColors.text)} />
                          <div>
                            <p className="font-medium text-white">{domain.domain}</p>
                            <p className="text-sm text-steel">Last checked: {domain.lastCheck}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-steel">Health Score</p>
                            <p className={cn("text-2xl font-sora font-bold", getScoreColor(domain.score))}>
                              {domain.score}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "px-3 py-1 rounded-full text-sm font-medium capitalize",
                              statusColors.bg,
                              statusColors.text
                            )}
                          >
                            {domain.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-2">
                        {[
                          { key: "spf", label: "SPF", value: domain.checks.spf },
                          { key: "dkim", label: "DKIM", value: domain.checks.dkim },
                          { key: "dmarc", label: "DMARC", value: domain.checks.dmarc },
                          { key: "mx", label: "MX", value: domain.checks.mx },
                          { key: "blacklist", label: "Blacklist", value: !domain.checks.blacklist },
                          { key: "age", label: "Age", value: domain.checks.age >= 180 },
                        ].map((check) => (
                          <div
                            key={check.key}
                            className={cn(
                              "flex flex-col items-center justify-center p-2 rounded-lg",
                              check.value
                                ? "bg-neon-mint/10 border border-neon-mint/20"
                                : "bg-red-400/10 border border-red-400/20"
                            )}
                          >
                            {check.value ? (
                              <CheckCircle className="h-4 w-4 text-neon-mint" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                            <span className="text-xs text-steel mt-1">{check.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DNC Checker */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="h-5 w-5 text-electric-cyan" />
                <h3 className="text-lg font-sora font-semibold text-white">
                  Do Not Contact (DNC) Check
                </h3>
              </div>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel" />
                  <input
                    type="email"
                    value={dncEmail}
                    onChange={(e) => {
                      setDncEmail(e.target.value);
                      setDncResult(null);
                    }}
                    placeholder="Enter email address to check..."
                    className="w-full h-11 rounded-lg border border-graphite bg-deep-space pl-10 pr-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                  />
                </div>
                <Button onClick={handleDNCCheck} disabled={!dncEmail || isChecking}>
                  {isChecking ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    "Check"
                  )}
                </Button>
              </div>

              {dncResult && (
                <div
                  className={cn(
                    "mt-4 p-4 rounded-lg border flex items-center gap-3",
                    dncResult.isOnDNC
                      ? "bg-red-400/10 border-red-400/30"
                      : "bg-neon-mint/10 border-neon-mint/30"
                  )}
                >
                  {dncResult.isOnDNC ? (
                    <>
                      <XCircle className="h-5 w-5 text-red-400" />
                      <div>
                        <p className="font-medium text-red-400">On DNC List</p>
                        <p className="text-sm text-steel">
                          This email is on the Do Not Contact list and should not be emailed.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 text-neon-mint" />
                      <div>
                        <p className="font-medium text-neon-mint">Clear to Contact</p>
                        <p className="text-sm text-steel">
                          This email is not on the DNC list and is safe to include in campaigns.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent alerts */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Recent Alerts
              </h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-deep-space/50"
                  >
                    {alert.type === "warning" ? (
                      <AlertTriangle className="h-5 w-5 text-energy-orange shrink-0" />
                    ) : alert.type === "success" ? (
                      <CheckCircle className="h-5 w-5 text-neon-mint shrink-0" />
                    ) : (
                      <Shield className="h-5 w-5 text-electric-cyan shrink-0" />
                    )}
                    <div>
                      <p className="text-sm text-white">{alert.message}</p>
                      <p className="text-xs text-steel mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance checklist */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Compliance Checklist
              </h3>
              <div className="space-y-3">
                {[
                  { label: "CAN-SPAM compliant unsubscribe", done: true },
                  { label: "Physical address in footer", done: true },
                  { label: "Sender identity verified", done: true },
                  { label: "DNC list synced", done: true },
                  { label: "Bounce handling active", done: true },
                  { label: "Complaint monitoring", done: true },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-neon-mint" />
                    <span className="text-silver">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
              <h3 className="text-lg font-sora font-semibold text-white mb-4">
                Resources
              </h3>
              <div className="space-y-2">
                {[
                  { label: "CAN-SPAM Guidelines", href: "#" },
                  { label: "GDPR Compliance", href: "#" },
                  { label: "Email Deliverability Guide", href: "#" },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 text-sm text-silver hover:text-white hover:bg-deep-space transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Compliance Status */}
        <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-electric-cyan" />
              <h3 className="text-lg font-sora font-semibold text-white">
                Campaign Compliance Status
              </h3>
            </div>
            <Link
              href="/dashboard/campaigns"
              className="text-sm text-electric-cyan hover:text-cyan-light transition-colors flex items-center gap-1"
            >
              View all campaigns
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-graphite">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-steel">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-steel">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-steel">
                    Bounce Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-steel">
                    Complaint Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-steel">
                    Unsubscribe Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-steel">
                    Last Checked
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite">
                {campaignCompliance.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-deep-space/30 transition-colors">
                    <td className="px-4 py-4">
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="font-medium text-white hover:text-electric-cyan transition-colors"
                      >
                        {campaign.name}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge
                        variant={campaign.status === "compliant" ? "success" : "warning"}
                        label={campaign.status === "compliant" ? "Compliant" : "Warning"}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "font-medium",
                          campaign.bounceRate < 2
                            ? "text-neon-mint"
                            : campaign.bounceRate < 5
                            ? "text-energy-orange"
                            : "text-rose"
                        )}
                      >
                        {campaign.bounceRate}%
                      </span>
                      <span className="text-xs text-steel ml-1">(target &lt;2%)</span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "font-medium",
                          campaign.complaintRate < 0.05
                            ? "text-neon-mint"
                            : campaign.complaintRate < 0.1
                            ? "text-energy-orange"
                            : "text-rose"
                        )}
                      >
                        {campaign.complaintRate}%
                      </span>
                      <span className="text-xs text-steel ml-1">(target &lt;0.05%)</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-silver">{campaign.unsubscribeRate}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-steel">
                        <Clock className="h-3.5 w-3.5" />
                        {campaign.lastChecked}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Trends */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-steel">Deliverability</span>
              <TrendingUp className="h-4 w-4 text-neon-mint" />
            </div>
            <p className="text-2xl font-bold text-neon-mint">{complianceTrends.deliverability.current}%</p>
            <p className="text-xs text-steel">
              +{(complianceTrends.deliverability.current - complianceTrends.deliverability.previous).toFixed(1)}% from last week
            </p>
          </div>
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-steel">Bounce Rate</span>
              <TrendingUp className="h-4 w-4 text-neon-mint rotate-180" />
            </div>
            <p className="text-2xl font-bold text-neon-mint">{complianceTrends.bounceRate.current}%</p>
            <p className="text-xs text-steel">
              -{(complianceTrends.bounceRate.previous - complianceTrends.bounceRate.current).toFixed(1)}% from last week
            </p>
          </div>
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-steel">Complaint Rate</span>
              <TrendingUp className="h-4 w-4 text-neon-mint rotate-180" />
            </div>
            <p className="text-2xl font-bold text-neon-mint">{complianceTrends.complaintRate.current}%</p>
            <p className="text-xs text-steel">
              -{(complianceTrends.complaintRate.previous - complianceTrends.complaintRate.current).toFixed(2)}% from last week
            </p>
          </div>
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-steel">DNC Compliance</span>
              <CheckCircle className="h-4 w-4 text-neon-mint" />
            </div>
            <p className="text-2xl font-bold text-neon-mint">{complianceTrends.dncCompliance.current}%</p>
            <p className="text-xs text-steel">All contacts verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
