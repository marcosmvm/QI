"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { engines, getEngineById } from "@/lib/content/engines";

interface EngineDetailPageProps {
  engineId: string;
}

const colorClasses = {
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/30",
    text: "text-electric-cyan",
    gradient: "from-electric-cyan to-cyan-dark",
    glow: "shadow-[0_0_60px_rgba(0,212,255,0.3)]",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/30",
    text: "text-quantum-violet",
    gradient: "from-quantum-violet to-purple-600",
    glow: "shadow-[0_0_60px_rgba(123,97,255,0.3)]",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/30",
    text: "text-neon-mint",
    gradient: "from-neon-mint to-emerald-500",
    glow: "shadow-[0_0_60px_rgba(0,255,178,0.3)]",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange to-orange-600",
    glow: "shadow-[0_0_60px_rgba(255,107,53,0.3)]",
  },
};

export function EngineDetailPage({ engineId }: EngineDetailPageProps) {
  const engine = getEngineById(engineId);

  if (!engine) {
    return <div>Engine not found</div>;
  }

  const currentIndex = engines.findIndex((e) => e.id === engineId);
  const prevEngine = currentIndex > 0 ? { id: engines[currentIndex - 1].id, name: engines[currentIndex - 1].name } : null;
  const nextEngine = currentIndex < engines.length - 1 ? { id: engines[currentIndex + 1].id, name: engines[currentIndex + 1].name } : null;

  const colors = colorClasses[engine.color];
  const Icon = engine.icon;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] ${colors.bg} rounded-full blur-[150px] opacity-50`} />

        <Container className="relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/engines"
              className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Engines
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border ${colors.glow}`}>
                  <Icon className={`h-10 w-10 ${colors.text}`} />
                </div>
                <div>
                  <span className={`text-xs font-mono ${colors.text}`}>ENGINE {engine.codename}</span>
                  <h1 className="text-4xl md:text-5xl font-sora font-bold text-white">
                    {engine.name}
                  </h1>
                </div>
              </div>

              <p className={`text-xl ${colors.text} font-medium mb-4`}>
                {engine.tagline}
              </p>

              <p className="text-lg text-silver mb-8 leading-relaxed">
                {engine.longDescription}
              </p>

              <Link href="/contact">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold px-8`}
                >
                  See It in Action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {engine.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 text-center`}
                  >
                    <p className={`text-4xl font-sora font-bold ${colors.text}`}>
                      {stat.value}
                    </p>
                    <p className="text-steel text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              Key{" "}
              <span className={colors.text}>Features</span>
            </h2>
            <p className="text-lg text-silver">
              Everything {engine.name} does to optimize your outbound campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engine.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/50 to-deep-space/50 hover:border-opacity-60 transition-all`}
              >
                <h3 className="text-lg font-sora font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Use Cases Section */}
      <SectionWrapper variant="dark">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
                Perfect For
              </h2>
              <p className="text-lg text-silver mb-8">
                {engine.name} is ideal for teams who need to:
              </p>

              <ul className="space-y-4">
                {engine.useCases.map((useCase, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`h-6 w-6 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className="text-silver">{useCase}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-8 rounded-3xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90`}
            >
              <div className={`p-4 rounded-xl ${colors.bg} w-fit mb-6`}>
                <Icon className={`h-12 w-12 ${colors.text}`} />
              </div>
              <h3 className="text-2xl font-sora font-bold text-white mb-4">
                Ready to deploy {engine.name}?
              </h3>
              <p className="text-silver mb-6">
                Our team will set up and configure {engine.name} specifically for your use case. See results in weeks, not months.
              </p>
              <Link href="/contact">
                <Button className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold w-full`}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Navigation Between Engines */}
      <SectionWrapper variant="default">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevEngine ? (
              <Link
                href={`/engines/${prevEngine.id}`}
                className="flex items-center gap-3 text-steel hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="text-sm block">Previous</span>
                  <span className="font-semibold">{prevEngine.name}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/engines"
              className="text-electric-cyan hover:text-cyan-light transition-colors font-medium"
            >
              View All Engines
            </Link>

            {nextEngine ? (
              <Link
                href={`/engines/${nextEngine.id}`}
                className="flex items-center gap-3 text-steel hover:text-white transition-colors group text-right"
              >
                <span>
                  <span className="text-sm block">Next</span>
                  <span className="font-semibold">{nextEngine.name}</span>
                </span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
