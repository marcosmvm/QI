"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { Logo } from "@/components/brand/Logo";
import { footerNavigation, contactInfo } from "@/lib/content/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-graphite/50">
      {/* Main Footer */}
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo className="mb-6" />
            <p className="text-sm text-steel mb-6 max-w-xs">
              AI-powered B2B cold email automation that delivers qualified meetings on autopilot.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-sm text-steel hover:text-electric-cyan transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 text-sm text-steel hover:text-electric-cyan transition-colors"
              >
                <Phone className="h-4 w-4" />
                {contactInfo.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-steel">
                <MapPin className="h-4 w-4" />
                {contactInfo.address}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-midnight-blue text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-midnight-blue text-steel hover:text-electric-cyan hover:bg-electric-cyan/10 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {footerNavigation.services.title}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.services.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-electric-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Engines Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {footerNavigation.engines.title}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.engines.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-electric-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {footerNavigation.industries.title}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.industries.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-electric-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {footerNavigation.company.title}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-electric-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {footerNavigation.resources.title}
            </h4>
            <ul className="space-y-2">
              {footerNavigation.resources.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-steel hover:text-electric-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-graphite/30">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-steel">
              &copy; {currentYear} Quantum Insights. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerNavigation.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-steel hover:text-electric-cyan transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
