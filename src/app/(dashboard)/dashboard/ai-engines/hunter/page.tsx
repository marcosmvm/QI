"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Target,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Mail,
  UserPlus,
  ThumbsUp,
  ThumbsDown,
  Minus,
  ArrowRight,
  Filter,
  Search,
  ExternalLink,
  Star,
  Building2,
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

// Mock data for Hunter Engine
const overallStats = {
  repliesProcessed: 1247,
  positiveRate: 68,
  leadsQualified: 847,
  referralsGenerated: 156,
  lastProcessed: "2 minutes ago",
};

const replyBreakdown = {
  positive: 847,
  neutral: 234,
  negative: 166,
  total: 1247,
};

const recentReplies = [
  {
    id: "1",
    leadName: "Sarah Johnson",
    company: "TechCorp Industries",
    email: "sarah.johnson@techcorp.com",
    sentiment: "positive",
    subject: "Re: Quick question about your sales strategy",
    preview: "Thanks for reaching out! I'd be happy to schedule a call to discuss...",
    campaign: "Q1 Enterprise Outreach",
    receivedAt: "15 minutes ago",
    score: 92,
    action: "meeting_scheduled",
  },
  {
    id: "2",
    leadName: "Michael Chen",
    company: "Innovate Solutions",
    email: "m.chen@innovatesolutions.io",
    sentiment: "positive",
    subject: "Re: Saw your recent funding announcement",
    preview: "This is timely - we've been looking for a solution like yours...",
    campaign: "SaaS Decision Makers",
    receivedAt: "45 minutes ago",
    score: 88,
    action: "follow_up_sent",
  },
  {
    id: "3",
    leadName: "Jennifer Williams",
    company: "GlobalTech Inc",
    email: "j.williams@globaltech.com",
    sentiment: "neutral",
    subject: "Re: Partnership opportunity",
    preview: "Not the right time for us, but could you reach out in Q2?",
    campaign: "Q1 Enterprise Outreach",
    receivedAt: "2 hours ago",
    score: 45,
    action: "nurture_sequence",
  },
  {
    id: "4",
    leadName: "David Park",
    company: "Nexus Ventures",
    email: "d.park@nexusventures.com",
    sentiment: "positive",
    subject: "Re: Quick intro",
    preview: "Great timing - I was just discussing this with my team...",
    campaign: "Fintech CFOs",
    receivedAt: "3 hours ago",
    score: 95,
    action: "meeting_scheduled",
  },
  {
    id: "5",
    leadName: "Emily Roberts",
    company: "DataFlow Systems",
    email: "e.roberts@dataflow.io",
    sentiment: "negative",
    subject: "Re: Introduction",
    preview: "Please remove me from your mailing list.",
    campaign: "SaaS Decision Makers",
    receivedAt: "4 hours ago",
    score: 0,
    action: "unsubscribed",
  },
];

const referralLeads = [
  {
    id: "1",
    name: "James Thompson",
    company: "Acme Corp",
    title: "VP of Sales",
    referredBy: "Sarah Johnson",
    source: "TechCorp Industries",
    score: 85,
    status: "new",
    addedAt: "1 hour ago",
  },
  {
    id: "2",
    name: "Lisa Martinez",
    company: "CloudScale",
    title: "CRO",
    referredBy: "Michael Chen",
    source: "Innovate Solutions",
    score: 78,
    status: "contacted",
    addedAt: "3 hours ago",
  },
  {
    id: "3",
    name: "Robert Kim",
    company: "FinanceHub",
    title: "Director of Operations",
    referredBy: "David Park",
    source: "Nexus Ventures",
    score: 82,
    status: "new",
    addedAt: "5 hours ago",
  },
];

const qualificationPipeline = [
  { stage: "Replies Received", count: 1247, color: "electric-cyan" },
  { stage: "Positive Intent", count: 847, color: "quantum-violet" },
  { stage: "Qualified Lead", count: 612, color: "neon-mint" },
  { stage: "Meeting Ready", count: 234, color: "energy-orange" },
];

const campaignPerformance = [
  {
    name: "Q1 Enterprise Outreach",
    replies: 423,
    positive: 312,
    qualified: 245,
    meetings: 89,
  },
  {
    name: "SaaS Decision Makers",
    replies: 356,
    positive: 234,
    qualified: 178,
    meetings: 67,
  },
  {
    name: "Healthcare IT Leaders",
    replies: 289,
    positive: 178,
    qualified: 112,
    meetings: 45,
  },
  {
    name: "Fintech CFOs",
    replies: 179,
    positive: 123,
    qualified: 77,
    meetings: 33,
  },
];

