"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  User,
  Building2,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Edit3,
  Trash2,
  Filter,
  List,
  LayoutGrid,
  CalendarDays,
  Users,
  Target,
  TrendingUp,
  Link2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricsCard } from "@/components/dashboard";
import { useState } from "react";

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

// Mock appointments data
const appointmentsData = [
  {
    id: "apt-001",
    title: "Discovery Call - Acme Corporation",
    lead: {
      id: "lead-001",
      name: "Sarah Johnson",
      title: "VP of Sales",
      company: "Acme Corporation",
      email: "sarah.johnson@acmecorp.com",
    },
    type: "video",
    status: "confirmed",
    date: "2026-01-20",
    time: "10:00 AM",
    duration: "30 min",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    campaign: "Q1 SaaS Outreach",
    notes: "Focus on enterprise features and pricing",
  },
  {
    id: "apt-002",
    title: "Product Demo - TechStart Inc",
    lead: {
      id: "lead-002",
      name: "Michael Chen",
      title: "CEO",
      company: "TechStart Inc",
      email: "mchen@techstart.io",
    },
    type: "video",
    status: "confirmed",
    date: "2026-01-20",
    time: "2:00 PM",
    duration: "45 min",
    meetingLink: "https://zoom.us/j/123456789",
    campaign: "Q1 SaaS Outreach",
    notes: "Prepare ROI calculator",
  },
  {
    id: "apt-003",
    title: "Follow-up Call - CloudNine Systems",
    lead: {
      id: "lead-006",
      name: "Robert Taylor",
      title: "CTO",
      company: "CloudNine Systems",
      email: "rtaylor@cloudnine.io",
    },
    type: "phone",
    status: "pending",
    date: "2026-01-21",
    time: "11:00 AM",
    duration: "20 min",
    campaign: "Q1 SaaS Outreach",
    notes: "Technical deep dive requested",
  },
  {
    id: "apt-004",
    title: "Initial Consultation - HealthTech Solutions",
    lead: {
      id: "lead-003",
      name: "Emily Williams",
      title: "Director of Operations",
      company: "HealthTech Solutions",
      email: "ewilliams@healthtech.com",
    },
    type: "video",
    status: "confirmed",
    date: "2026-01-22",
    time: "3:30 PM",
    duration: "30 min",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/xxx",
    campaign: "Healthcare Tech DMs",
    notes: "Compliance requirements discussion",
  },
  {
    id: "apt-005",
    title: "Contract Review - Financial Services Group",
    lead: {
      id: "lead-004",
      name: "David Martinez",
      title: "CFO",
      company: "Financial Services Group",
      email: "dmartinez@finservices.com",
    },
    type: "in-person",
    status: "confirmed",
    date: "2026-01-23",
    time: "10:00 AM",
    duration: "60 min",
    location: "123 Wall Street, New York, NY",
    campaign: "FinTech CFO Prospecting",
    notes: "Bring printed proposal",
  },
];

// Calendar generation
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  const days = [];

  // Previous month padding
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate();

  for (let i = startingDay - 1; i >= 0; i--) {
    days.push({
      date: prevMonthDays - i,
      currentMonth: false,
      dateString: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(prevMonthDays - i).padStart(2, "0")}`,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      currentMonth: true,
      dateString: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
    });
  }

  // Next month padding
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    days.push({
      date: i,
      currentMonth: false,
      dateString: `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
    });
  }

  return days;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusColors = {
  confirmed: { bg: "bg-emerald-pro-400/10", text: "text-emerald-pro-400", border: "border-emerald-pro-400/20", dot: "bg-emerald-pro-400" },
  pending: { bg: "bg-energy-orange/10", text: "text-energy-orange", border: "border-energy-orange/20", dot: "bg-energy-orange" },
  cancelled: { bg: "bg-rose/10", text: "text-rose", border: "border-rose/20", dot: "bg-rose" },
  completed: { bg: "bg-emerald-pro-600/10", text: "text-emerald-pro-600", border: "border-emerald-pro-600/20", dot: "bg-emerald-pro-600" },
};

const typeIcons = {
  video: Video,
  phone: Phone,
  "in-person": MapPin,
};

