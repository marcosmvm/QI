"use client";

import { useState } from "react";
import { Header } from "@/components/navigation/Header";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
];

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
    name: "Quantum Insights",
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
    <div className="min-h-screen">
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <div className="p-6">
        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <div className="w-64 shrink-0">
            <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === tab.id
                      ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                      : "text-steel hover:text-white hover:bg-deep-space/50"
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
              <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
                <h3 className="text-lg font-sora font-semibold text-white mb-6">
                  Profile Settings
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-quantum-violet/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-quantum-violet">MM</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-steel mt-2">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={profile.role}
                        disabled
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space/50 px-4 text-steel cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Timezone
                      </label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      >
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-graphite">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "company" && (
              <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
                <h3 className="text-lg font-sora font-semibold text-white mb-6">
                  Company Settings
                </h3>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company.name}
                        onChange={(e) => setCompany({ ...company, name: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={company.website}
                        onChange={(e) => setCompany({ ...company, website: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Industry
                      </label>
                      <select
                        value={company.industry}
                        onChange={(e) => setCompany({ ...company, industry: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      >
                        <option value="B2B SaaS">B2B SaaS</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="E-commerce">E-commerce</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver mb-2">
                        Company Size
                      </label>
                      <select
                        value={company.size}
                        onChange={(e) => setCompany({ ...company, size: e.target.value })}
                        className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-graphite">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
                <h3 className="text-lg font-sora font-semibold text-white mb-6">
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
                      className="flex items-center justify-between p-4 rounded-lg border border-graphite bg-deep-space/50"
                    >
                      <div>
                        <p className="font-medium text-white">{item.label}</p>
                        <p className="text-sm text-steel">{item.description}</p>
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
                            ? "bg-electric-cyan"
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
              <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
                <h3 className="text-lg font-sora font-semibold text-white mb-6">
                  Security Settings
                </h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
                    <h4 className="font-medium text-white mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-silver mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-silver mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-silver mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
                        />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
                    <h4 className="font-medium text-white mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-steel mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="rounded-xl border border-graphite bg-midnight-blue/60 p-6">
                <h3 className="text-lg font-sora font-semibold text-white mb-6">
                  API Keys
                </h3>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg border border-graphite bg-deep-space/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-white">Production API Key</h4>
                        <p className="text-sm text-steel">Use this key for production integrations</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-neon-mint/20 text-neon-mint text-xs font-medium">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-11 rounded-lg border border-graphite bg-deep-space px-4 flex items-center">
                        <code className="text-sm text-steel font-mono">
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
                        <h4 className="font-medium text-white">Keep your API key secure</h4>
                        <p className="text-sm text-steel mt-1">
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
          </div>
        </div>
      </div>
    </div>
  );
}
