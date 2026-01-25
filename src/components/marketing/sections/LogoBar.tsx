"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/marketing/layout/Container";
import { CheckCircle, DollarSign, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const idealClient = [
  { icon: DollarSign, text: "$15K+ average contract values" },
  { icon: TrendingUp, text: "Need predictable pipeline growth" },
  { icon: Users, text: "Want to free up sales reps from cold outreach" },
];

export function LogoBar() {
  return (
    <section className="py-16 border-y border-border-default dark:border-graphite bg-light-bg-secondary dark:bg-midnight-blue/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <p className="text-emerald-pro-600 text-sm uppercase tracking-widest font-medium mb-2">
              Built for B2B Companies Who
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {idealClient.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-border-default dark:border-graphite/50 bg-white dark:bg-deep-space/50 hover:border-emerald-pro-600/30 transition-colors"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/20">
                  <item.icon className="h-5 w-5 text-emerald-pro-600" />
                </div>
                <p className="text-slate-700 dark:text-slate-200 text-sm font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-emerald-pro-600 hover:text-cyan-light text-sm font-medium transition-colors group"
            >
              See if you're a fit
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
