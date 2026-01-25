"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Cpu, FlaskConical, Crosshair, Eye, ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { Button } from "@/components/ui/button";

const engines = [
  {
    id: "guardian",
    codename: "A",
    name: "Guardian",
    tagline: "Compliance & Domain Health",
    description: "24/7 monitoring ensures maximum deliverability. Protects your sender reputation with intelligent domain rotation and health scoring.",
    icon: Shield,
    color: "emerald-pro-600",
    href: "/engines/guardian",
  },
  {
    id: "architect",
    codename: "B",
    name: "Architect",
    tagline: "AI Campaign Design",
    description: "Transforms your value proposition into high-converting email sequences tailored to each prospect segment.",
    icon: Cpu,
    color: "emerald-pro-500",
    href: "/engines/architect",
  },
  {
    id: "scientist",
    codename: "C",
    name: "Scientist",
    tagline: "Campaign Optimization",
    description: "Continuously analyzes engagement data to optimize send times, subject lines, and messaging for peak performance.",
    icon: FlaskConical,
    color: "emerald-pro-400",
    href: "/engines/scientist",
  },
  {
    id: "hunter",
    codename: "G",
    name: "Hunter",
    tagline: "Reply-Based Lead Expansion",
    description: "Identifies similar prospects when someone engages, automatically expanding your reach to likely-to-convert contacts.",
    icon: Crosshair,
    color: "energy-orange",
    href: "/engines/hunter",
  },
  {
    id: "sentinel",
    codename: "H",
    name: "Sentinel",
    tagline: "Website Visitor Intelligence",
    description: "Deanonymizes website visitors and triggers personalized outreach to warm leads already exploring your solution.",
    icon: Eye,
    color: "emerald-pro-500",
    href: "/engines/sentinel",
  },
];

const colorClasses = {
  "emerald-pro-600": {
    bg: "bg-emerald-pro-600/10",
    text: "text-emerald-pro-600",
    border: "group-hover:border-emerald-pro-600/40",
    glow: "group-hover:shadow-glow-cyan-sm",
    accent: "bg-emerald-pro-600",
  },
  "emerald-pro-500": {
    bg: "bg-emerald-pro-500/10",
    text: "text-emerald-pro-500",
    border: "group-hover:border-emerald-pro-500/40",
    glow: "group-hover:shadow-glow-violet-lg",
    accent: "bg-emerald-pro-500",
  },
  "emerald-pro-400": {
    bg: "bg-emerald-pro-400/10",
    text: "text-emerald-pro-400",
    border: "group-hover:border-emerald-pro-400/40",
    glow: "group-hover:shadow-glow-mint-lg",
    accent: "bg-emerald-pro-400",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    text: "text-energy-orange",
    border: "group-hover:border-energy-orange/40",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,107,53,0.2)]",
    accent: "bg-energy-orange",
  },
};

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function EngineShowcase() {
  return (
    <section className="py-24 relative">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-pro-500/10 border border-emerald-pro-500/30 mb-6 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-emerald-pro-500" />
            <span className="text-sm font-medium text-emerald-pro-500">Our Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
            5 AI Engines Working{" "}
            <span className="text-gradient">
              In Harmony
            </span>
          </h2>
          <p className="text-lg text-slate-900 dark:text-slate-200">
            Each specialized engine handles a critical part of the outbound process, working together to maximize your meeting output.
          </p>
        </motion.div>

        {/* Engines Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {engines.map((engine) => {
            const colors = colorClasses[engine.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={engine.id}
                variants={itemVariants}
              >
                <Link href={engine.href} className="block group h-full">
                  <div className={`relative h-full p-6 rounded-2xl border border-border-default dark:border-graphite/50 bg-light-bg-secondary dark:bg-midnight-blue/30 backdrop-blur-sm ${colors.border} ${colors.glow} hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
                    {/* Accent line at top */}
                    <div className={`absolute top-0 left-0 right-0 h-[2px] ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Header */}
                    <div className="relative flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colors.bg} border border-transparent group-hover:border-current/20 transition-all duration-300`}>
                        <engine.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <span className="text-xs font-mono text-slate-900 dark:text-slate-200 group-hover:text-slate-900 dark:text-slate-200 transition-colors">
                        ENGINE {engine.codename}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className={`text-xl font-sora font-semibold text-slate-900 dark:text-white mb-1 group-hover:${colors.text.replace('text-', '')} transition-colors`}>
                        {engine.name}
                      </h3>
                      <p className={`text-sm ${colors.text} mb-3`}>{engine.tagline}</p>
                      <p className="text-slate-900 dark:text-slate-200 text-sm leading-relaxed mb-4 group-hover:text-silver/80 transition-colors">
                        {engine.description}
                      </p>

                      {/* Learn More */}
                      <div className={`flex items-center gap-2 ${colors.text} text-sm font-medium group-hover:gap-3 transition-all`}>
                        Learn more
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link href="/engines">
            <Button
              variant="glass"
              size="lg"
              className="group"
            >
              Explore All Engines
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
