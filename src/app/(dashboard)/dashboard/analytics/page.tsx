"use client";

import { Header } from "@/components/navigation/Header";
import { MetricsCard, ProgressRing, QuickStats } from "@/components/dashboard";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import {
  Mail,
  Eye,
  MessageSquare,
  TrendingUp,
  Target,
  Users,
  Calendar,
  UserCheck,
  Video,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Cpu,
  FlaskConical,
} from "lucide-react";

// Mock data
const weeklyData = [
  { week: "Week 1", sent: 8500, opened: 2975, replied: 340, bounced: 127 },
  { week: "Week 2", sent: 9200, opened: 3312, replied: 386, bounced: 138 },
  { week: "Week 3", sent: 7800, opened: 2730, replied: 312, bounced: 117 },
  { week: "Week 4", sent: 10500, opened: 3990, replied: 462, bounced: 157 },
];

const campaignPerformance = [
  { name: "Q1 Enterprise", openRate: 36, replyRate: 4.2 },
  { name: "SaaS Decision Makers", openRate: 32, replyRate: 3.4 },
  { name: "Healthcare IT", openRate: 25, replyRate: 2.0 },
  { name: "Fintech CFOs", openRate: 28, replyRate: 2.8 },
];

const replyDistribution = [
  { name: "Positive", value: 45, color: "#00FFB2" },
  { name: "Neutral", value: 30, color: "#00D4FF" },
  { name: "Negative", value: 15, color: "#FF6B35" },
  { name: "OOO/Auto", value: 10, color: "#94A3B8" },
];

const hourlyEngagement = [
  { hour: "6am", opens: 120 },
  { hour: "8am", opens: 450 },
  { hour: "10am", opens: 680 },
  { hour: "12pm", opens: 520 },
  { hour: "2pm", opens: 590 },
  { hour: "4pm", opens: 410 },
  { hour: "6pm", opens: 280 },
  { hour: "8pm", opens: 150 },
];

// Lead funnel data
const leadFunnelData = [
  { name: "Contacted", value: 2450, fill: "#00D4FF" },
  { name: "Engaged", value: 1280, fill: "#7B61FF" },
  { name: "Qualified", value: 547, fill: "#00FFB2" },
  { name: "Meeting Set", value: 156, fill: "#FF6B35" },
  { name: "Won", value: 48, fill: "#10B981" },
];

// Appointment metrics
const appointmentData = [
  { week: "Week 1", scheduled: 32, completed: 28, noShow: 4 },
  { week: "Week 2", scheduled: 38, completed: 35, noShow: 3 },
  { week: "Week 3", scheduled: 29, completed: 26, noShow: 3 },
  { week: "Week 4", scheduled: 45, completed: 42, noShow: 3 },
];

const meetingTypeData = [
  { name: "Video", value: 65, color: "#00D4FF" },
  { name: "Phone", value: 25, color: "#7B61FF" },
  { name: "In-Person", value: 10, color: "#00FFB2" },
];

