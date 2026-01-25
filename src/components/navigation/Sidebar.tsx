"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  BarChart3,
  FileText,
  Settings,
  Users,
  MessageSquare,
  LogOut,
  Zap,
  Building2,
  UserCog,
  CreditCard,
  Inbox,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { Profile } from "@/types/database";

// Client navigation - what clients see
const clientNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

// Admin navigation - what admins see
const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Clients", href: "/admin/clients", icon: Building2 },
  { name: "Campaigns", href: "/admin/campaigns", icon: Mail },
  { name: "Engines", href: "/admin/engines", icon: Cpu },
  { name: "Team", href: "/admin/team", icon: UserCog },
  { name: "Support Inbox", href: "/admin/support", icon: Inbox },
  { name: "Billing", href: "/admin/billing", icon: CreditCard },
];

const clientBottomNav = [
  { name: "Support", href: "/dashboard/support", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminBottomNav = [
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  variant?: "client" | "admin";
}

export function Sidebar({ variant = "client" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(data);
      }
      setIsLoading(false);
    }

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/admin") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const navigation = variant === "admin" ? adminNavigation : clientNavigation;
  const bottomNav = variant === "admin" ? adminBottomNav : clientBottomNav;

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-bg-surface border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b border-border">
          <Link href={variant === "admin" ? "/admin" : "/dashboard"} className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/30">
              <Zap className="h-5 w-5 text-emerald-600 dark:text-green-400" />
            </div>
            <span className="text-lg font-sora font-semibold text-slate-900 dark:text-white">
              <span className="text-emerald-600 dark:text-green-400">X</span>GrowthOS
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-emerald-100 dark:bg-green-500/10 text-emerald-700 dark:text-green-400 border border-emerald-200 dark:border-green-500/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-bg-subtle dark:hover:bg-slate-800 hover:text-primary border border-transparent"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isActive(item.href) ? "text-emerald-600 dark:text-green-400" : "text-slate-500 dark:text-slate-200"
                )} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 border-t border-border">
          <div className="space-y-1">
            {bottomNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-emerald-100 dark:bg-green-500/10 text-emerald-700 dark:text-green-400 border border-emerald-200 dark:border-green-500/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-bg-subtle dark:hover:bg-slate-800 hover:text-primary border border-transparent"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4",
                  isActive(item.href) ? "text-emerald-600 dark:text-green-400" : "text-slate-500 dark:text-slate-200"
                )} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/30 flex items-center justify-center">
              <span className="text-sm font-medium text-emerald-600 dark:text-green-400">
                {isLoading ? "..." : getInitials(profile?.full_name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                {isLoading ? "Loading..." : profile?.full_name || "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-200 truncate capitalize">
                {isLoading ? "" : profile?.role || "client"}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
