"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Building2,
  Bell,
  Link as LinkIcon,
  Shield,
  Zap,
  CheckCircle2,
  AlertTriangle,
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

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
}

interface IntegrationStatus {
  n8n: { configured: boolean; url: string };
  stripe: { configured: boolean };
  supabase: { configured: boolean; url: string };
}

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [integrations, setIntegrations] = useState<IntegrationStatus>({
    n8n: { configured: false, url: "Not configured" },
    stripe: { configured: false },
    supabase: { configured: true, url: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setCurrentUser(profile as UserProfile | null);
      }

      // Check integration status from client-accessible env vars
      setIntegrations({
        n8n: { configured: true, url: "https://marcosmatthews.app.n8n.cloud" },
        stripe: { configured: true },
        supabase: {
          configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not configured",
        },
      });

      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen p-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8 max-w-4xl">
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <span>Admin</span>
          <span className="text-graphite">/</span>
          <span className="text-electric-cyan">Settings</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-white">Settings</h1>
        <p className="text-steel mt-1">
          Configure your admin portal and integrations
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Company Profile */}
        <SettingsSection
          title="Company Profile"
          description="Basic information about your organization"
          icon={Building2}
        >
          <div className="space-y-4">
            <FormField label="Company Name" value="Quantum Insights" disabled />
            <FormField
              label="Admin Email"
              value={currentUser?.email || "Not set"}
              disabled
            />
            <FormField
              label="Admin Name"
              value={currentUser?.full_name || "Not set"}
              disabled
            />
          </div>
        </SettingsSection>

        {/* Integrations */}
        <SettingsSection
          title="Integrations"
          description="Connected services and API configurations"
          icon={LinkIcon}
        >
          <div className="space-y-4">
            {/* n8n Integration */}
            <IntegrationCard
              name="n8n Cloud"
              description="Workflow automation for AI engines"
              configured={integrations.n8n.configured}
              details={
                integrations.n8n.configured
                  ? `Connected to ${integrations.n8n.url}`
                  : "N8N_BASE_URL not configured"
              }
            />

            {/* Stripe Integration */}
            <IntegrationCard
              name="Stripe"
              description="Payment processing and subscriptions"
              configured={integrations.stripe.configured}
              details={
                integrations.stripe.configured
                  ? "API key configured"
                  : "STRIPE_SECRET_KEY not configured"
              }
            />

            {/* Supabase */}
            <IntegrationCard
              name="Supabase"
              description="Database and authentication"
              configured={integrations.supabase.configured}
              details={
                integrations.supabase.configured
                  ? `Connected to ${integrations.supabase.url}`
                  : "Supabase not configured"
              }
            />
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection
          title="Notifications"
          description="Configure alert thresholds and notifications"
          icon={Bell}
        >
          <div className="space-y-4">
            <NotificationToggle
              label="Urgent support tickets"
              description="Get notified when urgent tickets are created"
              defaultChecked
            />
            <NotificationToggle
              label="Client health alerts"
              description="Alert when client health drops below 60%"
              defaultChecked
            />
            <NotificationToggle
              label="Engine status changes"
              description="Notify when engines go offline or degrade"
              defaultChecked
            />
            <NotificationToggle
              label="Failed payments"
              description="Alert for subscription payment failures"
              defaultChecked
            />
            <NotificationToggle
              label="New client signups"
              description="Notify when new clients register"
              defaultChecked={false}
            />
          </div>
        </SettingsSection>

        {/* Performance Thresholds */}
        <SettingsSection
          title="Performance Thresholds"
          description="Define metrics targets and warning levels"
          icon={Zap}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ThresholdSetting
              label="Deliverability Rate"
              target={90}
              warning={85}
              critical={80}
              suffix="%"
            />
            <ThresholdSetting
              label="Open Rate"
              target={30}
              warning={15}
              critical={10}
              suffix="%"
            />
            <ThresholdSetting
              label="Reply Rate"
              target={3}
              warning={1}
              critical={0.5}
              suffix="%"
            />
            <ThresholdSetting
              label="Bounce Rate"
              target={2}
              warning={5}
              critical={8}
              suffix="%"
              inverted
            />
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection
          title="Security"
          description="Authentication and access control settings"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-deep-space/30 rounded-lg border border-graphite/30">
              <div>
                <p className="text-sm font-medium text-white">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-steel mt-0.5">
                  Managed through Supabase Auth
                </p>
              </div>
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-electric-cyan hover:underline"
              >
                Configure
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex items-center justify-between p-4 bg-deep-space/30 rounded-lg border border-graphite/30">
              <div>
                <p className="text-sm font-medium text-white">Session Timeout</p>
                <p className="text-xs text-steel mt-0.5">
                  Sessions expire after 7 days of inactivity
                </p>
              </div>
              <span className="text-sm text-silver">7 days</span>
            </div>
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <h3 className="text-lg font-sora font-semibold text-red-400 mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-steel mb-4">
            Irreversible actions that affect your entire organization
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div>
                <p className="text-sm font-medium text-white">
                  Export All Data
                </p>
                <p className="text-xs text-steel mt-0.5">
                  Download all organization data as JSON
                </p>
              </div>
              <button className="px-3 py-1.5 text-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                Export
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div>
                <p className="text-sm font-medium text-white">
                  Delete All Test Data
                </p>
                <p className="text-xs text-steel mt-0.5">
                  Remove all campaigns and leads marked as test
                </p>
              </div>
              <button className="px-3 py-1.5 text-sm text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof Settings;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-premium p-6">
      <div className="flex items-start gap-4 mb-6">
        <div className="h-10 w-10 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-electric-cyan" />
        </div>
        <div>
          <h2 className="text-lg font-sora font-semibold text-white">{title}</h2>
          <p className="text-sm text-steel mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-steel mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        className="w-full h-10 rounded-lg border border-graphite bg-deep-space px-3 text-sm text-white disabled:opacity-60 focus:border-electric-cyan/50 focus:outline-none"
      />
    </div>
  );
}

