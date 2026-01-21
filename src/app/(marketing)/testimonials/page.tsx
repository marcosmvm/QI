"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Quantum Insights transformed our outbound. We went from 2-3 meetings a month to 15-20 qualified opportunities. The AI engines are genuinely impressive.",
    author: "Sarah Chen",
    title: "VP of Sales",
    company: "TechScale SaaS",
    metric: { value: "8x", label: "More Meetings" },
  },
  {
    quote: "Finally, a lead gen partner that actually delivers. Their deliverability rates are the best we've ever seen, and the transparency is refreshing.",
    author: "Michael Torres",
    title: "CEO",
    company: "DataFlow Analytics",
    metric: { value: "96%", label: "Deliverability" },
  },
  {
    quote: "The ROI was obvious within the first month. Quantum Insights pays for itself many times over with the quality of meetings they book.",
    author: "Jennifer Park",
    title: "Head of Growth",
    company: "CloudNine Solutions",
    metric: { value: "340%", label: "ROI" },
  },
  {
    quote: "We never thought we could compete for enterprise healthcare contracts. Quantum Insights made it possible.",
    author: "Dr. Robert Kim",
    title: "CEO",
    company: "MedTech Health",
    metric: { value: "3", label: "F500 Contracts" },
  },
  {
    quote: "The pipeline numbers we built with Quantum Insights were crucial to closing our Series B.",
    author: "Amanda Liu",
    title: "Founder & CEO",
    company: "PaymentPro",
    metric: { value: "$30M", label: "Series B" },
  },
  {
    quote: "Finally found a way to reach plant managers without flying to every facility. Game changer for our sales process.",
    author: "Tom Henderson",
    title: "VP Sales",
    company: "IndustrialTech",
    metric: { value: "15", label: "Active Pilots" },
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-mint/20 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              What Our Clients{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                Say About Us
              </span>
            </h1>
            <p className="text-xl text-silver max-w-2xl mx-auto">
              Don&apos;t just take our word for it—hear from the companies we&apos;ve helped grow.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 rounded-3xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 p-3 rounded-xl bg-gradient-to-br from-electric-cyan/20 to-quantum-violet/20 border border-electric-cyan/30">
                  <Quote className="h-5 w-5 text-electric-cyan" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-electric-cyan text-electric-cyan" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-white font-medium leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author & Metric */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-steel text-sm">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-sora font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                      {testimonial.metric.value}
                    </p>
                    <p className="text-steel text-xs">{testimonial.metric.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-sora font-bold text-white mb-4">
              Ready to Join Them?
            </h2>
            <p className="text-silver mb-8">
              See detailed case studies showing exactly how we achieved these results.
            </p>
            <Link href="/case-studies">
              <Button className="bg-gradient-to-r from-electric-cyan to-cyan-dark hover:from-cyan-light hover:to-electric-cyan text-deep-space font-semibold">
                View Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner />
    </>
  );
}
