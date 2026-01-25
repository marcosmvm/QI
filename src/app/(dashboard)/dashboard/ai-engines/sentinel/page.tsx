"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Eye,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Globe,
  Building2,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  MapPin,
  Activity,
  ArrowRight,
  Filter,
  Search,
  ExternalLink,
  Laptop,
  MousePointer,
  Timer,
  Target,
  UserPlus,
  BarChart3,
  Layers,
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

// Mock data for Sentinel Engine
const overallStats = {
  visitorsIdentified: 3847,
  companiesRevealed: 1256,
  highIntentLeads: 423,
  conversionRate: 11.2,
  lastCheck: "1 minute ago",
};

const recentVisitors = [
  {
    id: "1",
    company: "Acme Corporation",
    industry: "Technology",
    location: "San Francisco, CA",
    pages: ["/pricing", "/features", "/case-studies"],
    visits: 12,
    duration: "8m 45s",
    intentScore: 92,
    status: "hot",
    lastVisit: "5 minutes ago",
    employees: "500-1000",
    revenue: "$50M-$100M",
  },
  {
    id: "2",
    company: "TechFlow Industries",
    industry: "SaaS",
    location: "New York, NY",
    pages: ["/pricing", "/demo"],
    visits: 8,
    duration: "6m 12s",
    intentScore: 87,
    status: "hot",
    lastVisit: "12 minutes ago",
    employees: "100-500",
    revenue: "$10M-$50M",
  },
  {
    id: "3",
    company: "GlobalData Systems",
    industry: "Data Analytics",
    location: "Austin, TX",
    pages: ["/blog", "/resources"],
    visits: 4,
    duration: "3m 30s",
    intentScore: 56,
    status: "warm",
    lastVisit: "45 minutes ago",
    employees: "50-100",
    revenue: "$5M-$10M",
  },
  {
    id: "4",
    company: "Nexus Innovations",
    industry: "Fintech",
    location: "Chicago, IL",
    pages: ["/home", "/about"],
    visits: 2,
    duration: "1m 20s",
    intentScore: 34,
    status: "cold",
    lastVisit: "2 hours ago",
    employees: "1000+",
    revenue: "$100M+",
  },
  {
    id: "5",
    company: "CloudScale Solutions",
    industry: "Cloud Infrastructure",
    location: "Seattle, WA",
    pages: ["/pricing", "/enterprise", "/demo", "/case-studies"],
    visits: 15,
    duration: "12m 08s",
    intentScore: 96,
    status: "hot",
    lastVisit: "8 minutes ago",
    employees: "200-500",
    revenue: "$25M-$50M",
  },
];

const topPages = [
  { page: "/pricing", visits: 1245, conversionRate: 18.5 },
  { page: "/demo", visits: 892, conversionRate: 24.3 },
  { page: "/features", visits: 756, conversionRate: 12.1 },
  { page: "/case-studies", visits: 634, conversionRate: 15.8 },
  { page: "/enterprise", visits: 423, conversionRate: 21.2 },
];

const industryBreakdown = [
  { industry: "Technology", count: 456, percentage: 36 },
  { industry: "SaaS", count: 312, percentage: 25 },
  { industry: "Finance", count: 189, percentage: 15 },
  { industry: "Healthcare", count: 152, percentage: 12 },
  { industry: "Other", count: 147, percentage: 12 },
];

const intentSignals = [
  {
    signal: "Visited pricing page",
    weight: "High",
    occurrences: 1245,
    color: "emerald-pro-400",
  },
  {
    signal: "Requested demo",
    weight: "High",
    occurrences: 423,
    color: "emerald-pro-400",
  },
  {
    signal: "Multiple visits (3+)",
    weight: "Medium",
    occurrences: 678,
    color: "emerald-pro-500",
  },
  {
    signal: "Long session (5+ min)",
    weight: "Medium",
    occurrences: 534,
    color: "emerald-pro-500",
  },
  {
    signal: "Viewed case studies",
    weight: "Medium",
    occurrences: 312,
    color: "energy-orange",
  },
];

const dailyVisitors = [
  { day: "Mon", identified: 412, anonymous: 1245 },
  { day: "Tue", identified: 534, anonymous: 1456 },
  { day: "Wed", identified: 489, anonymous: 1367 },
  { day: "Thu", identified: 567, anonymous: 1523 },
  { day: "Fri", identified: 623, anonymous: 1678 },
  { day: "Sat", identified: 234, anonymous: 678 },
  { day: "Sun", identified: 189, anonymous: 534 },
];

