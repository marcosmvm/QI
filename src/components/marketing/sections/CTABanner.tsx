"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/marketing/layout/Container";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTABanner({
  title = "Ready to Transform Your Outbound?",
  description = "Book a strategy call with our team to see how Quantum Insights can fill your pipeline with qualified meetings.",
  primaryCTA = { text: "Book a Strategy Call", href: "/contact" },
  secondaryCTA = { text: "View Pricing", href: "/pricing" },
}: CTABannerProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-midnight-blue">
      {/* Subtle Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-electric-cyan/10 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-quantum-violet/10 rounded-full blur-[80px]" />

      {/* Border Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-graphite to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-graphite to-transparent" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/30 mb-8">
            <Calendar className="w-8 h-8 text-electric-cyan" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-white mb-6">
            {title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-steel mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryCTA.href}>
              <Button
                size="lg"
                className="bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold px-8 py-6 text-lg shadow-lg shadow-electric-cyan/20 hover:shadow-electric-cyan/30 transition-all"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={secondaryCTA.href}>
              <Button
                variant="outline"
                size="lg"
                className="border-graphite hover:border-electric-cyan/50 text-white hover:text-electric-cyan bg-transparent px-8 py-6 text-lg"
              >
                {secondaryCTA.text}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
