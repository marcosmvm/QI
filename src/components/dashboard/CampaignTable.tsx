"use client";

import Link from "next/link";
import { MoreHorizontal, Play, Pause, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Campaign } from "@/types";

interface CampaignTableProps {
  campaigns: Campaign[];
}

const statusConfig = {
  draft: {
    label: "Draft",
    dot: "bg-foreground-muted",
    text: "text-foreground-muted",
  },
  active: {
    label: "Active",
    dot: "bg-success",
    text: "text-success",
  },
  paused: {
    label: "Paused",
    dot: "bg-warning",
    text: "text-warning",
  },
  completed: {
    label: "Completed",
    dot: "bg-primary",
    text: "text-primary",
  },
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="rounded-lg border border-border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-base font-semibold text-foreground">Campaigns</h3>
          <p className="text-xs text-foreground-muted">{campaigns.length} active</p>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Status
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Sent
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Opens
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Replies
              </th>
              <th className="px-6 py-3 text-left text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Delivery
              </th>
              <th className="px-6 py-3 text-right text-2xs font-medium uppercase tracking-wider text-foreground-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status];
              return (
                <tr key={campaign.id} className="group">
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="text-sm font-medium text-foreground hover:text-primary"
                    >
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">
                      {campaign.metrics.sent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.openRate >= 30
                          ? "text-success"
                          : campaign.metrics.openRate >= 15
                          ? "text-warning"
                          : "text-error"
                      )}
                    >
                      {campaign.metrics.openRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.replyRate >= 3
                          ? "text-success"
                          : campaign.metrics.replyRate >= 1
                          ? "text-warning"
                          : "text-error"
                      )}
                    >
                      {campaign.metrics.replyRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        campaign.metrics.deliverabilityRate >= 90
                          ? "text-success"
                          : campaign.metrics.deliverabilityRate >= 85
                          ? "text-warning"
                          : "text-error"
                      )}
                    >
                      {campaign.metrics.deliverabilityRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {campaign.status === "active" ? (
                        <button className="p-1.5 text-foreground-muted hover:text-foreground rounded">
                          <Pause className="h-4 w-4" />
                        </button>
                      ) : campaign.status === "paused" || campaign.status === "draft" ? (
                        <button className="p-1.5 text-foreground-muted hover:text-foreground rounded">
                          <Play className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                        className="p-1.5 text-foreground-muted hover:text-foreground rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="p-1.5 text-foreground-muted hover:text-error rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-foreground-muted hover:text-foreground rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
