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
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-900">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue to-primary-blue-dark shadow-glow-sm">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-poppins font-bold text-white tracking-tight">
              Quantum
            </h1>
            <p className="text-xs text-steel font-medium">Insights Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-steel/60">
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-blue/15 text-primary-blue shadow-sm"
                    : "text-steel hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-primary-blue" : "text-steel group-hover:text-white"
                )} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-primary-blue" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Engine Status Indicator */}
        <div className="mx-3 mb-4 rounded-xl border border-white/10 bg-deep-space/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald"></span>
            </span>
            <span className="text-xs font-semibold text-silver">All Engines Operational</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {["A", "B", "C", "G", "H"].map((engine) => (
              <div
                key={engine}
                className="flex h-7 w-full items-center justify-center rounded-lg bg-emerald/10 text-xs font-mono font-bold text-emerald border border-emerald/20"
                title={`Engine ${engine}`}
              >
                {engine}
              </div>
            ))}
          </div>
        </div>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-yellow to-accent-yellow-dark flex items-center justify-center shadow-sm">
              <span className="text-sm font-bold text-deep-space">MM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Marcos Matthews</p>
              <p className="text-xs text-steel truncate">marcos@quantumins...</p>
            </div>
            <button className="p-2 text-steel hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
