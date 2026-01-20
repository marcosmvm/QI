"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  BarChart3,
  Shield,
  FileText,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
  Cpu,
  FlaskConical,
  Users,
  Calendar,
  ChevronDown,
  Target,
  Eye,
  CheckCircle,
  HelpCircle,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Compliance", href: "/dashboard/compliance", icon: CheckCircle },
];

const aiEngines = [
  { name: "Guardian", href: "/dashboard/ai-engines/guardian", icon: Shield, description: "Compliance & Deliverability" },
  { name: "Architect", href: "/dashboard/ai-engines/architect", icon: Cpu, description: "Campaign Creation" },
  { name: "Scientist", href: "/dashboard/ai-engines/scientist", icon: FlaskConical, description: "Optimization" },
  { name: "Hunter", href: "/dashboard/ai-engines/hunter", icon: Target, description: "Lead Expansion" },
  { name: "Sentinel", href: "/dashboard/ai-engines/sentinel", icon: Eye, description: "Visitor Intelligence" },
];

const bottomNav = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help Center", href: "/help", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const [aiEnginesOpen, setAiEnginesOpen] = useState(true);

  const isAiEnginePath = pathname?.startsWith("/dashboard/ai-engines");

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-white border-r border-slate-200/60">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 px-6 border-b border-slate-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-primary">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-sora font-bold text-slate-900 tracking-tight">
              Quantum
            </h1>
            <p className="text-xs text-slate-500 font-medium">Insights Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-primary"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-white/70" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* AI Engines Section */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => setAiEnginesOpen(!aiEnginesOpen)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isAiEnginePath
                  ? "bg-secondary text-white shadow-secondary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Zap className={cn(
                "h-5 w-5 transition-colors",
                isAiEnginePath ? "text-white" : "text-slate-400"
              )} />
              <span className="flex-1 text-left">AI Engines</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                aiEnginesOpen ? "rotate-180" : "",
                isAiEnginePath ? "text-white/70" : "text-slate-400"
              )} />
            </button>

            {aiEnginesOpen && (
              <div className="mt-2 ml-4 space-y-1 border-l-2 border-slate-100 pl-4">
                {aiEngines.map((engine) => {
                  const isActive = pathname === engine.href;

                  return (
                    <Link
                      key={engine.name}
                      href={engine.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                      )}
                    >
                      <engine.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-secondary" : "text-slate-400 group-hover:text-secondary"
                      )} />
                      <span className="flex-1">{engine.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Engine Status Card */}
        <div className="mx-4 mb-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700">All Engines Online</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { code: "A", name: "Guardian" },
              { code: "B", name: "Architect" },
              { code: "C", name: "Scientist" },
              { code: "G", name: "Hunter" },
              { code: "H", name: "Sentinel" },
            ].map((engine) => (
              <div
                key={engine.code}
                className="flex h-8 w-full items-center justify-center rounded-lg bg-white text-xs font-mono font-bold text-primary border border-primary/20 shadow-xs"
                title={engine.name}
              >
                {engine.code}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-4 pb-4 border-t border-slate-100 pt-4">
          {bottomNav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="relative">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center">
                <span className="text-sm font-bold text-white">MM</span>
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-white"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Marcos Matthews</p>
              <p className="text-xs text-slate-500 truncate">Admin</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
