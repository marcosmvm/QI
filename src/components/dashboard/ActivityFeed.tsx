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
  Clock,
  Activity,
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
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
  className?: string;
}

const activityConfig: Record<ActivityType, { icon: typeof Mail }> = {
  email_sent: { icon: Mail },
  email_opened: { icon: MailOpen },
  email_replied: { icon: Reply },
  lead_created: { icon: UserPlus },
  appointment_scheduled: { icon: Calendar },
  appointment_completed: { icon: CheckCircle2 },
  campaign_started: { icon: Activity },
  campaign_paused: { icon: Clock },
  compliance_alert: { icon: AlertTriangle },
  milestone_reached: { icon: CheckCircle2 },
};

// Brand Board v1.0 - Standard Card Pattern
export function ActivityFeed({
  activities,
  title = "Recent Activity",
  maxItems = 5,
  className,
}: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className={cn("bg-light-bg-secondary dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-xl", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-default dark:border-graphite">
        <div>
          <h3 className="text-2xl font-semibold text-light-text dark:text-white">{title}</h3>
          <p className="text-sm text-light-text-muted dark:text-steel">{activities.length} activities</p>
        </div>
        <Link
          href="/dashboard/analytics"
          className="text-sm text-emerald-pro-600 hover:text-emerald-pro-600/80 transition-colors"
        >
          View all
        </Link>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-graphite/50">
        {displayedActivities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          const content = (
            <div className="flex items-start gap-3 px-6 py-4">
              <Icon className="h-4 w-4 text-light-text-muted dark:text-steel mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-light-text dark:text-white">{activity.title}</p>
                {activity.description && (
                  <p className="text-xs text-light-text-muted dark:text-steel mt-0.5 line-clamp-1">
                    {activity.description}
                  </p>
                )}
              </div>
              <span className="text-xs text-light-text-muted dark:text-steel whitespace-nowrap">
                {activity.timestamp}
              </span>
            </div>
          );

          if (activity.link) {
            return (
              <Link key={activity.id} href={activity.link} className="block hover:bg-light-bg-secondary dark:hover:bg-graphite/30 transition-colors">
                {content}
              </Link>
            );
          }

          return <div key={activity.id}>{content}</div>;
        })}
      </div>

      {activities.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Activity className="h-8 w-8 text-light-text-muted dark:text-steel mx-auto mb-2" />
          <p className="text-sm text-light-text-muted dark:text-steel">No recent activity</p>
        </div>
      )}
    </div>
  );
}
