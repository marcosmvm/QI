"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Cpu,
  Play,
  Pause,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  Clock,
  Mail,
  Users,
  Target,
  Sparkles,
  FileText,
  Copy,
  ChevronRight,
  Zap,
  MessageSquare,
  Calendar,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Settings,
  Eye,
  Edit3,
  Trash2,
  RefreshCw,
  ArrowRight,
  Layers,
  GitBranch,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard";
import { useState } from "react";

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

// Mock data for campaigns
const activeCampaigns = [
  {
    id: "camp-001",
    name: "Q1 SaaS Outreach - Enterprise",
    status: "active",
    sequences: 3,
    totalLeads: 2450,
    contacted: 1820,
    replied: 156,
    meetings: 23,
    replyRate: 8.6,
    lastActivity: "2 hours ago",
    createdAt: "Jan 5, 2026",
  },
  {
    id: "camp-002",
    name: "Healthcare Tech Decision Makers",
    status: "active",
    sequences: 2,
    totalLeads: 1200,
    contacted: 890,
    replied: 67,
    meetings: 12,
    replyRate: 7.5,
    lastActivity: "30 mins ago",
    createdAt: "Jan 8, 2026",
  },
  {
    id: "camp-003",
    name: "FinTech CFO Prospecting",
    status: "paused",
    sequences: 4,
    totalLeads: 850,
    contacted: 420,
    replied: 38,
    meetings: 8,
    replyRate: 9.0,
    lastActivity: "1 day ago",
    createdAt: "Jan 12, 2026",
  },
  {
    id: "camp-004",
    name: "Manufacturing VP Ops",
    status: "draft",
    sequences: 2,
    totalLeads: 1500,
    contacted: 0,
    replied: 0,
    meetings: 0,
    replyRate: 0,
    lastActivity: "Just now",
    createdAt: "Jan 18, 2026",
  },
];

// Mock data for sequence templates
const sequenceTemplates = [
  {
    id: "seq-001",
    name: "4-Touch Enterprise Sequence",
    description: "Optimized for enterprise decision makers with longer sales cycles",
    steps: 4,
    avgReplyRate: 8.2,
    timesUsed: 45,
    category: "Enterprise",
  },
  {
    id: "seq-002",
    name: "Quick SMB Outreach",
    description: "Fast-paced sequence for small business owners",
    steps: 3,
    avgReplyRate: 12.1,
    timesUsed: 78,
    category: "SMB",
  },
  {
    id: "seq-003",
    name: "Executive Warm-up",
    description: "Gentle approach for C-suite executives",
    steps: 5,
    avgReplyRate: 6.8,
    timesUsed: 32,
    category: "Executive",
  },
  {
    id: "seq-004",
    name: "Re-engagement Series",
    description: "Win back cold leads with fresh messaging",
    steps: 3,
    avgReplyRate: 4.5,
    timesUsed: 23,
    category: "Re-engagement",
  },
];

// Mock data for AI-generated variants
const generatedVariants = [
  {
    id: "var-001",
    subject: "Quick question about {{company}}'s growth plans",
    preview: "Hi {{firstName}}, I noticed {{company}} recently expanded into...",
    openRate: 68,
    replyRate: 12.3,
    sentiment: "professional",
  },
  {
    id: "var-002",
    subject: "{{firstName}}, saw your recent {{trigger}}",
    preview: "Hey {{firstName}}, Congrats on the news about...",
    openRate: 72,
    replyRate: 14.1,
    sentiment: "casual",
  },
  {
    id: "var-003",
    subject: "Helping {{company}} solve {{painPoint}}",
    preview: "Hello {{firstName}}, Companies like {{company}} often struggle with...",
    openRate: 61,
    replyRate: 9.8,
    sentiment: "direct",
  },
];

const statusColors = {
  active: {
    bg: "bg-emerald-pro-400/10",
    text: "text-emerald-pro-400",
    border: "border-emerald-pro-400/20",
    dot: "bg-emerald-pro-400",
  },
  paused: {
    bg: "bg-energy-orange/10",
    text: "text-energy-orange",
    border: "border-energy-orange/20",
    dot: "bg-energy-orange",
  },
  draft: {
    bg: "bg-steel/10",
    text: "text-slate-900 dark:text-slate-300",
    border: "border-steel/20",
    dot: "bg-steel",
  },
};

