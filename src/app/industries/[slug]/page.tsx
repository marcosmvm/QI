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
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/30",
    text: "text-electric-cyan",
    gradient: "from-electric-cyan to-cyan-dark",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/30",
    text: "text-quantum-violet",
    gradient: "from-quantum-violet to-purple-600",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/30",
    text: "text-neon-mint",
    gradient: "from-neon-mint to-emerald-500",
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
        <h1 className="text-2xl text-white">Industry not found</h1>
        <Link href="/industries" className="text-electric-cyan hover:underline mt-4 block">
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
              href="/industries"
              className="inline-flex items-center gap-2 text-steel hover:text-white transition-colors"
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
              transition={{ duration: 0.5 }}
            >
              <div className={`inline-flex p-3 rounded-xl ${colors.bg} ${colors.border} border mb-6`}>
                <Icon className={`h-8 w-8 ${colors.text}`} />
              </div>

              <h1 className="text-4xl md:text-5xl font-sora font-bold text-white mb-4">
                {industry.name}
              </h1>

              <p className={`text-xl ${colors.text} font-medium mb-4`}>
                {industry.tagline}
              </p>

              <p className="text-lg text-silver mb-8 leading-relaxed">
                {industry.longDescription}
              </p>

              <Link href="/contact">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold px-8`}
                >
                  Get Started
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
                {industry.stats.map((stat) => (
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

      {/* Challenges Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
                Challenges in{" "}
                <span className={colors.text}>{industry.name}</span>
              </h2>
              <p className="text-lg text-silver mb-8">
                We understand the unique obstacles you face when selling to this market.
              </p>

              <div className="space-y-4">
                {industry.challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${colors.border} bg-midnight-blue/30`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className={`h-5 w-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <div>
                        <h4 className="text-white font-semibold">{challenge.title}</h4>
                        <p className="text-silver text-sm">{challenge.description}</p>
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
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
                Our{" "}
                <span className={colors.text}>Solutions</span>
              </h2>
              <p className="text-lg text-silver mb-8">
                How we help {industry.name.toLowerCase()} companies overcome these challenges.
              </p>

              <ul className="space-y-4">
                {industry.solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`h-6 w-6 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className="text-silver">{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Target Titles Section */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              Who We{" "}
              <span className={colors.text}>Target</span>
            </h2>
            <p className="text-lg text-silver">
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
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-4 py-2 rounded-full ${colors.bg} ${colors.border} border ${colors.text} font-medium`}
              >
                {title}
              </motion.span>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <SectionWrapper variant="default">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
                Case Studies
              </h2>
              <p className="text-lg text-silver">
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/case-studies/${study.id}`} className="block group">
                    <div className={`p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-opacity-60 transition-all`}>
                      <p className="text-steel text-sm mb-2">{study.company}</p>
                      <h3 className="text-xl font-sora font-semibold text-white mb-3">
                        {study.title}
                      </h3>
                      <p className="text-silver text-sm mb-4">{study.subtitle}</p>

                      <div className="flex gap-4 mb-4">
                        {study.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <p className={`text-lg font-sora font-bold ${colors.text}`}>
                              {metric.value}
                            </p>
                            <p className="text-steel text-xs">{metric.label}</p>
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
                className="flex items-center gap-3 text-steel hover:text-white transition-colors group"
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
              className="text-electric-cyan hover:text-cyan-light transition-colors font-medium"
            >
              View All Industries
            </Link>

            {nextIndustry ? (
              <Link
                href={`/industries/${nextIndustry.id}`}
                className="flex items-center gap-3 text-steel hover:text-white transition-colors group text-right"
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
