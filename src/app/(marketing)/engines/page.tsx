"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, CircuitBoard } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { engines } from "@/lib/content/engines";
import { Button } from "@/components/ui/button";

const colorClasses = {
  "emerald-pro-600": {
    bg: "bg-emerald-pro-600/10",
    border: "border-emerald-pro-600/30",
    text: "text-emerald-pro-600",
    gradient: "from-emerald-pro-600/20 to-transparent",
    glow: "rgba(0,212,255,0.25)",
    accentLine: "bg-emerald-pro-600",
    iconBg: "cyan",
  },
  "emerald-pro-500": {
    bg: "bg-emerald-pro-500/10",
    border: "border-emerald-pro-500/30",
    text: "text-emerald-pro-500",
    gradient: "from-emerald-pro-500/20 to-transparent",
    glow: "rgba(123,97,255,0.25)",
    accentLine: "bg-emerald-pro-500",
    iconBg: "violet",
  },
  "emerald-pro-400": {
    bg: "bg-emerald-pro-400/10",
    border: "border-emerald-pro-400/30",
    text: "text-emerald-pro-400",
    gradient: "from-emerald-pro-400/20 to-transparent",
    glow: "rgba(0,255,178,0.25)",
    accentLine: "bg-emerald-pro-400",
    iconBg: "mint",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange/20 to-transparent",
    glow: "rgba(255,107,53,0.25)",
    accentLine: "bg-energy-orange",
    iconBg: "orange",
  },
};