// AI Engine performance
const enginePerformance = [
  { name: "Guardian", metric: "Deliverability", value: 94.5, target: 90, color: "cyan" },
  { name: "Architect", metric: "Campaigns Created", value: 12, target: 10, color: "violet" },
  { name: "Scientist", metric: "A/B Tests Won", value: 8, target: 5, color: "mint" },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen">
      <Header title="Analytics" subtitle="Campaign performance insights" />

      <div className="p-6 space-y-6">
        {/* Date range selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-steel">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Last 30 days</span>
          </div>
          <div className="flex items-center gap-2">
            {["7d", "30d", "90d", "All"].map((range) => (
              <button
                key={range}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  range === "30d"
                    ? "bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30"
                    : "text-steel hover:text-white hover:bg-midnight-blue"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Total Emails Sent"
            value="36,000"
            change={18.5}
            status="success"
            icon={Mail}
          />
          <MetricsCard
            title="Avg Open Rate"
            value="34.2"
            suffix="%"
            change={4.2}
            status="success"
            icon={Eye}
          />
          <MetricsCard
            title="Avg Reply Rate"
            value="3.8"
            suffix="%"
            change={12.1}
            status="success"
            icon={MessageSquare}
          />
          <MetricsCard
            title="Leads Generated"
            value="1,500"
            change={22.3}
            status="success"
            icon={Target}
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly performance trend */}
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
            <h3 className="text-lg font-sora font-semibold text-white mb-6">
              Weekly Performance Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorSent2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOpened2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7B61FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#7B61FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2D4A",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="sent" name="Sent" stroke="#00D4FF" fillOpacity={1} fill="url(#colorSent2)" />
                  <Area type="monotone" dataKey="opened" name="Opened" stroke="#7B61FF" fillOpacity={1} fill="url(#colorOpened2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaign comparison */}
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
            <h3 className="text-lg font-sora font-semibold text-white mb-6">
              Campaign Comparison
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} width={120} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2D4A",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Legend />
                  <Bar dataKey="openRate" name="Open Rate %" fill="#00D4FF" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="replyRate" name="Reply Rate %" fill="#00FFB2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reply sentiment distribution */}
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
            <h3 className="text-lg font-sora font-semibold text-white mb-6">
              Reply Sentiment
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={replyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {replyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2D4A",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {replyDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-steel">{item.name}</span>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best time to send */}
          <div className="lg:col-span-2 rounded-xl border border-graphite bg-midnight-blue/60 p-6">
            <h3 className="text-lg font-sora font-semibold text-white mb-6">
              Best Time to Send (Opens by Hour)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyEngagement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="hour" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2D4A",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Bar dataKey="opens" fill="#00D4FF" radius={[4, 4, 0, 0]}>
                    {hourlyEngagement.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.opens > 500 ? "#00FFB2" : "#00D4FF"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-steel mt-4 text-center">
              Peak engagement: <span className="text-neon-mint font-medium">10am - 2pm</span> local time
            </p>
          </div>
        </div>

        {/* Top performing metrics */}
        <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
          <h3 className="text-lg font-sora font-semibold text-white mb-6">
            Top Performing Subject Lines
          </h3>
          <div className="space-y-3">
            {[
              { subject: "Quick question about {{company}}'s growth strategy", openRate: 42.5, replyRate: 5.2 },
              { subject: "{{firstName}}, saw your recent announcement", openRate: 38.2, replyRate: 4.8 },
              { subject: "Idea for {{company}}", openRate: 36.8, replyRate: 4.1 },
              { subject: "Re: {{company}} + Quantum Insights", openRate: 35.1, replyRate: 3.9 },
              { subject: "Following up on my last email", openRate: 28.4, replyRate: 3.2 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-graphite bg-deep-space/50"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-electric-cyan/10 text-electric-cyan font-mono font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="text-white">{item.subject}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-steel">Open Rate</p>
                    <p className="text-neon-mint font-medium">{item.openRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-steel">Reply Rate</p>
                    <p className="text-quantum-violet font-medium">{item.replyRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Conversion Funnel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lead Funnel */}
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-mint/10 border border-neon-mint/20">
                <Target className="h-5 w-5 text-neon-mint" />
              </div>
              <div>
                <h3 className="text-lg font-sora font-semibold text-white">Lead Conversion Funnel</h3>
                <p className="text-xs text-steel">Last 30 days</p>
              </div>
            </div>

            <div className="space-y-4">
              {leadFunnelData.map((stage, index) => {
                const prevValue = index > 0 ? leadFunnelData[index - 1].value : stage.value;
                const conversionRate = index > 0 ? ((stage.value / prevValue) * 100).toFixed(1) : "100";
                const widthPercentage = (stage.value / leadFunnelData[0].value) * 100;

                return (
                  <div key={stage.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{stage.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-white">{stage.value.toLocaleString()}</span>
                        {index > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded bg-deep-space text-steel">
                            {conversionRate}% conv.
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-deep-space overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${widthPercentage}%`,
                          backgroundColor: stage.fill
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-graphite">
              <div className="flex items-center justify-between text-sm">
                <span className="text-steel">Overall Conversion Rate</span>
                <span className="text-neon-mint font-bold">
                  {((leadFunnelData[leadFunnelData.length - 1].value / leadFunnelData[0].value) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Appointment Analytics */}
          <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-quantum-violet/10 border border-quantum-violet/20">
                <Calendar className="h-5 w-5 text-quantum-violet" />
              </div>
              <div>
                <h3 className="text-lg font-sora font-semibold text-white">Appointment Analytics</h3>
                <p className="text-xs text-steel">Meeting performance</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-deep-space/50 border border-graphite">
                <p className="text-2xl font-bold text-white">144</p>
                <p className="text-xs text-steel">Total Meetings</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-deep-space/50 border border-graphite">
                <p className="text-2xl font-bold text-neon-mint">91%</p>
                <p className="text-xs text-steel">Show Rate</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-deep-space/50 border border-graphite">
                <p className="text-2xl font-bold text-quantum-violet">32 min</p>
                <p className="text-xs text-steel">Avg Duration</p>
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="week" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={{ stroke: "#334155" }} />
                  <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2D4A",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#FFFFFF" }}
                  />
                  <Bar dataKey="completed" name="Completed" fill="#00FFB2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="noShow" name="No Show" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6">
              {meetingTypeData.map((type) => (
                <div key={type.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="text-sm text-steel">{type.name}</span>
                  <span className="text-sm font-medium text-white">{type.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Engine Performance */}
        <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-cyan/10 border border-electric-cyan/20">
              <Cpu className="h-5 w-5 text-electric-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-sora font-semibold text-white">AI Engine Performance</h3>
              <p className="text-xs text-steel">Engine metrics vs targets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Guardian */}
            <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-electric-cyan" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Guardian</h4>
                  <p className="text-xs text-steel">Compliance Engine</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-steel">Deliverability</p>
                  <p className="text-2xl font-bold text-electric-cyan">94.5%</p>
                  <p className="text-xs text-neon-mint">+4.5% above target</p>
                </div>
                <ProgressRing value={94.5} size="md" color="cyan" />
              </div>
            </div>

            {/* Architect */}
            <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-quantum-violet/10 flex items-center justify-center">
                  <Cpu className="h-5 w-5 text-quantum-violet" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Architect</h4>
                  <p className="text-xs text-steel">Campaign Engine</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-steel">Campaigns Created</p>
                  <p className="text-2xl font-bold text-quantum-violet">12</p>
                  <p className="text-xs text-neon-mint">+2 above target</p>
                </div>
                <ProgressRing value={120} size="md" color="violet" label="of goal" />
              </div>
            </div>

            {/* Scientist */}
            <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-neon-mint/10 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5 text-neon-mint" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Scientist</h4>
                  <p className="text-xs text-steel">Optimization Engine</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-steel">A/B Tests Won</p>
                  <p className="text-2xl font-bold text-neon-mint">8</p>
                  <p className="text-xs text-neon-mint">+3 above target</p>
                </div>
                <ProgressRing value={160} size="md" color="mint" label="of goal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
