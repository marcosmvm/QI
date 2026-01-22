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
    bg: "bg-neon-mint/10",
    text: "text-neon-mint",
    border: "border-neon-mint/20",
    dot: "bg-neon-mint",
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
    text: "text-steel",
    border: "border-steel/20",
    dot: "bg-steel",
    label: "Draft",
  },
  completed: {
    bg: "bg-electric-cyan/10",
    text: "text-electric-cyan",
    border: "border-electric-cyan/20",
    dot: "bg-electric-cyan",
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
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <Link href="/dashboard" className="hover:text-electric-cyan transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-electric-cyan">Campaigns</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-white">Campaigns</h1>
        <p className="text-steel mt-1">Manage and monitor your email campaigns</p>
      </motion.div>

      <div className="space-y-6">
        {/* Quick Stats - Using MetricsCard like Analytics page */}
        <div className="grid grid-cols-5 gap-4">
          <MetricsCard
            title="Total Campaigns"
            value={mockCampaigns.length}
            change={12}
            accent="cyan"
            delay={0}
          />
          <MetricsCard
            title="Active"
            value={activeCampaigns}
            accent="mint"
            delay={0.1}
          />
          <MetricsCard
            title="Total Sent"
            value={totalSent}
            change={8.5}
            accent="violet"
            delay={0.2}
          />
          <MetricsCard
            title="Total Replies"
            value={totalReplies}
            change={15.2}
            accent="orange"
            delay={0.3}
          />
          <MetricsCard
            title="Avg Open Rate"
            value={avgOpenRate}
            suffix="%"
            change={2.3}
            accent="cyan"
            delay={0.4}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-80 rounded-xl border border-electric-cyan/20 bg-midnight-blue/50 pl-10 pr-4 text-sm text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-midnight-blue/50 border border-electric-cyan/10">
              <button
                onClick={() => setStatusFilter(null)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  !statusFilter
                    ? "bg-electric-cyan/10 text-electric-cyan"
                    : "text-steel hover:text-white"
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
                      : "text-steel hover:text-white"
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
              className="border-electric-cyan/20 text-steel hover:text-white hover:border-electric-cyan/40"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-electric-cyan/20 text-steel hover:text-white hover:border-electric-cyan/40"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Link href="/dashboard/campaigns/new">
              <Button
                size="sm"
                className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold"
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
                <tr className="border-b border-electric-cyan/10">
                  <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-6 py-4">Campaign</th>
                  <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Status</th>
                  <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Sent</th>
                  <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Delivered</th>
                  <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Opened</th>
                  <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Replied</th>
                  <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Open Rate</th>
                  <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Reply Rate</th>
                  <th className="text-right text-xs font-semibold text-steel uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric-cyan/5">
                {filteredCampaigns.map((campaign) => {
                  const status = statusConfig[campaign.status as keyof typeof statusConfig];
                  const openRateStatus = campaign.metrics.openRate >= 30 ? "success" : campaign.metrics.openRate >= 15 ? "warning" : "critical";
                  const replyRateStatus = campaign.metrics.replyRate >= 3 ? "success" : campaign.metrics.replyRate >= 1 ? "warning" : "critical";

                  return (
                    <tr key={campaign.id} className="hover:bg-electric-cyan/5 transition-colors group">
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/campaigns/${campaign.id}`}
                          className="block"
                        >
                          <p className="font-medium text-white group-hover:text-electric-cyan transition-colors">
                            {campaign.name}
                          </p>
                          <p className="text-xs text-steel mt-0.5">
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
                        <span className="text-sm text-white font-medium">{campaign.metrics.sent.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-white">{campaign.metrics.delivered.toLocaleString()}</span>
                        <span className="text-xs text-steel ml-1">
                          ({campaign.metrics.deliverabilityRate}%)
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-white">{campaign.metrics.opened.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-neon-mint font-medium">{campaign.metrics.replied.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={cn(
                          "text-sm font-semibold",
                          openRateStatus === "success" && "text-neon-mint",
                          openRateStatus === "warning" && "text-energy-orange",
                          openRateStatus === "critical" && "text-rose"
                        )}>
                          {campaign.metrics.openRate}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={cn(
                          "text-sm font-semibold",
                          replyRateStatus === "success" && "text-neon-mint",
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
                              className="p-2 text-steel hover:text-energy-orange hover:bg-energy-orange/10 rounded-lg transition-colors"
                              title="Pause campaign"
                            >
                              <Pause className="h-4 w-4" />
                            </button>
                          ) : campaign.status === "paused" ? (
                            <button
                              onClick={() => handleToggleStatus(campaign.id)}
                              className="p-2 text-steel hover:text-neon-mint hover:bg-neon-mint/10 rounded-lg transition-colors"
                              title="Resume campaign"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                          ) : null}
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                            title="View campaign"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}/edit`}
                            className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                            title="Edit campaign"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleCopyCampaign(campaign)}
                            className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                            title="Copy campaign"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-steel hover:text-white hover:bg-electric-cyan/10 rounded-lg transition-colors" title="More options">
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-graphite/30">
            <p className="text-sm text-steel">
              Showing <span className="text-white font-medium">{filteredCampaigns.length}</span> of{" "}
              <span className="text-white font-medium">{campaigns.length}</span> campaigns
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-graphite/50 text-steel hover:text-white hover:border-electric-cyan/30" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-graphite/50 text-steel hover:text-white hover:border-electric-cyan/30">
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
              <h3 className="font-semibold text-white">Top Performing</h3>
              <span className="text-xs text-steel">By reply rate</span>
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
                    className="flex items-center gap-4 p-3 rounded-xl border border-electric-cyan/10 bg-deep-space/50 hover:border-electric-cyan/30 transition-all"
                  >
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-bold",
                      index === 0 && "bg-neon-mint/10 text-neon-mint border border-neon-mint/20",
                      index === 1 && "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20",
                      index === 2 && "bg-quantum-violet/10 text-quantum-violet border border-quantum-violet/20"
                    )}>
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{campaign.name}</p>
                      <p className="text-xs text-steel">{campaign.metrics.sent.toLocaleString()} sent</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-neon-mint">{campaign.metrics.replyRate}%</p>
                      <p className="text-xs text-steel">reply rate</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Campaigns Needing Attention */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-white">Needs Attention</h3>
              <span className="text-xs text-steel">Low performance</span>
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
                      <p className="text-sm font-medium text-white truncate">{campaign.name}</p>
                      <p className="text-xs text-energy-orange">
                        {campaign.metrics.openRate < 30 && `Low open rate (${campaign.metrics.openRate}%)`}
                        {campaign.metrics.openRate < 30 && campaign.metrics.replyRate < 2 && " • "}
                        {campaign.metrics.replyRate < 2 && `Low reply rate (${campaign.metrics.replyRate}%)`}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-steel" />
                  </Link>
                ))}
              {mockCampaigns.filter(c => c.metrics.sent > 0 && (c.metrics.openRate < 30 || c.metrics.replyRate < 2)).length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <CheckCircle2 className="h-10 w-10 text-neon-mint/30 mx-auto mb-2" />
                    <p className="text-sm text-steel">All campaigns performing well!</p>
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