export default function EnginesPage() {
  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-pro-500/15 rounded-full blur-[150px] animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-600/12 rounded-full blur-[130px] animate-orb-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-pro-400/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="tech-badge mb-8"
            >
              <Cpu className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">Our Technology</span>
              <CircuitBoard className="w-4 h-4 text-emerald-pro-500" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-light-text dark:text-white mb-8">
              5 AI Engines.{" "}
              <span className="headline-underline gradient-text-cyan-violet block mt-2">
                One Powerful Platform.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-light-text-secondary/90 dark:text-silver/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Each engine is specialized for a <span className="text-emerald-pro-500 font-semibold">critical part</span> of the outbound process. Together, they form an <span className="text-emerald-pro-600 font-semibold">unstoppable</span> lead generation machine.
            </p>

            <Link href="/contact">
              <button className="cta-magnetic group">
                See Them in Action
                <Zap className="h-5 w-5 group-hover:animate-pulse" />
              </button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Engines List - Enhanced with Engine Cards */}
      <SectionWrapper variant="default">
        <Container>
          <div className="space-y-6 lg:space-y-8">
            {engines.map((engine, index) => {
              const colors = colorClasses[engine.color];
              return (
                <motion.div
                  key={engine.id}
                  initial={{ opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/engines/${engine.id}`} className="block group">
                    <div
                      className="engine-card p-8 md:p-10 lg:p-12"
                      style={{
                        '--engine-color': colors.accentLine === 'bg-emerald-pro-600' ? 'var(--emerald-pro-600)' :
                                         colors.accentLine === 'bg-emerald-pro-500' ? 'var(--emerald-pro-500)' :
                                         colors.accentLine === 'bg-emerald-pro-400' ? 'var(--emerald-pro-400)' : 'var(--energy-orange)',
                        '--engine-glow': colors.glow
                      } as React.CSSProperties}
                    >
                      {/* Background Gradient */}
                      <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-radial ${colors.gradient} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                      <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                        {/* Icon & Engine Info */}
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <div className={`icon-container-animated ${colors.iconBg}`}>
                            <engine.icon className={`h-8 w-8 ${colors.text}`} />
                          </div>
                          <div>
                            <motion.span
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className={`inline-block text-xs font-mono ${colors.text} opacity-70 bg-current/10 px-2 py-1 rounded`}
                            >
                              ENGINE {engine.codename}
                            </motion.span>
                            <h2 className="text-2xl md:text-3xl font-sora font-bold text-light-text dark:text-white mt-1 group-hover:text-gradient transition-all">
                              {engine.name}
                            </h2>
                            <p className={`${colors.text} font-medium text-sm md:text-base`}>{engine.tagline}</p>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="flex-1">
                          <p className="text-light-text-secondary dark:text-silver leading-relaxed group-hover:text-light-text dark:text-white/90 transition-colors">
                            {engine.shortDescription}
                          </p>
                        </div>

                        {/* Stats - Enhanced */}
                        <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
                          {engine.stats.slice(0, 2).map((stat, statIndex) => (
                            <motion.div
                              key={stat.label}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + index * 0.1 + statIndex * 0.1 }}
                              className="text-center p-3 rounded-xl bg-white dark:bg-deep-space/50 border border-border-default dark:border-graphite/30 group-hover:border-emerald-pro-600/20 transition-colors"
                            >
                              <p className={`text-2xl font-sora font-bold ${colors.text}`}>
                                {stat.value}
                              </p>
                              <p className="text-light-text-muted dark:text-steel text-xs">{stat.label}</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Arrow - Enhanced */}
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${colors.bg} border ${colors.border} ${colors.text} group-hover:scale-110 group-hover:translate-x-2 transition-all duration-300`}>
                          <ArrowRight className="h-5 w-5" />
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

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* How They Work Together - Enhanced */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-light-text dark:text-white mb-6">
              How They Work{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                Together
              </span>
            </h2>
            <p className="text-lg md:text-xl text-light-text-secondary dark:text-silver leading-relaxed">
              Our engines don&apos;t operate in isolation. They share data, learn from each other, and <span className="text-emerald-pro-600">continuously optimize</span> the entire funnel.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Guardian + Architect",
                description: "Guardian ensures optimal domain health while Architect designs campaigns that maximize deliverability.",
                color: "cyan",
              },
              {
                title: "Architect + Scientist",
                description: "Architect creates variations that Scientist tests to find the highest-performing messages.",
                color: "violet",
              },
              {
                title: "Scientist + Hunter",
                description: "Scientist identifies winning patterns that Hunter uses to find similar high-converting prospects.",
                color: "mint",
              },
              {
                title: "Hunter + Sentinel",
                description: "Hunter expands from engaged leads while Sentinel captures warm website visitors.",
                color: "orange",
              },
              {
                title: "Sentinel + Guardian",
                description: "Sentinel triggers personalized outreach that Guardian delivers to the inbox reliably.",
                color: "cyan",
              },
              {
                title: "All Five United",
                description: "Data flows between all engines, creating a self-improving system that gets smarter with every interaction.",
                color: "gradient",
              },
            ].map((combo, index) => (
              <motion.div
                key={combo.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`feature-grid-item group ${combo.color === 'gradient' ? '!bg-gradient-to-br !from-emerald-pro-600/10 !to-emerald-pro-500/10' : ''}`}
              >
                {/* Connection Line Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                  combo.color === 'cyan' ? 'bg-emerald-pro-600' :
                  combo.color === 'violet' ? 'bg-emerald-pro-500' :
                  combo.color === 'mint' ? 'bg-emerald-pro-400' :
                  combo.color === 'orange' ? 'bg-energy-orange' :
                  'bg-gradient-to-r from-emerald-pro-600 to-emerald-pro-500'
                }`} />

                <h3 className={`text-xl font-sora font-semibold mb-3 group-hover:text-gradient transition-all ${
                  combo.color === 'cyan' ? 'text-emerald-pro-600' :
                  combo.color === 'violet' ? 'text-emerald-pro-500' :
                  combo.color === 'mint' ? 'text-emerald-pro-400' :
                  combo.color === 'orange' ? 'text-energy-orange' :
                  'text-light-text dark:text-white'
                }`}>
                  {combo.title}
                </h3>
                <p className="text-light-text-secondary dark:text-silver text-sm leading-relaxed group-hover:text-light-text dark:text-white/80 transition-colors">
                  {combo.description}
                </p>

                {/* Neural connection dots */}
                {combo.color === 'gradient' && (
                  <div className="absolute bottom-4 right-4 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-pro-600 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-emerald-pro-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-emerald-pro-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
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
