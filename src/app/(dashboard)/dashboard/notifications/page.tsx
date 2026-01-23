import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Mail,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  CreditCard,
  Users,
  Shield,
  MessageSquare,
  Filter,
  Check,
  Trash2,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface MembershipWithOrg {
  organization_id: string;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  action_url: string | null;
  metadata: Record<string, unknown> | null;
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
    .select("organization_id")
    .eq("user_id", user.id)
    .single();

  const typedMembership = membership as MembershipWithOrg | null;

  return {
    user,
    organizationId: typedMembership?.organization_id,
  };
}

async function getNotifications(organizationId: string): Promise<Notification[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false })
    .limit(50);

  return (data || []) as Notification[];
}

// Mock notifications for demo
function getMockNotifications(): Notification[] {
  const now = new Date();
  return [
    {
      id: "1",
      type: "lead",
      title: "New Qualified Lead",
      message: "John Smith from TechCorp replied with interest in your services.",
      is_read: false,
      created_at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(), // 30 min ago
      action_url: "/dashboard/leads/123",
      metadata: { lead_id: "123", lead_name: "John Smith" },
    },
    {
      id: "2",
      type: "campaign",
      title: "Campaign Paused",
      message: "Q1 Enterprise Outreach was paused due to deliverability issues.",
      is_read: false,
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      action_url: "/dashboard/campaigns/456",
      metadata: { campaign_id: "456" },
    },
    {
      id: "3",
      type: "compliance",
      title: "Domain Health Warning",
      message: "Your domain health score dropped to 75%. Review your sending practices.",
      is_read: false,
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      action_url: "/dashboard/compliance",
      metadata: { score: 75 },
    },
    {
      id: "4",
      type: "billing",
      title: "Invoice Generated",
      message: "Your January 2026 invoice for $2,497 is ready for download.",
      is_read: true,
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      action_url: "/dashboard/billing",
      metadata: { amount: 2497 },
    },
    {
      id: "5",
      type: "lead",
      title: "Meeting Scheduled",
      message: "Sarah Chen from DataFlow scheduled a demo for tomorrow at 2pm.",
      is_read: true,
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      action_url: "/dashboard/leads/789",
      metadata: { lead_id: "789" },
    },
    {
      id: "6",
      type: "campaign",
      title: "Campaign Completed",
      message: "Healthcare Decision Makers campaign has finished sending all sequences.",
      is_read: true,
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      action_url: "/dashboard/campaigns/101",
      metadata: { campaign_id: "101" },
    },
    {
      id: "7",
      type: "report",
      title: "Weekly Report Ready",
      message: "Your weekly performance report for Jan 13-19 is available.",
      is_read: true,
      created_at: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      action_url: "/dashboard/reports",
      metadata: null,
    },
  ];
}

const notificationTypeConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  lead: {
    icon: Users,
    color: "neon-mint",
    label: "Leads",
  },
  campaign: {
    icon: Mail,
    color: "electric-cyan",
    label: "Campaigns",
  },
  compliance: {
    icon: Shield,
    color: "energy-orange",
    label: "Compliance",
  },
  billing: {
    icon: CreditCard,
    color: "quantum-violet",
    label: "Billing",
  },
  report: {
    icon: TrendingUp,
    color: "electric-cyan",
    label: "Reports",
  },
  support: {
    icon: MessageSquare,
    color: "quantum-violet",
    label: "Support",
  },
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export default async function NotificationsPage() {
  const { organizationId } = await getUserOrganization();

  if (!organizationId) {
    redirect("/dashboard");
  }

  // Get notifications from database, fall back to mock data if empty
  let notifications = await getNotifications(organizationId);
  if (notifications.length === 0) {
    notifications = getMockNotifications();
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const groupedByDate = groupNotificationsByDate(notifications);

  return (
    <div className="min-h-screen p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-steel mb-2">
          <Link
            href="/dashboard"
            className="hover:text-electric-cyan transition-colors"
          >
            Portal
          </Link>
          <span>/</span>
          <span className="text-electric-cyan">Notifications</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-sora font-bold text-white">
              Notifications
            </h1>
            <p className="text-steel mt-1">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                : "You're all caught up!"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-graphite text-steel rounded-lg hover:bg-midnight-blue/30 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            {unreadCount > 0 && (
              <button className="flex items-center gap-2 px-4 py-2 border border-electric-cyan/30 text-electric-cyan rounded-lg hover:bg-electric-cyan/10 transition-colors">
                <Check className="h-4 w-4" />
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(notificationTypeConfig).slice(0, 4).map(([type, config]) => {
          const count = notifications.filter((n) => n.type === type).length;
          const Icon = config.icon;
          return (
            <div
              key={type}
              className="glass-premium p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-lg bg-${config.color}/10 border border-${config.color}/30 flex items-center justify-center`}
                  style={{
                    backgroundColor: `var(--${config.color}, rgba(255,255,255,0.1))`,
                  }}
                >
                  <Icon
                    className={`h-4 w-4`}
                    style={{ color: `var(--${config.color}, #fff)` }}
                  />
                </div>
                <div>
                  <p className="text-lg font-sora font-bold text-white">{count}</p>
                  <p className="text-xs text-steel">{config.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="glass-premium p-12 text-center">
          <Bell className="h-12 w-12 text-steel mx-auto mb-4" />
          <p className="text-steel">No notifications yet</p>
          <p className="text-sm text-steel/70 mt-1">
            We&apos;ll notify you when something important happens
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedByDate).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-sm font-medium text-steel mb-3">{date}</h3>
              <div className="space-y-3">
                {items.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotificationCard({ notification }: { notification: Notification }) {
  const config = notificationTypeConfig[notification.type] || {
    icon: Bell,
    color: "steel",
    label: "Notification",
  };
  const Icon = config.icon;

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    "neon-mint": {
      bg: "bg-neon-mint/10",
      border: "border-neon-mint/30",
      text: "text-neon-mint",
    },
    "electric-cyan": {
      bg: "bg-electric-cyan/10",
      border: "border-electric-cyan/30",
      text: "text-electric-cyan",
    },
    "energy-orange": {
      bg: "bg-energy-orange/10",
      border: "border-energy-orange/30",
      text: "text-energy-orange",
    },
    "quantum-violet": {
      bg: "bg-quantum-violet/10",
      border: "border-quantum-violet/30",
      text: "text-quantum-violet",
    },
    steel: {
      bg: "bg-steel/10",
      border: "border-steel/30",
      text: "text-steel",
    },
  };

  const colors = colorClasses[config.color] || colorClasses.steel;

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-card-hover ${
        notification.is_read
          ? "bg-midnight-blue/30 border-graphite/30"
          : "bg-midnight-blue/40 border-electric-cyan/20"
      }`}
      style={{ transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div
        className={`h-10 w-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}
      >
        <Icon className={`h-5 w-5 ${colors.text}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-white">
                {notification.title}
              </h4>
              {!notification.is_read && (
                <span className="h-2 w-2 rounded-full bg-electric-cyan" />
              )}
            </div>
            <p className="text-sm text-steel mt-1">{notification.message}</p>
          </div>
          <span className="text-xs text-steel whitespace-nowrap">
            {formatTimeAgo(notification.created_at)}
          </span>
        </div>

        {notification.action_url && (
          <div className="mt-3 flex items-center gap-3">
            <Link
              href={notification.action_url}
              className="text-sm text-electric-cyan hover:underline"
            >
              View details
            </Link>
            <button className="text-sm text-steel hover:text-white">
              <Check className="h-4 w-4" />
            </button>
            <button className="text-sm text-steel hover:text-energy-orange">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function groupNotificationsByDate(
  notifications: Notification[]
): Record<string, Notification[]> {
  const groups: Record<string, Notification[]> = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  for (const notification of notifications) {
    const date = new Date(notification.created_at);
    date.setHours(0, 0, 0, 0);

    let label: string;
    if (date.getTime() === today.getTime()) {
      label = "Today";
    } else if (date.getTime() === yesterday.getTime()) {
      label = "Yesterday";
    } else if (date > lastWeek) {
      label = "This Week";
    } else {
      label = "Earlier";
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(notification);
  }

  return groups;
}
