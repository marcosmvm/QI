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
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    text: "text-quantum-violet",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    text: "text-neon-mint",
  },
};

export function ValuePillars() {
  return (
    <section className="py-24 bg-deep-space">
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
            <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
              Quantum Insights
            </span>
          </h2>
          <p className="text-lg text-steel">
            Our AI-first approach delivers predictable pipeline growth with industry-leading deliverability and conversion rates.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const colors = colorClasses[pillar.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-graphite bg-midnight-blue/50 hover:border-electric-cyan/30 hover:bg-midnight-blue/80 transition-all duration-300"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-4`}>
                  <pillar.icon className={`h-6 w-6 ${colors.text}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-sora font-semibold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
