"use client";

import Link from "next/link";
import { Header } from "@/components/navigation/Header";
import {
  MetricsCard,
  CampaignTable,
  PerformanceChart,
  EngineStatus,
  LeadCard,
  AppointmentCard,
  ActivityFeed,
  QuickStats,
} from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Eye,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  Plus,
  ArrowRight,
  Zap,
  Target,
  Video,
  Phone,
} from "lucide-react";
import { type Campaign, type EngineStatus as EngineStatusType } from "@/types";

// Mock data - replace with real API calls
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Q1 Enterprise Outreach",
    status: "active",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
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
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
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
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
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
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
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
];

const mockChartData = [
  { date: "Jan 13", sent: 1200, opened: 420, replied: 48 },
  { date: "Jan 14", sent: 1350, opened: 486, replied: 54 },
  { date: "Jan 15", sent: 1100, opened: 385, replied: 41 },
  { date: "Jan 16", sent: 1450, opened: 551, replied: 62 },
  { date: "Jan 17", sent: 1600, opened: 592, replied: 71 },
  { date: "Jan 18", sent: 1280, opened: 448, replied: 52 },
  { date: "Jan 19", sent: 1520, opened: 562, replied: 68 },
];

const mockEngineStatus: EngineStatusType[] = [
  { name: "Guardian", codename: "A", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Architect", codename: "B", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Scientist", codename: "C", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Hunter", codename: "G", status: "operational", lastCheck: new Date().toISOString() },
  { name: "Sentinel", codename: "H", status: "operational", lastCheck: new Date().toISOString() },
];

// Mock leads data
const mockLeads = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@techcorp.com",
    company: "TechCorp Industries",
    title: "VP of Sales",
    status: "qualified" as const,
    score: 92,
    lastActivity: "2 hours ago",
    createdAt: "2024-01-18",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "m.rodriguez@innovate.io",
    company: "Innovate Solutions",
    title: "CRO",
    status: "contacted" as const,
    score: 85,
    lastActivity: "5 hours ago",
    createdAt: "2024-01-17",
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "ewatson@globaltech.com",
    company: "GlobalTech Inc",
    title: "Director of Operations",
    status: "new" as const,
    score: 78,
    lastActivity: "1 day ago",
    createdAt: "2024-01-19",
  },
  {
    id: "4",
    name: "David Park",
    email: "dpark@nexusventures.com",
    company: "Nexus Ventures",
    title: "Head of Growth",
    status: "proposal" as const,
    score: 95,
    lastActivity: "30 minutes ago",
    createdAt: "2024-01-15",
  },
];

