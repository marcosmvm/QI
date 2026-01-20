"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { engines } from "@/lib/content/engines";
import { Button } from "@/components/ui/button";

const colorClasses = {
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/30",
    text: "text-electric-cyan",
    gradient: "from-electric-cyan/20 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_rgba(0,212,255,0.2)]",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/30",
    text: "text-quantum-violet",
    gradient: "from-quantum-violet/20 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_rgba(123,97,255,0.2)]",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/30",
    text: "text-neon-mint",
    gradient: "from-neon-mint/20 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_rgba(0,255,178,0.2)]",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange/20 to-transparent",
    glow: "group-hover:shadow-[0_0_40px_rgba(255,107,53,0.2)]",
  },
};

export default function EnginesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-quantum-violet/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-electric-cyan/15 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-violet/10 border border-quantum-violet/20 mb-6">
              <Cpu className="w-4 h-4 text-quantum-violet" />
              <span className="text-sm font-medium text-quantum-violet">Our Technology</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              5 AI Engines.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                One Powerful Platform.
              </span>
            </h1>

            <p className="text-xl text-silver max-w-2xl mx-auto mb-10">
              Each engine is specialized for a critical part of the outbound process. Together, they form an unstoppable lead generation machine.
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold px-8"
              >
                See Them in Action
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Engines List */}
      <SectionWrapper variant="default">
        <Container>
          <div className="space-y-8">
            {engines.map((engine, index) => {
              const colors = colorClasses[engine.color];
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/engines/${engine.id}`} className="block group">
                    <div className={`relative p-8 md:p-10 rounded-3xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-opacity-60 transition-all duration-300 ${colors.glow} overflow-hidden`}>
                      {/* Background Gradient */}
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-radial ${colors.gradient} blur-3xl opacity-30`} />

                      <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                        {/* Icon & Engine Info */}
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <div className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border`}>
                            <engine.icon className={`h-10 w-10 ${colors.text}`} />
                          </div>
                          <div>
                            <span className={`text-xs font-mono ${colors.text} opacity-70`}>
                              ENGINE {engine.codename}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-sora font-bold text-white">
                              {engine.name}
                            </h2>
                            <p className={`${colors.text} font-medium`}>{engine.tagline}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="flex-1">
                          <p className="text-silver leading-relaxed">
                            {engine.shortDescription}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
                          {engine.stats.slice(0, 2).map((stat) => (
                            <div key={stat.label} className="text-center">
                              <p className={`text-2xl font-sora font-bold ${colors.text}`}>
                                {stat.value}
                              </p>
                              <p className="text-steel text-xs">{stat.label}</p>
                            </div>
                          ))}
                        </div>

                        {/* Arrow */}
                        <div className={`flex items-center ${colors.text} group-hover:translate-x-2 transition-transform`}>
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      {/* How They Work Together */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              How They Work{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                Together
              </span>
            </h2>
            <p className="text-lg text-silver">
              Our engines don&apos;t operate in isolation. They share data, learn from each other, and continuously optimize the entire funnel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Guardian + Architect",
                description: "Guardian ensures optimal domain health while Architect designs campaigns that maximize deliverability.",
              },
              {
                title: "Architect + Scientist",
                description: "Architect creates variations that Scientist tests to find the highest-performing messages.",
              },
              {
                title: "Scientist + Hunter",
                description: "Scientist identifies winning patterns that Hunter uses to find similar high-converting prospects.",
              },
              {
                title: "Hunter + Sentinel",
                description: "Hunter expands from engaged leads while Sentinel captures warm website visitors.",
              },
              {
                title: "Sentinel + Guardian",
                description: "Sentinel triggers personalized outreach that Guardian delivers to the inbox reliably.",
              },
              {
                title: "All Five United",
                description: "Data flows between all engines, creating a self-improving system that gets smarter with every interaction.",
              },
            ].map((combo, index) => (
              <motion.div
                key={combo.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-electric-cyan/10 bg-gradient-to-br from-midnight-blue/50 to-deep-space/50"
              >
                <h3 className="text-lg font-sora font-semibold text-white mb-2">
                  {combo.title}
                </h3>
                <p className="text-silver text-sm">
                  {combo.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Ready to See Our Engines in Action?"
        description="Book a demo and we'll show you exactly how our AI engines can transform your outbound."
      />
    </>
  );
}
