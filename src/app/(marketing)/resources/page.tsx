"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Video, Calculator, Download } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";

const resources = [
  {
    title: "The Ultimate Cold Email Playbook",
    description: "50+ pages of strategies, templates, and best practices for cold email success.",
    type: "Guide",
    icon: FileText,
  },
  {
    title: "ICP Worksheet Template",
    description: "Define your Ideal Customer Profile with our comprehensive worksheet.",
    type: "Template",
    icon: Download,
  },
  {
    title: "Deliverability Checklist",
    description: "Ensure your emails reach the inbox with this pre-launch checklist.",
    type: "Checklist",
    icon: FileText,
  },
  {
    title: "ROI Calculator",
    description: "Calculate the potential return on investment from AI-powered lead generation.",
    type: "Tool",
    icon: Calculator,
  },
  {
    title: "Outbound Masterclass",
    description: "A comprehensive video series on building a successful outbound program.",
    type: "Video Series",
    icon: Video,
  },
  {
    title: "Email Sequence Templates",
    description: "Proven email sequences across industries and use cases.",
    type: "Templates",
    icon: Download,
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-quantum-violet/20 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-violet/10 border border-quantum-violet/20 mb-6">
              <Download className="w-4 h-4 text-quantum-violet" />
              <span className="text-sm font-medium text-quantum-violet">Free Resources</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              Resources to Accelerate{" "}
              <span className="gradient-text-cyan-violet">
                Your Growth
              </span>
            </h1>
            <p className="text-xl text-silver max-w-2xl mx-auto">
              Guides, templates, and tools to help you master B2B lead generation.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Resources Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/contact" className="block group h-full">
                  <div className="h-full p-6 rounded-2xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-electric-cyan/40 transition-all">
                    {/* Icon */}
                    <div className="inline-flex p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/20 mb-4">
                      <resource.icon className="h-6 w-6 text-electric-cyan" />
                    </div>

                    {/* Type */}
                    <span className="inline-block px-3 py-1 rounded-full bg-quantum-violet/10 text-quantum-violet text-xs font-medium mb-3">
                      {resource.type}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-sora font-semibold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                      {resource.title}
                    </h2>

                    {/* Description */}
                    <p className="text-silver text-sm mb-4">
                      {resource.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-electric-cyan text-sm font-medium group-hover:gap-3 transition-all">
                      Download free
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
        title="Need Help Implementing?"
        description="Our team can help you put these strategies into action. Book a call to get started."
      />
    </>
  );
}
