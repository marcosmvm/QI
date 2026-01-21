"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
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
  Star,
  StarOff,
  Edit3,
  Trash2,
  Zap,
  Globe,
  Linkedin,
  Twitter,
  ExternalLink,
  Send,
  Plus,
  MoreHorizontal,
  User,
  Briefcase,
  Target,
  Activity,
  TrendingUp,
  Eye,
  MousePointer,
  FileText,
  Link2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

// Mock lead data (in production, fetch based on ID)
const leadData = {
  id: "lead-001",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@acmecorp.com",
  phone: "+1 (555) 234-5678",
  company: "Acme Corporation",
  title: "VP of Sales",
  location: "San Francisco, CA",
  website: "acmecorp.com",
  linkedin: "linkedin.com/in/sarahjohnson",
  twitter: "@sarahjohnson",
  stage: "qualified",
  score: 92,
  starred: true,
  campaign: "Q1 SaaS Outreach",
  source: "LinkedIn",
  createdAt: "Jan 5, 2026",
  companySize: "500-1000",
  industry: "Technology",
  revenue: "$50M-$100M",
  notes: "Very interested in our enterprise solution. Has budget approval pending for Q1. Mentioned they're evaluating 3 vendors.",
};

// Mock activity timeline
const activityTimeline = [
  {
    id: "act-001",
    type: "reply",
    title: "Replied to email",
    description: "Positive response expressing interest in a demo",
    timestamp: "2 hours ago",
    details: {
      subject: "Re: Quick question about Acme's growth plans",
      preview: "Hi, thanks for reaching out. I'd be happy to learn more about your solution. We're currently evaluating options for...",
    },
  },
  {
    id: "act-002",
    type: "click",
    title: "Clicked link in email",
    description: "Visited pricing page from email link",
    timestamp: "1 day ago",
    details: {
      page: "/pricing",
      duration: "4m 32s",
    },
  },
  {
    id: "act-003",
    type: "open",
    title: "Opened email (3x)",
    description: "Multiple opens suggest high interest",
    timestamp: "2 days ago",
    details: {
      subject: "Quick question about Acme's growth plans",
      opens: 3,
    },
  },
  {
    id: "act-004",
    type: "sent",
    title: "Email sent",
    description: "Initial outreach email delivered",
    timestamp: "3 days ago",
    details: {
      subject: "Quick question about Acme's growth plans",
      sequence: "Q1 SaaS Outreach - Step 1",
    },
  },
  {
    id: "act-005",
    type: "added",
    title: "Added to campaign",
    description: "Imported from LinkedIn Sales Navigator",
    timestamp: "Jan 5, 2026",
    details: {
      campaign: "Q1 SaaS Outreach",
      source: "LinkedIn",
    },
  },
];

// Mock emails sent
const emailHistory = [
  {
    id: "email-001",
    subject: "Quick question about Acme's growth plans",
    status: "replied",
    sentAt: "3 days ago",
    openRate: "3 opens",
    sequence: "Step 1",
  },
  {
    id: "email-002",
    subject: "Following up on our conversation",
    status: "scheduled",
    scheduledFor: "Tomorrow, 9:00 AM",
    sequence: "Step 2",
  },
];

const activityIcons: Record<string, typeof Mail> = {
  reply: MessageSquare,
  click: MousePointer,
  open: Eye,
  sent: Send,
  added: Plus,
};

