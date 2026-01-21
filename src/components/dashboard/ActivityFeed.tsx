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

export function ActivityFeed({
  activities,
  title = "Recent Activity",
  maxItems = 5,
  className,
}: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className={cn("rounded-lg border border-border bg-white", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-foreground-muted">{activities.length} activities</p>
        </div>
        <Link
          href="/dashboard/analytics"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-border">
        {displayedActivities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          const content = (
            <div className="flex items-start gap-3 px-6 py-4">
              <Icon className="h-4 w-4 text-foreground-muted mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.title}</p>
                {activity.description && (
                  <p className="text-xs text-foreground-muted mt-0.5 line-clamp-1">
                    {activity.description}
                  </p>
                )}
              </div>
              <span className="text-xs text-foreground-muted whitespace-nowrap">
                {activity.timestamp}
              </span>
            </div>
          );

          if (activity.link) {
            return (
              <Link key={activity.id} href={activity.link} className="block hover:bg-muted/50">
                {content}
              </Link>
            );
          }

          return <div key={activity.id}>{content}</div>;
        })}
      </div>

      {activities.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Activity className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
          <p className="text-sm text-foreground-muted">No recent activity</p>
        </div>
      )}
    </div>
  );
}
