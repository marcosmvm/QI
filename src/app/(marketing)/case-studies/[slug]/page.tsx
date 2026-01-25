"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, CheckCircle } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { getCaseStudyById, caseStudies } from "@/lib/content/case-studies";

export default function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const study = getCaseStudyById(resolvedParams.slug);

  if (!study) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl text-slate-900 dark:text-white">Case study not found</h1>
        <Link href="/case-studies" className="text-emerald-pro-600 hover:underline mt-4 block">
          View all case studies
        </Link>
      </Container>
    );
  }

  const currentIndex = caseStudies.findIndex((s) => s.id === study.id);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-pro-600/10 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-pro-500/15 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag) => (
                <div key={tag} className="tech-badge">
                  <span className="text-sm font-medium text-emerald-pro-600">{tag}</span>
                </div>
              ))}
            </div>

            {/* Company */}
            <p className="text-emerald-pro-600 text-lg font-medium mb-2">{study.company}</p>
            <p className="text-slate-700 dark:text-slate-400 mb-4">{study.industry}</p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              <span className="headline-underline">{study.title}</span>
            </h1>

            <p className="text-xl text-slate-700 dark:text-slate-200 mb-10">
              {study.subtitle}
            </p>

            <Link href="/contact">
              <button className="cta-magnetic">
                Get Similar Results
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Metrics Bar */}
      <div className="bg-gradient-to-r from-emerald-pro-600/10 via-emerald-pro-500/10 to-emerald-pro-400/10 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-sora font-bold text-gradient">
                  {metric.value}
                </p>
                <p className="text-slate-700 dark:text-slate-400 mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Challenge / Solution / Results */}
      <SectionWrapper variant="default">
        <Container size="md">
          <div className="space-y-16">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                The <span className="text-energy-orange">Challenge</span>
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {study.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                The <span className="text-emerald-pro-600">Solution</span>
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {study.solution}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                The <span className="text-emerald-pro-400">Results</span>
              </h2>
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {study.results}
              </p>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Testimonial */}
      {study.testimonial && (
        <SectionWrapper variant="dark">
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-12 rounded-3xl border border-emerald-pro-600/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 p-4 rounded-2xl bg-gradient-to-br from-emerald-pro-600/20 to-emerald-pro-500/20 border border-emerald-pro-600/30">
                <Quote className="h-6 w-6 text-emerald-pro-600" />
              </div>

              <blockquote className="text-2xl md:text-3xl text-slate-900 dark:text-white font-medium leading-relaxed mt-4 mb-8">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-pro-600/30 to-emerald-pro-500/30 border border-emerald-pro-600/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {study.testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{study.testimonial.author}</p>
                  <p className="text-slate-700 dark:text-slate-400 text-sm">{study.testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          </Container>
        </SectionWrapper>
      )}

      {/* Key Takeaways */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Key <span className="text-emerald-pro-600">Takeaways</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {study.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 p-6 rounded-xl border border-emerald-pro-600/20 bg-light-bg-secondary dark:bg-midnight-blue/30"
              >
                <CheckCircle className="h-6 w-6 text-emerald-pro-400 flex-shrink-0" />
                <div>
                  <p className="text-2xl font-sora font-bold text-emerald-pro-600">{metric.value}</p>
                  <p className="text-slate-700 dark:text-slate-200">{metric.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Navigation Between Case Studies */}
      <SectionWrapper variant="dark">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevStudy ? (
              <Link
                href={`/case-studies/${prevStudy.id}`}
                className="flex items-center gap-3 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="text-sm block">Previous</span>
                  <span className="font-semibold">{prevStudy.company}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/case-studies"
              className="text-emerald-pro-600 hover:text-cyan-light transition-colors font-medium"
            >
              View All Case Studies
            </Link>

            {nextStudy ? (
              <Link
                href={`/case-studies/${nextStudy.id}`}
                className="flex items-center gap-3 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group text-right"
              >
                <span>
                  <span className="text-sm block">Next</span>
                  <span className="font-semibold">{nextStudy.company}</span>
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
