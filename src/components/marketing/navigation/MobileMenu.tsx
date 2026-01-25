"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { mainNavigation, contactInfo } from "@/lib/content/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/20 dark:bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-bg-surface border-l border-border shadow-xl overflow-y-auto">
        <div className="p-6 pt-24">
          {/* Navigation Items */}
          <nav className="space-y-2">
            {mainNavigation.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="w-full flex items-center justify-between p-3 text-left text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          expandedItems.includes(item.label) && "rotate-180"
                        )}
                      />
                    </button>

                    {expandedItems.includes(item.label) && (
                      <div className="mt-2 ml-4 space-y-1">
                        {item.dropdown.sections.map((section) => (
                          <div key={section.title} className="mb-4">
                            <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
                              {section.title}
                            </p>
                            {section.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                onClick={onClose}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              >
                                {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                <span>{subItem.label}</span>
                                {subItem.badge && (
                                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 dark:bg-green-500/20 text-emerald-700 dark:text-green-400 rounded">
                                    {subItem.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block p-3 font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="mt-8 pt-6 border-t border-border">
            <Link href="/contact" onClick={onClose}>
              <Button className="w-full">
                Book a Call
              </Button>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-6 space-y-3">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 p-3 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-green-400 rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4" />
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 p-3 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-green-400 rounded-lg transition-colors"
            >
              <Phone className="h-4 w-4" />
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
