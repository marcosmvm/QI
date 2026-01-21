import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
  MoreHorizontal,
  Pause,
  Play,
  Archive,
} from "lucide-react";
import { ClientDetailTabs } from "./ClientDetailTabs";
import { ClientHealthBadge, calculateHealthScore } from "@/components/admin/ClientHealthBadge";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ClientData {
  id: string;
  name: string;
  domain: string | null;
  industry: string | null;
  status: string;
  employee_count: number | null;
  onboarding_completed: boolean;
  instantly_api_key: string | null;
  google_sheet_id: string | null;
  created_at: string;
  subscriptions: {
    id: string;
    plan_type: string;
    status: string;
    monthly_fee: number | null;
    current_period_start: string | null;
    current_period_end: string | null;
  }[] | null;
  campaigns: {
    id: string;
    name: string;
    status: string;
    target_industry: string | null;
    created_at: string;
    campaign_metrics: {
      emails_sent: number;
      emails_opened: number;
      emails_replied: number;
      deliverability_rate: number | null;
      open_rate: number | null;
      reply_rate: number | null;
      bounce_rate: number | null;
    }[];
  }[];
  leads: {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    company: string | null;
    title: string | null;
    stage: string;
    score: number;
    created_at: string;
  }[];
  organization_members: {
    id: string;
    role: string;
    joined_at: string;
    profiles: { full_name: string; email: string } | null;
  }[];
  admin_notes: {
    id: string;
    content: string;
    note_type: string;
    is_pinned: boolean;
    created_at: string;
    profiles: { full_name: string } | null;
  }[];
}

async function getClient(id: string): Promise<ClientData | null> {
  const supabase = await createClient();

  const { data: client, error } = await supabase
    .from("organizations")
    .select(`
      *,
      subscriptions (*),
      campaigns (
        *,
        campaign_metrics (*)
      ),
      leads (*),
      organization_members (
        *,
        profiles (*)
      ),
      admin_notes (
        *,
        profiles:author_id (full_name)
      )
    `)
    .eq("id", id)
    .single();

  if (error || !client) {
    return null;
  }

  return client as unknown as ClientData;
}

