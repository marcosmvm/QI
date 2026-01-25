"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  { id: "new", name: "New Leads", color: "emerald-pro-600", count: 234 },
  { id: "contacted", name: "Contacted", color: "emerald-pro-500", count: 156 },
  { id: "engaged", name: "Engaged", color: "energy-orange", count: 89 },
  { id: "qualified", name: "Qualified", color: "emerald-pro-400", count: 45 },
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
  new: { bg: "bg-emerald-pro-600/10", text: "text-emerald-pro-600", border: "border-emerald-pro-600/20" },
  contacted: { bg: "bg-emerald-pro-500/10", text: "text-emerald-pro-500", border: "border-emerald-pro-500/20" },
  engaged: { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/20" },
  qualified: { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/20" },
  meeting: { bg: "bg-rose/10", text: "text-rose", border: "border-rose/20" },
};

const scoreColors = (score: number) => {
  if (score >= 80) return { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/30" };
  if (score >= 60) return { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/30" };
  return { bg: "bg-steel/10", text: "text-slate-900 dark:text-slate-300", border: "border-steel/30" };
};

export default function LeadsPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"pipeline" | "list">("pipeline");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [leads, setLeads] = useState(leadsData);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [sortBy, setSortBy] = useState<"score" | "name" | "company" | "activity">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterSource, setFilterSource] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle star on lead
  const toggleStar = useCallback((leadId: string) => {
    setLeads(prev => prev.map(lead =>
      lead.id === leadId ? { ...lead, starred: !lead.starred } : lead
    ));
  }, []);

  // Export leads to CSV
  const handleExport = useCallback(() => {
    const headers = ["Name", "Email", "Company", "Title", "Stage", "Score", "Source", "Campaign"];
    const rows = leads.map(lead => [
      `${lead.firstName} ${lead.lastName}`,
      lead.email,
      lead.company,
      lead.title,
      lead.stage,
      lead.score,
      lead.source,
      lead.campaign
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  }, [leads]);

  // Handle import (simulated)
  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, this would parse the CSV and add leads
      alert(`Importing ${file.name}... This feature will be connected to the backend.`);
    }
  }, []);

  // Sort leads
  const sortLeads = useCallback((leadsToSort: typeof leadsData) => {
    return [...leadsToSort].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "score":
          comparison = a.score - b.score;
          break;
        case "name":
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
          break;
        case "company":
          comparison = a.company.localeCompare(b.company);
          break;
        case "activity":
          // Sort by most recent activity (approximation)
          comparison = a.lastActivityTime.localeCompare(b.lastActivityTime);
          break;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });
  }, [sortBy, sortOrder]);

  // Apply filters and sorting
  const filteredLeads = sortLeads(
    leads.filter(lead => {
      const matchesSearch = searchQuery === "" ||
        `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = !selectedStage || lead.stage === selectedStage;
      const matchesSource = !filterSource || lead.source === filterSource;
      return matchesSearch && matchesStage && matchesSource;
    })
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Leads</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Leads</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Pipeline management and lead tracking</p>
      </motion.div>

      <div className="space-y-6">
        {/* Quick Stats - Using MetricsCard */}
        <div className="grid grid-cols-5 gap-4">
          <MetricsCard
            title="Total Leads"
            value={547}
            change={23}
            icon={Users}
            accent="emerald"
            delay={0}
          />
          <MetricsCard
            title="Hot Leads"
            value={45}
            change={8}
            icon={Target}
            accent="emerald"
            delay={0.1}
          />
          <MetricsCard
            title="Contacted Today"
            value={78}
            change={12}
            icon={Mail}
            accent="sky"
            delay={0.2}
          />
          <MetricsCard
            title="Meetings This Week"
            value={12}
            change={3}
            icon={Calendar}
            accent="amber"
            delay={0.3}
          />
          <MetricsCard
            title="Conversion Rate"
            value={4.2}
            suffix="%"
            change={0.5}
            icon={TrendingUp}
            accent="emerald"
            delay={0.4}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-80 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/50 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-2 focus:ring-emerald-pro-600/20 transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white",
                  (filterSource || selectedStage) && "border-emerald-pro-600/50 text-emerald-pro-600"
                )}
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                {(filterSource || selectedStage) && (
                  <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-emerald-pro-600/20 rounded">
                    {[filterSource, selectedStage].filter(Boolean).length}
                  </span>
                )}
              </Button>
              <AnimatePresence>
                {showFilterDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/95 backdrop-blur-xl p-4 shadow-xl z-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Filters</span>
                      <button
                        onClick={() => {
                          setFilterSource(null);
                          setSelectedStage(null);
                        }}
                        className="text-xs text-emerald-pro-600 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">Source</label>
                        <div className="flex flex-wrap gap-1">
                          {["LinkedIn", "Cold Email", "Website Visitor", "Referral"].map(source => (
                            <button
                              key={source}
                              onClick={() => setFilterSource(filterSource === source ? null : source)}
                              className={cn(
                                "px-2 py-1 text-xs rounded-lg border transition-all",
                                filterSource === source
                                  ? "bg-emerald-pro-600/20 text-emerald-pro-600 border-emerald-pro-600/30"
                                  : "card-base text-slate-900 dark:text-slate-100 hover:border-emerald-pro-600/30"
                              )}
                            >
                              {source}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-700 dark:text-slate-300 mb-2 block">Stage</label>
                        <div className="flex flex-wrap gap-1">
                          {pipelineStages.map(stage => (
                            <button
                              key={stage.id}
                              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
                              className={cn(
                                "px-2 py-1 text-xs rounded-lg border transition-all",
                                selectedStage === stage.id
                                  ? "bg-emerald-pro-600/20 text-emerald-pro-600 border-emerald-pro-600/30"
                                  : "card-base text-slate-900 dark:text-slate-100 hover:border-emerald-pro-600/30"
                              )}
                            >
                              {stage.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowFilterDropdown(false)}
                      className="w-full mt-4 px-3 py-2 text-sm bg-emerald-pro-600/10 text-emerald-pro-600 rounded-lg hover:bg-emerald-pro-600/20 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/95 backdrop-blur-xl p-2 shadow-xl z-50"
                  >
                    {[
                      { id: "score", label: "Lead Score" },
                      { id: "name", label: "Name" },
                      { id: "company", label: "Company" },
                      { id: "activity", label: "Recent Activity" },
                    ].map(option => (
                      <button
                        key={option.id}
                        onClick={() => {
                          if (sortBy === option.id) {
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          } else {
                            setSortBy(option.id as typeof sortBy);
                            setSortOrder("desc");
                          }
                          setShowSortDropdown(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                          sortBy === option.id
                            ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/5"
                        )}
                      >
                        {option.label}
                        {sortBy === option.id && (
                          <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10">
              <button
                onClick={() => setViewMode("pipeline")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "pipeline"
                    ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
                title="Pipeline View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "list"
                    ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              onClick={handleImportClick}
            >
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-white font-semibold"
              onClick={() => setShowAddLeadModal(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Click outside to close dropdowns */}
        {(showFilterDropdown || showSortDropdown) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowFilterDropdown(false);
              setShowSortDropdown(false);
            }}
          />
        )}

        {/* Pipeline View */}
        {viewMode === "pipeline" && (
          <motion.div variants={itemVariants} className="grid grid-cols-5 gap-4">
            {pipelineStages.map((stage) => {
              const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
              return (
                <div key={stage.id} className="space-y-3">
                  {/* Stage Header */}
                  <div className={cn(
                    "rounded-xl border p-4",
                    stage.color === "emerald-pro-600" && "border-emerald-pro-600/30 bg-emerald-pro-600/5",
                    stage.color === "emerald-pro-500" && "border-emerald-pro-500/30 bg-emerald-pro-500/5",
                    stage.color === "energy-orange" && "border-energy-orange/30 bg-energy-orange/5",
                    stage.color === "emerald-pro-400" && "border-emerald-pro-400/30 bg-emerald-pro-400/5",
                    stage.color === "rose" && "border-rose/30 bg-rose/5"
                  )}>
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "font-semibold",
                        stage.color === "emerald-pro-600" && "text-emerald-pro-600",
                        stage.color === "emerald-pro-500" && "text-emerald-pro-500",
                        stage.color === "energy-orange" && "text-energy-orange",
                        stage.color === "emerald-pro-400" && "text-emerald-pro-400",
                        stage.color === "rose" && "text-rose"
                      )}>
                        {stage.name}
                      </h3>
                      <span className={cn(
                        "text-xs font-mono px-2 py-0.5 rounded-md border",
                        stage.color === "emerald-pro-600" && "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
                        stage.color === "emerald-pro-500" && "bg-emerald-pro-500/10 text-emerald-pro-500 border-emerald-pro-500/30",
                        stage.color === "energy-orange" && "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
                        stage.color === "emerald-pro-400" && "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
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
                          className="block rounded-xl card-base p-4 hover:border-emerald-pro-600/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-pro-500 to-emerald-pro-700 flex items-center justify-center text-xs font-bold text-white">
                                {lead.firstName[0]}{lead.lastName[0]}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
                                  {lead.firstName} {lead.lastName}
                                </p>
                                <p className="text-xs text-slate-600 dark:text-slate-300">{lead.title}</p>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleStar(lead.id);
                              }}
                              className="text-slate-500 dark:text-slate-400 hover:text-energy-orange transition-colors"
                            >
                              {lead.starred ? (
                                <Star className="h-4 w-4 fill-energy-orange text-energy-orange" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 mb-2">
                            <Building2 className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 truncate">{lead.company}</span>
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
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{lead.lastActivityTime}</span>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Add Lead to Stage */}
                    <button className="w-full p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:border-emerald-pro-600/40 transition-all flex items-center justify-center gap-2">
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
                  <tr className="border-b border-emerald-pro-600/10">
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Lead</th>
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Company</th>
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Stage</th>
                    <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Score</th>
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Campaign</th>
                    <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-4">Last Activity</th>
                    <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-pro-600/5">
                  {filteredLeads.map((lead) => {
                    const stage = stageColors[lead.stage];
                    const scoreStyle = scoreColors(lead.score);
                    return (
                      <tr key={lead.id} className="hover:bg-emerald-pro-600/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleStar(lead.id);
                              }}
                              className="text-slate-500 dark:text-slate-400 hover:text-energy-orange transition-colors"
                            >
                              {lead.starred ? (
                                <Star className="h-4 w-4 fill-energy-orange text-energy-orange" />
                              ) : (
                                <StarOff className="h-4 w-4" />
                              )}
                            </button>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-pro-500 to-emerald-pro-700 flex items-center justify-center text-sm font-bold text-white">
                              {lead.firstName[0]}{lead.lastName[0]}
                            </div>
                            <div>
                              <Link
                                href={`/dashboard/leads/${lead.id}`}
                                className="font-medium text-slate-900 dark:text-white hover:text-emerald-pro-600 transition-colors"
                              >
                                {lead.firstName} {lead.lastName}
                              </Link>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs text-slate-600 dark:text-slate-300">{lead.title}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm text-slate-900 dark:text-white">{lead.company}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                              <span className="text-xs text-slate-600 dark:text-slate-300">{lead.location}</span>
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
                          <p className="text-sm text-slate-900 dark:text-white">{lead.campaign}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">via {lead.source}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-slate-900 dark:text-white">{lead.lastActivity}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{lead.lastActivityTime}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/dashboard/leads/${lead.id}`}
                              className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                              <Mail className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                              <Phone className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
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
            <div className="flex items-center justify-between px-6 py-4 border-t border-emerald-pro-600/10">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Showing <span className="text-slate-900 dark:text-white font-medium">1-6</span> of <span className="text-slate-900 dark:text-white font-medium">547</span> leads
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Add Lead Modal */}
        <AnimatePresence>
          {showAddLeadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="absolute inset-0 bg-bg backdrop-blur-sm"
                onClick={() => setShowAddLeadModal(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-lg rounded-2xl border border-border bg-bg-surface p-6 shadow-2xl"
              >
                <button
                  onClick={() => setShowAddLeadModal(false)}
                  className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-emerald-pro-600/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-pro-600/10 border border-emerald-pro-600/30">
                    <UserPlus className="h-6 w-6 text-emerald-pro-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-sora font-bold text-slate-900 dark:text-white">Add New Lead</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Enter the lead details below</p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const newLead = {
                      id: `lead-${Date.now()}`,
                      firstName: formData.get("firstName") as string,
                      lastName: formData.get("lastName") as string,
                      email: formData.get("email") as string,
                      phone: formData.get("phone") as string || "",
                      company: formData.get("company") as string,
                      title: formData.get("title") as string,
                      location: "",
                      stage: "new",
                      score: 50,
                      starred: false,
                      lastActivity: "Added to list",
                      lastActivityTime: "Just now",
                      campaign: "Manual Entry",
                      source: "Import",
                      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    };
                    setLeads(prev => [newLead, ...prev]);
                    setShowAddLeadModal(false);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name *</label>
                      <input
                        name="firstName"
                        required
                        placeholder="John"
                        className="w-full h-10 rounded-lg input-base px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name *</label>
                      <input
                        name="lastName"
                        required
                        placeholder="Doe"
                        className="w-full h-10 rounded-lg input-base px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john.doe@company.com"
                      className="w-full h-10 rounded-lg input-base px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full h-10 rounded-lg input-base px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company *</label>
                      <input
                        name="company"
                        required
                        placeholder="Acme Inc"
                        className="w-full h-10 rounded-lg input-base px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title *</label>
                      <input
                        name="title"
                        required
                        placeholder="VP of Sales"
                        className="w-full h-10 rounded-lg input-base px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-border-default dark:border-graphite/50">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddLeadModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lead
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
