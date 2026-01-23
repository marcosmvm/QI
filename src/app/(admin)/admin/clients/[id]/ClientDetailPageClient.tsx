"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Globe,
  Calendar,
  ExternalLink,
  MoreHorizontal,
  Pause,
  Play,
  Archive,
} from "lucide-react";
import { ClientDetailTabs } from "./ClientDetailTabs";
import { ClientHealthBadge } from "@/components/admin/ClientHealthBadge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

interface ClientData {
  id: string;
  name: string;
  status: string;
  domain: string | null;
  industry: string | null;
  employeeCount: number | null;
  onboardingCompleted: boolean;
  instantlyApiKey: string | null;
  googleSheetId: string | null;
  createdAt: string;
}

interface SubscriptionData {
  id: string;
  planType: string;
  status: string;
  monthlyFee: number | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
}

interface CampaignData {
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
}

interface LeadData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  title: string | null;
  stage: string;
  score: number;
  createdAt: string;
}

interface NoteData {
  id: string;
  content: string;
  noteType: string;
  isPinned: boolean;
  createdAt: string;
  authorName: string;
}

interface MemberData {
  id: string;
  role: string;
  joinedAt: string;
  name: string;
  email: string;
}

interface ClientDetailPageClientProps {
  client: ClientData;
  subscription: SubscriptionData | null;
  campaigns: CampaignData[];
  leads: LeadData[];
  notes: NoteData[];
  members: MemberData[];
  healthScore: number | null;
}

export default function ClientDetailPageClient({
  client,
  subscription,
  campaigns,
  leads,
  notes,
  members,
  healthScore,
}: ClientDetailPageClientProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Back link & Header */}
      <motion.div variants={itemVariants}>
        <p className="text-sm text-light-text-muted dark:text-steel mb-4">
          Admin / <Link href="/admin/clients" className="hover:text-emerald-pro-600 transition-colors">Clients</Link> / <span className="text-emerald-pro-500">{client.name}</span>
        </p>
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-light-text-muted dark:text-steel hover:text-emerald-pro-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clients
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-emerald-pro-500/20 border border-emerald-pro-500/30 flex items-center justify-center">
              <Building2 className="h-8 w-8 text-emerald-pro-500" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-sora font-bold text-light-text dark:text-white">
                  {client.name}
                </h1>
                <StatusBadge status={client.status} />
                <ClientHealthBadge score={healthScore} />
              </div>
              <div className="flex items-center gap-4 mt-2">
                {client.domain && (
                  <a
                    href={`https://${client.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-light-text-muted dark:text-steel hover:text-emerald-pro-600 transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {client.domain}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {client.industry && (
                  <span className="text-sm text-light-text-muted dark:text-steel">
                    {client.industry}
                  </span>
                )}
                <span className="text-sm text-light-text-muted dark:text-steel">
                  <Calendar className="h-3.5 w-3.5 inline mr-1" />
                  Joined {new Date(client.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {client.status === "active" || client.status === "pilot" ? (
              <button className="flex items-center gap-2 px-4 py-2 border border-energy-orange/50 text-energy-orange rounded-lg hover:bg-energy-orange/10 transition-colors">
                <Pause className="h-4 w-4" />
                Pause
              </button>
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 border border-emerald-pro-400/50 text-emerald-pro-400 rounded-lg hover:bg-emerald-pro-400/10 transition-colors">
                <Play className="h-4 w-4" />
                Resume
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 border border-border-default dark:border-graphite text-light-text-muted dark:text-steel rounded-lg hover:bg-light-bg-secondary dark:bg-midnight-blue/30 transition-colors">
              <Archive className="h-4 w-4" />
              Archive
            </button>
            <button className="p-2 border border-border-default dark:border-graphite text-light-text-muted dark:text-steel rounded-lg hover:bg-light-bg-secondary dark:bg-midnight-blue/30 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-5 gap-4 mb-8">
        <QuickStat
          label="Plan"
          value={subscription?.planType || "No plan"}
          subtext={subscription?.monthlyFee ? `$${subscription.monthlyFee}/mo` : undefined}
        />
        <QuickStat
          label="Campaigns"
          value={campaigns.length}
          subtext={`${campaigns.filter((c) => c.status === "active").length} active`}
        />
        <QuickStat
          label="Leads"
          value={leads.length}
          subtext={`${leads.filter((l) => l.stage === "qualified" || l.stage === "meeting").length} qualified`}
        />
        <QuickStat
          label="Team Members"
          value={members.length}
        />
        <QuickStat
          label="Health Score"
          value={healthScore !== null ? healthScore : "N/A"}
          highlight={healthScore !== null && healthScore < 60}
        />
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <ClientDetailTabs
          clientId={client.id}
          client={{
            id: client.id,
            name: client.name,
            domain: client.domain,
            industry: client.industry,
            employeeCount: client.employeeCount,
            onboardingCompleted: client.onboardingCompleted,
            instantlyApiKey: client.instantlyApiKey,
            googleSheetId: client.googleSheetId,
          }}
          subscription={subscription}
          campaigns={campaigns}
          leads={leads}
          notes={notes}
          members={members}
        />
      </motion.div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    pilot: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${
        styles[status] || styles.paused
      }`}
    >
      {status}
    </span>
  );
}

function QuickStat({
  label,
  value,
  subtext,
  highlight = false,
}: {
  label: string;
  value: string | number;
  subtext?: string;
  highlight?: boolean;
}) {
  return (
    <div className="glass-premium p-4 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300">
      <p className="text-xs text-light-text-muted dark:text-steel mb-1">{label}</p>
      <p
        className={`text-xl font-sora font-bold capitalize ${
          highlight ? "text-energy-orange" : "text-light-text dark:text-white"
        }`}
      >
        {value}
      </p>
      {subtext && <p className="text-xs text-light-text-muted dark:text-steel mt-1">{subtext}</p>}
    </div>
  );
}
