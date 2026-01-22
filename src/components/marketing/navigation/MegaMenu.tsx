"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { type NavSection } from "@/lib/content/navigation"

// ============================================
// QUANTUM INSIGHTS - ENHANCED MEGA MENU
// Brand Board v1.0 - Dark Theme
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
        className="bg-midnight-blue/95 backdrop-blur-xl border border-graphite/50 rounded-2xl overflow-hidden min-w-[600px]"
        style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 212, 255, 0.1)' }}
      >
        <div className="p-6">
          <div className={cn(
            "grid gap-8",
            featured ? "grid-cols-4" : `grid-cols-${Math.min(sections.length, 3)}`
          )}>
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-steel mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-graphite/50 transition-colors"
                      >
                        {item.icon && (
                          <div className="flex-shrink-0 mt-0.5">
                            <item.icon className="h-4 w-4 text-steel group-hover:text-electric-cyan transition-colors" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-electric-cyan/10 text-electric-cyan rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-steel mt-0.5 line-clamp-2">
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
                  className="group block h-full p-4 rounded-xl bg-graphite/30 border border-graphite hover:border-electric-cyan/50 transition-all"
                >
                  <div className="flex flex-col h-full">
                    <h4 className="text-sm font-semibold text-white mb-2">
                      {featured.title}
                    </h4>
                    <p className="text-xs text-steel flex-1">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-xs font-medium text-electric-cyan group-hover:gap-2 transition-all">
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
