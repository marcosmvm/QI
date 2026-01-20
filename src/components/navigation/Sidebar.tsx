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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mainNavigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
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

const settingsNav = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [aiEnginesOpen, setAiEnginesOpen] = useState(true);

  const isAiEnginePath = pathname?.startsWith("/dashboard/ai-engines");

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-cyan shadow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-sora font-bold text-slate-900 tracking-tight">
              Quantum
            </h1>
            <p className="text-xs text-slate-500 font-medium">Insights Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Main Menu
          </p>
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-electric-cyan/10 text-electric-cyan"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-electric-cyan" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-electric-cyan" />
                )}
              </Link>
            );
          })}

          {/* AI Engines Section */}
          <div className="mt-6">
            <button
              onClick={() => setAiEnginesOpen(!aiEnginesOpen)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isAiEnginePath
                  ? "bg-quantum-violet/10 text-quantum-violet"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Zap className={cn(
                "h-5 w-5 transition-colors",
                isAiEnginePath ? "text-quantum-violet" : "text-slate-400"
              )} />
              <span className="flex-1 text-left">AI Engines</span>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200",
                aiEnginesOpen ? "rotate-180" : ""
              )} />
            </button>

            {aiEnginesOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l border-slate-200 pl-4">
                {aiEngines.map((engine) => {
                  const isActive = pathname === engine.href;

                  return (
                    <Link
                      key={engine.name}
                      href={engine.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-quantum-violet/10 text-quantum-violet"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      <engine.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-quantum-violet" : "text-slate-400 group-hover:text-quantum-violet"
                      )} />
                      <span className="flex-1">{engine.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            {settingsNav.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-electric-cyan/10 text-electric-cyan"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-electric-cyan" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-electric-cyan" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Engine Status Indicator */}
        <div className="mx-3 mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700">All Engines Operational</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {["A", "B", "C", "G", "H"].map((engine) => (
              <div
                key={engine}
                className="flex h-7 w-full items-center justify-center rounded-lg bg-emerald-50 text-xs font-mono font-bold text-emerald-600 border border-emerald-200"
                title={`Engine ${engine}`}
              >
                {engine}
              </div>
            ))}
          </div>
        </div>

        {/* User section */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-quantum-violet flex items-center justify-center">
              <span className="text-sm font-bold text-white">MM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Marcos Matthews</p>
              <p className="text-xs text-slate-500 truncate">marcos@quantumins...</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-electric-cyan hover:bg-slate-100 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
