"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { getIndustryById, industries } from "@/lib/content/industries";
import { getCaseStudiesByIndustry } from "@/lib/content/case-studies";

const colorClasses = {
  "emerald-pro-600": {
    bg: "bg-emerald-pro-600/10",
    border: "border-emerald-pro-600/30",
    text: "text-emerald-pro-600",
    gradient: "from-emerald-pro-600 to-cyan-dark",
  },
  "emerald-pro-500": {
    bg: "bg-emerald-pro-500/10",
    border: "border-emerald-pro-500/30",
    text: "text-emerald-pro-500",
    gradient: "from-emerald-pro-500 to-purple-600",
  },
  "emerald-pro-400": {
    bg: "bg-emerald-pro-400/10",
    border: "border-emerald-pro-400/30",
    text: "text-emerald-pro-400",
    gradient: "from-emerald-pro-400 to-emerald-500",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange to-orange-600",
  },
};

export default function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const industry = getIndustryById(resolvedParams.slug);
  const relatedCaseStudies = getCaseStudiesByIndustry(resolvedParams.slug);

  if (!industry) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl text-slate-900 dark:text-white">Industry not found</h1>
        <Link href="/industries" className="text-emerald-pro-600 hover:underline mt-4 block">
          View all industries
        </Link>
      </Container>
    );
  }

  const colors = colorClasses[industry.color];
  const Icon = industry.icon;

  const currentIndex = industries.findIndex((i) => i.id === industry.id);
  const prevIndustry = currentIndex > 0 ? industries[currentIndex - 1] : null;
  const nextIndustry = currentIndex < industries.length - 1 ? industries[currentIndex + 1] : null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        {/* Enhanced Ambient Orbs */}
        <div className={`absolute top-1/4 left-1/3 w-[600px] h-[600px] ${colors.bg} rounded-full blur-[150px] opacity-50`} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-pro-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-emerald-pro-600/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Industries
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tech Badge */}
              <div className="tech-badge mb-6">
                <Icon className={`h-4 w-4 ${colors.text}`} />
                <span className={`text-sm font-medium ${colors.text}`}>
                  Industry Expertise
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-4">
                <span className="headline-underline text-gradient">{industry.name}</span>
              </h1>

              <p className={`text-xl ${colors.text} font-medium mb-4`}>
                {industry.tagline}
              </p>

              <p className="text-lg text-slate-900 dark:text-slate-200 mb-8 leading-relaxed">
                {industry.longDescription}
              </p>

              <Link href="/contact" className="cta-magnetic inline-flex">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-4">
                {industry.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 text-center`}
                  >
                    <p className={`text-4xl font-sora font-bold ${colors.text}`}>
                      {stat.value}
                    </p>
                    <p className="text-slate-900 dark:text-slate-300 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Challenges Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                Challenges in{" "}
                <span className={colors.text}>{industry.name}</span>
              </h2>
              <p className="text-lg text-slate-900 dark:text-slate-200 mb-8">
                We understand the unique obstacles you face when selling to this market.
              </p>

              <div className="space-y-4">
                {industry.challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`p-4 rounded-xl border ${colors.border} bg-light-bg-secondary dark:bg-midnight-blue/30`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`h-5 w-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className="text-slate-900 dark:text-white font-semibold">{challenge.title}</h4>
                        <p className="text-slate-900 dark:text-slate-200 text-sm">{challenge.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                Our{" "}
                <span className={colors.text}>Solutions</span>
              </h2>
              <p className="text-lg text-slate-900 dark:text-slate-200 mb-8">
                How we help {industry.name.toLowerCase()} companies overcome these challenges.
              </p>

              <ul className="space-y-4">
                {industry.solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`h-6 w-6 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className="text-slate-900 dark:text-slate-200">{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Target Titles Section */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Who We{" "}
              <span className={colors.text}>Target</span>
            </h2>
            <p className="text-lg text-slate-900 dark:text-slate-200">
              The decision-makers we help you reach in {industry.name.toLowerCase()}.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {industry.targetTitles.map((title, index) => (
              <motion.span
                key={title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`px-4 py-2 rounded-full ${colors.bg} ${colors.border} border ${colors.text} font-medium`}
              >
                {title}
              </motion.span>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <SectionWrapper variant="default">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                Case Studies
              </h2>
              <p className="text-lg text-slate-900 dark:text-slate-200">
                See how we&apos;ve helped other {industry.name.toLowerCase()} companies.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedCaseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/case-studies/${study.id}`} className="block group">
                    <div className={`p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-opacity-60 transition-all`}>
                      <p className="text-slate-900 dark:text-slate-300 text-sm mb-2">{study.company}</p>
                      <h3 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-3">
                        {study.title}
                      </h3>
                      <p className="text-slate-900 dark:text-slate-200 text-sm mb-4">{study.subtitle}</p>

                      <div className="flex gap-4 mb-4">
                        {study.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <p className={`text-lg font-sora font-bold ${colors.text}`}>
                              {metric.value}
                            </p>
                            <p className="text-slate-900 dark:text-slate-300 text-xs">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 ${colors.text} text-sm font-medium group-hover:gap-3 transition-all`}>
                        Read case study
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </SectionWrapper>
      )}

      {/* Navigation Between Industries */}
      <SectionWrapper variant="dark">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevIndustry ? (
              <Link
                href={`/industries/${prevIndustry.id}`}
                className="flex items-center gap-3 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="text-sm block">Previous</span>
                  <span className="font-semibold">{prevIndustry.name}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/industries"
              className="text-emerald-pro-600 hover:text-cyan-light transition-colors font-medium"
            >
              View All Industries
            </Link>

            {nextIndustry ? (
              <Link
                href={`/industries/${nextIndustry.id}`}
                className="flex items-center gap-3 text-slate-900 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group text-right"
              >
                <span>
                  <span className="text-sm block">Next</span>
                  <span className="font-semibold">{nextIndustry.name}</span>
                </span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title={`Ready to Grow in ${industry.name}?`}
        description="Let's discuss how our industry expertise can accelerate your pipeline."
      />
    </>
  );
}
