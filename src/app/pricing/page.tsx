"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, X, DollarSign, ChevronDown } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-quantum-violet/10 rounded-full blur-[100px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-mint/10 border border-neon-mint/30 mb-6">
              <DollarSign className="w-4 h-4 text-neon-mint" />
              <span className="text-sm font-medium text-neon-mint">Transparent Pricing</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              Invest in{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
                Predictable Growth
              </span>
            </h1>

            <p className="text-xl text-steel max-w-2xl mx-auto">
              Choose the plan that matches your growth goals. All plans include setup, training, and ongoing optimization.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative p-8 rounded-3xl border bg-midnight-blue transition-all duration-300",
                  tier.popular
                    ? "border-electric-cyan shadow-lg shadow-electric-cyan/20 scale-105 z-10"
                    : "border-graphite hover:border-electric-cyan/50"
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-electric-cyan text-deep-space text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-sora font-bold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-steel text-sm">{tier.tagline}</p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-sora font-bold text-electric-cyan">
                      {tier.price}
                    </span>
                    <span className="text-steel">{tier.priceSubtext}</span>
                  </div>
                  <p className="text-steel text-sm mt-2">{tier.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={cn(
                        "flex items-start gap-3",
                        !feature.included && "opacity-50"
                      )}
                    >
                      {feature.included ? (
                        <Check className="h-5 w-5 text-electric-cyan flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-graphite flex-shrink-0 mt-0.5" />
                      )}
                      <span className={cn(
                        "text-sm",
                        feature.included ? "text-silver" : "text-graphite"
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="/contact">
                  <Button
                    className={cn(
                      "w-full font-semibold",
                      tier.popular
                        ? "bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space"
                        : "bg-transparent border border-graphite hover:border-electric-cyan/50 hover:text-electric-cyan text-white"
                    )}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Comparison Note */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center p-8 rounded-3xl border border-graphite bg-midnight-blue"
          >
            <h3 className="text-2xl font-sora font-bold text-white mb-4">
              Not sure which plan is right?
            </h3>
            <p className="text-steel mb-6">
              Book a call with our team and we&apos;ll help you determine the best fit based on your goals, target market, and current pipeline.
            </p>
            <Link href="/contact">
              <Button className="bg-electric-cyan hover:bg-electric-cyan/90 text-deep-space font-semibold">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper variant="default">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              Pricing{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-quantum-violet bg-clip-text text-transparent">
                FAQ
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion.Root type="single" collapsible className="space-y-4">
              {pricingFaqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className="group rounded-xl border border-graphite bg-midnight-blue/50 overflow-hidden data-[state=open]:border-electric-cyan/30 transition-colors"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left">
                      <span className="text-white font-medium pr-4">{faq.question}</span>
                      <ChevronDown className="h-5 w-5 text-electric-cyan shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-5 text-steel leading-relaxed">
                      {faq.answer}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
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
