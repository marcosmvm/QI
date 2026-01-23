"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

interface BillingContentProps {
  subscription: Subscription | null;
  invoices: Invoice[];
  usage: {
    emailsSent: number;
    limit: number;
  };
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-emerald-pro-400/10 text-emerald-pro-400 border-emerald-pro-400/30",
    trialing: "bg-emerald-pro-600/10 text-emerald-pro-600 border-emerald-pro-600/30",
    past_due: "bg-energy-orange/10 text-energy-orange border-energy-orange/30",
    canceled: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
    inactive: "bg-steel/10 text-light-text-muted dark:text-steel border-steel/30",
  };

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full border capitalize ${
        styles[status] || styles.inactive
      }`}
    >
      {status === "past_due" ? "Past Due" : status}
    </span>
  );
}

export function BillingContent({ subscription, invoices, usage }: BillingContentProps) {
  const usagePercentage = Math.min((usage.emailsSent / usage.limit) * 100, 100);
  const isNearLimit = usagePercentage >= 80;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-light-text-muted dark:text-steel mb-2">
          <Link
            href="/dashboard"
            className="hover:text-emerald-pro-600 transition-colors"
          >
            Portal
          </Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Billing</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-light-text dark:text-white">
          Billing & Subscription
        </h1>
        <p className="text-light-text-muted dark:text-steel mt-1">
          Manage your subscription, payment methods, and billing history
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan */}
          <motion.div
            variants={itemVariants}
            className="glass-premium p-6 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-pro-600" />
                </div>
                <div>
                  <h2 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                    Current Plan
                  </h2>
                  <p className="text-sm text-light-text-muted dark:text-steel">
                    {subscription
                      ? `Member since ${new Date(subscription.created_at).toLocaleDateString()}`
                      : "No active subscription"}
                  </p>
                </div>
              </div>
              <StatusBadge status={subscription?.status || "inactive"} />
            </div>

            {subscription ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-sora font-bold text-light-text dark:text-white capitalize">
                      {subscription.plan_type} Plan
                    </p>
                    {subscription.monthly_fee && (
                      <p className="text-light-text-muted dark:text-steel">
                        ${subscription.monthly_fee.toLocaleString()}/month
                      </p>
                    )}
                  </div>
                  <button className="px-4 py-2 border border-emerald-pro-600/30 text-emerald-pro-600 rounded-lg hover:bg-emerald-pro-600/10 transition-colors">
                    Upgrade Plan
                  </button>
                </div>

                <div className="border-t border-border-default dark:border-graphite/30 pt-4">
                  <p className="text-sm text-light-text-muted dark:text-steel mb-3">Plan includes:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {getPlanFeatures(subscription.plan_type).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-silver"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-pro-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {subscription.current_period_end && (
                  <div className="flex items-center gap-2 text-sm text-light-text-muted dark:text-steel pt-2 border-t border-border-default dark:border-graphite/30">
                    <Calendar className="h-4 w-4" />
                    Next billing date:{" "}
                    {new Date(subscription.current_period_end).toLocaleDateString()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Zap className="h-12 w-12 text-light-text-muted dark:text-steel mx-auto mb-4" />
                <p className="text-light-text-muted dark:text-steel mb-4">No active subscription</p>
                <button className="px-6 py-2 bg-emerald-pro-600 text-deep-space font-medium rounded-lg hover:bg-emerald-pro-600/90 transition-colors">
                  Choose a Plan
                </button>
              </div>
            )}
          </motion.div>

          {/* Payment Method */}
          <motion.div
            variants={itemVariants}
            className="glass-premium p-6 hover:border-emerald-pro-500/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-pro-500/10 border border-emerald-pro-500/30 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-emerald-pro-500" />
                </div>
                <div>
                  <h2 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                    Payment Method
                  </h2>
                  <p className="text-sm text-light-text-muted dark:text-steel">Manage your payment details</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-10 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                  <span className="text-light-text dark:text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-light-text dark:text-white">
                    **** **** **** 4242
                  </p>
                  <p className="text-xs text-light-text-muted dark:text-steel">Expires 12/2025</p>
                </div>
              </div>
              <button className="text-sm text-emerald-pro-600 hover:underline">
                Update
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-light-text-muted dark:text-steel">
              <Shield className="h-4 w-4" />
              <span>Payments are secured with Stripe</span>
            </div>
          </motion.div>

          {/* Billing History */}
          <motion.div
            variants={itemVariants}
            className="glass-premium p-6 hover:border-emerald-pro-400/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-emerald-pro-400" />
                </div>
                <div>
                  <h2 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                    Billing History
                  </h2>
                  <p className="text-sm text-light-text-muted dark:text-steel">
                    Download your past invoices
                  </p>
                </div>
              </div>
            </div>

            {invoices.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-10 w-10 text-light-text-muted dark:text-steel mx-auto mb-3" />
                <p className="text-light-text-muted dark:text-steel text-sm">No invoices yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg hover:border-emerald-pro-600/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          invoice.status === "paid"
                            ? "bg-emerald-pro-400"
                            : invoice.status === "pending"
                            ? "bg-energy-orange"
                            : "bg-steel"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-light-text dark:text-white">
                          {new Date(invoice.invoice_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-xs text-light-text-muted dark:text-steel capitalize">
                          {invoice.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-light-text dark:text-white">
                        ${invoice.amount.toLocaleString()}
                      </span>
                      <button className="p-2 text-light-text-muted dark:text-steel hover:text-emerald-pro-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Usage */}
        <div className="space-y-6">
          {/* Usage Stats */}
          <motion.div
            variants={itemVariants}
            className="glass-premium p-6 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-emerald-pro-600" />
              </div>
              <div>
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                  Current Usage
                </h3>
                <p className="text-sm text-light-text-muted dark:text-steel">This billing period</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-light-text-muted dark:text-steel">Emails Sent</span>
                  <span className="text-sm font-medium text-light-text dark:text-white">
                    {usage.emailsSent.toLocaleString()} /{" "}
                    {usage.limit.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-graphite rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isNearLimit ? "bg-energy-orange" : "bg-emerald-pro-600"
                    }`}
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
                <p className="text-xs text-light-text-muted dark:text-steel mt-1">
                  {Math.round(usagePercentage)}% of monthly limit used
                </p>
              </div>

              {isNearLimit && (
                <div className="flex items-start gap-2 p-3 bg-energy-orange/10 border border-energy-orange/30 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-energy-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-energy-orange">
                      Approaching limit
                    </p>
                    <p className="text-xs text-light-text-muted dark:text-steel">
                      Consider upgrading to avoid service interruption.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="glass-premium p-6 hover:border-emerald-pro-600/30 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-300"
          >
            <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg hover:border-emerald-pro-600/30 transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-emerald-pro-600" />
                  <span className="text-sm text-light-text dark:text-white">Upgrade Plan</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-light-text-muted dark:text-steel" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg hover:border-emerald-pro-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-emerald-pro-500" />
                  <span className="text-sm text-light-text dark:text-white">Update Card</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-light-text-muted dark:text-steel" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-lg hover:border-emerald-pro-400/30 transition-colors">
                <div className="flex items-center gap-3">
                  <Download className="h-4 w-4 text-emerald-pro-400" />
                  <span className="text-sm text-light-text dark:text-white">Download All Invoices</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-light-text-muted dark:text-steel" />
              </button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 rounded-xl p-4 hover:border-emerald-pro-600/20 transition-colors"
          >
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-light-text-muted dark:text-steel flex-shrink-0" />
              <div>
                <p className="text-sm text-light-text-secondary dark:text-silver">
                  Need help with billing?
                </p>
                <Link
                  href="/dashboard/support"
                  className="text-sm text-emerald-pro-600 hover:underline"
                >
                  Contact our support team
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
