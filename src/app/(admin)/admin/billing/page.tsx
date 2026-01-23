import { createClient } from "@/lib/supabase/server";
import BillingPageClient from "./BillingPageClient";

export const dynamic = 'force-dynamic';

interface SubscriptionWithOrg {
  id: string;
  organization_id: string;
  status: string;
  plan_type: string;
  monthly_fee: number | null;
  current_period_end: string | null;
  organizations: { name: string } | null;
}

interface InvoiceWithOrg {
  id: string;
  organization_id: string;
  status: string;
  amount: number | null;
  created_at: string;
  invoice_url: string | null;
  organizations: { name: string } | null;
}

async function getBillingStats() {
  const supabase = await createClient();

  // Get all subscriptions
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select(`
      *,
      organizations(name)
    `)
    .order("created_at", { ascending: false });

  const typedSubscriptions = (subscriptions || []) as SubscriptionWithOrg[];

  // Calculate MRR
  const activeSubscriptions = typedSubscriptions.filter((s) => s.status === "active");
  const mrr = activeSubscriptions.reduce((sum, s) => sum + (s.monthly_fee || 0), 0);

  // Get recent invoices
  const { data: invoices } = await supabase
    .from("invoices")
    .select(`
      *,
      organizations(name)
    `)
    .order("created_at", { ascending: false })
    .limit(10);

  const typedInvoices = (invoices || []) as InvoiceWithOrg[];

  // Calculate totals
  const paidInvoices = typedInvoices.filter((i) => i.status === "paid");
  const totalRevenue = paidInvoices.reduce((sum, i) => sum + (i.amount || 0), 0);
  const pendingInvoices = typedInvoices.filter((i) => i.status === "open");
  const pendingAmount = pendingInvoices.reduce((sum, i) => sum + (i.amount || 0), 0);

  return {
    mrr,
    totalRevenue,
    pendingAmount,
    activeCount: activeSubscriptions.length,
    subscriptions: typedSubscriptions,
    invoices: typedInvoices,
  };
}

export default async function BillingPage() {
  const { mrr, totalRevenue, pendingAmount, activeCount, subscriptions, invoices } =
    await getBillingStats();

  return (
    <BillingPageClient
      mrr={mrr}
      totalRevenue={totalRevenue}
      pendingAmount={pendingAmount}
      activeCount={activeCount}
      subscriptions={subscriptions}
      invoices={invoices}
    />
  );
}
