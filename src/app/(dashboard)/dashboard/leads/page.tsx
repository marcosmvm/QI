"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ChevronRight,
  Download,
  Upload,
  RefreshCw,
  Star,
  StarOff,
  Eye,
  Edit3,
  Trash2,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard";
import { useState } from "react";
import Link from "next/link";

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

// Pipeline stages
const pipelineStages = [
  { id: "new", name: "New Leads", color: "electric-cyan", count: 234 },
  { id: "contacted", name: "Contacted", color: "quantum-violet", count: 156 },
  { id: "engaged", name: "Engaged", color: "energy-orange", count: 89 },
  { id: "qualified", name: "Qualified", color: "neon-mint", count: 45 },
  { id: "meeting", name: "Meeting Set", color: "rose", count: 23 },
];

// Mock leads data
const leadsData = [
  {
    id: "lead-001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@acmecorp.com",
    phone: "+1 (555) 234-5678",
    company: "Acme Corporation",
    title: "VP of Sales",
    location: "San Francisco, CA",
    stage: "qualified",
    score: 92,
    starred: true,
    lastActivity: "Replied to email",
    lastActivityTime: "2 hours ago",
    campaign: "Q1 SaaS Outreach",
    source: "LinkedIn",
    createdAt: "Jan 5, 2026",
  },
  {
    id: "lead-002",
    firstName: "Michael",
    lastName: "Chen",
    email: "mchen@techstart.io",
    phone: "+1 (555) 345-6789",
    company: "TechStart Inc",
    title: "CEO",
    location: "Austin, TX",
    stage: "meeting",
    score: 98,
    starred: true,
    lastActivity: "Meeting scheduled",
    lastActivityTime: "30 mins ago",
    campaign: "Q1 SaaS Outreach",
    source: "Cold Email",
    createdAt: "Jan 8, 2026",
  },
  {
    id: "lead-003",
    firstName: "Emily",
    lastName: "Williams",
    email: "ewilliams@healthtech.com",
    phone: "+1 (555) 456-7890",
    company: "HealthTech Solutions",
    title: "Director of Operations",
    location: "Boston, MA",
    stage: "engaged",
    score: 76,
    starred: false,
    lastActivity: "Opened email (3x)",
    lastActivityTime: "1 day ago",
    campaign: "Healthcare Tech DMs",
    source: "Website Visitor",
    createdAt: "Jan 10, 2026",
  },
  {
    id: "lead-004",
    firstName: "David",
    lastName: "Martinez",
    email: "dmartinez@finservices.com",
    phone: "+1 (555) 567-8901",
    company: "Financial Services Group",
    title: "CFO",
    location: "New York, NY",
    stage: "contacted",
    score: 65,
    starred: false,
    lastActivity: "Email sent",
    lastActivityTime: "3 days ago",
    campaign: "FinTech CFO Prospecting",
    source: "Referral",
    createdAt: "Jan 12, 2026",
  },
  {
    id: "lead-005",
    firstName: "Amanda",
    lastName: "Lee",
    email: "alee@manufacturer.com",
    phone: "+1 (555) 678-9012",
    company: "Premier Manufacturing",
    title: "VP Operations",
    location: "Detroit, MI",
    stage: "new",
    score: 54,
    starred: false,
    lastActivity: "Added to list",
    lastActivityTime: "Just now",
    campaign: "Manufacturing VP Ops",
    source: "LinkedIn",
    createdAt: "Jan 18, 2026",
  },
  {
    id: "lead-006",
    firstName: "Robert",
    lastName: "Taylor",
    email: "rtaylor@cloudnine.io",
    phone: "+1 (555) 789-0123",
    company: "CloudNine Systems",
    title: "CTO",
    location: "Seattle, WA",
    stage: "qualified",
    score: 88,
    starred: true,
    lastActivity: "Clicked link in email",
    lastActivityTime: "5 hours ago",
    campaign: "Q1 SaaS Outreach",
    source: "Cold Email",
    createdAt: "Jan 6, 2026",
  },
];

