"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { industries } from "@/lib/content/industries";


export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section - Light Mode */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-electric-cyan/5 rounded-full blur-[150px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sora font-bold text-slate-900 mb-8 leading-tight">
              Industries We Serve
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Leverage our expertise in 12+ industries to target the right audience and acquire qualified B2B leads.
            </p>

            <Link href="/contact">
              <Button
                size="lg"
                className="bg-electric-cyan hover:bg-cyan-dark text-white font-semibold px-8 shadow-md hover:shadow-lg transition-all"
              >
                Book a Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* Trust Badges Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <p className="text-slate-500 text-sm mb-6">Trusted by B2B companies across industries</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                <div className="h-10 px-6 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-slate-600 text-sm">Clutch 5.0</span>
                </div>
                <div className="h-10 px-6 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                  <span className="text-slate-600 text-sm">G2 Leader</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Industries Grid */}
      <SectionWrapper variant="default" padding="xl">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <Link href={`/industries/${industry.id}`} className="block group h-full">
                    <div className="relative h-full p-8 rounded-2xl border border-slate-200 bg-white hover:border-electric-cyan/50 hover:shadow-md transition-all duration-300">
                      {/* Flat Icon Container */}
                      <div className="inline-flex p-3 rounded-xl border border-slate-200 bg-slate-50 mb-6">
                        <Icon className="h-6 w-6 text-slate-600" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-sora font-semibold text-slate-900 mb-3">
                        {industry.name}
                      </h3>

                      {/* Description Only */}
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {industry.shortDescription}
                      </p>

                      {/* Arrow - Single Accent Color */}
                      <div className="flex items-center gap-2 text-electric-cyan text-sm font-medium group-hover:gap-3 transition-all">
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