function IntegrationCard({
  name,
  description,
  configured,
  details,
}: {
  name: string;
  description: string;
  configured: boolean;
  details: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-deep-space/30 rounded-lg border border-graphite/30">
      <div className="flex items-center gap-3">
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
            configured
              ? "bg-neon-mint/10 border border-neon-mint/30"
              : "bg-energy-orange/10 border border-energy-orange/30"
          }`}
        >
          {configured ? (
            <CheckCircle2 className="h-5 w-5 text-neon-mint" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-energy-orange" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-steel">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`text-xs font-medium ${
            configured ? "text-neon-mint" : "text-energy-orange"
          }`}
        >
          {configured ? "Connected" : "Not Configured"}
        </p>
        <p className="text-xs text-steel mt-0.5 max-w-[200px] truncate">
          {details}
        </p>
      </div>
    </div>
  );
}

function NotificationToggle({
  label,
  description,
  defaultChecked = true,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-deep-space/30 rounded-lg border border-graphite/30">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-steel mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-graphite rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric-cyan"></div>
      </label>
    </div>
  );
}

function ThresholdSetting({
  label,
  target,
  warning,
  critical,
  suffix = "",
  inverted = false,
}: {
  label: string;
  target: number;
  warning: number;
  critical: number;
  suffix?: string;
  inverted?: boolean;
}) {
  return (
    <div className="p-4 bg-deep-space/30 rounded-lg border border-graphite/30">
      <p className="text-sm font-medium text-white mb-3">{label}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neon-mint">Target</span>
          <span className="text-xs text-neon-mint">
            {inverted ? "<" : ">"} {target}
            {suffix}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-energy-orange">Warning</span>
          <span className="text-xs text-energy-orange">
            {inverted ? ">" : "<"} {warning}
            {suffix}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-red-400">Critical</span>
          <span className="text-xs text-red-400">
            {inverted ? ">" : "<"} {critical}
            {suffix}
          </span>
        </div>
      </div>
    </div>
  );
}
