"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  User,
  Building,
  Bell,
  Shield,
  Key,
  Mail,
  Globe,
  Save,
  Eye,
  EyeOff,
  Link2,
  Check,
  X,
  RefreshCw,
  ExternalLink,
  Calendar,
  MessageSquare,
  Database,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
  { id: "integrations", label: "Integrations", icon: Link2 },
];

interface Integration {
  id: string;
  name: string;
  description: string;
  category: "crm" | "email" | "calendar" | "communication" | "automation";
  icon: string;
  connected: boolean;
  lastSync?: string;
  status?: "active" | "error" | "syncing";
}

const integrations: Integration[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync leads and contacts with HubSpot CRM",
    category: "crm",
    icon: "🟠",
    connected: true,
    lastSync: "2 hours ago",
    status: "active",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "Connect your Salesforce CRM for lead management",
    category: "crm",
    icon: "☁️",
    connected: false,
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Sync deals and contacts with Pipedrive",
    category: "crm",
    icon: "🟢",
    connected: false,
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Connect Gmail for email sending and tracking",
    category: "email",
    icon: "📧",
    connected: true,
    lastSync: "30 minutes ago",
    status: "active",
  },
  {
    id: "outlook",
    name: "Microsoft Outlook",
    description: "Connect Outlook for email integration",
    category: "email",
    icon: "📨",
    connected: false,
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Use SendGrid for high-volume email delivery",
    category: "email",
    icon: "📬",
    connected: true,
    lastSync: "1 hour ago",
    status: "active",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync appointments with Google Calendar",
    category: "calendar",
    icon: "📅",
    connected: true,
    lastSync: "15 minutes ago",
    status: "active",
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Connect Calendly for appointment scheduling",
    category: "calendar",
    icon: "🗓️",
    connected: true,
    lastSync: "1 hour ago",
    status: "active",
  },
  {
    id: "outlook-calendar",
    name: "Outlook Calendar",
    description: "Sync with Microsoft Outlook Calendar",
    category: "calendar",
    icon: "📆",
    connected: false,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications and alerts in Slack",
    category: "communication",
    icon: "💬",
    connected: true,
    lastSync: "5 minutes ago",
    status: "active",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Receive notifications in Microsoft Teams",
    category: "communication",
    icon: "👥",
    connected: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect to 5,000+ apps via Zapier",
    category: "automation",
    icon: "⚡",
    connected: true,
    lastSync: "3 hours ago",
    status: "active",
  },
  {
    id: "make",
    name: "Make (Integromat)",
    description: "Build advanced automations with Make",
    category: "automation",
    icon: "🔄",
    connected: false,
  },
];

