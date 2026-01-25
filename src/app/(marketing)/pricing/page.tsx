"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, DollarSign, ChevronDown, Sparkles, Zap } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { pricingTiers, pricingFaqs } from "@/lib/content/pricing";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-pro-400/10 rounded-full blur-[150px] animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-500/15 rounded-full blur-[120px] animate-orb-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-pro-600/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="tech-badge mb-8"
            >
              <DollarSign className="w-4 h-4 text-emerald-pro-400" />
              <span className="text-sm font-medium text-emerald-pro-400">Transparent Pricing</span>
              <Sparkles className="w-4 h-4 text-emerald-pro-400" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-slate-900 dark:text-white mb-8">
              Invest in{" "}
              <span className="headline-underline text-gradient">
                Predictable Growth
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Choose the plan that matches your growth goals. All plans include <span className="text-emerald-pro-600">setup</span>, <span className="text-emerald-pro-500">training</span>, and <span className="text-emerald-pro-400">ongoing optimization</span>.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Pricing Cards - Premium Style */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "pricing-card-premium relative p-8 lg:p-10",
                  tier.popular && "popular md:scale-105 z-10"
                )}
              >
                {/* Popular Badge - Enhanced */}
                {tier.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-pro-600 to-emerald-pro-500 text-white text-sm font-bold shadow-lg shadow-emerald-pro-600/30 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    Most Popular
                  </motion.div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl lg:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{tier.tagline}</p>
                </div>

                {/* Price - Enhanced */}
                <div className="text-center mb-10">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={cn(
                      "text-5xl lg:text-6xl font-sora font-bold",
                      tier.popular ? "text-gradient" : "text-emerald-pro-600"
                    )}>
                      {tier.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-300 text-lg">{tier.priceSubtext}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-3">{tier.description}</p>
                </div>

                {/* Features - Enhanced */}
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + featureIndex * 0.05 }}
                      className={cn(
                        "flex items-start gap-3 group",
                        !feature.included && "opacity-40"
                      )}
                    >
                      {feature.included ? (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-pro-400/10 border border-emerald-pro-400/30 flex items-center justify-center mt-0.5 group-hover:bg-emerald-pro-400/20 transition-colors">
                          <Check className="h-3.5 w-3.5 text-emerald-pro-400" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-graphite/20 border border-slate-300 dark:border-slate-600/30 flex items-center justify-center mt-0.5">
                          <X className="h-3.5 w-3.5 text-graphite" />
                        </div>
                      )}
                      <span className={cn(
                        "text-sm leading-relaxed",
                        feature.included ? "text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" : "text-graphite"
                      )}>
                        {feature.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA - Enhanced */}
                <Link href="/contact" className="block">
                  {tier.popular ? (
                    <button className="cta-magnetic w-full">
                      {tier.cta}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <Button
                      className="w-full font-semibold bg-transparent border border-emerald-pro-600/30 hover:border-emerald-pro-600/60 hover:bg-emerald-pro-600/10 text-slate-900 dark:text-white hover:text-emerald-pro-600 transition-all py-6"
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Comparison Note - Enhanced */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="holographic-card p-10 lg:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-pro-500/10 border border-emerald-pro-500/30 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-emerald-pro-500" />
            </motion.div>
            <h3 className="text-2xl lg:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-4">
              Not sure which plan is right?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              Book a call with our team and we&apos;ll help you determine the best fit based on your goals, target market, and current pipeline.
            </p>
            <button className="cta-magnetic">
              Schedule a Consultation
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* FAQ Section - Enhanced */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Pricing{" "}
              <span className="headline-underline text-gradient">
                FAQ
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion.Root type="single" collapsible className="space-y-4">
              {pricingFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Accordion.Item
                    value={`item-${index}`}
                    className="group feature-grid-item !p-0 overflow-hidden data-[state=open]:!border-emerald-pro-600/30"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-6 text-left hover:bg-emerald-pro-600/5 transition-colors">
                        <span className="text-slate-900 dark:text-white font-medium pr-4 text-lg">{faq.question}</span>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-pro-600/10 border border-emerald-pro-600/20 flex items-center justify-center group-hover:bg-emerald-pro-600/20 transition-colors">
                          <ChevronDown className="h-4 w-4 text-emerald-pro-600 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </div>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-300 dark:border-slate-600/30 pt-4">
                        {faq.answer}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                </motion.div>
              ))}
            </Accordion.Root>
          </motion.div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Ready to Get Started?"
        description="Book a call to discuss which plan is right for your business and see a custom ROI projection."
      />
    </>
  );
}