// Mock appointments data
const mockAppointments = [
  {
    id: "1",
    title: "Discovery Call - TechCorp",
    type: "video" as const,
    date: "2024-01-22",
    time: "10:00 AM",
    duration: 30,
    lead: { id: "1", name: "Sarah Chen", company: "TechCorp Industries" },
    status: "upcoming" as const,
    meetingLink: "https://zoom.us/j/123456789",
  },
  {
    id: "2",
    title: "Follow-up - Innovate Solutions",
    type: "phone" as const,
    date: "2024-01-22",
    time: "2:00 PM",
    duration: 15,
    lead: { id: "2", name: "Michael Rodriguez", company: "Innovate Solutions" },
    status: "upcoming" as const,
  },
  {
    id: "3",
    title: "Proposal Review - Nexus Ventures",
    type: "video" as const,
    date: "2024-01-23",
    time: "11:00 AM",
    duration: 45,
    lead: { id: "4", name: "David Park", company: "Nexus Ventures" },
    status: "upcoming" as const,
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
];

// Mock activity data
const mockActivities = [
  {
    id: "1",
    type: "email_replied" as const,
    title: "New reply from Sarah Chen",
    description: "Interested in scheduling a demo call this week",
    timestamp: "10 minutes ago",
    link: "/dashboard/leads/1",
    metadata: { campaignName: "Q1 Enterprise", leadName: "Sarah Chen" },
  },
  {
    id: "2",
    type: "appointment_scheduled" as const,
    title: "Meeting scheduled with David Park",
    description: "Proposal review call on Jan 23rd",
    timestamp: "1 hour ago",
    link: "/dashboard/appointments",
  },
  {
    id: "3",
    type: "email_opened" as const,
    title: "Email opened by 45 recipients",
    timestamp: "2 hours ago",
    metadata: { campaignName: "SaaS Decision Makers", count: 45 },
  },
  {
    id: "4",
    type: "lead_created" as const,
    title: "New lead added to pipeline",
    description: "Emily Watson from GlobalTech Inc",
    timestamp: "3 hours ago",
    link: "/dashboard/leads/3",
  },
  {
    id: "5",
    type: "milestone_reached" as const,
    title: "Campaign milestone reached",
    description: "Q1 Enterprise Outreach hit 10,000 emails sent",
    timestamp: "5 hours ago",
    link: "/dashboard/campaigns/1",
  },
  {
    id: "6",
    type: "email_sent" as const,
    title: "Batch email sent",
    description: "500 emails sent to Healthcare IT Leaders",
    timestamp: "6 hours ago",
    metadata: { campaignName: "Healthcare IT Leaders", count: 500 },
  },
];

// Calculate aggregate metrics
const totalSent = mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0);
const totalOpened = mockCampaigns.reduce((sum, c) => sum + c.metrics.opened, 0);
const totalReplied = mockCampaigns.reduce((sum, c) => sum + c.metrics.replied, 0);
const avgDeliverability = mockCampaigns
  .filter((c) => c.metrics.sent > 0)
  .reduce((sum, c) => sum + c.metrics.deliverabilityRate, 0) /
  mockCampaigns.filter((c) => c.metrics.sent > 0).length;

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Welcome back, Marcos" />

      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-mint/10 border border-neon-mint/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-mint"></span>
              </span>
              <span className="text-sm text-neon-mint font-medium">All systems operational</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/leads">
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                View Leads
              </Button>
            </Link>
            <Link href="/dashboard/campaigns/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Campaign
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <MetricsCard
            title="Total Emails Sent"
            value={totalSent.toLocaleString()}
            change={12.5}
            status="success"
            icon={Mail}
          />
          <MetricsCard
            title="Avg Open Rate"
            value={(totalOpened / totalSent * 100).toFixed(1)}
            suffix="%"
            change={8.2}
            status="success"
            icon={Eye}
          />
          <MetricsCard
            title="Total Replies"
            value={totalReplied.toLocaleString()}
            change={15.3}
            status="success"
            icon={MessageSquare}
          />
          <MetricsCard
            title="Active Leads"
            value="547"
            change={22.4}
            status="success"
            icon={Users}
          />
          <MetricsCard
            title="Meetings This Week"
            value="8"
            change={33.3}
            status="success"
            icon={Calendar}
          />
          <MetricsCard
            title="Avg Deliverability"
            value={avgDeliverability.toFixed(1)}
            suffix="%"
            change={2.1}
            status="success"
            icon={CheckCircle}
          />
        </div>

        {/* Charts and Engine Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart data={mockChartData} title="7-Day Performance" />
          </div>
          <div>
            <EngineStatus engines={mockEngineStatus} />
          </div>
        </div>

        {/* Campaigns and Appointments Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CampaignTable campaigns={mockCampaigns.slice(0, 3)} />
          </div>

          {/* Upcoming Appointments */}
          <div className="rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-cyan/40 to-transparent" />
            <div className="flex items-center justify-between px-6 py-4 border-b border-electric-cyan/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-quantum-violet/10 border border-quantum-violet/20">
                  <Calendar className="h-5 w-5 text-quantum-violet" />
                </div>
                <div>
                  <h3 className="text-lg font-sora font-semibold text-white">Upcoming Meetings</h3>
                  <p className="text-xs text-steel">{mockAppointments.length} scheduled</p>
                </div>
              </div>
              <Link
                href="/dashboard/appointments"
                className="text-sm text-electric-cyan hover:text-cyan-light transition-colors font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {mockAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  variant="compact"
                  showActions={false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Leads and Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <div className="lg:col-span-2 rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-cyan/40 to-transparent" />
            <div className="flex items-center justify-between px-6 py-4 border-b border-electric-cyan/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-mint/10 border border-neon-mint/20">
                  <Target className="h-5 w-5 text-neon-mint" />
                </div>
                <div>
                  <h3 className="text-lg font-sora font-semibold text-white">Hot Leads</h3>
                  <p className="text-xs text-steel">High-scoring prospects</p>
                </div>
              </div>
              <Link
                href="/dashboard/leads"
                className="text-sm text-electric-cyan hover:text-cyan-light transition-colors font-medium flex items-center gap-1"
              >
                View all leads
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  variant="compact"
                />
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <ActivityFeed
            activities={mockActivities}
            title="Recent Activity"
            maxItems={5}
          />
        </div>
      </div>
    </div>
  );
}