const categoryLabels = {
  crm: { label: "CRM", icon: Database },
  email: { label: "Email Providers", icon: Mail },
  calendar: { label: "Calendar", icon: Calendar },
  communication: { label: "Communication", icon: MessageSquare },
  automation: { label: "Automation", icon: Zap },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showApiKey, setShowApiKey] = useState(false);

  const [profile, setProfile] = useState({
    name: "Marcos Matthews",
    email: "marcos@quantuminsights.io",
    role: "Admin",
    timezone: "America/Los_Angeles",
  });

  const [company, setCompany] = useState({
    name: "XGrowthOS",
    website: "https://quantuminsights.io",
    industry: "B2B SaaS",
    size: "11-50",
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    campaignAlerts: true,
    weeklyReports: true,
    complianceAlerts: true,
    replyNotifications: false,
  });

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
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Settings</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-light-text dark:text-white">Settings</h1>
        <p className="text-light-text-muted dark:text-steel mt-1">Manage your account and preferences</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <div className="w-64 shrink-0">
            <div className="glass-premium p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === tab.id
                      ? "bg-emerald-pro-600/10 text-emerald-pro-600 border border-emerald-pro-600/20"
                      : "text-light-text-muted dark:text-steel hover:text-light-text dark:hover:text-white hover:bg-light-bg-secondary dark:hover:bg-graphite/50"
                  )}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="glass-premium p-6">
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-6">
                  Profile Settings
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-emerald-pro-500/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-pro-500">MM</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-light-text-muted dark:text-steel mt-2">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={profile.role}
                        disabled
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space/50 px-4 text-light-text-muted dark:text-steel cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Timezone
                      </label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      >
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-border-default dark:border-graphite">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="glass-premium p-6">
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-6">
                  Company Settings
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company.name}
                        onChange={(e) => setCompany({ ...company, name: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={company.website}
                        onChange={(e) => setCompany({ ...company, website: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Industry
                      </label>
                      <select
                        value={company.industry}
                        onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      >
                        <option value="B2B SaaS">B2B SaaS</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="E-commerce">E-commerce</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                        Company Size
                      </label>
                      <select
                        value={company.size}
                        onChange={(e) => setCompany({ ...company, size: e.target.value })}
                        className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-border-default dark:border-graphite">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="glass-premium p-6">
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-6">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {[
                    { key: "emailDigest", label: "Daily Email Digest", description: "Receive a daily summary of your campaign performance" },
                    { key: "campaignAlerts", label: "Campaign Alerts", description: "Get notified when campaigns reach milestones or need attention" },
                    { key: "weeklyReports", label: "Weekly Reports", description: "Receive automated weekly performance reports" },
                    { key: "complianceAlerts", label: "Compliance Alerts", description: "Get notified about domain health and compliance issues" },
                    { key: "replyNotifications", label: "Reply Notifications", description: "Get notified for each new reply (can be noisy)" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space/50"
                    >
                      <div>
                        <p className="font-medium text-light-text dark:text-white">{item.label}</p>
                        <p className="text-sm text-light-text-muted dark:text-steel">{item.description}</p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({
                            ...notifications,
                            [item.key]: !notifications[item.key as keyof typeof notifications],
                          })
                        }
                        className={cn(
                          "relative h-6 w-11 rounded-full transition-colors",
                          notifications[item.key as keyof typeof notifications]
                            ? "bg-emerald-pro-600"
                            : "bg-graphite"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                            notifications[item.key as keyof typeof notifications]
                              ? "translate-x-5"
                              : "translate-x-0.5"
                          )}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="glass-premium p-6">
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-6">
                  Security Settings
                </h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space/50">
                    <h4 className="font-medium text-light-text dark:text-white mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white placeholder:text-light-text-muted dark:text-steel focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white placeholder:text-light-text-muted dark:text-steel focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 text-light-text dark:text-white placeholder:text-light-text-muted dark:text-steel focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50"
                        />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space/50">
                    <h4 className="font-medium text-light-text dark:text-white mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-light-text-muted dark:text-steel mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="glass-premium p-6">
                <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white mb-6">
                  API Keys
                </h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-light-text dark:text-white">Production API Key</h4>
                        <p className="text-sm text-light-text-muted dark:text-steel">Use this key for production integrations</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-emerald-pro-400/20 text-emerald-pro-400 text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space px-4 flex items-center">
                        <code className="text-sm text-light-text-muted dark:text-steel font-mono">
                          {showApiKey ? "qi_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6" : "qi_prod_••••••••••••••••••••••••••••••••"}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-energy-orange/30 bg-energy-orange/10">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-energy-orange shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-light-text dark:text-white">Keep your API key secure</h4>
                        <p className="text-sm text-light-text-muted dark:text-steel mt-1">
                          Never share your API key in public repositories or client-side code.
                          Regenerate immediately if compromised.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="gap-2">
                    <Key className="h-4 w-4" />
                    Regenerate API Key
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "integrations" && (
              <div className="space-y-6">
                {/* Integration Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-premium p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-pro-400/20 flex items-center justify-center">
                        <Check className="h-5 w-5 text-emerald-pro-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-light-text dark:text-white">
                          {integrations.filter((i) => i.connected).length}
                        </p>
                        <p className="text-sm text-light-text-muted dark:text-steel">Connected</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-premium p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-steel/20 flex items-center justify-center">
                        <Link2 className="h-5 w-5 text-light-text-muted dark:text-steel" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-light-text dark:text-white">
                          {integrations.filter((i) => !i.connected).length}
                        </p>
                        <p className="text-sm text-light-text-muted dark:text-steel">Available</p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-premium p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-pro-600/20 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-emerald-pro-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-light-text dark:text-white">5 min</p>
                        <p className="text-sm text-light-text-muted dark:text-steel">Last Sync</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Integrations by Category */}
                {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map(
                  (category) => {
                    const categoryIntegrations = integrations.filter(
                      (i) => i.category === category
                    );
                    const CategoryIcon = categoryLabels[category].icon;

                    return (
                      <div
                        key={category}
                        className="glass-premium p-6"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <CategoryIcon className="h-5 w-5 text-emerald-pro-600" />
                          <h3 className="text-lg font-sora font-semibold text-light-text dark:text-white">
                            {categoryLabels[category].label}
                          </h3>
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-white dark:bg-deep-space text-xs text-light-text-muted dark:text-steel">
                            {categoryIntegrations.filter((i) => i.connected).length}/
                            {categoryIntegrations.length} connected
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {categoryIntegrations.map((integration) => (
                            <div
                              key={integration.id}
                              className={cn(
                                "flex items-center justify-between p-4 rounded-lg border transition-colors",
                                integration.connected
                                  ? "border-emerald-pro-400/30 bg-emerald-pro-400/5"
                                  : "border-border-default dark:border-graphite bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/30"
                              )}
                            >
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-light-bg-secondary dark:bg-midnight-blue flex items-center justify-center text-2xl">
                                  {integration.icon}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-light-text dark:text-white">
                                      {integration.name}
                                    </h4>
                                    {integration.connected && (
                                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-pro-400/20 text-emerald-pro-400 text-xs">
                                        <Check className="h-3 w-3" />
                                        Connected
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-light-text-muted dark:text-steel">
                                    {integration.description}
                                  </p>
                                  {integration.lastSync && (
                                    <p className="text-xs text-light-text-muted dark:text-steel mt-1">
                                      Last synced: {integration.lastSync}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                {integration.connected ? (
                                  <>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1"
                                    >
                                      <RefreshCw className="h-3 w-3" />
                                      Sync
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-1"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                      Configure
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="text-rose hover:text-rose hover:border-rose/50"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <Button size="sm" className="gap-1">
                                    <Link2 className="h-3 w-3" />
                                    Connect
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}

                {/* Request Integration */}
                <div className="rounded-xl border border-dashed border-border-default dark:border-graphite bg-white dark:bg-deep-space/30 p-6">
                  <div className="text-center">
                    <div className="h-12 w-12 rounded-lg bg-emerald-pro-500/20 flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-6 w-6 text-emerald-pro-500" />
                    </div>
                    <h4 className="font-medium text-light-text dark:text-white mb-1">
                      Need a different integration?
                    </h4>
                    <p className="text-sm text-light-text-muted dark:text-steel mb-4">
                      We're always adding new integrations. Let us know what you need.
                    </p>
                    <Button variant="outline">Request Integration</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