export default function SentinelPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "hot" | "warm" | "cold">("all");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot":
        return { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/30" };
      case "warm":
        return { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/30" };
      case "cold":
        return { bg: "bg-steel/10", text: "text-slate-900 dark:text-slate-300", border: "border-steel/30" };
      default:
        return { bg: "bg-emerald-pro-600/10", text: "text-emerald-pro-600", border: "border-emerald-pro-600/30" };
    }
  };

  const filteredVisitors = statusFilter === "all"
    ? recentVisitors
    : recentVisitors.filter(v => v.status === statusFilter);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">The Sentinel</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">The Sentinel</h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">Website Visitor Intelligence Engine</p>
      </motion.div>

      <div className="space-y-6">
        {/* Engine Status Banner */}
        <motion.div variants={itemVariants} className="relative glass-premium p-6 overflow-hidden border-emerald-pro-500/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-pro-500/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-pro-500/5 to-transparent" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-pro-500/10 border border-emerald-pro-500/30">
                <Eye className="h-8 w-8 text-emerald-pro-500" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Sentinel Engine</h2>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-pro-400/15 border border-emerald-pro-400/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-pro-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-pro-400"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-pro-400">ACTIVE</span>
                  </span>
                </div>
                <p className="text-slate-900 dark:text-slate-300 mt-1">Identifying anonymous visitors and revealing buyer intent</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-900 dark:text-slate-300">Last Update</p>
                <p className="text-slate-900 dark:text-white font-medium">{overallStats.lastCheck}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-900 dark:text-slate-300">Live Visitors</p>
                <p className="text-slate-900 dark:text-white font-medium">23 on site</p>
              </div>
              <Button
                variant="outline"
                className="gap-2 border-emerald-pro-500/30 hover:bg-emerald-pro-500/10"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                {isRefreshing ? "Scanning..." : "Refresh Data"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-5 w-5 text-emerald-pro-600" />
              <span className="text-emerald-pro-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 18%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">{overallStats.visitorsIdentified.toLocaleString()}</p>
            <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">Visitors Identified</p>
            <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Last 30 days</p>
          </div>

          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <Building2 className="h-5 w-5 text-emerald-pro-500" />
              <span className="text-emerald-pro-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 24%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">{overallStats.companiesRevealed.toLocaleString()}</p>
            <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">Companies Revealed</p>
            <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Unique organizations</p>
          </div>

          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <Target className="h-5 w-5 text-emerald-pro-400" />
              <span className="text-emerald-pro-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 31%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">{overallStats.highIntentLeads}</p>
            <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">High Intent Leads</p>
            <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Score 80+</p>
          </div>

          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <Activity className="h-5 w-5 text-energy-orange" />
              <span className="text-emerald-pro-400 text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 2.4%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-slate-900 dark:text-white">{overallStats.conversionRate}%</p>
            <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">Identification Rate</p>
            <p className="text-xs text-slate-900 dark:text-slate-300 mt-2">Industry avg: 8%</p>
          </div>
        </motion.div>

        {/* Visitor Intelligence and Intent Signals */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Identified Visitors */}
          <div className="lg:col-span-2 glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Recently Identified Visitors</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30">
                  {(["all", "hot", "warm", "cold"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize",
                        statusFilter === filter
                          ? "bg-emerald-pro-600/20 text-emerald-pro-600"
                          : "text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredVisitors.map((visitor) => {
                const statusColors = getStatusColor(visitor.status);
                return (
                  <div
                    key={visitor.id}
                    className="p-4 rounded-xl border border-border-default dark:border-graphite/30 bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-emerald-pro-500/10 border border-emerald-pro-500/20 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-emerald-pro-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900 dark:text-white">{visitor.company}</p>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full capitalize font-medium",
                              statusColors.bg,
                              statusColors.text
                            )}>
                              {visitor.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-900 dark:text-slate-300 mt-0.5">
                            <span>{visitor.industry}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {visitor.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-900 dark:text-slate-300">Intent Score:</span>
                          <span className={cn(
                            "text-lg font-bold",
                            visitor.intentScore >= 80 ? "text-emerald-pro-400" :
                            visitor.intentScore >= 50 ? "text-energy-orange" : "text-slate-900 dark:text-slate-300"
                          )}>
                            {visitor.intentScore}
                          </span>
                        </div>
                        <p className="text-xs text-slate-900 dark:text-slate-300 mt-0.5">{visitor.lastVisit}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border-default dark:border-graphite/30">
                      <div className="text-center">
                        <p className="text-xs text-slate-900 dark:text-slate-300">Visits</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{visitor.visits}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-900 dark:text-slate-300">Duration</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{visitor.duration}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-900 dark:text-slate-300">Employees</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{visitor.employees}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-900 dark:text-slate-300">Revenue</p>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{visitor.revenue}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-slate-900 dark:text-slate-300">Pages:</span>
                      {visitor.pages.map((page, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20"
                        >
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" className="w-full mt-4 gap-2">
              View All Visitors
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Intent Signals */}
          <div className="space-y-6">
            <div className="glass-premium p-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">Intent Signals Detected</h3>
              <div className="space-y-3">
                {intentSignals.map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        signal.color === "emerald-pro-400" && "bg-emerald-pro-400",
                        signal.color === "emerald-pro-500" && "bg-emerald-pro-500",
                        signal.color === "energy-orange" && "bg-energy-orange"
                      )} />
                      <div>
                        <p className="text-sm text-slate-900 dark:text-white">{signal.signal}</p>
                        <p className="text-xs text-slate-900 dark:text-slate-300">{signal.weight} weight</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{signal.occurrences}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-premium p-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">Industry Breakdown</h3>
              <div className="space-y-3">
                {industryBreakdown.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-900 dark:text-white">{item.industry}</span>
                      <span className="text-sm text-slate-900 dark:text-slate-300">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-graphite/30 overflow-hidden">
                      <div
                        className="h-full bg-emerald-pro-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Pages and Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Converting Pages */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">Top Converting Pages</h3>
              <Button variant="ghost" size="sm" className="text-emerald-pro-600 hover:text-emerald-pro-600/80">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-border-default dark:border-graphite/30 bg-white dark:bg-deep-space/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/20 text-sm font-bold text-emerald-pro-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{page.page}</p>
                      <p className="text-xs text-slate-900 dark:text-slate-300">{page.visits.toLocaleString()} visits</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-pro-400">{page.conversionRate}%</p>
                    <p className="text-xs text-slate-900 dark:text-slate-300">conversion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions and Summary */}
          <div className="glass-premium p-6">
            <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-6">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-emerald-pro-400/30 hover:bg-emerald-pro-400/10">
                <UserPlus className="h-5 w-5 text-emerald-pro-400" />
                <span className="text-sm">Add Hot Leads to Campaign</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-emerald-pro-500/30 hover:bg-emerald-pro-500/10">
                <Target className="h-5 w-5 text-emerald-pro-500" />
                <span className="text-sm">Create Retargeting List</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-emerald-pro-600/30 hover:bg-emerald-pro-600/10">
                <BarChart3 className="h-5 w-5 text-emerald-pro-600" />
                <span className="text-sm">Export Visitor Report</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 border-energy-orange/30 hover:bg-energy-orange/10">
                <Layers className="h-5 w-5 text-energy-orange" />
                <span className="text-sm">Configure Signals</span>
              </Button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-pro-400/10 border border-emerald-pro-400/30">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-pro-400 mt-0.5" />
                <div>
                  <p className="font-medium text-emerald-pro-400">High-Intent Alert</p>
                  <p className="text-sm text-slate-900 dark:text-slate-300 mt-1">
                    3 hot leads from target accounts are currently on site. Consider reaching out via Architect engine.
                  </p>
                  <Button size="sm" className="mt-3 bg-emerald-pro-400/20 text-emerald-pro-400 hover:bg-emerald-pro-400/30 border border-emerald-pro-400/30">
                    View Active Visitors
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border-default dark:border-graphite/30">
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">This Week's Summary</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30">
                  <p className="text-lg font-bold text-slate-900 dark:text-white">892</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">New Companies</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30">
                  <p className="text-lg font-bold text-emerald-pro-400">156</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">Hot Leads</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30">
                  <p className="text-lg font-bold text-emerald-pro-500">34</p>
                  <p className="text-xs text-slate-900 dark:text-slate-300">Added to CRM</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
