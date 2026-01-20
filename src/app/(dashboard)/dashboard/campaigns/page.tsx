"use client";

import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { type Campaign } from "@/types";

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

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length;
  const totalSent = mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0);
  const totalReplies = mockCampaigns.reduce((sum, c) => sum + c.metrics.replied, 0);
  const avgOpenRate = mockCampaigns.filter(c => c.metrics.sent > 0)
    .reduce((sum, c) => sum + c.metrics.openRate, 0) / mockCampaigns.filter(c => c.metrics.sent > 0).length;

  return (
    <div className="min-h-screen bg-deep-space">
      <Header title="Campaigns" subtitle="Manage and monitor your email campaigns" />

      <main className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: "Total Campaigns", value: mockCampaigns.length.toString(), change: "+2", icon: Mail, color: "electric-cyan" },
            { label: "Active", value: activeCampaigns.toString(), icon: Play, color: "neon-mint" },
            { label: "Total Sent", value: totalSent.toLocaleString(), change: "+1.2k", icon: Users, color: "quantum-violet" },
            { label: "Total Replies", value: totalReplies.toLocaleString(), change: "+89", icon: MessageSquare, color: "energy-orange" },
            { label: "Avg Open Rate", value: `${avgOpenRate.toFixed(1)}%`, change: "+2.3%", icon: TrendingUp, color: "rose" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-4 hover:border-electric-cyan/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-steel mb-1">{stat.label}</p>
                  <p className="text-2xl font-sora font-bold text-white">{stat.value}</p>
                </div>
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border",
                  stat.color === "electric-cyan" && "bg-electric-cyan/10 border-electric-cyan/20",
                  stat.color === "neon-mint" && "bg-neon-mint/10 border-neon-mint/20",
                  stat.color === "quantum-violet" && "bg-quantum-violet/10 border-quantum-violet/20",
                  stat.color === "energy-orange" && "bg-energy-orange/10 border-energy-orange/20",
                  stat.color === "rose" && "bg-rose/10 border-rose/20"
                )}>
                  <stat.icon className={cn(
                    "h-5 w-5",
                    stat.color === "electric-cyan" && "text-electric-cyan",
                    stat.color === "neon-mint" && "text-neon-mint",
                    stat.color === "quantum-violet" && "text-quantum-violet",
                    stat.color === "energy-orange" && "text-energy-orange",
                    stat.color === "rose" && "text-rose"
                  )} />
                </div>
              </div>
              {stat.change && (
                <p className="text-xs text-neon-mint mt-2 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.change} this week
                </p>
              )}
            </div>
          ))}
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
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
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
        <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 overflow-hidden">
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
                            <button className="p-2 text-steel hover:text-energy-orange hover:bg-energy-orange/10 rounded-lg transition-colors">
                              <Pause className="h-4 w-4" />
                            </button>
                          ) : campaign.status === "paused" ? (
                            <button className="p-2 text-steel hover:text-neon-mint hover:bg-neon-mint/10 rounded-lg transition-colors">
                              <Play className="h-4 w-4" />
                            </button>
                          ) : null}
                          <Link
                            href={`/dashboard/campaigns/${campaign.id}`}
                            className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors">
                            <Copy className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-steel hover:text-white hover:bg-electric-cyan/10 rounded-lg transition-colors">
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-electric-cyan/10">
            <p className="text-sm text-steel">
              Showing <span className="text-white font-medium">{filteredCampaigns.length}</span> of{" "}
              <span className="text-white font-medium">{mockCampaigns.length}</span> campaigns
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Campaign Performance Overview */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Performing Campaigns */}
          <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
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
          <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
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
        </div>
      </main>
    </div>
  );
}
