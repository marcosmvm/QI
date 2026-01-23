"use client";

import { motion } from "framer-motion";
import { Target, Zap, TrendingUp, Shield, Users, BarChart3 } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";

const pillars = [
  {
    icon: Target,
    title: "Precision Targeting",
    description: "AI-powered ICP identification finds your ideal prospects across millions of B2B contacts.",
    color: "electric-cyan",
  },
  {
    icon: Zap,
    title: "Automated Outreach",
    description: "Personalized sequences that feel human but scale infinitely across your target market.",
    color: "quantum-violet",
  },
  {
    icon: TrendingUp,
    title: "Continuous Optimization",
    description: "Machine learning analyzes every interaction to improve response rates over time.",
    color: "neon-mint",
  },
  {
    icon: Shield,
    title: "Deliverability First",
    description: "Guardian Engine monitors domain health 24/7 to keep you out of spam folders.",
    color: "electric-cyan",
  },
  {
    icon: Users,
    title: "Quality Meetings",
    description: "Focus on closing deals, not chasing leads. We deliver ready-to-buy prospects.",
    color: "quantum-violet",
  },
  {
    icon: BarChart3,
    title: "Full Transparency",
    description: "Real-time dashboards show every metric from sends to meetings booked.",
    color: "neon-mint",
  },
];

const colorClasses = {
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    text: "text-electric-cyan",
    border: "group-hover:border-electric-cyan/40",
    glow: "group-hover:shadow-glow-cyan-sm",
    accent: "bg-electric-cyan",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    text: "text-quantum-violet",
    border: "group-hover:border-quantum-violet/40",
    glow: "group-hover:shadow-glow-violet-lg",
    accent: "bg-quantum-violet",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    text: "text-neon-mint",
    border: "group-hover:border-neon-mint/40",
    glow: "group-hover:shadow-glow-mint-lg",
    accent: "bg-neon-mint",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ValuePillars() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            Why Companies Choose{" "}
            <span className="gradient-text-cyan-violet">
              XGrowthOS
            </span>
          </h2>
          <p className="text-lg text-steel">
            Our AI-first approach delivers predictable pipeline growth with industry-leading deliverability and conversion rates.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pillars.map((pillar) => {
            const colors = colorClasses[pillar.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={pillar.title}
                variants={itemVariants}
                className={`group relative p-6 rounded-2xl border border-graphite/50 bg-midnight-blue/30 backdrop-blur-sm ${colors.border} ${colors.glow} hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Accent line at top */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] ${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-4 border border-transparent group-hover:border-current/20 transition-all duration-300`}>
                  <pillar.icon className={`h-6 w-6 ${colors.text}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-sora font-semibold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed group-hover:text-silver/80 transition-colors">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
