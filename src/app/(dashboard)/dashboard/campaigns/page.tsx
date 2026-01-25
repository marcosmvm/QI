"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MetricsCard } from "@/components/dashboard";
import {
  Plus,
  Filter,
  Download,
  Search,
  MoreHorizontal,
  Play,
  Pause,
  Eye,
  Edit3,
  Trash2,
  Copy,
  Mail,
  Users,
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  Zap,
  Target,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useState, useCallback } from "react";
import { type Campaign } from "@/types";

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

// Enhanced mock data
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Enterprise Outreach",
    status: "active",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-01-19T00:00:00Z",
    metrics: {
      sent: 12450,
      delivered: 11892,
      opened: 4281,
      replied: 498,
      bounced: 186,
      complaints: 3,
      deliverabilityRate: 95.5,
      openRate: 36.0,
      replyRate: 4.2,
      bounceRate: 1.5,
      complaintRate: 0.02,
    },
  },
  {
    id: "2",
    name: "SaaS Decision Makers",
    status: "active",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-01-19T00:00:00Z",
    metrics: {
      sent: 8320,
      delivered: 7904,
      opened: 2529,
      replied: 267,
      bounced: 166,
      complaints: 2,
      deliverabilityRate: 95.0,
      openRate: 32.0,
      replyRate: 3.4,
      bounceRate: 2.0,
      complaintRate: 0.03,
    },
  },
  {
    id: "3",
    name: "Healthcare IT Leaders",
    status: "paused",
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-01-18T00:00:00Z",
    metrics: {
      sent: 5640,
      delivered: 5245,
      opened: 1311,
      replied: 105,
      bounced: 169,
      complaints: 1,
      deliverabilityRate: 93.0,
      openRate: 25.0,
      replyRate: 2.0,
      bounceRate: 3.0,
      complaintRate: 0.02,
    },
  },
  {
    id: "4",
    name: "Fintech CFOs",
    status: "draft",
    createdAt: "2026-01-19T00:00:00Z",
    updatedAt: "2026-01-19T00:00:00Z",
    metrics: {
      sent: 0,
      delivered: 0,
      opened: 0,
      replied: 0,
      bounced: 0,
      complaints: 0,
      deliverabilityRate: 0,
      openRate: 0,
      replyRate: 0,
      bounceRate: 0,
      complaintRate: 0,
    },
  },
  {
    id: "5",
    name: "Q4 2025 Retargeting",
    status: "completed",
    createdAt: "2025-10-01T00:00:00Z",
    updatedAt: "2025-12-31T00:00:00Z",
    metrics: {
      sent: 25000,
      delivered: 23750,
      opened: 8312,
      replied: 712,
      bounced: 500,
      complaints: 5,
      deliverabilityRate: 95.0,
      openRate: 35.0,
      replyRate: 3.0,
      bounceRate: 2.0,
      complaintRate: 0.02,
    },
  },
];

