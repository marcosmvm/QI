"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MetricsCard } from "@/components/dashboard";
import { cn } from "@/lib/utils";
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Globe,
  RefreshCw,
} from "lucide-react";

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

// Mock domain health data
const mockDomains = [
  {
    domain: "outreach1.xgrowthos.com",
    score: 95,
    status: "healthy",
    lastCheck: "2 minutes ago",
  },
  {
    domain: "outreach2.xgrowthos.com",
    score: 88,
    status: "warning",
    lastCheck: "5 minutes ago",
  },
  {
    domain: "outreach3.xgrowthos.com",
    score: 92,
    status: "healthy",
    lastCheck: "3 minutes ago",
  },
];

const recentAlerts = [
  {
    type: "warning",
    message: "DMARC not configured for outreach2.xgrowthos.com",
    time: "2 hours ago",
  },
  {
    type: "success",
    message: "Domain outreach1.xgrowthos.com passed all health checks",
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
          <span className="text-emerald-pro-600">Compliance</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Compliance</h1>
        <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">
          Domain health and deliverability monitoring
        </p>
      </motion.div>

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

      <motion.div variants={itemVariants} className="grid grid-cols-12 gap-6">
        {/* Domain Health Table */}
        <div className="col-span-8 glass-premium">
          <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-pro-600/10">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Domain Health</h3>
              <p className="text-xs text-slate-900 dark:text-slate-300">Monitor your sending domains</p>
            </div>
            <button className="flex items-center gap-2 text-sm text-emerald-pro-600 hover:text-emerald-pro-600/80 transition-colors">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>

          <div className="divide-y divide-emerald-pro-600/5">
            {mockDomains.map((domain) => (
              <div key={domain.domain} className="flex items-center px-6 py-4 hover:bg-emerald-pro-600/5 transition-colors">
                <Globe className="h-4 w-4 text-slate-900 dark:text-slate-300 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{domain.domain}</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">Last check: {domain.lastCheck}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      domain.score >= 90 ? "text-emerald-pro-400" : "text-energy-orange"
                    )}
                  >
                    {domain.score}%
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg border",
                      domain.status === "healthy"
                        ? "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/20"
                        : "bg-energy-orange/10 text-energy-orange border-energy-orange/20"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        domain.status === "healthy" ? "bg-emerald-pro-400 animate-pulse" : "bg-energy-orange"
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
        <div className="col-span-4 glass-premium">
          <div className="px-6 py-4 border-b border-emerald-pro-600/10">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Alerts</h3>
            <p className="text-xs text-slate-900 dark:text-slate-300">{recentAlerts.length} alerts</p>
          </div>

          <div className="divide-y divide-emerald-pro-600/5">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 px-6 py-4 hover:bg-emerald-pro-600/5 transition-colors">
                {alert.type === "warning" ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-energy-orange/10 border border-energy-orange/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-energy-orange" />
                  </div>
                ) : alert.type === "success" ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/20">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-pro-400" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                    <Shield className="h-3.5 w-3.5 text-emerald-pro-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 dark:text-white">{alert.message}</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300 mt-0.5">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
