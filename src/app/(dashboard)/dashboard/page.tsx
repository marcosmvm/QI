import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Mail,
  MousePointerClick,
  Reply,
  TrendingUp,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";
import { MetricsCard } from "@/components/dashboard/MetricsCard";
import { DashboardContent } from "./dashboard-content";

export const dynamic = 'force-dynamic';

interface MembershipWithOrg {
  organization_id: string;
  organizations: {
    id: string;
    name: string;
    status: string;
    onboarding_completed: boolean;
  } | null;
}

async function getUserOrganization() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user's organization
  const { data: membership } = await supabase
    .from("organization_members")
    .select("organization_id, organizations(*)")
    .eq("user_id", user.id)
    .single();

  const typedMembership = membership as MembershipWithOrg | null;

  return {
    user,
    organization: typedMembership?.organizations || null,
    organizationId: typedMembership?.organization_id,
  };
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  target_industry: string | null;
  target_role: string | null;
  daily_limit: number;
  created_at: string;
}

interface CampaignMetric {
  id: string;
  campaign_id: string;
  date: string;
  emails_sent: number;
  emails_opened: number;
  emails_replied: number;
  emails_bounced: number;
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

async function getDashboardData(organizationId: string) {
  const supabase = await createClient();

  // Get campaigns for this organization
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  const typedCampaigns = (campaigns || []) as Campaign[];

  // Get campaign metrics
  const { data: metrics } = await supabase
    .from("campaign_metrics")
    .select("*")
    .in(
      "campaign_id",
      typedCampaigns.map((c) => c.id)
    )
    .order("date", { ascending: false });

  const typedMetrics = (metrics || []) as CampaignMetric[];

  // Get recent leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(5);

  const typedLeads = (leads || []) as Lead[];

  // Calculate totals from metrics
  const totals = typedMetrics.reduce(
    (acc, m) => ({
      sent: acc.sent + (m.emails_sent || 0),
      opened: acc.opened + (m.emails_opened || 0),
      replied: acc.replied + (m.emails_replied || 0),
      bounced: acc.bounced + (m.emails_bounced || 0),
    }),
    { sent: 0, opened: 0, replied: 0, bounced: 0 }
  );

  // Get weekly data for chart
  const weeklyData = getWeeklyData(typedMetrics);

  return {
    campaigns: typedCampaigns,
    metrics: typedMetrics,
    leads: typedLeads,
    totals,
    weeklyData,
  };
}

function getWeeklyData(metrics: Array<{ date: string; emails_sent: number; emails_opened: number; emails_replied: number }>) {
  // Group by date and aggregate
  const grouped = metrics.reduce((acc, m) => {
    const date = m.date;
    if (!acc[date]) {
      acc[date] = { sent: 0, opened: 0, replied: 0 };
    }
    acc[date].sent += m.emails_sent || 0;
    acc[date].opened += m.emails_opened || 0;
    acc[date].replied += m.emails_replied || 0;
    return acc;
  }, {} as Record<string, { sent: number; opened: number; replied: number }>);

  // Get last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      ...grouped[dateStr] || { sent: 0, opened: 0, replied: 0 },
    });
  }

  return days;
}

function getMetricStatus(metric: string, value: number): "success" | "warning" | "critical" {
  const thresholds: Record<string, { target: number; warning: number }> = {
    openRate: { target: 30, warning: 15 },
    replyRate: { target: 3, warning: 1 },
    deliverability: { target: 90, warning: 85 },
  };

  const t = thresholds[metric];
  if (!t) return "success";

  if (value >= t.target) return "success";
  if (value >= t.warning) return "warning";
  return "critical";
}

export default async function DashboardPage() {
  const { organization, organizationId } = await getUserOrganization();

  // If user has no organization, show welcome message
  if (!organizationId) {
    return (
      <div className="min-h-screen bg-white dark:bg-deep-space p-8 flex items-center justify-center relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-pro-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-pro-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative text-center max-w-lg">
          {/* Animated orbital ring */}
          <div className="relative h-24 w-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border border-emerald-pro-600/20 animate-pulse" />
            <div className="absolute inset-2 rounded-full border border-emerald-pro-500/20" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-midnight-blue/80 to-deep-space border border-emerald-pro-600/30 flex items-center justify-center">
              <Users className="h-8 w-8 text-emerald-pro-600" />
            </div>
          </div>

          <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-3">Welcome to XGrowthOS</h1>
          <p className="text-slate-900 dark:text-slate-300 mb-8 leading-relaxed">
            Your account is being set up. Our team will reach out shortly to complete your onboarding and get your first campaigns running.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard/support"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-pro-600 to-cyan-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-pro-600/20 transition-all"
            >
              Contact Support
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-pro-600/20 text-emerald-pro-600 font-medium rounded-xl hover:bg-emerald-pro-600/10 transition-colors"
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to onboarding if not completed
  if (!organization?.onboarding_completed) {
    redirect("/dashboard/onboarding");
  }

  const { campaigns, leads, totals, weeklyData } = await getDashboardData(organizationId);

  const openRate = totals.sent > 0 ? (totals.opened / totals.sent) * 100 : 0;
  const replyRate = totals.sent > 0 ? (totals.replied / totals.sent) * 100 : 0;
  const deliverability = totals.sent > 0 ? ((totals.sent - totals.bounced) / totals.sent) * 100 : 0;

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;

  return (
    <DashboardContent
      totals={totals}
      openRate={openRate}
      replyRate={replyRate}
      deliverability={deliverability}
      activeCampaigns={activeCampaigns}
      campaigns={campaigns}
      leads={leads}
      weeklyData={weeklyData}
      getMetricStatus={getMetricStatus}
    />
  );
}

