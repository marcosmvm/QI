"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/marketing/layout/Container";
import { Shield, Zap, Target, Clock } from "lucide-react";

// Capability-focused stats (not fake metrics)
const capabilities = [
  { icon: Shield, value: "5", label: "AI Engines", suffix: "", description: "Working together" },
  { icon: Zap, value: "24/7", label: "Automation", suffix: "", description: "Always running" },
  { icon: Target, value: "99", label: "Inbox Placement", suffix: "%", description: "Target rate" },
  { icon: Clock, value: "48", label: "Hour Setup", suffix: "h", description: "ICP to inbox" },
];

export function StatsBar() {
  return (
    <section className="py-20 bg-bg-surface border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/20 group-hover:border-emerald-300 dark:group-hover:border-green-500/40 transition-colors">
                  <cap.icon className="h-6 w-6 text-emerald-600 dark:text-green-400" />
                </div>
              </div>
              <div className="relative">
                <span className="text-4xl md:text-5xl font-sora font-bold text-emerald-600 dark:text-green-400">
                  {cap.value}
                </span>
                <span className="text-2xl md:text-3xl font-sora font-bold text-emerald-600 dark:text-green-400">
                  {cap.suffix}
                </span>
              </div>
              <p className="text-slate-900 dark:text-white mt-2 text-sm md:text-base font-medium">
                {cap.label}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
