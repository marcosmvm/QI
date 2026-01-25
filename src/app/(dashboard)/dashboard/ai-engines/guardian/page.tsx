"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Globe,
  Mail,
  Search,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Server,
  Lock,
  Zap,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Mock data for Guardian Engine
const overallHealth = {
  score: 98,
  status: "excellent",
  lastCheck: "3 minutes ago",
  nextCheck: "12 minutes",
};

const mailboxes = [
  {
    email: "outreach1@client.com",
    health: 99,
    inboxRate: 99.5,
    status: "good",
    lastCheck: "3 min ago",
  },
  {
    email: "outreach2@client.com",
    health: 98,
    inboxRate: 99.1,
    status: "good",
    lastCheck: "3 min ago",
  },
  {
    email: "sales@clientdomain.io",
    health: 97,
    inboxRate: 98.8,
    status: "good",
    lastCheck: "3 min ago",
  },
  {
    email: "reach@clientmail.co",
    health: 94,
    inboxRate: 97.2,
    status: "watch",
    lastCheck: "3 min ago",
  },
  {
    email: "contact@clientbrand.com",
    health: 99,
    inboxRate: 99.4,
    status: "good",
    lastCheck: "3 min ago",
  },
];

const dnsRecords = [
  { name: "SPF", status: "valid", value: "v=spf1 include:_spf..." },
  { name: "DKIM", status: "valid", value: "k=rsa; p=MIGfMA0GCS..." },
  { name: "DMARC", status: "valid", value: "v=DMARC1; p=quaranti.." },
  { name: "BIMI", status: "active", value: "Logo verified" },
];

const blacklistStatus = {
  checked: 85,
  status: "clear",
  lastCheck: "2 hours ago",
  nextCheck: "4 hours",
};

const recentAlerts = [
  {
    type: "info",
    message: "All clear - routine check passed",
    time: "Today 2:30 PM",
    resolved: true,
  },
  {
    type: "warning",
    message: "Warning: Gmail promo tab detected",
    time: "Today 9:15 AM",
    resolved: false,
  },
  {
    type: "info",
    message: "Blacklist check: All clear",
    time: "Yesterday",
    resolved: true,
  },
  {
    type: "critical",
    message: "ALERT: Outlook spam - RESOLVED",
    time: "3 days ago",
    resolved: true,
  },
];

const inboxPlacement = {
  gmail: { inbox: 95, promotions: 4, spam: 1 },
  outlook: { inbox: 92, junk: 5, other: 3 },
  yahoo: { inbox: 97, spam: 3 },
};

