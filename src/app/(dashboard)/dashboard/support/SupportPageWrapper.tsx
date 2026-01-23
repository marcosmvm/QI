"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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

interface SupportPageWrapperProps {
  children: ReactNode;
}

export function SupportPageWrapper({ children }: SupportPageWrapperProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export function SupportHeader() {
  return (
    <motion.div
      variants={itemVariants}
      className="p-4 border-b border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/50"
    >
      <div className="flex items-center gap-2 text-sm text-light-text-muted dark:text-steel mb-1">
        <a href="/dashboard" className="hover:text-emerald-pro-600 transition-colors">Portal</a>
        <span>/</span>
        <span className="text-emerald-pro-600">Support</span>
      </div>
    </motion.div>
  );
}
