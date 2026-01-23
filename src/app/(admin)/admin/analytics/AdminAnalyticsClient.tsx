"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Mail,
  Users,
  MousePointerClick,
  Reply,
  Download,
  Calendar,
  Building2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface TopCampaign {
  id: string;
  sent: number;
  opened: number;
  replied: number;
  name: string;
  org: string;
  openRate: number;
  replyRate: number;
}

interface ClientPerformance {
  id: string;
  sent: number;
  opened: number;
  replied: number;
  name: string;
  openRate: number;
  replyRate: number;
}

interface AdminAnalyticsClientProps {
  totals: { sent: number; opened: number; replied: number; bounced: number };
  weeklyTrend: { thisWeek: number; lastWeek: number; change: number };
  topCampaigns: TopCampaign[];
  clientPerformance: ClientPerformance[];
  totalClients: number;
  totalQualifiedLeads: number;
  campaignsCount: number;
  openRate: number;
  replyRate: number;
  deliverability: number;
}

export default function AdminAnalyticsClient({
  totals,
  weeklyTrend,
  topCampaigns,
  clientPerformance,
  totalClients,
  totalQualifiedLeads,
  campaignsCount,
  openRate,
  replyRate,
  deliverability,
}: AdminAnalyticsClientProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-steel mb-1">Admin / <span className="text-electric-cyan">Analytics</span></p>
          <h1 className="text-2xl font-sora font-bold text-white">Analytics</h1>
          <p className="text-steel mt-1">
            Platform-wide performance metrics and insights
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-electric-cyan/30 text-electric-cyan rounded-lg hover:bg-electric-cyan/10 transition-colors">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Emails Sent"
          value={totals.sent.toLocaleString()}
          icon={Mail}
          trend={weeklyTrend.change}
        />
        <StatCard
          label="Open Rate"
          value={`${openRate.toFixed(1)}%`}
          icon={MousePointerClick}
          target={30}
          current={openRate}
        />
        <StatCard
          label="Reply Rate"
          value={`${replyRate.toFixed(1)}%`}
          icon={Reply}
          target={3}
          current={replyRate}
        />
        <StatCard
          label="Deliverability"
          value={`${deliverability.toFixed(1)}%`}
          icon={TrendingUp}
          target={90}
          current={deliverability}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-premium p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <Building2 className="h-4 w-4" />
            <span className="text-xs">Total Clients</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {totalClients}
          </p>
        </div>
        <div className="glass-premium p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Active Campaigns</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {campaignsCount}
          </p>
        </div>
        <div className="glass-premium p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <Users className="h-4 w-4" />
            <span className="text-xs">Qualified Leads</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {totalQualifiedLeads}
          </p>
        </div>
        <div className="glass-premium p-4">
          <div className="flex items-center gap-2 text-steel mb-2">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">This Week</span>
          </div>
          <p className="text-2xl font-sora font-bold text-white">
            {weeklyTrend.thisWeek.toLocaleString()}
          </p>
          <p className="text-xs text-steel">emails sent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Campaigns */}
        <div className="glass-premium p-6">
          <h2 className="text-lg font-sora font-semibold text-white mb-4">
            Top Performing Campaigns
          </h2>
          {topCampaigns.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-10 w-10 text-steel mx-auto mb-3" />
              <p className="text-steel text-sm">No campaign data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topCampaigns.slice(0, 5).map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between p-3 bg-deep-space/50 border border-graphite/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-steel w-6">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {campaign.name}
                      </p>
                      <p className="text-xs text-steel">{campaign.org}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neon-mint">
                      {campaign.replyRate.toFixed(1)}%
                    </p>
                    <p className="text-xs text-steel">reply rate</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Performance */}
        <div className="glass-premium p-6">
          <h2 className="text-lg font-sora font-semibold text-white mb-4">
            Client Performance
          </h2>
          {clientPerformance.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-10 w-10 text-steel mx-auto mb-3" />
              <p className="text-steel text-sm">No client data yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {clientPerformance.slice(0, 5).map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 bg-deep-space/50 border border-graphite/30 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {client.name}
                    </p>
                    <p className="text-xs text-steel">
                      {client.sent.toLocaleString()} emails sent
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-silver">
                        {client.openRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-steel">open</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neon-mint">
                        {client.replyRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-steel">reply</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  target,
  current,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: number;
  target?: number;
  current?: number;
}) {
  const isOnTarget = target && current ? current >= target : true;

  return (
    <div className="glass-premium p-4">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`h-8 w-8 rounded-lg flex items-center justify-center ${
            isOnTarget
              ? "bg-neon-mint/10 border border-neon-mint/30"
              : "bg-energy-orange/10 border border-energy-orange/30"
          }`}
        >
          <Icon
            className={`h-4 w-4 ${
              isOnTarget ? "text-neon-mint" : "text-energy-orange"
            }`}
          />
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs ${
              trend >= 0 ? "text-neon-mint" : "text-energy-orange"
            }`}
          >
            {trend >= 0 ? (
              <ArrowUp className="h-3 w-3" />
            ) : (
              <ArrowDown className="h-3 w-3" />
            )}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-sora font-bold text-white">{value}</p>
      <p className="text-xs text-steel mt-1">{label}</p>
      {target && (
        <p className="text-xs text-steel mt-1">Target: {target}%</p>
      )}
    </div>
  );
}
