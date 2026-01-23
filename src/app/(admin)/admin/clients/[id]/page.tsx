import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { calculateHealthScore } from "@/components/admin/ClientHealthBadge";
import ClientDetailPageClient from "./ClientDetailPageClient";

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
    <ClientDetailPageClient
      client={{
        id: client.id,
        name: client.name,
        status: client.status,
        domain: client.domain,
        industry: client.industry,
        employeeCount: client.employee_count,
        onboardingCompleted: client.onboarding_completed,
        instantlyApiKey: client.instantly_api_key,
        googleSheetId: client.google_sheet_id,
        createdAt: client.created_at,
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
      healthScore={healthScore}
    />
  );
}
