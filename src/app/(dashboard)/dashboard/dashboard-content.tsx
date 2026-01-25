'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  MousePointerClick,
  Reply,
  TrendingUp,
  Calendar,
  Users,
} from 'lucide-react';
import { MetricsCard } from '@/components/dashboard/MetricsCard';

interface Campaign {
  id: string;
  name: string;
  status: string;
  target_industry: string | null;
  target_role: string | null;
  daily_limit: number;
  created_at: string;
}

interface Lead {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  stage: string;
  created_at: string;
}

interface WeeklyData {
  date: string;
  sent: number;
  opened: number;
  replied: number;
}

interface DashboardContentProps {
  totals: { sent: number; opened: number; replied: number; bounced: number };
  openRate: number;
  replyRate: number;
  deliverability: number;
  activeCampaigns: number;
  campaigns: Campaign[];
  leads: Lead[];
  weeklyData: WeeklyData[];
  getMetricStatus: (metric: string, value: number) => 'success' | 'warning' | 'critical';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 as const,
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

export function DashboardContent({
  totals,
  openRate,
  replyRate,
  deliverability,
  activeCampaigns,
  campaigns,
  leads,
  weeklyData,
  getMetricStatus,
}: DashboardContentProps) {
  const maxSent = Math.max(...weeklyData.map((d) => d.sent), 1);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-200 mb-2">
          <span className="text-slate-900 dark:text-white">Portal</span>
          <span>/</span>
          <span className="text-emerald-pro-600">Dashboard</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-900 dark:text-slate-200 mt-1">
          Welcome back! Here&apos;s an overview of your campaign performance.
        </p>
      </motion.div>

      {/* Metrics Row - Using enhanced MetricsCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Emails Sent"
          value={totals.sent}
          icon={Mail}
          accent="emerald"
          delay={0}
        />
        <MetricsCard
          title="Open Rate"
          value={openRate.toFixed(1)}
          suffix="%"
          icon={MousePointerClick}
          accent="sky"
          delay={0.1}
        />
        <MetricsCard
          title="Reply Rate"
          value={replyRate.toFixed(1)}
          suffix="%"
          icon={Reply}
          accent="emerald"
          delay={0.2}
        />
        <MetricsCard
          title="Deliverability"
          value={deliverability.toFixed(1)}
          suffix="%"
          icon={TrendingUp}
          accent="amber"
          delay={0.3}
        />
      </div>

      {/* Performance Chart */}
      <motion.div
        variants={itemVariants}
        className="glass-premium p-6 mb-8"
      >
        <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-6">
          Weekly Performance
        </h2>
        <div className="h-64 flex items-end gap-2">
          {weeklyData.map((day, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-1 flex flex-col items-center gap-2 origin-bottom"
            >
              <div
                className="w-full flex flex-col gap-1"
                style={{ height: '200px' }}
              >
                <div
                  className="w-full bg-gradient-to-t from-emerald-pro-600/40 to-emerald-pro-600/20 rounded-t hover:from-emerald-pro-600/60 hover:to-emerald-pro-600/30 transition-colors duration-200"
                  style={{
                    height: `${Math.max((day.sent / maxSent) * 100, 2)}%`,
                  }}
                  title={`Sent: ${day.sent}`}
                />
              </div>
              <span className="text-xs text-slate-900 dark:text-slate-200">{day.date}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border-default dark:border-graphite/30">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-pro-600/40" />
            <span className="text-xs text-slate-900 dark:text-slate-200">Emails Sent</span>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaigns */}
        <motion.div
          variants={itemVariants}
          className="glass-premium p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                Active Campaigns
              </h2>
              <p className="text-sm text-slate-900 dark:text-slate-200">
                {activeCampaigns} campaigns running
              </p>
            </div>
            <Link
              href="/dashboard/campaigns"
              className="text-sm text-emerald-pro-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {campaigns.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-8 w-8 text-slate-900 dark:text-slate-200 mx-auto mb-3" />
                <p className="text-slate-900 dark:text-slate-200 text-sm mb-3">No campaigns yet</p>
                <Link
                  href="/dashboard/campaigns/new"
                  className="inline-flex items-center gap-2 text-sm text-emerald-pro-600 hover:underline"
                >
                  Create your first campaign
                </Link>
              </div>
            ) : (
              campaigns.slice(0, 4).map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          campaign.status === 'active'
                            ? 'bg-emerald-pro-400'
                            : campaign.status === 'paused'
                              ? 'bg-energy-orange'
                              : 'bg-steel'
                        }`}
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {campaign.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border capitalize ${
                        campaign.status === 'active'
                          ? 'bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30'
                          : campaign.status === 'paused'
                            ? 'bg-energy-orange/10 text-energy-orange border-energy-orange/30'
                            : 'bg-steel/10 text-slate-900 dark:text-slate-200 border-steel/30'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Leads */}
        <motion.div
          variants={itemVariants}
          className="glass-premium p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
                Recent Leads
              </h2>
              <p className="text-sm text-slate-900 dark:text-slate-200">{leads.length} new leads</p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-sm text-emerald-pro-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {leads.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-8 w-8 text-slate-900 dark:text-slate-200 mx-auto mb-3" />
                <p className="text-slate-900 dark:text-slate-200 text-sm mb-3">No leads yet</p>
                <Link
                  href="/dashboard/leads"
                  className="inline-flex items-center gap-2 text-sm text-emerald-pro-600 hover:underline"
                >
                  Import leads
                </Link>
              </div>
            ) : (
              leads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-emerald-pro-500/20 border border-emerald-pro-500/30 flex items-center justify-center">
                        <span className="text-xs font-medium text-emerald-pro-500">
                          {(lead.first_name?.[0] || '') +
                            (lead.last_name?.[0] || '')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {lead.first_name} {lead.last_name}
                        </p>
                        <p className="text-xs text-slate-900 dark:text-slate-200">{lead.company}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border capitalize ${
                        lead.stage === 'meeting' || lead.stage === 'qualified'
                          ? 'bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30'
                          : lead.stage === 'engaged'
                            ? 'bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30'
                            : 'bg-steel/10 text-slate-900 dark:text-slate-200 border-steel/30'
                      }`}
                    >
                      {lead.stage}
                    </span>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link
          href="/dashboard/reports"
          className="flex items-center gap-4 p-4 glass-premium hover:border-emerald-pro-600/30 hover:-translate-y-1 hover:shadow-card-glow-active transition-all duration-200 group"
        >
          <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-pro-600/20 transition-all duration-200">
            <Calendar className="h-5 w-5 text-emerald-pro-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
              Weekly Reports
            </p>
            <p className="text-xs text-slate-900 dark:text-slate-200">View your performance reports</p>
          </div>
        </Link>
        <Link
          href="/dashboard/support"
          className="flex items-center gap-4 p-4 glass-premium hover:border-emerald-pro-500/30 hover:-translate-y-1 hover:shadow-glow-violet-lg transition-all duration-200 group"
        >
          <div className="h-10 w-10 rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-pro-500/20 transition-all duration-200">
            <Reply className="h-5 w-5 text-emerald-pro-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-500 transition-colors">
              Contact Support
            </p>
            <p className="text-xs text-slate-900 dark:text-slate-200">Chat with our team</p>
          </div>
        </Link>
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-4 p-4 glass-premium hover:border-emerald-pro-400/30 hover:-translate-y-1 hover:shadow-glow-mint-lg transition-all duration-200 group"
        >
          <div className="h-10 w-10 rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-pro-400/20 transition-all duration-200">
            <TrendingUp className="h-5 w-5 text-emerald-pro-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-emerald-pro-400 transition-colors">
              Deep Analytics
            </p>
            <p className="text-xs text-slate-900 dark:text-slate-200">Detailed performance insights</p>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
