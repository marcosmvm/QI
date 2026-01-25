"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Mail,
  Users,
  CreditCard,
  FileText,
  Globe,
  Building2,
  Key,
  FileSpreadsheet,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Eye,
  ChevronRight,
  DollarSign,
  Calendar,
  MessageSquare,
  Phone,
  Pin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ClientHealthBadge } from "@/components/admin/ClientHealthBadge";

interface ClientDetailTabsProps {
  clientId: string;
  client: {
    id: string;
    name: string;
    domain: string | null;
    industry: string | null;
    employeeCount: number | null;
    onboardingCompleted: boolean;
    instantlyApiKey: string | null;
    googleSheetId: string | null;
  };
  subscription: {
    id: string;
    planType: string;
    status: string;
    monthlyFee: number | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
  } | null;
  campaigns: {
    id: string;
    name: string;
    status: string;
    targetIndustry: string | null;
    createdAt: string;
    totalSent: number;
    totalOpened: number;
    totalReplied: number;
    avgDeliverability: number | null;
    avgOpenRate: number | null;
    avgReplyRate: number | null;
  }[];
  leads: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    company: string | null;
    title: string | null;
    stage: string;
    score: number;
    createdAt: string;
  }[];
  notes: {
    id: string;
    content: string;
    noteType: string;
    isPinned: boolean;
    createdAt: string;
    authorName: string;
  }[];
  members: {
    id: string;
    role: string;
    joinedAt: string;
    name: string;
    email: string;
  }[];
}

type Tab = "overview" | "campaigns" | "leads" | "billing" | "notes";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Mail },
  { id: "leads", label: "Leads", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notes", label: "Notes", icon: FileText },
];

export function ClientDetailTabs({
  clientId,
  client,
  subscription,
  campaigns,
  leads,
  notes,
  members,
}: ClientDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-border-default dark:border-graphite/50 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                isActive
                  ? "border-emerald-pro-600 text-emerald-pro-600"
                  : "border-transparent text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:text-slate-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "leads" && leads.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-pro-600/10 text-emerald-pro-600">
                  {leads.length}
                </span>
              )}
              {tab.id === "notes" && notes.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-pro-500/10 text-emerald-pro-500">
                  {notes.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab client={client} subscription={subscription} campaigns={campaigns} leads={leads} members={members} />
      )}
      {activeTab === "campaigns" && (
        <CampaignsTab campaigns={campaigns} clientId={clientId} />
      )}
      {activeTab === "leads" && <LeadsTab leads={leads} />}
      {activeTab === "billing" && <BillingTab subscription={subscription} />}
      {activeTab === "notes" && <NotesTab notes={notes} clientId={clientId} />}
    </div>
  );
}

