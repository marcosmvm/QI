import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Zap,
  Mail,
  TrendingUp,
  ArrowUpRight,
  FileText,
  Clock,
  Shield,
} from "lucide-react";
import { BillingContent } from "./BillingContent";

export const dynamic = "force-dynamic";

interface MembershipWithOrg {
  organization_id: string;
  organizations: {
    id: string;
    name: string;
  } | null;
}

interface Subscription {
  id: string;
  plan_type: string;
  status: string;
  monthly_fee: number | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}

interface Invoice {
  id: string;
  amount: number;
  status: string;
  invoice_date: string;
  paid_at: string | null;
  stripe_invoice_id: string | null;
}

interface CampaignMetric {
  emails_sent: number;
}

async function getUserOrganization() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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

async function getBillingData(organizationId: string) {
  const supabase = await createClient();

  // Get subscription
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(1);

  const subscription = (subscriptions?.[0] || null) as Subscription | null;

  // Get invoices
  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("organization_id", organizationId)
    .order("invoice_date", { ascending: false });

  const typedInvoices = (invoices || []) as Invoice[];

  // Get current month usage
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { data: metrics } = await supabase
    .from("campaign_metrics")
    .select("emails_sent, campaigns!inner(organization_id)")
    .gte("date", startOfMonth.toISOString());

  const typedMetrics = (metrics || []) as Array<CampaignMetric>;
  const totalEmailsSent = typedMetrics.reduce(
    (sum, m) => sum + (m.emails_sent || 0),
    0
  );

  return {
    subscription,
    invoices: typedInvoices,
    usage: {
      emailsSent: totalEmailsSent,
      limit: getEmailLimit(subscription?.plan_type),
    },
  };
}

function getEmailLimit(planType: string | undefined): number {
  const limits: Record<string, number> = {
    pilot: 5000,
    starter: 10000,
    growth: 25000,
    scale: 50000,
    enterprise: 100000,
  };
  return limits[planType || "starter"] || 10000;
}

function getPlanFeatures(planType: string): string[] {
  const features: Record<string, string[]> = {
    pilot: [
      "5,000 emails/month",
      "1 campaign",
      "Basic analytics",
      "Email support",
    ],
    starter: [
      "10,000 emails/month",
      "3 campaigns",
      "Advanced analytics",
      "Priority support",
      "AI Architect access",
    ],
    growth: [
      "25,000 emails/month",
      "10 campaigns",
      "Full analytics suite",
      "Dedicated support",
      "All AI engines",
      "Custom integrations",
    ],
    scale: [
      "50,000 emails/month",
      "Unlimited campaigns",
      "Enterprise analytics",
      "24/7 support",
      "All AI engines",
      "Custom integrations",
      "Dedicated account manager",
    ],
    enterprise: [
      "100,000+ emails/month",
      "Unlimited everything",
      "Custom SLAs",
      "White-label options",
      "API access",
      "Custom development",
    ],
  };
  return features[planType] || features.starter;
}

export default async function BillingPage() {
  const { organizationId } = await getUserOrganization();

  if (!organizationId) {
    redirect("/dashboard");
  }

  const { subscription, invoices, usage } = await getBillingData(organizationId);

  return (
    <BillingContent
      subscription={subscription}
      invoices={invoices}
      usage={usage}
    />
  );
}
