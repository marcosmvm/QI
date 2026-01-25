"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { type NavSection } from "@/lib/content/navigation"

// ============================================
// XGROWTHOS - ENHANCED MEGA MENU
// Light Theme Default with Dark Mode Support
// ============================================

interface MegaMenuProps {
  sections: NavSection[]
  featured?: {
    title: string
    description: string
    href: string
    image?: string
  }
}

export function MegaMenu({ sections, featured }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 pt-2 z-[100]">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 backdrop-blur-xl rounded-2xl overflow-hidden min-w-[600px] shadow-lg"
      >
        <div className="p-6">
          <div className={cn(
            "grid gap-8",
            featured ? "grid-cols-4" : `grid-cols-${Math.min(sections.length, 3)}`
          )}>
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        {item.icon && (
                          <div className="flex-shrink-0 mt-0.5">
                            <item.icon className="h-4 w-4 text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-green-500/20 text-emerald-700 dark:text-green-400 rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Featured Card */}
            {featured && (
              <div className="col-span-1">
                <Link
                  href={featured.href}
                  className="group block h-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex flex-col h-full">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      {featured.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 flex-1">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-xs font-medium text-emerald-600 dark:text-green-400 group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
