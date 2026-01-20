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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-graphite bg-deep-space">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-graphite px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-electric-cyan/10 border border-electric-cyan/30">
            <Zap className="h-5 w-5 text-electric-cyan" />
          </div>
          <div>
            <h1 className="text-lg font-sora font-semibold text-white">
              Quantum
            </h1>
            <p className="text-xs text-steel">Insights Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-electric-cyan/10 text-electric-cyan border border-electric-cyan/20"
                    : "text-steel hover:bg-midnight-blue hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Engine Status Indicator */}
        <div className="mx-3 mb-4 rounded-lg border border-graphite bg-midnight-blue/50 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 rounded-full bg-neon-mint animate-pulse" />
            <span className="text-xs font-medium text-silver">All Engines Operational</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {["A", "B", "C", "G", "H"].map((engine) => (
              <div
                key={engine}
                className="flex h-6 w-full items-center justify-center rounded bg-neon-mint/10 text-xs font-mono text-neon-mint"
                title={`Engine ${engine}`}
              >
                {engine}
              </div>
            ))}
          </div>
        </div>

        {/* User section */}
        <div className="border-t border-graphite p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-quantum-violet/20 flex items-center justify-center">
              <span className="text-sm font-medium text-quantum-violet">MM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Marcos Matthews</p>
              <p className="text-xs text-steel truncate">marcos@quantuminsights.io</p>
            </div>
            <button className="p-2 text-steel hover:text-white hover:bg-midnight-blue rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
