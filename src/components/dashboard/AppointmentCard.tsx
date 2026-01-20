"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  User,
  Building2,
  Video,
  Phone,
  MapPin,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  title: string;
  type: "video" | "phone" | "in-person";
  date: string;
  time: string;
  duration: number;
  lead: {
    id: string;
    name: string;
    company: string;
  };
  status: "upcoming" | "completed" | "cancelled" | "no-show";
  meetingLink?: string;
  location?: string;
  notes?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  variant?: "default" | "compact" | "list";
  showActions?: boolean;
  className?: string;
}

const typeConfig = {
  video: {
    icon: Video,
    label: "Video Call",
    color: "text-electric-cyan",
    bg: "bg-electric-cyan/10",
  },
  phone: {
    icon: Phone,
    label: "Phone Call",
    color: "text-quantum-violet",
    bg: "bg-quantum-violet/10",
  },
  "in-person": {
    icon: MapPin,
    label: "In Person",
    color: "text-neon-mint",
    bg: "bg-neon-mint/10",
  },
};

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    className: "bg-electric-cyan/20 text-electric-cyan border-electric-cyan/30",
  },
  completed: {
    label: "Completed",
    className: "bg-neon-mint/20 text-neon-mint border-neon-mint/30",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-steel/20 text-steel border-steel/30",
  },
  "no-show": {
    label: "No Show",
    className: "bg-rose/20 text-rose border-rose/30",
  },
};

export function AppointmentCard({
  appointment,
  variant = "default",
  showActions = true,
  className,
}: AppointmentCardProps) {
  const type = typeConfig[appointment.type];
  const status = statusConfig[appointment.status];
  const TypeIcon = type.icon;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border border-graphite bg-deep-space/50 hover:border-electric-cyan/30 transition-all",
          className
        )}
      >
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
            type.bg
          )}
        >
          <TypeIcon className={cn("h-5 w-5", type.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white text-sm truncate">
            {appointment.title}
          </p>
          <p className="text-xs text-steel truncate">
            {appointment.lead.name} • {appointment.time}
          </p>
        </div>
        <span
          className={cn(
            "px-2 py-0.5 rounded text-[10px] font-medium border shrink-0",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl border border-graphite bg-midnight-blue/60 hover:border-electric-cyan/30 transition-all",
          className
        )}
      >
        <div className="text-center px-3 py-2 rounded-lg bg-deep-space border border-graphite min-w-[70px]">
          <p className="text-2xl font-bold text-white">
            {new Date(appointment.date).getDate()}
          </p>
          <p className="text-xs text-steel uppercase">
            {new Date(appointment.date).toLocaleDateString("en-US", {
              month: "short",
            })}
          </p>
        </div>

        <div
          className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center shrink-0",
            type.bg
          )}
        >
          <TypeIcon className={cn("h-6 w-6", type.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white">{appointment.title}</p>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1.5 text-sm text-steel">
              <Clock className="h-3.5 w-3.5" />
              {appointment.time} ({appointment.duration} min)
            </div>
            <div className="flex items-center gap-1.5 text-sm text-steel">
              <User className="h-3.5 w-3.5" />
              {appointment.lead.name}
            </div>
          </div>
        </div>

        <span
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-medium border",
            status.className
          )}
        >
          {status.label}
        </span>

        {showActions && appointment.status === "upcoming" && (
          <div className="flex items-center gap-2">
            {appointment.meetingLink && (
              <Button size="sm" className="gap-1.5">
                <Video className="h-3.5 w-3.5" />
                Join
              </Button>
            )}
            <button className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-graphite bg-midnight-blue/60 p-5 hover:border-electric-cyan/30 transition-all",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-12 w-12 rounded-lg flex items-center justify-center",
              type.bg
            )}
          >
            <TypeIcon className={cn("h-6 w-6", type.color)} />
          </div>
          <div>
            <h4 className="font-semibold text-white">{appointment.title}</h4>
            <p className="text-sm text-steel">{type.label}</p>
          </div>
        </div>
        {showActions && (
          <button className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-steel" />
          <span className="text-silver">
            {new Date(appointment.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-steel" />
          <span className="text-silver">
            {appointment.time} ({appointment.duration} minutes)
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-steel" />
          <Link
            href={`/dashboard/leads/${appointment.lead.id}`}
            className="text-silver hover:text-electric-cyan transition-colors"
          >
            {appointment.lead.name}
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-steel" />
          <span className="text-silver">{appointment.lead.company}</span>
        </div>
        {appointment.location && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-steel" />
            <span className="text-silver">{appointment.location}</span>
          </div>
        )}
      </div>

      {appointment.notes && (
        <p className="text-sm text-steel mb-4 p-3 rounded-lg bg-deep-space/50 border border-graphite">
          {appointment.notes}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-graphite">
        <span
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-medium border",
            status.className
          )}
        >
          {status.label}
        </span>

        {appointment.status === "upcoming" && (
          <div className="flex items-center gap-2">
            {appointment.meetingLink && (
              <Button size="sm" className="gap-1.5">
                <Video className="h-3.5 w-3.5" />
                Join Meeting
              </Button>
            )}
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
