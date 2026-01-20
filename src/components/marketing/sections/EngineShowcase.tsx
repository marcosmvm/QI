"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Cpu, FlaskConical, Crosshair, Eye, ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { Button } from "@/components/ui/button";

const engines = [
  {
    id: "guardian",
    codename: "A",
    name: "Guardian",
    tagline: "Compliance & Domain Health",
    description: "24/7 monitoring ensures maximum deliverability. Protects your sender reputation with intelligent domain rotation and health scoring.",
    icon: Shield,
    color: "electric-cyan",
    href: "/engines/guardian",
  },
  {
    id: "architect",
    codename: "B",
    name: "Architect",
    tagline: "AI Campaign Design",
    description: "Transforms your value proposition into high-converting email sequences tailored to each prospect segment.",
    icon: Cpu,
    color: "quantum-violet",
    href: "/engines/architect",
  },
  {
    id: "scientist",
    codename: "C",
    name: "Scientist",
    tagline: "Campaign Optimization",
    description: "Continuously analyzes engagement data to optimize send times, subject lines, and messaging for peak performance.",
    icon: FlaskConical,
    color: "neon-mint",
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
    color: "quantum-violet",
    href: "/engines/sentinel",
  },
];

const colorClasses = {
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/30",
    text: "text-electric-cyan",
    gradient: "from-electric-cyan/20 to-transparent",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/30",
    text: "text-quantum-violet",
    gradient: "from-quantum-violet/20 to-transparent",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/30",
    text: "text-neon-mint",
    gradient: "from-neon-mint/20 to-transparent",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange/20 to-transparent",
  },
};

export function EngineShowcase() {
  return (
    <SectionWrapper variant="gradient">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-violet/10 border border-quantum-violet/20 mb-6">
            <Cpu className="w-4 h-4 text-quantum-violet" />
            <span className="text-sm font-medium text-quantum-violet">Our Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            5 AI Engines Working{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
              In Harmony
            </span>
          </h2>
          <p className="text-lg text-silver">
            Each specialized engine handles a critical part of the outbound process, working together to maximize your meeting output.
          </p>
        </motion.div>

        {/* Engines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {engines.map((engine, index) => {
            const colors = colorClasses[engine.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={engine.href} className="block group">
                  <div className={`relative h-full p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-opacity-60 transition-all duration-300 overflow-hidden`}>
                    {/* Gradient Overlay */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-radial ${colors.gradient} blur-2xl opacity-50`} />

                    {/* Header */}
                    <div className="relative flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
                        <engine.icon className={`h-6 w-6 ${colors.text}`} />
                      </div>
                      <span className={`text-xs font-mono ${colors.text} opacity-60`}>
                        ENGINE {engine.codename}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-sora font-semibold text-white mb-1">
                        {engine.name}
                      </h3>
                      <p className={`text-sm ${colors.text} mb-3`}>{engine.tagline}</p>
                      <p className="text-silver text-sm leading-relaxed mb-4">
                        {engine.description}
                      </p>

                      {/* Learn More */}
                      <div className={`flex items-center gap-2 ${colors.text} text-sm font-medium group-hover:gap-3 transition-all`}>
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

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
              variant="outline"
              size="lg"
              className="border-electric-cyan/30 hover:border-electric-cyan/60 text-white hover:bg-electric-cyan/10"
            >
              Explore All Engines
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