export default function ArchitectPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "sequences" | "generator">("campaigns");
  const [searchQuery, setSearchQuery] = useState("");

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
          <span className="text-emerald-pro-600">Architect Engine</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Architect Engine</h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">AI-Powered Campaign Design & Sequence Building</p>
      </motion.div>

      <div className="space-y-6">
        {/* Engine Status Banner */}
        <motion.div variants={itemVariants} className="relative glass-premium p-6 overflow-hidden border-emerald-pro-500/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-pro-500/60 to-transparent" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-pro-500/10 rounded-full blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-pro-500/20 border border-emerald-pro-500/30 shadow-glow-violet">
                <Cpu className="h-7 w-7 text-emerald-pro-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-light-bg-secondary dark:bg-midnight-blue text-emerald-pro-500 border border-emerald-pro-500/30">
                    ENGINE B
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-pro-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-pro-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-pro-400"></span>
                    </span>
                    Active
                  </span>
                </div>
                <h2 className="text-xl font-sora font-bold text-slate-900 dark:text-white mt-1">Campaign Architect</h2>
                <p className="text-sm text-slate-900 dark:text-slate-300">AI-driven campaign creation, sequence building, and multi-variant generation</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-pro-500/30 text-emerald-pro-500 hover:bg-emerald-pro-500/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-pro-500 to-violet-dark hover:from-violet-light hover:to-emerald-pro-500 text-slate-900 dark:text-white font-semibold shadow-glow-violet"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats - Using MetricsCard */}
        <div className="grid grid-cols-4 gap-4">
          <MetricsCard
            title="Active Campaigns"
            value={12}
            icon={Play}
            accent="mint"
            delay={0}
          />
          <MetricsCard
            title="Total Sequences"
            value={34}
            icon={GitBranch}
            accent="cyan"
            delay={0.1}
          />
          <MetricsCard
            title="AI Variants Generated"
            value={156}
            icon={Sparkles}
            accent="violet"
            delay={0.2}
          />
          <MetricsCard
            title="Avg Reply Rate"
            value={8.4}
            suffix="%"
            icon={MessageSquare}
            accent="orange"
            delay={0.3}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10 w-fit">
          {[
            { id: "campaigns", label: "Campaigns", icon: Mail },
            { id: "sequences", label: "Sequence Library", icon: GitBranch },
            { id: "generator", label: "AI Generator", icon: Wand2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20"
                  : "text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/5"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Search and Filters */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-900 dark:text-slate-300" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-80 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/50 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-300 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-pro-600/20 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Campaigns Table */}
            <div className="glass-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-pro-600/10">
                      <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-6 py-4">Campaign</th>
                      <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Status</th>
                      <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Sequences</th>
                      <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Leads</th>
                      <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Contacted</th>
                      <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Replied</th>
                      <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Meetings</th>
                      <th className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Reply Rate</th>
                      <th className="text-right text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-pro-600/5">
                    {activeCampaigns.map((campaign) => {
                      const status = statusColors[campaign.status as keyof typeof statusColors];
                      return (
                        <tr key={campaign.id} className="hover:bg-emerald-pro-600/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
                                {campaign.name}
                              </p>
                              <p className="text-xs text-slate-900 dark:text-slate-300 mt-0.5">
                                Created {campaign.createdAt} • Last activity {campaign.lastActivity}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border",
                              status.bg,
                              status.text,
                              status.border
                            )}>
                              <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-slate-900 dark:text-white">{campaign.sequences}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-slate-900 dark:text-white">{campaign.totalLeads.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-slate-900 dark:text-white">{campaign.contacted.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-emerald-pro-400 font-medium">{campaign.replied}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-sm text-emerald-pro-500 font-medium">{campaign.meetings}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className={cn(
                              "text-sm font-semibold",
                              campaign.replyRate >= 8 ? "text-emerald-pro-400" : campaign.replyRate >= 5 ? "text-energy-orange" : "text-slate-900 dark:text-slate-300"
                            )}>
                              {campaign.replyRate}%
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-1">
                              {campaign.status === "active" ? (
                                <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-energy-orange hover:bg-energy-orange/10 rounded-lg transition-colors">
                                  <Pause className="h-4 w-4" />
                                </button>
                              ) : campaign.status === "paused" ? (
                                <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-emerald-pro-400 hover:bg-emerald-pro-400/10 rounded-lg transition-colors">
                                  <Play className="h-4 w-4" />
                                </button>
                              ) : null}
                              <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
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
            </div>
          </motion.div>
        )}

        {/* Sequences Tab */}
        {activeTab === "sequences" && (
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Search and Create */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-900 dark:text-slate-300" />
                <input
                  type="text"
                  placeholder="Search sequences..."
                  className="h-10 w-80 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/50 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-300 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-pro-600/20 transition-all"
                />
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-white font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Sequence
              </Button>
            </div>

            {/* Sequence Cards */}
            <div className="grid grid-cols-2 gap-4">
              {sequenceTemplates.map((sequence) => (
                <div
                  key={sequence.id}
                  className="glass-premium p-5 hover:border-emerald-pro-600/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                        <GitBranch className="h-5 w-5 text-emerald-pro-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
                          {sequence.name}
                        </h4>
                        <span className="text-xs text-slate-900 dark:text-slate-300 px-2 py-0.5 rounded-md bg-light-bg-secondary dark:bg-midnight-blue border border-emerald-pro-600/10">
                          {sequence.category}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm text-slate-900 dark:text-slate-300 mb-4">{sequence.description}</p>

                  {/* Sequence Flow Visual */}
                  <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-emerald-pro-600/10">
                    {Array.from({ length: sequence.steps }).map((_, i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                          <Mail className="h-4 w-4 text-emerald-pro-600" />
                        </div>
                        {i < sequence.steps - 1 && (
                          <ArrowRight className="h-4 w-4 text-slate-900 dark:text-slate-300 mx-1" />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-emerald-pro-600/10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-emerald-pro-400" />
                        <span className="text-sm text-slate-900 dark:text-white font-medium">{sequence.avgReplyRate}%</span>
                        <span className="text-xs text-slate-900 dark:text-slate-300">avg reply</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Copy className="h-4 w-4 text-slate-900 dark:text-slate-300" />
                        <span className="text-xs text-slate-900 dark:text-slate-300">{sequence.timesUsed} uses</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-pro-600 hover:bg-emerald-pro-600/10">
                      Use Template
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Generator Tab */}
        {activeTab === "generator" && (
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
            {/* Input Panel */}
            <div className="col-span-1 space-y-4">
              <div className="glass-premium p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-pro-500/10 border border-emerald-pro-500/20">
                    <Wand2 className="h-5 w-5 text-emerald-pro-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">AI Email Generator</h3>
                    <p className="text-xs text-slate-900 dark:text-slate-300">Generate personalized variants</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-2 block">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., VP of Sales at SaaS companies"
                      className="w-full h-10 rounded-xl border border-emerald-pro-600/20 bg-white dark:bg-deep-space/50 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-300 focus:border-emerald-pro-600/50 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-2 block">
                      Pain Point / Value Prop
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Struggling with long sales cycles..."
                      className="w-full rounded-xl border border-emerald-pro-600/20 bg-white dark:bg-deep-space/50 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-900 dark:text-slate-300 focus:border-emerald-pro-600/50 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-2 block">
                      Tone
                    </label>
                    <div className="flex items-center gap-2">
                      {["Professional", "Casual", "Direct"].map((tone) => (
                        <button
                          key={tone}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 transition-all"
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider mb-2 block">
                      Number of Variants
                    </label>
                    <select className="w-full h-10 rounded-xl border border-emerald-pro-600/20 bg-white dark:bg-deep-space/50 px-4 text-sm text-slate-900 dark:text-white focus:border-emerald-pro-600/50 focus:outline-none transition-all">
                      <option value="3">3 variants</option>
                      <option value="5">5 variants</option>
                      <option value="10">10 variants</option>
                    </select>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-emerald-pro-500 to-violet-dark hover:from-violet-light hover:to-emerald-pro-500 text-slate-900 dark:text-white font-semibold">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Variants
                  </Button>
                </div>
              </div>

              {/* Voice Settings */}
              <div className="glass-premium p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Brand Voice Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-emerald-pro-600/10">
                    <span className="text-sm text-slate-900 dark:text-slate-300">Formality Level</span>
                    <span className="text-sm text-slate-900 dark:text-white font-medium">Business Casual</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-emerald-pro-600/10">
                    <span className="text-sm text-slate-900 dark:text-slate-300">Personalization</span>
                    <span className="text-sm text-emerald-pro-400 font-medium">High</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-emerald-pro-600/10">
                    <span className="text-sm text-slate-900 dark:text-slate-300">CTA Style</span>
                    <span className="text-sm text-slate-900 dark:text-white font-medium">Soft Ask</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Variants */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">Generated Variants</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button variant="outline" size="sm" className="border-emerald-pro-400/30 text-emerald-pro-400 hover:bg-emerald-pro-400/10">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Save All
                  </Button>
                </div>
              </div>

              {generatedVariants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="glass-premium p-5 hover:border-emerald-pro-600/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/20 text-emerald-pro-600 font-mono text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-md border",
                          variant.sentiment === "professional" && "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/20",
                          variant.sentiment === "casual" && "bg-emerald-pro-500/10 text-emerald-pro-500 border-emerald-pro-500/20",
                          variant.sentiment === "direct" && "bg-energy-orange/10 text-energy-orange border-energy-orange/20"
                        )}>
                          {variant.sentiment}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-slate-900 dark:text-slate-300">Predicted Open</p>
                        <p className="text-sm font-semibold text-emerald-pro-400">{variant.openRate}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-900 dark:text-slate-300">Predicted Reply</p>
                        <p className="text-sm font-semibold text-emerald-pro-500">{variant.replyRate}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="text-xs text-slate-900 dark:text-slate-300 mb-1">Subject Line</p>
                      <p className="text-slate-900 dark:text-white font-medium">{variant.subject}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-900 dark:text-slate-300 mb-1">Preview</p>
                      <p className="text-slate-900 dark:text-slate-300">{variant.preview}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-emerald-pro-600/10">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-rose hover:bg-rose/10 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Button size="sm" className="bg-emerald-pro-600/10 text-emerald-pro-600 hover:bg-emerald-pro-600/20 border border-emerald-pro-600/20">
                      Use in Campaign
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
