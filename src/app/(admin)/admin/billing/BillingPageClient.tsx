"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

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

interface BillingPageClientProps {
  mrr: number;
  totalRevenue: number;
  pendingAmount: number;
  activeCount: number;
  subscriptions: SubscriptionWithOrg[];
  invoices: InvoiceWithOrg[];
}

export default function BillingPageClient({
  mrr,
  totalRevenue,
  pendingAmount,
  activeCount,
  subscriptions,
  invoices,
}: BillingPageClientProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="text-sm text-steel mb-1">Admin / <span className="text-neon-mint">Billing</span></p>
        <h1 className="text-2xl font-sora font-bold text-white">Billing</h1>
        <p className="text-steel mt-1">Revenue and subscription management</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Monthly Revenue"
          value={`$${mrr.toLocaleString()}`}
          subtitle="MRR from active subscriptions"
          icon={DollarSign}
        />
        <StatCard
          title="Active Subscriptions"
          value={activeCount.toString()}
          subtitle="Paying customers"
          icon={CreditCard}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle="All-time collected"
          icon={TrendingUp}
        />
        <StatCard
          title="Pending"
          value={`$${pendingAmount.toLocaleString()}`}
          subtitle="Outstanding invoices"
          icon={Receipt}
          highlight={pendingAmount > 0}
        />
      </motion.div>

      {/* Two Column Layout */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriptions */}
        <div className="glass-premium p-6 hover:border-electric-cyan/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300">
          <h2 className="text-lg font-sora font-semibold text-white mb-6">
            Active Subscriptions
          </h2>
          <div className="space-y-4">
            {subscriptions.filter((s) => s.status === "active").length === 0 ? (
              <div className="text-center py-8">
                <CreditCard className="h-8 w-8 text-steel mx-auto mb-2" />
                <p className="text-steel text-sm">No active subscriptions</p>
              </div>
            ) : (
              subscriptions
                .filter((s) => s.status === "active")
                .map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-deep-space/50 border border-graphite/30 hover:border-electric-cyan/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-neon-mint/10 border border-neon-mint/30 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-neon-mint" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {sub.organizations?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-steel capitalize">
                          {sub.plan_type} Plan
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${(sub.monthly_fee || 0).toLocaleString()}/mo
                      </p>
                      <p className="text-xs text-steel">
                        Renews{" "}
                        {sub.current_period_end
                          ? new Date(sub.current_period_end).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="glass-premium p-6 hover:border-electric-cyan/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300">
          <h2 className="text-lg font-sora font-semibold text-white mb-6">
            Recent Invoices
          </h2>
          <div className="space-y-4">
            {invoices.length === 0 ? (
              <div className="text-center py-8">
                <Receipt className="h-8 w-8 text-steel mx-auto mb-2" />
                <p className="text-steel text-sm">No invoices yet</p>
              </div>
            ) : (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-deep-space/50 border border-graphite/30 hover:border-electric-cyan/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        invoice.status === "paid"
                          ? "bg-neon-mint/10 border border-neon-mint/30"
                          : invoice.status === "open"
                          ? "bg-energy-orange/10 border border-energy-orange/30"
                          : "bg-steel/10 border border-steel/30"
                      }`}
                    >
                      {invoice.status === "paid" ? (
                        <CheckCircle className="h-5 w-5 text-neon-mint" />
                      ) : invoice.status === "open" ? (
                        <AlertCircle className="h-5 w-5 text-energy-orange" />
                      ) : (
                        <Receipt className="h-5 w-5 text-steel" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {invoice.organizations?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-steel">
                        {new Date(invoice.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        ${(invoice.amount || 0).toLocaleString()}
                      </p>
                      <p
                        className={`text-xs capitalize ${
                          invoice.status === "paid"
                            ? "text-neon-mint"
                            : invoice.status === "open"
                            ? "text-energy-orange"
                            : "text-steel"
                        }`}
                      >
                        {invoice.status}
                      </p>
                    </div>
                    {invoice.invoice_url && (
                      <a
                        href={invoice.invoice_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 transition-colors"
                        title="View invoice"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  highlight = false,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div
      className={`glass-premium p-6 hover:border-electric-cyan/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300 ${
        highlight ? "border-energy-orange/50" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
            highlight
              ? "bg-energy-orange/10 border border-energy-orange/30"
              : "bg-electric-cyan/10 border border-electric-cyan/30"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${highlight ? "text-energy-orange" : "text-electric-cyan"}`}
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-sora font-bold text-white">{value}</p>
        <p className="text-sm text-silver mt-1">{title}</p>
        <p className="text-xs text-steel mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
