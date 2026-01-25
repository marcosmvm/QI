"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Calendar, Clock, User, Building2, Video, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

// ============================================
// XGROWTHOS - ENHANCED APPOINTMENT CARD
// Brand Board v2.0 - Light/Dark Theme
// ============================================

interface Appointment {
  id: string
  title: string
  type: "video" | "phone" | "in-person"
  date: string
  time: string
  duration: number
  lead: {
    id: string
    name: string
    company: string
  }
  status: "upcoming" | "completed" | "cancelled" | "no-show"
  meetingLink?: string
  location?: string
  notes?: string
}

interface AppointmentCardProps {
  appointment: Appointment
  className?: string
}

const typeConfig = {
  video: { icon: Video, label: "Video Call" },
  phone: { icon: Phone, label: "Phone Call" },
  "in-person": { icon: MapPin, label: "In Person" },
}

const statusConfig = {
  upcoming: { label: "Upcoming", dot: "bg-emerald-pro-600", text: "text-emerald-pro-600" },
  completed: { label: "Completed", dot: "bg-emerald-pro-400", text: "text-emerald-pro-400" },
  cancelled: { label: "Cancelled", dot: "bg-steel", text: "text-slate-500 dark:text-slate-400" },
  "no-show": { label: "No Show", dot: "bg-alert-red", text: "text-alert-red" },
}

export function AppointmentCard({ appointment, className }: AppointmentCardProps) {
  const type = typeConfig[appointment.type]
  const status = statusConfig[appointment.status]
  const TypeIcon = type.icon

  return (
    <div className={cn("rounded-xl border border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/60 p-4 backdrop-blur-sm transition-all duration-200 hover:border-emerald-pro-600/30", className)}>
      <div className="flex items-start gap-3 mb-3">
        <TypeIcon className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-white">{appointment.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{type.label}</p>
        </div>
      </div>

      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          <span>
            {new Date(appointment.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          <span>{appointment.time} ({appointment.duration} min)</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          <Link
            href={`/dashboard/leads/${appointment.lead.id}`}
            className="hover:text-emerald-pro-600 transition-colors"
          >
            {appointment.lead.name}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
          <span>{appointment.lead.company}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border-default dark:border-graphite/50 flex items-center justify-between">
        <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", status.text)}>
          <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
          {status.label}
        </span>

        {appointment.status === "upcoming" && appointment.meetingLink && (
          <Button size="sm" variant="outline">
            Join
          </Button>
        )}
      </div>
    </div>
  )
}
