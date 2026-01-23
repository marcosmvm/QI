"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Video, Calculator, Download, Zap } from "lucide-react";
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
              <Download className="w-4 h-4 text-emerald-pro-500" />
              <span className="text-sm font-medium text-emerald-pro-500">Free Resources</span>
              <Zap className="w-4 h-4 text-emerald-pro-500" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-light-text dark:text-white mb-8">
              Resources to Accelerate{" "}
              <span className="headline-underline gradient-text-cyan-violet block mt-2">
                Your Growth
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-light-text-secondary/90 dark:text-silver/90 max-w-3xl mx-auto leading-relaxed">
              Guides, templates, and tools to help you <span className="text-emerald-pro-500 font-semibold">master B2B lead generation</span>.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Resources Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {resources.map((resource, index) => {
              const iconColors = ['cyan', 'violet', 'mint', 'orange', 'cyan', 'violet'];
              const iconColor = iconColors[index % iconColors.length];
              const textColorClass = iconColor === 'cyan' ? 'text-emerald-pro-600' :
                                    iconColor === 'violet' ? 'text-emerald-pro-500' :
                                    iconColor === 'mint' ? 'text-emerald-pro-400' : 'text-energy-orange';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href="/contact" className="block group h-full">
                    <div className="feature-grid-item h-full">
                      {/* Icon */}
                      <div className={`icon-container-animated ${iconColor} mb-4`}>
                        <resource.icon className={`h-6 w-6 ${textColorClass}`} />
                      </div>

                      {/* Type */}
                      <span className="inline-block px-3 py-1 rounded-full bg-emerald-pro-500/10 text-emerald-pro-500 text-xs font-medium mb-3">
                        {resource.type}
                      </span>

                      {/* Title */}
                      <h2 className="text-xl font-sora font-semibold text-light-text dark:text-white mb-2 group-hover:text-gradient transition-all">
                        {resource.title}
                      </h2>

                      {/* Description */}
                      <p className="text-light-text-secondary dark:text-silver text-sm mb-4 group-hover:text-light-text dark:group-hover:text-white/80 transition-colors">
                        {resource.description}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-emerald-pro-600 text-sm font-medium group-hover:gap-3 transition-all">
                        Download free
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
        title="Need Help Implementing?"
        description="Our team can help you put these strategies into action. Book a call to get started."
      />
    </>
  );
}
