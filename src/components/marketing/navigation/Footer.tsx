"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/marketing/layout/Container";
import { footerNavigation } from "@/lib/content/navigation";
import { Logo } from "@/components/brand/Logo";

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Ambient background orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] bg-[radial-gradient(circle,rgba(5,150,105,0.03)_0%,rgba(5,150,105,0)_70%)] dark:bg-[radial-gradient(circle,rgba(34,197,94,0.05)_0%,rgba(34,197,94,0)_70%)]" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Logo variant="light" size="md" />
            </div>
            <p className="text-slate-600 dark:text-slate-200 text-sm">
              AI-Powered Cold Email That Books Meetings
            </p>
          </motion.div>

          {/* Product Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">{footerNavigation.product.title}</h4>
            <ul className="space-y-3">
              {footerNavigation.product.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Industries Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerNavigation.industries.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerNavigation.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Column */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerNavigation.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800"
        >
          <p className="text-slate-600 dark:text-slate-200 text-sm">
            &copy; {currentYear} XGrowthOS. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 hover:bg-emerald-100 dark:hover:bg-green-500/10 transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 hover:bg-emerald-100 dark:hover:bg-green-500/10 transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-green-400 hover:bg-emerald-100 dark:hover:bg-green-500/10 transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