const statusConfig = {
  active: {
    bg: "bg-emerald-pro-400/10",
    text: "text-emerald-pro-400",
    border: "border-emerald-pro-400/20",
    dot: "bg-emerald-pro-400",
    label: "Active",
  },
  paused: {
    bg: "bg-energy-orange/10",
    text: "text-energy-orange",
    border: "border-energy-orange/20",
    dot: "bg-energy-orange",
    label: "Paused",
  },
  draft: {
    bg: "bg-steel/10",
    text: "text-slate-900 dark:text-slate-200",
    border: "border-steel/20",
    dot: "bg-steel",
    label: "Draft",
  },
  completed: {
    bg: "bg-emerald-pro-600/10",
    text: "text-emerald-pro-600",
    border: "border-emerald-pro-600/20",
    dot: "bg-emerald-pro-600",
    label: "Completed",
  },
};

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export campaigns to CSV
  const handleExport = useCallback(() => {
    const headers = ["Name", "Status", "Sent", "Delivered", "Opened", "Replied", "Open Rate", "Reply Rate", "Created"];
    const rows = filteredCampaigns.map(c => [
      c.name,
      c.status,
      c.metrics.sent,
      c.metrics.delivered,
      c.metrics.opened,
      c.metrics.replied,
      `${c.metrics.openRate}%`,
      `${c.metrics.replyRate}%`,
      new Date(c.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `campaigns-export-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }, [filteredCampaigns]);

  // Refresh campaigns data
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call - in production this would fetch from your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCampaigns([...mockCampaigns]);
    setIsRefreshing(false);
  }, []);

  // Toggle campaign status (pause/play)
  const handleToggleStatus = useCallback((campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const newStatus = c.status === "active" ? "paused" : c.status === "paused" ? "active" : c.status;
        return { ...c, status: newStatus };
      }
      return c;
    }));
  }, []);

  // Copy campaign
  const handleCopyCampaign = useCallback((campaign: Campaign) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: `${Date.now()}`,
      name: `${campaign.name} (Copy)`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: { ...campaign.metrics, sent: 0, delivered: 0, opened: 0, replied: 0, bounced: 0, complaints: 0 }
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  }, []);

  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
  const totalSent = mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0);
  const totalReplies = mockCampaigns.reduce((sum, c) => sum + c.metrics.replied, 0);
  const avgOpenRate = mockCampaigns.filter(c => c.metrics.sent > 0)
    .reduce((sum, c) => sum + c.metrics.openRate, 0) / mockCampaigns.filter(c => c.metrics.sent > 0).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-200 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Campaigns</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Campaigns</h1>
        <p className="text-slate-900 dark:text-slate-200 mt-1">Manage and monitor your email campaigns</p>
      </motion.div>

      <div className="space-y-6">
        {/* Quick Stats - Using MetricsCard like Analytics page */}
        <div className="grid grid-cols-5 gap-4">
          <MetricsCard
            title="Total Campaigns"
            value={mockCampaigns.length}
            change={12}
            accent="emerald"
            delay={0}
          />
          <MetricsCard
            title="Active"
            value={activeCampaigns}
            accent="emerald"
            delay={0.1}
          />
          <MetricsCard
            title="Total Sent"
            value={totalSent}
            change={8.5}
            accent="sky"
            delay={0.2}
          />
          <MetricsCard
            title="Total Replies"
            value={totalReplies}
            change={15.2}
            accent="amber"
            delay={0.3}
          />
          <MetricsCard
            title="Avg Open Rate"
            value={avgOpenRate}
            suffix="%"
            change={2.3}
            accent="emerald"
            delay={0.4}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-900 dark:text-slate-200" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-80 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/50 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-pro-600/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10">
              <button
                onClick={() => setStatusFilter(null)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  !statusFilter
                    ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                    : "text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                All
              </button>
              {Object.entries(statusConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(statusFilter === key ? null : key)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    statusFilter === key
                      ? `${config.bg} ${config.text}`
                      : "text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-emerald-pro-600/40"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-emerald-pro-600/40"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Link href="/dashboard/campaigns/new">
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-white font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          </div>
        </div>

        {/* Campaigns Table */}
        <motion.div variants={itemVariants} className="glass-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-pro-600/10">
                  <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">Campaign</th>
                  <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Status</th>
                  <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Sent</th>
                  <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Delivered</th>
                  <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Opened</th>
                  <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Replied</th>
                  <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Open Rate</th>
                  <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-4 py-4">Reply Rate</th>
                  <th className="text-right text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-pro-600/5">
                {filteredCampaigns.map((campaign) => {
                  const status = statusConfig[campaign.status as keyof typeof statusConfig];
                  const openRateStatus = campaign.metrics.openRate >= 30 ? "success" : campaign.metrics.openRate >= 15 ? "warning" : "critical";
                  const replyRateStatus = campaign.metrics.replyRate >= 3 ? "success" : campaign.metrics.replyRate >= 1 ? "warning" : "critical";

                  return (
                    <tr key={campaign.id} className="hover:bg-emerald-pro-600/5 transition-colors group">
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="block"
                        >
                          <p className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-slate-900 dark:text-slate-200 mt-0.5">
                            Created {new Date(campaign.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border",
                          status.bg,
                          status.text,
                          status.border
                        )}>
                          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot, campaign.status === "active" && "animate-pulse")} />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-slate-900 dark:text-white font-medium">{campaign.metrics.sent.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-slate-900 dark:text-white">{campaign.metrics.delivered.toLocaleString()}</span>
                        <span className="text-xs text-slate-900 dark:text-slate-200 ml-1">
                          ({campaign.metrics.deliverabilityRate}%)
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-slate-900 dark:text-white">{campaign.metrics.opened.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-emerald-pro-400 font-medium">{campaign.metrics.replied.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={cn(
                          "text-sm font-semibold",
                          openRateStatus === "success" && "text-emerald-pro-400",
                          openRateStatus === "warning" && "text-energy-orange",
                          openRateStatus === "critical" && "text-rose"
                        )}>
                          {campaign.metrics.openRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={cn(
                          "text-sm font-semibold",
                          replyRateStatus === "success" && "text-emerald-pro-400",
                          replyRateStatus === "warning" && "text-energy-orange",
                          replyRateStatus === "critical" && "text-rose"
                        )}>
                          {campaign.metrics.replyRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {campaign.status === "active" ? (
                            <button
                              onClick={() => handleToggleStatus(campaign.id)}
                              className="p-2 text-slate-900 dark:text-slate-200 hover:text-energy-orange hover:bg-energy-orange/10 rounded-lg transition-colors"
                              title="Pause campaign"
                            >
                              <Pause className="h-4 w-4" />
                            </button>
                          ) : campaign.status === "paused" ? (
                            <button
                              onClick={() => handleToggleStatus(campaign.id)}
                              className="p-2 text-slate-900 dark:text-slate-200 hover:text-emerald-pro-400 hover:bg-emerald-pro-400/10 rounded-lg transition-colors"
                              title="Resume campaign"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                          ) : null}
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="p-2 text-slate-900 dark:text-slate-200 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                            title="View campaign"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}/edit`}
                            className="p-2 text-slate-900 dark:text-slate-200 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                            title="Edit campaign"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleCopyCampaign(campaign)}
                            className="p-2 text-slate-900 dark:text-slate-200 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                            title="Copy campaign"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors" title="More options">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border-default dark:border-graphite/30">
            <p className="text-sm text-slate-900 dark:text-slate-200">
              Showing <span className="text-slate-900 dark:text-white font-medium">{filteredCampaigns.length}</span> of{" "}
              <span className="text-slate-900 dark:text-white font-medium">{campaigns.length}</span> campaigns
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-border-default dark:border-graphite/50 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-emerald-pro-600/30" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-border-default dark:border-graphite/50 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-emerald-pro-600/30">
                Next
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Campaign Performance Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
          {/* Top Performing Campaigns */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Top Performing</h3>
              <span className="text-xs text-slate-900 dark:text-slate-200">By reply rate</span>
            </div>
            <div className="space-y-3">
              {mockCampaigns
                .filter(c => c.metrics.sent > 0)
                .sort((a, b) => b.metrics.replyRate - a.metrics.replyRate)
                .slice(0, 3)
                .map((campaign, index) => (
                  <Link
                    key={campaign.id}
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/30 transition-all"
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-bold",
                      index === 0 && "bg-emerald-pro-400/10 text-emerald-pro-400 border border-emerald-pro-400/20",
                      index === 1 && "bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20",
                      index === 2 && "bg-emerald-pro-500/10 text-emerald-pro-500 border border-emerald-pro-500/20"
                    )}>
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{campaign.name}</p>
                      <p className="text-xs text-slate-900 dark:text-slate-200">{campaign.metrics.sent.toLocaleString()} sent</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-pro-400">{campaign.metrics.replyRate}%</p>
                      <p className="text-xs text-slate-900 dark:text-slate-200">reply rate</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Campaigns Needing Attention */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">Needs Attention</h3>
              <span className="text-xs text-slate-900 dark:text-slate-200">Low performance</span>
            </div>
            <div className="space-y-3">
              {mockCampaigns
                .filter(c => c.metrics.sent > 0 && (c.metrics.openRate < 30 || c.metrics.replyRate < 2))
                .slice(0, 3)
                .map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl border border-energy-orange/20 bg-energy-orange/5 hover:border-energy-orange/40 transition-all"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-energy-orange/10 border border-energy-orange/20">
                      <AlertCircle className="h-4 w-4 text-energy-orange" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{campaign.name}</p>
                      <p className="text-xs text-energy-orange">
                        {campaign.metrics.openRate < 30 && `Low open rate (${campaign.metrics.openRate}%)`}
                        {campaign.metrics.openRate < 30 && campaign.metrics.replyRate < 2 && " • "}
                        {campaign.metrics.replyRate < 2 && `Low reply rate (${campaign.metrics.replyRate}%)`}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-900 dark:text-slate-200" />
                  </Link>
                ))}
              {mockCampaigns.filter(c => c.metrics.sent > 0 && (c.metrics.openRate < 30 || c.metrics.replyRate < 2)).length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <CheckCircle2 className="h-10 w-10 text-emerald-pro-400/30 mx-auto mb-2" />
                    <p className="text-sm text-slate-900 dark:text-slate-200">All campaigns performing well!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