export default function HunterPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<"all" | "positive" | "neutral" | "negative">("all");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsRefreshing(false);
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return { bg: "bg-neon-mint/10", text: "text-neon-mint", border: "border-neon-mint/30", icon: ThumbsUp };
      case "neutral":
        return { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/30", icon: Minus };
      case "negative":
        return { bg: "bg-rose/10", text: "text-rose", border: "border-rose/30", icon: ThumbsDown };
      default:
        return { bg: "bg-steel/10", text: "text-steel", border: "border-steel/30", icon: Minus };
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case "meeting_scheduled":
        return { label: "Meeting Scheduled", color: "text-neon-mint" };
      case "follow_up_sent":
        return { label: "Follow-up Sent", color: "text-electric-cyan" };
      case "nurture_sequence":
        return { label: "Added to Nurture", color: "text-quantum-violet" };
      case "unsubscribed":
        return { label: "Unsubscribed", color: "text-rose" };
      default:
        return { label: "Pending Review", color: "text-steel" };
    }
  };

  const filteredReplies = sentimentFilter === "all"
    ? recentReplies
    : recentReplies.filter(r => r.sentiment === sentimentFilter);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-steel mb-2">
            <Link href="/dashboard" className="hover:text-electric-cyan transition-colors">Portal</Link>
            <span>/</span>
            <span className="text-electric-cyan">The Hunter</span>
          </div>
          <h1 className="text-2xl font-sora font-bold text-white">The Hunter</h1>
          <p className="text-steel mt-1">Reply-Based Lead Expansion Engine</p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Engine Status Banner */}
        <motion.div variants={itemVariants} className="relative glass-premium p-6 overflow-hidden border-energy-orange/20">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-energy-orange/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-energy-orange/5 to-transparent" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-energy-orange/10 border border-energy-orange/30">
                <Target className="h-8 w-8 text-energy-orange" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-sora font-bold text-white">Hunter Engine</h2>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-mint/15 border border-neon-mint/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-mint opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-mint"></span>
                    </span>
                    <span className="text-sm font-medium text-neon-mint">ACTIVE</span>
                  </span>
                </div>
                <p className="text-steel mt-1">Converting positive replies into qualified opportunities</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-steel">Last Processed</p>
                <p className="text-white font-medium">{overallStats.lastProcessed}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-steel">Today's Replies</p>
                <p className="text-white font-medium">47 new</p>
              </div>
              <Button
                variant="outline"
                className="gap-2 border-energy-orange/30 hover:bg-energy-orange/10"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                {isRefreshing ? "Processing..." : "Sync Replies"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <MessageSquare className="h-5 w-5 text-electric-cyan" />
              <span className="text-neon-mint text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 12%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-white">{overallStats.repliesProcessed.toLocaleString()}</p>
            <p className="text-sm text-steel mt-1">Total Replies Processed</p>
            <p className="text-xs text-steel mt-2">This month</p>
          </div>

          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <ThumbsUp className="h-5 w-5 text-neon-mint" />
              <span className="text-neon-mint text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 5%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-white">{overallStats.positiveRate}%</p>
            <p className="text-sm text-steel mt-1">Positive Reply Rate</p>
            <p className="text-xs text-steel mt-2">Industry avg: 45%</p>
          </div>

          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-5 w-5 text-quantum-violet" />
              <span className="text-neon-mint text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 18%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-white">{overallStats.leadsQualified.toLocaleString()}</p>
            <p className="text-sm text-steel mt-1">Leads Qualified</p>
            <p className="text-xs text-steel mt-2">From positive replies</p>
          </div>

          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-3">
              <UserPlus className="h-5 w-5 text-energy-orange" />
              <span className="text-neon-mint text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> 24%
              </span>
            </div>
            <p className="text-3xl font-sora font-bold text-white">{overallStats.referralsGenerated}</p>
            <p className="text-sm text-steel mt-1">Referrals Generated</p>
            <p className="text-xs text-steel mt-2">New leads from replies</p>
          </div>
        </motion.div>

        {/* Reply Sentiment Breakdown */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sentiment Overview */}
          <div className="glass-premium p-6">
            <h3 className="text-lg font-sora font-semibold text-white mb-6">Reply Sentiment Analysis</h3>

            <div className="space-y-4">
              {/* Positive */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-neon-mint" />
                    <span className="text-white font-medium">Positive</span>
                  </div>
                  <span className="text-neon-mint font-semibold">{replyBreakdown.positive}</span>
                </div>
                <div className="h-3 rounded-full bg-graphite/30 overflow-hidden">
                  <div
                    className="h-full bg-neon-mint rounded-full"
                    style={{ width: `${(replyBreakdown.positive / replyBreakdown.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-steel mt-1">{((replyBreakdown.positive / replyBreakdown.total) * 100).toFixed(1)}% of replies</p>
              </div>

              {/* Neutral */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Minus className="h-4 w-4 text-energy-orange" />
                    <span className="text-white font-medium">Neutral</span>
                  </div>
                  <span className="text-energy-orange font-semibold">{replyBreakdown.neutral}</span>
                </div>
                <div className="h-3 rounded-full bg-graphite/30 overflow-hidden">
                  <div
                    className="h-full bg-energy-orange rounded-full"
                    style={{ width: `${(replyBreakdown.neutral / replyBreakdown.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-steel mt-1">{((replyBreakdown.neutral / replyBreakdown.total) * 100).toFixed(1)}% of replies</p>
              </div>

              {/* Negative */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4 text-rose" />
                    <span className="text-white font-medium">Negative</span>
                  </div>
                  <span className="text-rose font-semibold">{replyBreakdown.negative}</span>
                </div>
                <div className="h-3 rounded-full bg-graphite/30 overflow-hidden">
                  <div
                    className="h-full bg-rose rounded-full"
                    style={{ width: `${(replyBreakdown.negative / replyBreakdown.total) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-steel mt-1">{((replyBreakdown.negative / replyBreakdown.total) * 100).toFixed(1)}% of replies</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-graphite/30">
              <div className="flex items-center justify-between text-sm">
                <span className="text-steel">Total Replies</span>
                <span className="text-white font-bold">{replyBreakdown.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Qualification Pipeline */}
          <div className="lg:col-span-2 glass-premium p-6">
            <h3 className="text-lg font-sora font-semibold text-white mb-6">Lead Qualification Pipeline</h3>

            <div className="flex items-center justify-between gap-4">
              {qualificationPipeline.map((stage, index) => (
                <div key={stage.stage} className="flex-1 relative">
                  <div className={cn(
                    "rounded-xl border p-4 text-center",
                    stage.color === "electric-cyan" && "border-electric-cyan/30 bg-electric-cyan/10",
                    stage.color === "quantum-violet" && "border-quantum-violet/30 bg-quantum-violet/10",
                    stage.color === "neon-mint" && "border-neon-mint/30 bg-neon-mint/10",
                    stage.color === "energy-orange" && "border-energy-orange/30 bg-energy-orange/10"
                  )}>
                    <p className={cn(
                      "text-2xl font-sora font-bold",
                      stage.color === "electric-cyan" && "text-electric-cyan",
                      stage.color === "quantum-violet" && "text-quantum-violet",
                      stage.color === "neon-mint" && "text-neon-mint",
                      stage.color === "energy-orange" && "text-energy-orange"
                    )}>
                      {stage.count.toLocaleString()}
                    </p>
                    <p className="text-xs text-steel mt-1">{stage.stage}</p>
                  </div>
                  {index < qualificationPipeline.length - 1 && (
                    <ArrowRight className="absolute top-1/2 -right-3 -translate-y-1/2 h-5 w-5 text-graphite z-10" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-deep-space/50 border border-graphite/30 text-center">
                <p className="text-2xl font-sora font-bold text-neon-mint">68%</p>
                <p className="text-xs text-steel mt-1">Positive → Qualified</p>
              </div>
              <div className="p-4 rounded-lg bg-deep-space/50 border border-graphite/30 text-center">
                <p className="text-2xl font-sora font-bold text-quantum-violet">38%</p>
                <p className="text-xs text-steel mt-1">Qualified → Meeting</p>
              </div>
              <div className="p-4 rounded-lg bg-deep-space/50 border border-graphite/30 text-center">
                <p className="text-2xl font-sora font-bold text-energy-orange">19%</p>
                <p className="text-xs text-steel mt-1">Reply → Meeting</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Replies and Referrals */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Replies */}
          <div className="lg:col-span-2 glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sora font-semibold text-white">Recent Replies</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 rounded-lg bg-deep-space/50 border border-graphite/30">
                  {(["all", "positive", "neutral", "negative"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSentimentFilter(filter)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize",
                        sentimentFilter === filter
                          ? "bg-electric-cyan/20 text-electric-cyan"
                          : "text-steel hover:text-white"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredReplies.map((reply) => {
                const sentiment = getSentimentColor(reply.sentiment);
                const action = getActionLabel(reply.action);
                const SentimentIcon = sentiment.icon;
                return (
                  <div
                    key={reply.id}
                    className="p-4 rounded-xl border border-graphite/30 bg-deep-space/50 hover:border-electric-cyan/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center border",
                          sentiment.bg,
                          sentiment.border
                        )}>
                          <SentimentIcon className={cn("h-5 w-5", sentiment.text)} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">{reply.leadName}</p>
                            {reply.score >= 90 && <Star className="h-4 w-4 text-energy-orange fill-energy-orange" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-steel">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>{reply.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn("text-sm font-medium", action.color)}>{action.label}</span>
                        <p className="text-xs text-steel mt-0.5">{reply.receivedAt}</p>
                      </div>
                    </div>

                    <div className="pl-13">
                      <p className="text-sm text-white mb-1">{reply.subject}</p>
                      <p className="text-sm text-steel italic">"{reply.preview}"</p>
                      <div className="flex items-center gap-4 mt-3 text-xs">
                        <span className="text-steel">Campaign: <span className="text-electric-cyan">{reply.campaign}</span></span>
                        <span className="text-steel">Score: <span className={cn(
                          reply.score >= 80 ? "text-neon-mint" : reply.score >= 50 ? "text-energy-orange" : "text-rose"
                        )}>{reply.score}</span></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="outline" className="w-full mt-4 gap-2">
              View All Replies
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Referral Leads */}
          <div className="glass-premium p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sora font-semibold text-white">Referral Leads</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-energy-orange/10 text-energy-orange border border-energy-orange/20">
                {referralLeads.length} new
              </span>
            </div>

            <p className="text-sm text-steel mb-4">
              New leads generated from positive reply mentions and referrals.
            </p>

            <div className="space-y-3">
              {referralLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl border border-graphite/30 bg-deep-space/50 hover:border-electric-cyan/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-sm text-steel">{lead.title}</p>
                    </div>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full capitalize",
                      lead.status === "new"
                        ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                        : "bg-quantum-violet/10 text-quantum-violet border border-quantum-violet/20"
                    )}>
                      {lead.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-steel mb-2">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>{lead.company}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-steel">
                      Referred by <span className="text-quantum-violet">{lead.referredBy}</span>
                    </span>
                    <span className="text-neon-mint font-medium">Score: {lead.score}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 gap-2">
              <UserPlus className="h-4 w-4" />
              Add to Campaign
            </Button>
          </div>
        </motion.div>

        {/* Campaign Performance */}
        <motion.div variants={itemVariants} className="glass-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-sora font-semibold text-white">Campaign Reply Performance</h3>
            <Button variant="ghost" size="sm" className="text-electric-cyan hover:text-electric-cyan/80">
              View Details
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-graphite/50">
                  <th className="text-left text-sm font-medium text-steel pb-4">Campaign</th>
                  <th className="text-center text-sm font-medium text-steel pb-4">Total Replies</th>
                  <th className="text-center text-sm font-medium text-steel pb-4">Positive</th>
                  <th className="text-center text-sm font-medium text-steel pb-4">Qualified</th>
                  <th className="text-center text-sm font-medium text-steel pb-4">Meetings</th>
                  <th className="text-right text-sm font-medium text-steel pb-4">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b border-graphite/30 last:border-0 hover:bg-electric-cyan/5 transition-colors">
                    <td className="py-4">
                      <span className="text-white font-medium">{campaign.name}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-silver">{campaign.replies}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-neon-mint font-semibold">{campaign.positive}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-quantum-violet font-semibold">{campaign.qualified}</span>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-energy-orange font-semibold">{campaign.meetings}</span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="text-neon-mint font-semibold">
                        {((campaign.meetings / campaign.replies) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