// Overview Tab
function OverviewTab({
  client,
  subscription,
  campaigns,
  leads,
  members,
}: {
  client: ClientDetailTabsProps["client"];
  subscription: ClientDetailTabsProps["subscription"];
  campaigns: ClientDetailTabsProps["campaigns"];
  leads: ClientDetailTabsProps["leads"];
  members: ClientDetailTabsProps["members"];
}) {
  // Onboarding steps
  const onboardingSteps = [
    { label: "Profile Complete", completed: !!client.domain },
    { label: "Domain Verified", completed: !!client.domain },
    { label: "API Keys Set", completed: !!client.instantlyApiKey },
    { label: "Campaign Created", completed: campaigns.length > 0 },
    { label: "Leads Imported", completed: leads.length > 0 },
    { label: "First Email Sent", completed: campaigns.some((c) => c.totalSent > 0) },
    { label: "First Reply", completed: campaigns.some((c) => c.totalReplied > 0) },
    { label: "Meeting Booked", completed: leads.some((l) => l.stage === "meeting") },
  ];

  const completedSteps = onboardingSteps.filter((s) => s.completed).length;

  // Performance summary
  const totalSent = campaigns.reduce((sum, c) => sum + c.totalSent, 0);
  const totalOpened = campaigns.reduce((sum, c) => sum + c.totalOpened, 0);
  const totalReplied = campaigns.reduce((sum, c) => sum + c.totalReplied, 0);
  const overallOpenRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0;
  const overallReplyRate = totalSent > 0 ? (totalReplied / totalSent) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Company Info */}
        <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
          <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
            Company Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={Building2} label="Company" value={client.name} />
            <InfoItem
              icon={Globe}
              label="Domain"
              value={client.domain || "Not set"}
            />
            <InfoItem
              icon={Users}
              label="Industry"
              value={client.industry || "Not set"}
            />
            <InfoItem
              icon={Users}
              label="Employees"
              value={client.employeeCount?.toLocaleString() || "Unknown"}
            />
          </div>
        </div>

        {/* Onboarding Progress */}
        <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
              Onboarding Progress
            </h3>
            <span className="text-sm text-emerald-pro-600">
              {completedSteps}/{onboardingSteps.length} Complete
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-white dark:bg-deep-space/50 mb-4">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-pro-600 to-emerald-pro-500 transition-all"
              style={{
                width: `${(completedSteps / onboardingSteps.length) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-2 rounded-lg p-2",
                  step.completed ? "bg-emerald-pro-400/10" : "bg-white dark:bg-deep-space/30"
                )}
              >
                {step.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-pro-400 flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-900 dark:text-slate-200 flex-shrink-0" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium truncate",
                    step.completed ? "text-emerald-pro-400" : "text-slate-900 dark:text-slate-200"
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
          <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
            Performance Summary
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-sora font-bold text-slate-900 dark:text-white">
                {totalSent.toLocaleString()}
              </p>
              <p className="text-xs text-slate-900 dark:text-slate-200 mt-1">Emails Sent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-sora font-bold text-slate-900 dark:text-white">
                {totalOpened.toLocaleString()}
              </p>
              <p className="text-xs text-slate-900 dark:text-slate-200 mt-1">Opens</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-sora font-bold text-emerald-pro-600">
                {overallOpenRate.toFixed(1)}%
              </p>
              <p className="text-xs text-slate-900 dark:text-slate-200 mt-1">Open Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-sora font-bold text-emerald-pro-400">
                {overallReplyRate.toFixed(1)}%
              </p>
              <p className="text-xs text-slate-900 dark:text-slate-200 mt-1">Reply Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* Integration Status */}
        <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
          <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
            Integrations
          </h3>
          <div className="space-y-3">
            <IntegrationItem
              icon={Key}
              label="Instantly API"
              connected={!!client.instantlyApiKey}
            />
            <IntegrationItem
              icon={FileSpreadsheet}
              label="Google Sheets"
              connected={!!client.googleSheetId}
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
          <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
            Team Members
          </h3>
          {members.length === 0 ? (
            <p className="text-sm text-slate-900 dark:text-slate-200">No team members</p>
          ) : (
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-deep-space/30"
                >
                  <div className="h-8 w-8 rounded-full bg-emerald-pro-500/20 border border-emerald-pro-500/30 flex items-center justify-center">
                    <span className="text-xs font-medium text-emerald-pro-500">
                      {member.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-slate-900 dark:text-slate-200 truncate">{member.email}</p>
                  </div>
                  <span className="text-xs text-slate-900 dark:text-slate-200 capitalize">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subscription */}
        {subscription && (
          <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
            <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
              Subscription
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-900 dark:text-slate-200">Plan</span>
                <span className="text-sm text-slate-900 dark:text-white capitalize">
                  {subscription.planType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-900 dark:text-slate-200">Status</span>
                <SubscriptionBadge status={subscription.status} />
              </div>
              {subscription.monthlyFee && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-900 dark:text-slate-200">Monthly Fee</span>
                  <span className="text-sm text-slate-900 dark:text-white">
                    ${subscription.monthlyFee.toLocaleString()}
                  </span>
                </div>
              )}
              {subscription.currentPeriodEnd && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-900 dark:text-slate-200">Renews</span>
                  <span className="text-sm text-slate-900 dark:text-white">
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Campaigns Tab
function CampaignsTab({
  campaigns,
  clientId,
}: {
  campaigns: ClientDetailTabsProps["campaigns"];
  clientId: string;
}) {
  if (campaigns.length === 0) {
    return (
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-12 text-center">
        <Mail className="h-12 w-12 text-slate-900 dark:text-slate-200 mx-auto mb-4" />
        <p className="text-slate-900 dark:text-slate-200">No campaigns yet</p>
      </div>
    );
  }

  return (
    <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border-default dark:border-graphite/50">
            <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
              Campaign
            </th>
            <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
              Status
            </th>
            <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
              Sent
            </th>
            <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
              Open Rate
            </th>
            <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
              Reply Rate
            </th>
            <th className="text-right text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-graphite/30">
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="hover:bg-light-bg-secondary dark:bg-midnight-blue/20 transition-colors"
            >
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{campaign.name}</p>
                <p className="text-xs text-slate-900 dark:text-slate-200">
                  {campaign.targetIndustry || "General"}
                </p>
              </td>
              <td className="px-6 py-4">
                <CampaignStatusBadge status={campaign.status} />
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-900 dark:text-slate-200">
                  {campaign.totalSent.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-900 dark:text-slate-200">
                  {campaign.avgOpenRate !== null
                    ? `${campaign.avgOpenRate.toFixed(1)}%`
                    : "-"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-900 dark:text-slate-200">
                  {campaign.avgReplyRate !== null
                    ? `${campaign.avgReplyRate.toFixed(1)}%`
                    : "-"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  {campaign.status === "active" ? (
                    <button className="p-2 rounded-lg text-energy-orange hover:bg-energy-orange/10 transition-colors">
                      <Pause className="h-4 w-4" />
                    </button>
                  ) : (
                    <button className="p-2 rounded-lg text-emerald-pro-400 hover:bg-emerald-pro-400/10 transition-colors">
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  <Link
                    href={`/admin/campaigns/${campaign.id}`}
                    className="p-2 rounded-lg text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-light-bg-secondary dark:bg-midnight-blue/50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Leads Tab
function LeadsTab({ leads }: { leads: ClientDetailTabsProps["leads"] }) {
  const [stageFilter, setStageFilter] = useState<string>("all");

  const stages = [
    { value: "all", label: "All Stages" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "engaged", label: "Engaged" },
    { value: "qualified", label: "Qualified" },
    { value: "meeting", label: "Meeting" },
    { value: "closed_won", label: "Won" },
    { value: "closed_lost", label: "Lost" },
  ];

  const filteredLeads =
    stageFilter === "all"
      ? leads
      : leads.filter((l) => l.stage === stageFilter);

  if (leads.length === 0) {
    return (
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-12 text-center">
        <Users className="h-12 w-12 text-slate-900 dark:text-slate-200 mx-auto mb-4" />
        <p className="text-slate-900 dark:text-slate-200">No leads yet</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stage Filter */}
      <div className="flex items-center gap-2 mb-4">
        {stages.map((stage) => (
          <button
            key={stage.value}
            onClick={() => setStageFilter(stage.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
              stageFilter === stage.value
                ? "bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/30"
                : "bg-white dark:bg-deep-space/30 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:text-slate-200 border border-transparent"
            )}
          >
            {stage.label}
            {stage.value !== "all" && (
              <span className="ml-1">
                ({leads.filter((l) => l.stage === stage.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-default dark:border-graphite/50">
              <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
                Lead
              </th>
              <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
                Company
              </th>
              <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
                Stage
              </th>
              <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
                Score
              </th>
              <th className="text-left text-xs font-medium text-slate-900 dark:text-slate-200 uppercase tracking-wider px-6 py-4">
                Added
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite/30">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-light-bg-secondary dark:bg-midnight-blue/20 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {lead.firstName} {lead.lastName}
                  </p>
                  <p className="text-xs text-slate-900 dark:text-slate-200">{lead.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-900 dark:text-slate-200">{lead.company || "-"}</p>
                  <p className="text-xs text-slate-900 dark:text-slate-200">{lead.title || ""}</p>
                </td>
                <td className="px-6 py-4">
                  <StageBadge stage={lead.stage} />
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-900 dark:text-slate-200">{lead.score}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-900 dark:text-slate-200">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Billing Tab
function BillingTab({
  subscription,
}: {
  subscription: ClientDetailTabsProps["subscription"];
}) {
  if (!subscription) {
    return (
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-12 text-center">
        <CreditCard className="h-12 w-12 text-slate-900 dark:text-slate-200 mx-auto mb-4" />
        <p className="text-slate-900 dark:text-slate-200">No subscription</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Subscription */}
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
        <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
          Current Subscription
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-deep-space/30 rounded-lg">
            <div>
              <p className="text-sm text-slate-900 dark:text-slate-200">Plan</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
                {subscription.planType}
              </p>
            </div>
            <SubscriptionBadge status={subscription.status} />
          </div>

          {subscription.monthlyFee && (
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-deep-space/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-pro-400" />
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200">Monthly Fee</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  ${subscription.monthlyFee.toLocaleString()}/month
                </p>
              </div>
            </div>
          )}

          {subscription.currentPeriodEnd && (
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-deep-space/30 rounded-lg">
              <Calendar className="h-5 w-5 text-emerald-pro-600" />
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200">Next Billing Date</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice History Placeholder */}
      <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-6">
        <h3 className="text-lg font-sora font-semibold text-slate-900 dark:text-white mb-4">
          Invoice History
        </h3>
        <div className="text-center py-8">
          <FileText className="h-8 w-8 text-slate-900 dark:text-slate-200 mx-auto mb-2" />
          <p className="text-sm text-slate-900 dark:text-slate-200">Invoice history coming soon</p>
        </div>
      </div>
    </div>
  );
}

// Notes Tab
function NotesTab({
  notes,
  clientId,
}: {
  notes: ClientDetailTabsProps["notes"];
  clientId: string;
}) {
  const noteTypeConfig: Record<
    string,
    { icon: typeof MessageSquare; color: string }
  > = {
    general: { icon: MessageSquare, color: "text-slate-900 dark:text-slate-200" },
    call: { icon: Phone, color: "text-emerald-pro-400" },
    email: { icon: Mail, color: "text-emerald-pro-600" },
    meeting: { icon: Calendar, color: "text-emerald-pro-500" },
    task: { icon: CheckCircle2, color: "text-energy-orange" },
  };

  // Sort notes: pinned first, then by date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      {/* Add Note Button */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-pro-600 dark:bg-xgrowth-500 text-white dark:text-green-950 font-medium rounded-lg hover:bg-emerald-pro-600/90 dark:hover:bg-xgrowth-400 transition-colors">
          <FileText className="h-4 w-4" />
          Add Note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="bg-light-bg-secondary dark:bg-midnight-blue/30 border border-border-default dark:border-graphite/50 rounded-xl p-12 text-center">
          <FileText className="h-12 w-12 text-slate-900 dark:text-slate-200 mx-auto mb-4" />
          <p className="text-slate-900 dark:text-slate-200">No notes yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedNotes.map((note) => {
            const config = noteTypeConfig[note.noteType] || noteTypeConfig.general;
            const Icon = config.icon;

            return (
              <div
                key={note.id}
                className={cn(
                  "bg-light-bg-secondary dark:bg-midnight-blue/30 border rounded-xl p-4",
                  note.isPinned
                    ? "border-energy-orange/30"
                    : "border-border-default dark:border-graphite/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", config.color)} />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {note.authorName}
                    </span>
                    {note.isPinned && (
                      <Pin className="h-3 w-3 text-energy-orange" />
                    )}
                  </div>
                  <span className="text-xs text-slate-900 dark:text-slate-200">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-900 dark:text-slate-200 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Helper Components
function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-white dark:bg-deep-space/50 flex items-center justify-center">
        <Icon className="h-4 w-4 text-slate-900 dark:text-slate-200" />
      </div>
      <div>
        <p className="text-xs text-slate-900 dark:text-slate-200">{label}</p>
        <p className="text-sm text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function IntegrationItem({
  icon: Icon,
  label,
  connected,
}: {
  icon: typeof Key;
  label: string;
  connected: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-deep-space/30 rounded-lg">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-slate-900 dark:text-slate-200" />
        <span className="text-sm text-slate-900 dark:text-slate-200">{label}</span>
      </div>
      {connected ? (
        <span className="flex items-center gap-1 text-xs text-emerald-pro-400">
          <CheckCircle2 className="h-3 w-3" />
          Connected
        </span>
      ) : (
        <span className="text-xs text-slate-900 dark:text-slate-200">Not connected</span>
      )}
    </div>
  );
}

function CampaignStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    draft: "bg-steel/10 text-slate-900 dark:text-slate-200 border-steel/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    completed: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full border capitalize",
        styles[status] || styles.draft
      )}
    >
      {status}
    </span>
  );
}

function SubscriptionBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    trialing: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    past_due: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    canceled: "bg-steel/10 text-slate-900 dark:text-slate-200 border-steel/30",
    paused: "bg-steel/10 text-slate-900 dark:text-slate-200 border-steel/30",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full border capitalize",
        styles[status] || styles.active
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function StageBadge({ stage }: { stage: string }) {
  const styles: Record<string, string> = {
    new: "bg-steel/10 text-slate-900 dark:text-slate-200 border-steel/30",
    contacted: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    engaged: "bg-emerald-pro-500/10 text-emerald-pro-500 border-emerald-pro-500/30",
    qualified: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    meeting: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    closed_won: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    closed_lost: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
  };

  const labels: Record<string, string> = {
    new: "New",
    contacted: "Contacted",
    engaged: "Engaged",
    qualified: "Qualified",
    meeting: "Meeting",
    closed_won: "Won",
    closed_lost: "Lost",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full border",
        styles[stage] || styles.new
      )}
    >
      {labels[stage] || stage}
    </span>
  );
}
