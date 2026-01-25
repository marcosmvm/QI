"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Send, MessageSquare, CalendarCheck } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & ICP Definition",
    description: "We analyze your best customers to create a precise Ideal Customer Profile, then build targeted lists using AI-powered research.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Campaign Architecture",
    description: "Our Architect Engine crafts personalized multi-channel sequences that resonate with your target audience.",
  },
  {
    number: "03",
    icon: Send,
    title: "Compliant Outreach",
    description: "Guardian Engine ensures maximum deliverability while our systems send thousands of personalized emails daily.",
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Intelligent Follow-up",
    description: "Scientist Engine optimizes timing and messaging based on engagement data, while Hunter expands successful leads.",
  },
  {
    number: "05",
    icon: CalendarCheck,
    title: "Meeting Delivery",
    description: "Qualified prospects are handed off directly to your calendar, ready for your sales team to close.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ProcessSteps() {
  return (
    <section className="py-24 relative">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-blue/30 to-transparent" />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
            How It{" "}
            <span className="text-gradient">
              Works
            </span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-400">
            Our proven 5-step process transforms cold outreach into a predictable meeting machine.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Connection Line - Animated gradient */}
          <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block overflow-hidden">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-emerald-pro-600 via-emerald-pro-500 to-emerald-pro-600"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative flex gap-6 md:gap-8 group"
              >
                {/* Step Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-light-bg-secondary dark:bg-midnight-blue/60 backdrop-blur-sm border border-border-default dark:border-graphite/50 flex items-center justify-center group-hover:border-emerald-pro-600/40 group-hover:shadow-glow-cyan-sm transition-all duration-300">
                    <step.icon className="h-7 w-7 text-emerald-pro-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="p-5 rounded-xl bg-light-bg-secondary dark:bg-midnight-blue/30 backdrop-blur-sm border border-border-default dark:border-graphite/30 group-hover:border-emerald-pro-600/30 group-hover:bg-light-bg-secondary dark:bg-midnight-blue/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-emerald-pro-600 font-mono text-sm font-semibold">{step.number}</span>
                      <h3 className="text-xl md:text-2xl font-sora font-semibold text-slate-900 dark:text-white group-hover:text-emerald-pro-600 transition-colors">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-400 max-w-2xl group-hover:text-silver/80 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
