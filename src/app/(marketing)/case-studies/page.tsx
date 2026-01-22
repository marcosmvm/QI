"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/content/case-studies";

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-mint/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-electric-cyan/15 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-mint/10 border border-neon-mint/20 mb-6">
              <TrendingUp className="w-4 h-4 text-neon-mint" />
              <span className="text-sm font-medium text-neon-mint">Success Stories</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              Real Results from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                Real Clients
              </span>
            </h1>

            <p className="text-xl text-silver max-w-2xl mx-auto mb-10">
              See how companies across industries have transformed their outbound with Quantum Insights.
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold px-8"
              >
                Get Similar Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/case-studies/${study.id}`} className="block group h-full">
                  <div className="relative h-full p-8 rounded-3xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-electric-cyan/40 transition-all duration-300 group-hover:shadow-[0_8px_40px_rgba(0,212,255,0.15)] group-hover:-translate-y-1">
                    {/* Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-cyan via-quantum-violet to-neon-mint rounded-t-3xl" />

                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1">
                        <span className="text-electric-cyan text-sm font-medium">{study.company}</span>
                        <p className="text-steel text-xs">{study.industry}</p>
                      </div>
                      <div className="flex gap-1">
                        {study.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-electric-cyan/10 text-electric-cyan text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-sora font-bold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-silver mb-6">{study.subtitle}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center p-3 rounded-xl bg-deep-space/50">
                          <p className="text-2xl font-sora font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                            {metric.value}
                          </p>
                          <p className="text-steel text-xs">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial Preview */}
                    {study.testimonial && (
                      <div className="border-t border-electric-cyan/10 pt-4">
                        <p className="text-silver text-sm italic line-clamp-2">
                          &ldquo;{study.testimonial.quote}&rdquo;
                        </p>
                        <p className="text-steel text-xs mt-2">
                          — {study.testimonial.author}, {study.testimonial.title}
                        </p>
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-electric-cyan text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      Read full case study
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Want to Be Our Next Success Story?"
        description="Book a call to discuss how we can deliver similar results for your business."
      />
    </>
  );
}
