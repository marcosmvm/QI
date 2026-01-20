"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Mail,
  MailOpen,
  Reply,
  UserPlus,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  ArrowRight,
} from "lucide-react";

type ActivityType =
  | "email_sent"
  | "email_opened"
  | "email_replied"
  | "lead_created"
  | "appointment_scheduled"
  | "appointment_completed"
  | "campaign_started"
  | "campaign_paused"
  | "compliance_alert"
  | "milestone_reached";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string;
  link?: string;
  metadata?: {
    campaignName?: string;
    leadName?: string;
    count?: number;
  };
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  showViewAll?: boolean;
  maxItems?: number;
  className?: string;
}

const activityConfig: Record<
  ActivityType,
  { icon: typeof Mail; color: string; bg: string }
> = {
  email_sent: {
    icon: Mail,
    color: "text-electric-cyan",
    bg: "bg-electric-cyan/10",
  },
  email_opened: {
    icon: MailOpen,
    color: "text-quantum-violet",
    bg: "bg-quantum-violet/10",
  },
  email_replied: {
    icon: Reply,
    color: "text-neon-mint",
    bg: "bg-neon-mint/10",
  },
  lead_created: {
    icon: UserPlus,
    color: "text-electric-cyan",
    bg: "bg-electric-cyan/10",
  },
  appointment_scheduled: {
    icon: Calendar,
    color: "text-quantum-violet",
    bg: "bg-quantum-violet/10",
  },
  appointment_completed: {
    icon: CheckCircle2,
    color: "text-neon-mint",
    bg: "bg-neon-mint/10",
  },
  campaign_started: {
    icon: Activity,
    color: "text-neon-mint",
    bg: "bg-neon-mint/10",
  },
  campaign_paused: {
    icon: Clock,
    color: "text-energy-orange",
    bg: "bg-energy-orange/10",
  },
  compliance_alert: {
    icon: AlertTriangle,
    color: "text-energy-orange",
    bg: "bg-energy-orange/10",
  },
  milestone_reached: {
    icon: CheckCircle2,
    color: "text-neon-mint",
    bg: "bg-neon-mint/10",
  },
};

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  showViewAll = true,
  maxItems = 5,
  className,
}: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-slate-200 bg-white overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
            <Activity className="h-5 w-5 text-electric-cyan" />
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-slate-900">
              {title}
            </h3>
            <p className="text-xs text-slate-500">
              {activities.length} activities today
            </p>
          </div>
        </div>
        {showViewAll && (
          <Link
            href="/dashboard/analytics"
            className="text-sm text-electric-cyan hover:text-cyan-dark transition-colors font-medium flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Activity List */}
      <div className="divide-y divide-slate-100">
        {displayedActivities.map((activity, index) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          const content = (
            <div
              className={cn(
                "flex items-start gap-4 px-6 py-4 transition-colors",
                activity.link && "hover:bg-slate-50 cursor-pointer"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  config.bg
                )}
              >
                <Icon className={cn("h-5 w-5", config.color)} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900">{activity.title}</p>
                {activity.description && (
                  <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                    {activity.description}
                  </p>
                )}
                {activity.metadata && (
                  <div className="flex items-center gap-2 mt-1.5">
                    {activity.metadata.campaignName && (
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-electric-cyan border border-slate-200">
                        {activity.metadata.campaignName}
                      </span>
                    )}
                    {activity.metadata.leadName && (
                      <span className="text-xs text-slate-500">
                        {activity.metadata.leadName}
                      </span>
                    )}
                    {activity.metadata.count !== undefined && (
                      <span className="text-xs font-medium text-slate-600">
                        +{activity.metadata.count}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <span className="text-xs text-slate-500 whitespace-nowrap">
                {activity.timestamp}
              </span>
            </div>
          );

          if (activity.link) {
            return (
              <Link key={activity.id} href={activity.link}>
                {content}
              </Link>
            );
          }

          return <div key={activity.id}>{content}</div>;
        })}
      </div>

      {activities.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Activity className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">No recent activity</p>
        </div>
      )}
    </div>
  );
}