// Calculate health score
function getHealthScore(campaigns: { campaign_metrics: { deliverability_rate: number | null; open_rate: number | null; reply_rate: number | null; bounce_rate: number | null }[] }[]): number | null {
  const allMetrics = campaigns.flatMap((c) => c.campaign_metrics);

  if (allMetrics.length === 0) return null;

  const avgMetrics = {
    deliverabilityRate:
      allMetrics.reduce((sum, m) => sum + (m.deliverability_rate || 0), 0) /
      allMetrics.length,
    openRate:
      allMetrics.reduce((sum, m) => sum + (m.open_rate || 0), 0) /
      allMetrics.length,
    replyRate:
      allMetrics.reduce((sum, m) => sum + (m.reply_rate || 0), 0) /
      allMetrics.length,
    bounceRate:
      allMetrics.reduce((sum, m) => sum + (m.bounce_rate || 0), 0) /
      allMetrics.length,
  };

  return calculateHealthScore(avgMetrics);
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const client = await getClient(id);

  if (!client) {
    notFound();
  }

  const subscription = client.subscriptions?.[0] || null;

  const healthScore = getHealthScore(client.campaigns || []);

  // Transform data for tabs
  const campaigns = (client.campaigns || []).map((c) => ({
    id: c.id,
    name: c.name,
    status: c.status,
    targetIndustry: c.target_industry,
    createdAt: c.created_at,
    totalSent: c.campaign_metrics.reduce((sum, m) => sum + (m.emails_sent || 0), 0),
    totalOpened: c.campaign_metrics.reduce((sum, m) => sum + (m.emails_opened || 0), 0),
    totalReplied: c.campaign_metrics.reduce((sum, m) => sum + (m.emails_replied || 0), 0),
    avgDeliverability:
      c.campaign_metrics.length > 0
        ? c.campaign_metrics.reduce((sum, m) => sum + (m.deliverability_rate || 0), 0) /
          c.campaign_metrics.length
        : null,
    avgOpenRate:
      c.campaign_metrics.length > 0
        ? c.campaign_metrics.reduce((sum, m) => sum + (m.open_rate || 0), 0) /
          c.campaign_metrics.length
        : null,
    avgReplyRate:
      c.campaign_metrics.length > 0
        ? c.campaign_metrics.reduce((sum, m) => sum + (m.reply_rate || 0), 0) /
          c.campaign_metrics.length
        : null,
  }));

  const leads = (client.leads || []).map((l) => ({
    id: l.id,
    email: l.email,
    firstName: l.first_name,
    lastName: l.last_name,
    company: l.company,
    title: l.title,
    stage: l.stage,
    score: l.score,
    createdAt: l.created_at,
  }));

  const notes = (client.admin_notes || []).map((n) => ({
    id: n.id,
    content: n.content,
    noteType: n.note_type,
    isPinned: n.is_pinned,
    createdAt: n.created_at,
    authorName: n.profiles?.full_name || "Unknown",
  }));

  const members = (client.organization_members || []).map((m) => ({
    id: m.id,
    role: m.role,
    joinedAt: m.joined_at,
    name: m.profiles?.full_name || "Unknown",
    email: m.profiles?.email || "",
  }));

  return (
    <div className="p-8">
      {/* Back link */}
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Clients
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-quantum-violet/20 border border-quantum-violet/30 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-quantum-violet" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-sora font-bold text-white">
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
                  className="flex items-center gap-1 text-sm text-steel hover:text-electric-cyan transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {client.domain}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {client.industry && (
                <span className="text-sm text-steel">
                  {client.industry}
                </span>
              )}
              <span className="text-sm text-steel">
                <Calendar className="h-3.5 w-3.5 inline mr-1" />
                Joined {new Date(client.created_at).toLocaleDateString()}
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
            <button className="flex items-center gap-2 px-4 py-2 border border-neon-mint/50 text-neon-mint rounded-lg hover:bg-neon-mint/10 transition-colors">
              <Play className="h-4 w-4" />
              Resume
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 border border-graphite text-steel rounded-lg hover:bg-midnight-blue/30 transition-colors">
            <Archive className="h-4 w-4" />
            Archive
          </button>
          <button className="p-2 border border-graphite text-steel rounded-lg hover:bg-midnight-blue/30 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <QuickStat
          label="Plan"
          value={subscription?.plan_type || "No plan"}
          subtext={subscription?.monthly_fee ? `$${subscription.monthly_fee}/mo` : undefined}
        />
        <QuickStat
          label="Campaigns"
          value={campaigns.length}
          subtext={`${campaigns.filter((c: { status: string }) => c.status === "active").length} active`}
        />
        <QuickStat
          label="Leads"
          value={leads.length}
          subtext={`${leads.filter((l: { stage: string }) => l.stage === "qualified" || l.stage === "meeting").length} qualified`}
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
      </div>

      {/* Tabs */}
      <ClientDetailTabs
        clientId={client.id}
        client={{
          id: client.id,
          name: client.name,
          domain: client.domain,
          industry: client.industry,
          employeeCount: client.employee_count,
          onboardingCompleted: client.onboarding_completed,
          instantlyApiKey: client.instantly_api_key,
          googleSheetId: client.google_sheet_id,
        }}
        subscription={subscription ? {
          id: subscription.id,
          planType: subscription.plan_type,
          status: subscription.status,
          monthlyFee: subscription.monthly_fee,
          currentPeriodStart: subscription.current_period_start,
          currentPeriodEnd: subscription.current_period_end,
        } : null}
        campaigns={campaigns}
        leads={leads}
        notes={notes}
        members={members}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-neon-mint/10 text-neon-mint border-neon-mint/30",
    pilot: "bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30",
    paused: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    churned: "bg-steel/10 text-steel border-steel/30",
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
    <div className="bg-midnight-blue/30 border border-graphite/50 rounded-xl p-4">
      <p className="text-xs text-steel mb-1">{label}</p>
      <p
        className={`text-xl font-sora font-bold capitalize ${
          highlight ? "text-energy-orange" : "text-white"
        }`}
      >
        {value}
      </p>
      {subtext && <p className="text-xs text-steel mt-1">{subtext}</p>}
    </div>
  );
}
