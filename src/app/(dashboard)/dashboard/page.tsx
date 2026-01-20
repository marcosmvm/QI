"use client";

import { Header } from "@/components/navigation/Header";
import {
  MetricsCard,
  CampaignTable,
  PerformanceChart,
  EngineStatus,
} from "@/components/dashboard";
import {
  Mail,
  Eye,
  MessageSquare,
  CheckCircle,
  Target,
  Video,
  Award,
  ChevronRight,
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


// Team members for display
const teamMembers = [
  { name: "Designer", count: 48, color: "#4ADE80" },
  { name: "Developer", count: 27, color: "#1E3A5F" },
  { name: "Project Manager", count: 18, color: "#E2E8F0" },
];

// Calculate aggregate metrics
const totalSent = mockCampaigns.reduce((sum, c) => sum + c.metrics.sent, 0);
const totalOpened = mockCampaigns.reduce((sum, c) => sum + c.metrics.opened, 0);
const totalReplied = mockCampaigns.reduce((sum, c) => sum + c.metrics.replied, 0);
const avgDeliverability = mockCampaigns
  .filter((c) => c.metrics.sent > 0)
  .reduce((sum, c) => sum + c.metrics.deliverabilityRate, 0) /
  mockCampaigns.filter((c) => c.metrics.sent > 0).length;

// Progress Ring Component
function ProgressRing({ progress, size = 100, strokeWidth = 8, color = "#4ADE80" }: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">{progress}%</span>
      </div>
    </div>
  );
}

