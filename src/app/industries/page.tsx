"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { industries } from "@/lib/content/industries";

const colorClasses = {
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/30",
    text: "text-electric-cyan",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/30",
    text: "text-quantum-violet",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/30",
    text: "text-neon-mint",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-quantum-violet/15 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 mb-6">
              <Building2 className="w-4 h-4 text-electric-cyan" />
              <span className="text-sm font-medium text-electric-cyan">Industry Expertise</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              Lead Generation for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                Every Industry
              </span>
            </h1>

            <p className="text-xl text-silver max-w-2xl mx-auto mb-10">
              Specialized strategies and messaging for your specific market. We&apos;ve helped companies across 12+ industries build predictable pipelines.
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold px-8"
              >
                Find Your Industry
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Industries Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => {
              const colors = colorClasses[industry.color];
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link href={`/industries/${industry.id}`} className="block group h-full">
                    <div className={`relative h-full p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-opacity-60 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.1)]`}>
                      {/* Icon */}
                      <div className={`inline-flex p-3 rounded-xl ${colors.bg} ${colors.border} border mb-4`}>
                        <Icon className={`h-6 w-6 ${colors.text}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-sora font-semibold text-white mb-2">
                        {industry.name}
                      </h3>
                      <p className={`text-sm ${colors.text} mb-3`}>{industry.tagline}</p>
                      <p className="text-silver text-sm leading-relaxed mb-4">
                        {industry.shortDescription}
                      </p>

                      {/* Stats Preview */}
                      <div className="flex gap-4 mb-4">
                        {industry.stats.slice(0, 2).map((stat) => (
                          <div key={stat.label}>
                            <p className={`text-lg font-sora font-bold ${colors.text}`}>
                              {stat.value}
                            </p>
                            <p className="text-steel text-xs">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Learn More */}
                      <div className={`flex items-center gap-2 ${colors.text} text-sm font-medium group-hover:gap-3 transition-all`}>
                        Learn more
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Don't See Your Industry?"
        description="We've worked with companies across dozens of verticals. Let's discuss how we can help your specific market."
      />
    </>
  );
}
