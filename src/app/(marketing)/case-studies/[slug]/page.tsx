"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, CheckCircle } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { getCaseStudyById, caseStudies } from "@/lib/content/case-studies";

export default function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const study = getCaseStudyById(resolvedParams.slug);

  if (!study) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl text-white">Case study not found</h1>
        <Link href="/case-studies" className="text-electric-cyan hover:underline mt-4 block">
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-electric-cyan/10 rounded-full blur-[150px] opacity-50" />

        <Container className="relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              All Case Studies
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Company */}
            <p className="text-electric-cyan text-lg font-medium mb-2">{study.company}</p>
            <p className="text-steel mb-4">{study.industry}</p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              {study.title}
            </h1>

            <p className="text-xl text-silver mb-10">
              {study.subtitle}
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

      {/* Metrics Bar */}
      <div className="bg-gradient-to-r from-electric-cyan/10 via-quantum-violet/10 to-neon-mint/10 py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {study.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-sora font-bold gradient-text-cyan-violet">
                  {metric.value}
                </p>
                <p className="text-steel mt-1">{metric.label}</p>
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
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-white mb-6">
                The <span className="text-energy-orange">Challenge</span>
              </h2>
              <p className="text-lg text-silver leading-relaxed">
                {study.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-white mb-6">
                The <span className="text-electric-cyan">Solution</span>
              </h2>
              <p className="text-lg text-silver leading-relaxed">
                {study.solution}
              </p>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-sora font-bold text-white mb-6">
                The <span className="text-neon-mint">Results</span>
              </h2>
              <p className="text-lg text-silver leading-relaxed">
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
              transition={{ duration: 0.5 }}
              className="relative p-8 md:p-12 rounded-3xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8 p-4 rounded-2xl bg-gradient-to-br from-electric-cyan/20 to-quantum-violet/20 border border-electric-cyan/30">
                <Quote className="h-6 w-6 text-electric-cyan" />
              </div>

              <blockquote className="text-2xl md:text-3xl text-white font-medium leading-relaxed mt-4 mb-8">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-cyan/30 to-quantum-violet/30 border border-electric-cyan/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {study.testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white">{study.testimonial.author}</p>
                  <p className="text-steel text-sm">{study.testimonial.title}</p>
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
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              Key <span className="text-electric-cyan">Takeaways</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {study.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl border border-electric-cyan/20 bg-midnight-blue/30"
              >
                <CheckCircle className="h-6 w-6 text-neon-mint flex-shrink-0" />
                <div>
                  <p className="text-2xl font-sora font-bold text-electric-cyan">{metric.value}</p>
                  <p className="text-silver">{metric.label}</p>
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
                className="flex items-center gap-3 text-steel hover:text-white transition-colors group"
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
              className="text-electric-cyan hover:text-cyan-light transition-colors font-medium"
            >
              View All Case Studies
            </Link>

            {nextStudy ? (
              <Link
                href={`/case-studies/${nextStudy.id}`}
                className="flex items-center gap-3 text-steel hover:text-white transition-colors group text-right"
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