export default function GuardianPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dncEmail, setDncEmail] = useState("");
  const [dncResult, setDncResult] = useState<{ checked: boolean; isOnDNC: boolean } | null>(null);
  const [isCheckingDnc, setIsCheckingDnc] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsRefreshing(false);
  };

  const handleDNCCheck = async () => {
    if (!dncEmail) return;
    setIsCheckingDnc(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDncResult({
      checked: true,
      isOnDNC: Math.random() > 0.7,
    });
    setIsCheckingDnc(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "valid":
      case "active":
      case "excellent":
      case "clear":
        return { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/30" };
      case "watch":
      case "warning":
        return { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/30" };
      case "critical":
      case "invalid":
        return { bg: "bg-rose/10", text: "text-rose", border: "border-rose/30" };
      default:
        return { bg: "bg-steel/10", text: "text-slate-900 dark:text-slate-300", border: "border-steel/30" };
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">The Guardian</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">The Guardian</h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">Compliance & Deliverability Engine</p>
      </motion.div>

      <div className="space-y-6">
        {/* Engine Status Banner */}
        <motion.div variants={itemVariants} className="relative glass-premium p-6 overflow-hidden border-emerald-pro-400/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-pro-400/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-pro-400/5 to-transparent" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-pro-400/10 border border-emerald-pro-400/30">
                <Shield className="h-8 w-8 text-emerald-pro-400" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Guardian Engine</h2>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-pro-400/15 border border-emerald-pro-400/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-pro-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-pro-400"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-pro-400">ACTIVE</span>
                  </span>
                </div>
                <p className="text-slate-900 dark:text-slate-300 mt-1">Protecting your sender reputation 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-900 dark:text-slate-300">Last Check</p>
                <p className="text-slate-900 dark:text-white font-medium">{overallHealth.lastCheck}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-900 dark:text-slate-300">Next Check</p>
                <p className="text-slate-900 dark:text-white font-medium">{overallHealth.nextCheck}</p>
              </div>
              <Button
                variant="outline"
                className="gap-2 border-emerald-pro-400/30 hover:bg-emerald-pro-400/10"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                {isRefreshing ? "Checking..." : "Run Check"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Health Score and Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Overall Health Score - Larger card */}
          <div className="lg:col-span-1 glass-premium p-6">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-pro-600/40 to-transparent" />
            <h3 className="text-sm font-medium text-slate-900 dark:text-slate-300 mb-4">Overall Health Score</h3>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-graphite"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(overallHealth.score / 100) * 352} 352`}
                    className="text-emerald-pro-400"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-sora font-bold text-slate-900 dark:text-white">{overallHealth.score}</span>
                  <span className="text-sm text-slate-900 dark:text-slate-300">/100</span>
                </div>
              </div>
              <span className={cn(
                "mt-4 px-3 py-1 rounded-full text-sm font-medium uppercase",
                getStatusColor(overallHealth.status).bg,
                getStatusColor(overallHealth.status).text
              )}>
                {overallHealth.status}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-premium p-6">
              <div className="flex items-center justify-between mb-3">
                <Mail className="h-5 w-5 text-emerald-pro-600" />
                <span className="text-emerald-pro-400 text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> 0.4%
                </span>
              </div>
              <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">99.2%</p>
              <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">Inbox Placement</p>
              <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Target: &gt;98%</p>
            </div>

            <div className="glass-premium p-6">
              <div className="flex items-center justify-between mb-3">
                <AlertCircle className="h-5 w-5 text-emerald-pro-600" />
                <span className="text-emerald-pro-400 text-sm font-medium flex items-center gap-1">
                  <TrendingDown className="h-4 w-4" /> 0.1%
                </span>
              </div>
              <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">0.3%</p>
              <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">Spam Rate</p>
              <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Target: &lt;1%</p>
            </div>

            <div className="glass-premium p-6">
              <div className="flex items-center justify-between mb-3">
                <Activity className="h-5 w-5 text-emerald-pro-600" />
                <span className="text-slate-900 dark:text-slate-300 text-sm font-medium">Same</span>
              </div>
              <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">0.5%</p>
              <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">Bounce Rate</p>
              <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Target: &lt;2%</p>
            </div>
          </div>
        </motion.div>

        {/* Mailbox Health and DNS/Blacklist */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mailbox Health Table */}
          <div className="lg:col-span-2 glass-premium p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-pro-600/40 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Mailbox Health</h3>
              <Button variant="ghost" size="sm" className="text-emerald-pro-600 hover:text-emerald-pro-600/80">
                View All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-default dark:border-graphite/50">
                    <th className="text-left text-sm font-medium text-slate-900 dark:text-slate-300 pb-4">Mailbox</th>
                    <th className="text-center text-sm font-medium text-slate-900 dark:text-slate-300 pb-4">Health</th>
                    <th className="text-center text-sm font-medium text-slate-900 dark:text-slate-300 pb-4">Inbox Rate</th>
                    <th className="text-center text-sm font-medium text-slate-900 dark:text-slate-300 pb-4">Status</th>
                    <th className="text-right text-sm font-medium text-slate-900 dark:text-slate-300 pb-4">Last Check</th>
                  </tr>
                </thead>
                <tbody>
                  {mailboxes.map((mailbox, index) => {
                    const statusColors = getStatusColor(mailbox.status);
                    return (
                      <tr key={index} className="border-b border-border-default dark:border-graphite/30 last:border-0 hover:bg-emerald-pro-600/5 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("h-2 w-2 rounded-full", statusColors.bg.replace("/10", ""))} />
                            <span className="text-slate-900 dark:text-white font-medium">{mailbox.email}</span>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          <span className={cn("font-semibold", mailbox.health >= 95 ? "text-emerald-pro-400" : mailbox.health >= 90 ? "text-energy-orange" : "text-rose")}>
                            {mailbox.health}%
                          </span>
                        </td>
                        <td className="py-4 text-center">
                          <span className="text-slate-900 dark:text-slate-300">{mailbox.inboxRate}%</span>
                        </td>
                        <td className="py-4 text-center">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                            statusColors.bg,
                            statusColors.text
                          )}>
                            {mailbox.status === "watch" ? "Watch" : "Good"}
                          </span>
                        </td>
                        <td className="py-4 text-right text-sm text-slate-900 dark:text-slate-300">{mailbox.lastCheck}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* DNS Records and Blacklist */}
          <div className="space-y-6">
            {/* DNS Records */}
            <div className="glass-premium p-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">DNS Records</h3>
              <div className="space-y-3">
                {dnsRecords.map((record, index) => {
                  const statusColors = getStatusColor(record.status);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30">
                      <div className="flex items-center gap-3">
                        {record.status === "valid" || record.status === "active" ? (
                          <CheckCircle className="h-4 w-4 text-emerald-pro-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-rose" />
                        )}
                        <span className="font-medium text-slate-900 dark:text-white">{record.name}</span>
                      </div>
                      <span className={cn("text-xs px-2 py-0.5 rounded capitalize", statusColors.bg, statusColors.text)}>
                        {record.status}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 gap-2">
                <Server className="h-4 w-4" />
                Run DNS Audit
              </Button>
            </div>

            {/* Blacklist Status */}
            <div className="glass-premium p-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">Blacklist Status</h3>
              <div className="text-center py-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="h-6 w-6 text-emerald-pro-400" />
                  <span className="text-xl font-sora font-bold text-emerald-pro-400">ALL CLEAR</span>
                </div>
                <p className="text-sm text-slate-900 dark:text-slate-300">Checked: {blacklistStatus.checked} blacklists</p>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div>
                    <p className="text-slate-900 dark:text-slate-300">Last Check</p>
                    <p className="text-slate-900 dark:text-white">{blacklistStatus.lastCheck}</p>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-slate-300">Next Check</p>
                    <p className="text-slate-900 dark:text-white">{blacklistStatus.nextCheck}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <RefreshCw className="h-4 w-4" />
                Check Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Inbox Placement Test and DNC Checker */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inbox Placement Test Results */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Inbox Placement by Provider</h3>
              <Button variant="ghost" size="sm" className="text-emerald-pro-600 hover:text-emerald-pro-600/80">
                Run Test
              </Button>
            </div>

            <div className="space-y-6">
              {/* Gmail */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-medium">Gmail</span>
                  <span className="text-emerald-pro-400 font-semibold">{inboxPlacement.gmail.inbox}% Inbox</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-graphite/30">
                  <div className="bg-emerald-pro-400" style={{ width: `${inboxPlacement.gmail.inbox}%` }} />
                  <div className="bg-energy-orange" style={{ width: `${inboxPlacement.gmail.promotions}%` }} />
                  <div className="bg-rose" style={{ width: `${inboxPlacement.gmail.spam}%` }} />
                </div>
                <div className="flex justify-between mt-1 text-xs text-slate-900 dark:text-slate-300">
                  <span>Promotions: {inboxPlacement.gmail.promotions}%</span>
                  <span>Spam: {inboxPlacement.gmail.spam}%</span>
                </div>
              </div>

              {/* Outlook */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-medium">Outlook / Microsoft 365</span>
                  <span className="text-emerald-pro-400 font-semibold">{inboxPlacement.outlook.inbox}% Inbox</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-graphite/30">
                  <div className="bg-emerald-pro-400" style={{ width: `${inboxPlacement.outlook.inbox}%` }} />
                  <div className="bg-energy-orange" style={{ width: `${inboxPlacement.outlook.junk}%` }} />
                  <div className="bg-steel" style={{ width: `${inboxPlacement.outlook.other}%` }} />
                </div>
                <div className="flex justify-between mt-1 text-xs text-slate-900 dark:text-slate-300">
                  <span>Junk: {inboxPlacement.outlook.junk}%</span>
                  <span>Other: {inboxPlacement.outlook.other}%</span>
                </div>
              </div>

              {/* Yahoo */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-900 dark:text-white font-medium">Yahoo / AOL</span>
                  <span className="text-emerald-pro-400 font-semibold">{inboxPlacement.yahoo.inbox}% Inbox</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-graphite/30">
                  <div className="bg-emerald-pro-400" style={{ width: `${inboxPlacement.yahoo.inbox}%` }} />
                  <div className="bg-rose" style={{ width: `${inboxPlacement.yahoo.spam}%` }} />
                </div>
                <div className="flex justify-between mt-1 text-xs text-slate-900 dark:text-slate-300">
                  <span>Spam: {inboxPlacement.yahoo.spam}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 rounded-lg bg-energy-orange/10 border border-energy-orange/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-energy-orange mt-0.5" />
                <div>
                  <p className="text-sm text-slate-900 dark:text-white font-medium">Outlook showing higher junk placement</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300 mt-1">Reduce HTML formatting and image-to-text ratio</p>
                </div>
              </div>
            </div>
          </div>

          {/* DNC Checker */}
          <div className="glass-premium p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-5 w-5 text-emerald-pro-600" />
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Do Not Contact Check</h3>
            </div>

            <p className="text-sm text-slate-900 dark:text-slate-300 mb-4">
              Check if an email address is on your Do Not Contact list before adding to campaigns.
            </p>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-900 dark:text-slate-300" />
                <input
                  type="email"
                  value={dncEmail}
                  onChange={(e) => {
                    setDncEmail(e.target.value);
                    setDncResult(null);
                  }}
                  placeholder="Enter email address..."
                  className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space pl-10 pr-4 text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-300 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                />
              </div>
              <Button onClick={handleDNCCheck} disabled={!dncEmail || isCheckingDnc}>
                {isCheckingDnc ? (
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
                    ? "bg-rose/10 border-rose/30"
                    : "bg-emerald-pro-400/10 border-emerald-pro-400/30"
                )}
              >
                {dncResult.isOnDNC ? (
                  <>
                    <XCircle className="h-5 w-5 text-rose" />
                    <div>
                      <p className="font-medium text-rose">On DNC List</p>
                      <p className="text-sm text-slate-900 dark:text-slate-300">
                        This email should not be contacted.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 text-emerald-pro-400" />
                    <div>
                      <p className="font-medium text-emerald-pro-400">Clear to Contact</p>
                      <p className="text-sm text-slate-900 dark:text-slate-300">
                        This email is safe to include in campaigns.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Recent Alerts */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Recent Alerts</h4>
              <div className="space-y-2">
                {recentAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30"
                  >
                    {alert.type === "critical" ? (
                      <AlertTriangle className="h-4 w-4 text-rose mt-0.5" />
                    ) : alert.type === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-energy-orange mt-0.5" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-emerald-pro-400 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-white truncate">{alert.message}</p>
                      <p className="text-xs text-slate-900 dark:text-slate-300 mt-0.5">{alert.time}</p>
                    </div>
                    {alert.resolved && (
                      <span className="text-xs text-emerald-pro-400">Resolved</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