export default function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 20)); // Jan 20, 2026
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-01-20");

  const calendarDays = generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth());

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getAppointmentsForDate = (dateString: string) => {
    return appointmentsData.filter(apt => apt.date === dateString);
  };

  const selectedDateAppointments = selectedDate ? getAppointmentsForDate(selectedDate) : [];

  const todayString = "2026-01-20"; // Mock today

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen p-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-slate-300 mb-2">
          <Link href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</Link>
          <span>/</span>
          <span className="text-emerald-pro-600">Appointments</span>
        </div>
        <h1 className="text-2xl font-sora font-bold text-slate-900 dark:text-white">Appointments</h1>
        <p className="text-slate-900 dark:text-slate-300 mt-1">Meeting scheduling and calendar management</p>
      </motion.div>

      <div className="space-y-6">
        {/* Quick Stats - Using MetricsCard */}
        <div className="grid grid-cols-5 gap-4">
          <MetricsCard
            title="Today's Meetings"
            value={2}
            icon={Calendar}
            accent="cyan"
            delay={0}
          />
          <MetricsCard
            title="This Week"
            value={8}
            icon={CalendarDays}
            accent="violet"
            delay={0.1}
          />
          <MetricsCard
            title="Pending Confirmation"
            value={3}
            icon={AlertCircle}
            accent="orange"
            delay={0.2}
          />
          <MetricsCard
            title="Completed This Month"
            value={24}
            icon={CheckCircle2}
            accent="mint"
            delay={0.3}
          />
          <MetricsCard
            title="Show Rate"
            value={94}
            suffix="%"
            icon={TrendingUp}
            accent="cyan"
            delay={0.4}
          />
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Calendar
            </Button>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-light-bg-secondary dark:bg-midnight-blue/50 border border-emerald-pro-600/10">
              <button
                onClick={() => setViewMode("calendar")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "calendar"
                    ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                    : "text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-all",
                  viewMode === "list"
                    ? "bg-emerald-pro-600/10 text-emerald-pro-600"
                    : "text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-pro-600 to-cyan-dark hover:from-cyan-light hover:to-emerald-pro-600 text-white font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="col-span-2 glass-premium p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-sora font-bold text-slate-900 dark:text-white">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={previousMonth}
                    className="p-2 rounded-lg border border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(2026, 0, 20))}
                    className="px-3 py-2 rounded-lg border border-emerald-pro-600/20 text-sm text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 transition-all"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg border border-emerald-pro-600/20 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Week Days */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const appointments = getAppointmentsForDate(day.dateString);
                  const isToday = day.dateString === todayString;
                  const isSelected = day.dateString === selectedDate;

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(day.dateString)}
                      className={cn(
                        "relative min-h-[80px] p-2 rounded-xl border transition-all text-left",
                        day.currentMonth
                          ? "border-emerald-pro-600/10 hover:border-emerald-pro-600/30"
                          : "border-transparent opacity-40",
                        isSelected && "border-emerald-pro-600/50 bg-emerald-pro-600/10",
                        isToday && "ring-2 ring-emerald-pro-600/50"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        day.currentMonth ? "text-slate-900 dark:text-white" : "text-slate-900 dark:text-slate-300",
                        isToday && "text-emerald-pro-600"
                      )}>
                        {day.date}
                      </span>
                      {appointments.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {appointments.slice(0, 2).map((apt) => {
                            const status = statusColors[apt.status as keyof typeof statusColors];
                            return (
                              <div
                                key={apt.id}
                                className={cn(
                                  "text-[10px] px-1.5 py-0.5 rounded truncate",
                                  status.bg,
                                  status.text
                                )}
                              >
                                {apt.time}
                              </div>
                            );
                          })}
                          {appointments.length > 2 && (
                            <div className="text-[10px] text-slate-900 dark:text-slate-300 px-1">
                              +{appointments.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Day Details */}
            <div className="space-y-4">
              <div className="glass-premium p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                  {selectedDate
                    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </h3>

                {selectedDateAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-900 dark:text-slate-300/30 mx-auto mb-3" />
                    <p className="text-sm text-slate-900 dark:text-slate-300">No appointments scheduled</p>
                    <Button
                      size="sm"
                      className="mt-4 bg-emerald-pro-600/10 text-emerald-pro-600 hover:bg-emerald-pro-600/20 border border-emerald-pro-600/20"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDateAppointments.map((apt) => {
                      const status = statusColors[apt.status as keyof typeof statusColors];
                      const TypeIcon = typeIcons[apt.type as keyof typeof typeIcons];

                      return (
                        <div
                          key={apt.id}
                          className="p-4 rounded-xl border border-emerald-pro-600/10 bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/20 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg border",
                                status.bg,
                                status.border
                              )}>
                                <TypeIcon className={cn("h-4 w-4", status.text)} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">{apt.time}</p>
                                <p className="text-xs text-slate-900 dark:text-slate-300">{apt.duration}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-lg border font-medium",
                              status.bg,
                              status.text,
                              status.border
                            )}>
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                          </div>

                          <h4 className="font-medium text-slate-900 dark:text-white mb-2">{apt.title}</h4>

                          <div className="flex items-center gap-2 mb-3">
                            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-emerald-pro-500 to-violet-dark flex items-center justify-center text-[10px] font-bold text-slate-900 dark:text-white">
                              {apt.lead.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-xs text-slate-900 dark:text-white">{apt.lead.name}</p>
                              <p className="text-[10px] text-slate-900 dark:text-slate-300">{apt.lead.company}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {apt.meetingLink && (
                              <a
                                href={apt.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-pro-600/10 text-emerald-pro-600 text-xs font-medium hover:bg-emerald-pro-600/20 transition-all"
                              >
                                <Link2 className="h-3 w-3" />
                                Join Meeting
                              </a>
                            )}
                            <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-rose hover:bg-rose/10 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Upcoming Appointments Quick View */}
              <div className="glass-premium p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Upcoming This Week</h3>
                <div className="space-y-2">
                  {appointmentsData.slice(0, 4).map((apt) => {
                    const status = statusColors[apt.status as keyof typeof statusColors];
                    return (
                      <div
                        key={apt.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-pro-600/5 transition-all"
                      >
                        <div className={cn("h-2 w-2 rounded-full", status.dot)} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 dark:text-white truncate">{apt.lead.name}</p>
                          <p className="text-xs text-slate-900 dark:text-slate-300">{apt.date} • {apt.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <motion.div variants={itemVariants} className="glass-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-pro-600/10">
                    <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-6 py-4">Meeting</th>
                    <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Lead</th>
                    <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Date & Time</th>
                    <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Type</th>
                    <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-4 py-4">Campaign</th>
                    <th className="text-right text-xs font-semibold text-slate-900 dark:text-slate-300 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-pro-600/5">
                  {appointmentsData.map((apt) => {
                    const status = statusColors[apt.status as keyof typeof statusColors];
                    const TypeIcon = typeIcons[apt.type as keyof typeof typeIcons];

                    return (
                      <tr key={apt.id} className="hover:bg-emerald-pro-600/5 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900 dark:text-white">{apt.title}</p>
                          <p className="text-xs text-slate-900 dark:text-slate-300 mt-0.5">{apt.duration}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-pro-500 to-violet-dark flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">
                              {apt.lead.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <Link
                                href={`/dashboard/leads/${apt.lead.id}`}
                                className="text-sm font-medium text-slate-900 dark:text-white hover:text-emerald-pro-600 transition-colors"
                              >
                                {apt.lead.name}
                              </Link>
                              <p className="text-xs text-slate-900 dark:text-slate-300">{apt.lead.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-slate-900 dark:text-white">{apt.date}</p>
                          <p className="text-xs text-slate-900 dark:text-slate-300">{apt.time}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="h-4 w-4 text-slate-900 dark:text-slate-300" />
                            <span className="text-sm text-slate-900 dark:text-white capitalize">{apt.type}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border",
                            status.bg,
                            status.text,
                            status.border
                          )}>
                            <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-slate-900 dark:text-white">{apt.campaign}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {apt.meetingLink && (
                              <a
                                href={apt.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors"
                              >
                                <Link2 className="h-4 w-4" />
                              </a>
                            )}
                            <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-emerald-pro-600 hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-rose hover:bg-rose/10 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-emerald-pro-600/10 rounded-lg transition-colors">
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
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