const stageColors: Record<string, { bg: string; text: string; border: string }> = {
  new: { bg: "bg-electric-cyan/10", text: "text-electric-cyan", border: "border-electric-cyan/20" },
  contacted: { bg: "bg-quantum-violet/10", text: "text-quantum-violet", border: "border-quantum-violet/20" },
  engaged: { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/20" },
  qualified: { bg: "bg-neon-mint/10", text: "text-neon-mint", border: "border-neon-mint/20" },
  meeting: { bg: "bg-rose/10", text: "text-rose", border: "border-rose/20" },
};

const scoreColors = (score: number) => {
  if (score >= 80) return { bg: "bg-neon-mint/10", text: "text-neon-mint", border: "border-neon-mint/30" };
  if (score >= 60) return { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/30" };
  return { bg: "bg-steel/10", text: "text-steel", border: "border-steel/30" };
};

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const filteredLeads = selectedStage
    ? leadsData.filter(l => l.stage === selectedStage)
    : leadsData;

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
          <span className="text-electric-cyan">Leads</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-white">Leads</h1>
        <p className="text-steel mt-1">Pipeline management and lead tracking</p>
      </motion.div>

      <div className="space-y-6">
        {/* Quick Stats - Using MetricsCard */}
        <div className="grid grid-cols-5 gap-4">
          <MetricsCard
            title="Total Leads"
            value={547}
            change={23}
            icon={Users}
            accent="cyan"
            delay={0}
          />
          <MetricsCard
            title="Hot Leads"
            value={45}
            change={8}
            icon={Target}
            accent="mint"
            delay={0.1}
          />
          <MetricsCard
            title="Contacted Today"
            value={78}
            change={12}
            icon={Mail}
            accent="violet"
            delay={0.2}
          />
          <MetricsCard
            title="Meetings This Week"
            value={12}
            change={3}
            icon={Calendar}
            accent="orange"
            delay={0.3}
          />
          <MetricsCard
            title="Conversion Rate"
            value={4.2}
            suffix="%"
            change={0.5}
            icon={TrendingUp}
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
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-80 rounded-xl border border-electric-cyan/20 bg-midnight-blue/50 pl-10 pr-4 text-sm text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-2 focus:ring-electric-cyan/20 transition-all"
              />
            </div>
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-midnight-blue/50 border border-electric-cyan/10">
              <button
                onClick={() => setViewMode("pipeline")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "pipeline"
                    ? "bg-electric-cyan/10 text-electric-cyan"
                    : "text-steel hover:text-white"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "list"
                    ? "bg-electric-cyan/10 text-electric-cyan"
                    : "text-steel hover:text-white"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Pipeline View */}
        {viewMode === "pipeline" && (
          <motion.div variants={itemVariants} className="grid grid-cols-5 gap-4">
            {pipelineStages.map((stage) => {
              const stageLeads = leadsData.filter(l => l.stage === stage.id);
              return (
                <div key={stage.id} className="space-y-3">
                  {/* Stage Header */}
                  <div className={cn(
                    "rounded-xl border p-4",
                    stage.color === "electric-cyan" && "border-electric-cyan/30 bg-electric-cyan/5",
                    stage.color === "quantum-violet" && "border-quantum-violet/30 bg-quantum-violet/5",
                    stage.color === "energy-orange" && "border-energy-orange/30 bg-energy-orange/5",
                    stage.color === "neon-mint" && "border-neon-mint/30 bg-neon-mint/5",
                    stage.color === "rose" && "border-rose/30 bg-rose/5"
                  )}>
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "font-semibold",
                        stage.color === "electric-cyan" && "text-electric-cyan",
                        stage.color === "quantum-violet" && "text-quantum-violet",
                        stage.color === "energy-orange" && "text-energy-orange",
                        stage.color === "neon-mint" && "text-neon-mint",
                        stage.color === "rose" && "text-rose"
                      )}>
                        {stage.name}
                      </h3>
                      <span className={cn(
                        "text-xs font-mono px-2 py-0.5 rounded-md border",
                        stage.color === "electric-cyan" && "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
                        stage.color === "quantum-violet" && "bg-quantum-violet/10 text-quantum-violet border-quantum-violet/30",
                        stage.color === "energy-orange" && "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
                        stage.color === "neon-mint" && "bg-neon-mint/10 text-neon-mint border-neon-mint/30",
                        stage.color === "rose" && "bg-rose/10 text-rose border-rose/30"
                      )}>
                        {stage.count}
                      </span>
                    </div>
                  </div>

                  {/* Lead Cards */}
                  <div className="space-y-2">
                    {stageLeads.map((lead) => {
                      const scoreStyle = scoreColors(lead.score);
                      return (
                        <Link
                          key={lead.id}
                          href={`/dashboard/leads/${lead.id}`}
                          className="block rounded-xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-4 hover:border-electric-cyan/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-quantum-violet to-violet-dark flex items-center justify-center text-xs font-bold text-white">
                                {lead.firstName[0]}{lead.lastName[0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white group-hover:text-electric-cyan transition-colors">
                                  {lead.firstName} {lead.lastName}
                                </p>
                                <p className="text-xs text-steel">{lead.title}</p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                // Toggle star
                              }}
                              className="text-steel hover:text-energy-orange transition-colors"
                            >
                              {lead.starred ? (
                                <Star className="h-4 w-4 fill-energy-orange text-energy-orange" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 mb-2">
                            <Building2 className="h-3 w-3 text-steel" />
                            <span className="text-xs text-steel truncate">{lead.company}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className={cn(
                              "flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border",
                              scoreStyle.bg,
                              scoreStyle.text,
                              scoreStyle.border
                            )}>
                              <Zap className="h-3 w-3" />
                              {lead.score}
                            </div>
                            <span className="text-[10px] text-steel">{lead.lastActivityTime}</span>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Add Lead to Stage */}
                    <button className="w-full p-3 rounded-xl border border-dashed border-electric-cyan/20 text-steel hover:text-electric-cyan hover:border-electric-cyan/40 transition-all flex items-center justify-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span className="text-xs">Add Lead</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <motion.div variants={itemVariants} className="glass-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-electric-cyan/10">
                    <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-6 py-4">Lead</th>
                    <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Company</th>
                    <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Stage</th>
                    <th className="text-center text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Score</th>
                    <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Campaign</th>
                    <th className="text-left text-xs font-semibold text-steel uppercase tracking-wider px-4 py-4">Last Activity</th>
                    <th className="text-right text-xs font-semibold text-steel uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-electric-cyan/5">
                  {filteredLeads.map((lead) => {
                    const stage = stageColors[lead.stage];
                    const scoreStyle = scoreColors(lead.score);
                    return (
                      <tr key={lead.id} className="hover:bg-electric-cyan/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                // Toggle star
                              }}
                              className="text-steel hover:text-energy-orange transition-colors"
                            >
                              {lead.starred ? (
                                <Star className="h-4 w-4 fill-energy-orange text-energy-orange" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </button>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-quantum-violet to-violet-dark flex items-center justify-center text-sm font-bold text-white">
                              {lead.firstName[0]}{lead.lastName[0]}
                            </div>
                            <div>
                              <Link
                                href={`/dashboard/leads/${lead.id}`}
                                className="font-medium text-white hover:text-electric-cyan transition-colors"
                              >
                                {lead.firstName} {lead.lastName}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-steel">{lead.title}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm text-white">{lead.company}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-steel" />
                              <span className="text-xs text-steel">{lead.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border",
                            stage.bg,
                            stage.text,
                            stage.border
                          )}>
                            {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border",
                            scoreStyle.bg,
                            scoreStyle.text,
                            scoreStyle.border
                          )}>
                            <Zap className="h-3 w-3" />
                            {lead.score}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-white">{lead.campaign}</p>
                          <p className="text-xs text-steel mt-0.5">via {lead.source}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-white">{lead.lastActivity}</p>
                          <p className="text-xs text-steel mt-0.5">{lead.lastActivityTime}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/dashboard/leads/${lead.id}`}
                              className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors">
                              <Mail className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 rounded-lg transition-colors">
                              <Phone className="h-4 w-4" />
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
                Showing <span className="text-white font-medium">1-6</span> of <span className="text-white font-medium">547</span> leads
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
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