const activityColors: Record<string, { bg: string; text: string; border: string }> = {
  reply: { bg: "bg-neon-mint/10", text: "text-neon-mint", border: "border-neon-mint/20" },
  click: { bg: "bg-quantum-violet/10", text: "text-quantum-violet", border: "border-quantum-violet/20" },
  open: { bg: "bg-electric-cyan/10", text: "text-electric-cyan", border: "border-electric-cyan/20" },
  sent: { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/20" },
  added: { bg: "bg-steel/10", text: "text-steel", border: "border-steel/20" },
};

const stageOptions = [
  { id: "new", name: "New Lead", color: "electric-cyan" },
  { id: "contacted", name: "Contacted", color: "quantum-violet" },
  { id: "engaged", name: "Engaged", color: "energy-orange" },
  { id: "qualified", name: "Qualified", color: "neon-mint" },
  { id: "meeting", name: "Meeting Set", color: "rose" },
];

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const [starred, setStarred] = useState(leadData.starred);
  const [currentStage, setCurrentStage] = useState(leadData.stage);
  const [activeTab, setActiveTab] = useState<"activity" | "emails" | "notes">("activity");

  return (
    <div className="min-h-screen bg-deep-space p-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <Link href="/dashboard" className="hover:text-electric-cyan transition-colors">Portal</Link>
          <span>/</span>
          <Link href="/dashboard/leads" className="hover:text-electric-cyan transition-colors">Leads</Link>
          <span>/</span>
          <span className="text-white">{leadData.firstName} {leadData.lastName}</span>
        </div>
      </div>

      <div>
        {/* Back Button */}
        <Link
          href="/dashboard/leads"
          className="inline-flex items-center gap-2 text-sm text-steel hover:text-electric-cyan transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Leads
        </Link>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Lead Header Card */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-quantum-violet to-violet-dark flex items-center justify-center text-xl font-bold text-white shadow-glow-violet">
                    {leadData.firstName[0]}{leadData.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-sora font-bold text-white">
                        {leadData.firstName} {leadData.lastName}
                      </h2>
                      <button
                        onClick={() => setStarred(!starred)}
                        className="text-steel hover:text-energy-orange transition-colors"
                      >
                        {starred ? (
                          <Star className="h-5 w-5 fill-energy-orange text-energy-orange" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-steel flex items-center gap-2 mt-1">
                      <Briefcase className="h-4 w-4" />
                      {leadData.title} at {leadData.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-electric-cyan/20 text-steel hover:text-white">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-rose/30 text-rose hover:bg-rose/10">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>

              {/* Lead Score and Stage */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-mint/10 border border-neon-mint/30">
                    <Zap className="h-6 w-6 text-neon-mint" />
                  </div>
                  <div>
                    <p className="text-xs text-steel">Lead Score</p>
                    <p className="text-2xl font-sora font-bold text-neon-mint">{leadData.score}</p>
                  </div>
                </div>

                <div className="h-12 w-px bg-electric-cyan/20" />

                <div>
                  <p className="text-xs text-steel mb-2">Stage</p>
                  <div className="flex items-center gap-2">
                    {stageOptions.map((stage) => (
                      <button
                        key={stage.id}
                        onClick={() => setCurrentStage(stage.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                          currentStage === stage.id
                            ? stage.color === "electric-cyan" && "bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30"
                            : currentStage === stage.id && stage.color === "quantum-violet"
                            ? "bg-quantum-violet/20 text-quantum-violet border-quantum-violet/30"
                            : currentStage === stage.id && stage.color === "energy-orange"
                            ? "bg-energy-orange/20 text-energy-orange border-energy-orange/30"
                            : currentStage === stage.id && stage.color === "neon-mint"
                            ? "bg-neon-mint/20 text-neon-mint border-neon-mint/30"
                            : currentStage === stage.id && stage.color === "rose"
                            ? "bg-rose/20 text-rose border-rose/30"
                            : "bg-deep-space/50 text-steel border-electric-cyan/10 hover:border-electric-cyan/30",
                          currentStage === stage.id && stage.color === "electric-cyan" && "bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30",
                          currentStage === stage.id && stage.color === "quantum-violet" && "bg-quantum-violet/20 text-quantum-violet border-quantum-violet/30",
                          currentStage === stage.id && stage.color === "energy-orange" && "bg-energy-orange/20 text-energy-orange border-energy-orange/30",
                          currentStage === stage.id && stage.color === "neon-mint" && "bg-neon-mint/20 text-neon-mint border-neon-mint/30",
                          currentStage === stage.id && stage.color === "rose" && "bg-rose/20 text-rose border-rose/30"
                        )}
                      >
                        {stage.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-electric-cyan/10">
                <Button className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="border-electric-cyan/20 text-white hover:bg-electric-cyan/10">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="border-electric-cyan/20 text-white hover:bg-electric-cyan/10">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="border-electric-cyan/20 text-white hover:bg-electric-cyan/10">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-midnight-blue/50 border border-electric-cyan/10 w-fit">
              {[
                { id: "activity", label: "Activity Timeline", icon: Activity },
                { id: "emails", label: "Email History", icon: Mail },
                { id: "notes", label: "Notes", icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                      : "text-steel hover:text-white hover:bg-electric-cyan/5"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Activity Timeline */}
            {activeTab === "activity" && (
              <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Activity Timeline</h3>
                <div className="space-y-4">
                  {activityTimeline.map((activity, index) => {
                    const Icon = activityIcons[activity.type];
                    const colors = activityColors[activity.type];
                    return (
                      <div key={activity.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border",
                            colors.bg,
                            colors.border
                          )}>
                            <Icon className={cn("h-5 w-5", colors.text)} />
                          </div>
                          {index < activityTimeline.length - 1 && (
                            <div className="w-px h-full bg-electric-cyan/10 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-white">{activity.title}</h4>
                            <span className="text-xs text-steel">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-steel mb-2">{activity.description}</p>
                          {activity.details && (
                            <div className="p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                              {activity.details.subject && (
                                <p className="text-xs text-steel">
                                  Subject: <span className="text-white">{activity.details.subject}</span>
                                </p>
                              )}
                              {activity.details.preview && (
                                <p className="text-sm text-steel mt-1 italic">"{activity.details.preview}"</p>
                              )}
                              {activity.details.page && (
                                <p className="text-xs text-steel">
                                  Page: <span className="text-electric-cyan">{activity.details.page}</span>
                                  {activity.details.duration && ` • Duration: ${activity.details.duration}`}
                                </p>
                              )}
                              {activity.details.opens && (
                                <p className="text-xs text-steel">
                                  Total opens: <span className="text-white">{activity.details.opens}</span>
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Email History */}
            {activeTab === "emails" && (
              <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Email History</h3>
                  <Button size="sm" className="bg-electric-cyan/10 text-electric-cyan hover:bg-electric-cyan/20 border border-electric-cyan/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Compose Email
                  </Button>
                </div>
                <div className="space-y-3">
                  {emailHistory.map((email) => (
                    <div
                      key={email.id}
                      className="p-4 rounded-xl border border-electric-cyan/10 bg-deep-space/50 hover:border-electric-cyan/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg border",
                            email.status === "replied" && "bg-neon-mint/10 border-neon-mint/20",
                            email.status === "scheduled" && "bg-energy-orange/10 border-energy-orange/20"
                          )}>
                            {email.status === "replied" ? (
                              <MessageSquare className="h-4 w-4 text-neon-mint" />
                            ) : (
                              <Clock className="h-4 w-4 text-energy-orange" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{email.subject}</p>
                            <p className="text-xs text-steel">{email.sequence}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-lg border font-medium",
                          email.status === "replied" && "bg-neon-mint/10 text-neon-mint border-neon-mint/20",
                          email.status === "scheduled" && "bg-energy-orange/10 text-energy-orange border-energy-orange/20"
                        )}>
                          {email.status === "replied" ? "Replied" : "Scheduled"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-steel">
                        {email.sentAt && <span>Sent {email.sentAt}</span>}
                        {email.scheduledFor && <span>Scheduled for {email.scheduledFor}</span>}
                        {email.openRate && <span>{email.openRate}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {activeTab === "notes" && (
              <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Notes</h3>
                  <Button size="sm" className="bg-electric-cyan/10 text-electric-cyan hover:bg-electric-cyan/20 border border-electric-cyan/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Note
                  </Button>
                </div>
                <div className="p-4 rounded-xl border border-electric-cyan/10 bg-deep-space/50">
                  <p className="text-sm text-steel">{leadData.notes}</p>
                  <p className="text-xs text-steel/60 mt-3">Added on {leadData.createdAt}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
              <h3 className="font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <Mail className="h-4 w-4 text-electric-cyan" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-steel">Email</p>
                    <p className="text-sm text-white truncate">{leadData.email}</p>
                  </div>
                  <button className="text-steel hover:text-electric-cyan transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <Phone className="h-4 w-4 text-electric-cyan" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-steel">Phone</p>
                    <p className="text-sm text-white">{leadData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <MapPin className="h-4 w-4 text-electric-cyan" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-steel">Location</p>
                    <p className="text-sm text-white">{leadData.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-electric-cyan/10">
                <a
                  href={`https://${leadData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border border-electric-cyan/20 text-steel hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-xs">LinkedIn</span>
                </a>
                <a
                  href={`https://twitter.com/${leadData.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg border border-electric-cyan/20 text-steel hover:text-electric-cyan hover:bg-electric-cyan/5 transition-all"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="text-xs">Twitter</span>
                </a>
              </div>
            </div>

            {/* Company Info */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
              <h3 className="font-semibold text-white mb-4">Company Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-steel" />
                    <span className="text-sm text-steel">Company</span>
                  </div>
                  <span className="text-sm text-white font-medium">{leadData.company}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-steel" />
                    <span className="text-sm text-steel">Industry</span>
                  </div>
                  <span className="text-sm text-white font-medium">{leadData.industry}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-steel" />
                    <span className="text-sm text-steel">Size</span>
                  </div>
                  <span className="text-sm text-white font-medium">{leadData.companySize}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-steel" />
                    <span className="text-sm text-steel">Revenue</span>
                  </div>
                  <span className="text-sm text-white font-medium">{leadData.revenue}</span>
                </div>
                <a
                  href={`https://${leadData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10 hover:border-electric-cyan/30 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-steel" />
                    <span className="text-sm text-steel">Website</span>
                  </div>
                  <div className="flex items-center gap-1 text-electric-cyan">
                    <span className="text-sm font-medium">{leadData.website}</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 p-5">
              <h3 className="font-semibold text-white mb-4">Campaign Info</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                  <p className="text-xs text-steel mb-1">Active Campaign</p>
                  <p className="text-sm text-white font-medium">{leadData.campaign}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                    <p className="text-xs text-steel mb-1">Source</p>
                    <p className="text-sm text-white font-medium">{leadData.source}</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-deep-space/50 border border-electric-cyan/10">
                    <p className="text-xs text-steel mb-1">Added</p>
                    <p className="text-sm text-white font-medium">{leadData.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