// Semi-circle Gauge Component
function GaugeChart({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  const percentage = (value / max) * 100;
  const angle = (percentage / 100) * 180;

  return (
    <div className="relative w-28 h-16 overflow-hidden">
      <div className="absolute inset-0">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(angle / 180) * 126} 126`}
            className="transition-all duration-500"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
        <span className="text-xl font-bold text-slate-900">{value}</span>
        <p className="text-[10px] text-slate-500 whitespace-nowrap">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard" subtitle="Good morning Marcos" />

      <div className="p-6 space-y-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - User Profile Card */}
          <div className="col-span-3">
            <div className="rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 p-6 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-secondary/20 blur-2xl" />
              </div>

              <div className="relative">
                {/* Experience Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-white text-xs font-semibold rounded-full mb-4">
                  <Award className="h-3.5 w-3.5" />
                  <span>4+ years experience</span>
                </div>

                {/* Profile Image Placeholder */}
                <div className="w-full aspect-[4/5] rounded-2xl bg-gradient-to-b from-slate-300 to-slate-400 mb-4 flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-32 rounded-full bg-secondary/80 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">MM</span>
                  </div>
                </div>

                {/* Name and Role */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-sora font-semibold text-slate-900">Marcos Matthews</h3>
                    <p className="text-sm text-slate-500">Account Manager</p>
                  </div>
                  <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <MessageSquare className="h-4 w-4 text-slate-600" />
                  </button>
                </div>

                {/* Work Stats */}
                <div className="mt-6 p-4 bg-white rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-slate-500">Average work time</p>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+0.5%</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 mb-4">46 hours</p>

                  {/* Mini Chart */}
                  <div className="h-16 flex items-end gap-1">
                    {[4, 6, 8, 5, 7, 9, 6, 8, 7, 6, 8, 5].map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t ${i === 5 ? 'bg-primary' : 'bg-slate-200'}`}
                        style={{ height: `${h * 10}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                    <span>4H</span>
                    <span>6H</span>
                    <span className="font-medium text-slate-600">8 Hours</span>
                    <span>10H</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Main Metrics */}
          <div className="col-span-6 space-y-6">
            {/* Top Row - Gauge Cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Performance Gauge */}
              <div className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex items-start justify-between mb-4">
                  <GaugeChart value={46.5} max={60} label="avg hours / weeks" />
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+0.5%</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>2 Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span>10 Hours</span>
                  </div>
                </div>
              </div>

              {/* Team Split Card */}
              <div className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl font-bold text-slate-900">80%</span>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+2.6%</span>
                    </div>
                    <p className="text-sm text-slate-500">Onsite team</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl font-bold text-slate-700">20%</span>
                      <span className="text-xs text-emerald-600">+2.6%</span>
                    </div>
                    <p className="text-sm text-slate-400">Remote team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Row - Track Team & Talent */}
            <div className="grid grid-cols-2 gap-6">
              {/* Track Your Team */}
              <div className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Total employee</p>
                    <h3 className="text-lg font-semibold text-slate-900">Track your team</h3>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative w-28 h-28">
                    <ProgressRing progress={75} size={112} strokeWidth={10} color="#4ADE80" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-slate-900">120</span>
                      <span className="text-[10px] text-slate-500">Total members</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div key={member.name} className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: member.color }}
                        />
                        <span className="text-sm text-slate-600">{member.name}</span>
                        <span className="text-sm font-medium text-slate-900">{member.count} members</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Talent Recruitment */}
              <div className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Hiring statistics</p>
                    <h3 className="text-lg font-semibold text-slate-900">Talent recruitment</h3>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-600 hover:bg-slate-200 transition-colors">
                    <Video className="h-4 w-4" />
                    Join call
                  </button>
                </div>

                {/* Avatar Stack */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600"
                      >
                        {["SC", "MR", "EW", "DP"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">120</p>
                      <p className="text-xs text-slate-500">Talent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-slate-900">80</p>
                      <p className="text-xs text-slate-500">Talent</p>
                    </div>
                  </div>
                </div>

                {/* Stats bars */}
                <div className="flex gap-1">
                  {Array(30).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-6 rounded ${i < 18 ? 'bg-secondary' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-end gap-4 mt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span>Matched</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-200" />
                    <span>Not match</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              <MetricsCard
                title="Total Emails Sent"
                value={totalSent.toLocaleString()}
                change={12.5}
                status="success"
                icon={Mail}
                variant="compact"
              />
              <MetricsCard
                title="Open Rate"
                value={(totalOpened / totalSent * 100).toFixed(1)}
                suffix="%"
                change={8.2}
                status="success"
                icon={Eye}
                variant="compact"
              />
              <MetricsCard
                title="Total Replies"
                value={totalReplied.toLocaleString()}
                change={15.3}
                status="success"
                icon={MessageSquare}
                variant="compact"
              />
              <MetricsCard
                title="Deliverability"
                value={avgDeliverability.toFixed(1)}
                suffix="%"
                change={2.1}
                status="success"
                icon={CheckCircle}
                variant="compact"
              />
            </div>
          </div>

          {/* Right Column - Payments/Activity */}
          <div className="col-span-3 space-y-6">
            {/* Payout Card */}
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Payout monthly</p>
                  <h3 className="text-lg font-semibold text-slate-900">Campaign Performance</h3>
                </div>
              </div>

              <div className="space-y-3">
                {mockCampaigns.slice(0, 4).map((campaign) => (
                  <div key={campaign.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {campaign.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{campaign.name}</p>
                      <p className="text-xs text-slate-500">{campaign.metrics.sent.toLocaleString()} sent</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      campaign.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                      campaign.status === 'paused' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Take Home Summary */}
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Conversion Rate</p>
                    <p className="text-sm font-semibold text-slate-900">This Week</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-slate-900">$2,040</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Perform.</p>
                  <p className="text-lg font-bold text-slate-900">$300</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500">Payment</p>
                  <p className="text-lg font-bold text-slate-900">100%</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Take home pay</span>
                  <span className="text-xl font-bold text-slate-900">$2,540.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Charts and Tables */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <PerformanceChart data={mockChartData} title="7-Day Performance" />
          </div>
          <div className="col-span-4">
            <EngineStatus engines={mockEngineStatus} />
          </div>
        </div>

        {/* Campaigns Table */}
        <CampaignTable campaigns={mockCampaigns} />
      </div>
    </div>
  );
}
