"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronDown, Sparkles } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/lib/content/services";

interface ServiceDetailPageProps {
  serviceId: string;
}

const colorClasses = {
  "emerald-pro-600": {
    bg: "bg-emerald-pro-600/10",
    border: "border-emerald-pro-600/30",
    text: "text-emerald-pro-600",
    gradient: "from-emerald-pro-600 to-cyan-dark",
    glow: "shadow-[0_0_60px_rgba(0,212,255,0.3)]",
    iconBg: "cyan",
  },
  "emerald-pro-500": {
    bg: "bg-emerald-pro-500/10",
    border: "border-emerald-pro-500/30",
    text: "text-emerald-pro-500",
    gradient: "from-emerald-pro-500 to-purple-600",
    glow: "shadow-[0_0_60px_rgba(123,97,255,0.3)]",
    iconBg: "violet",
  },
  "emerald-pro-400": {
    bg: "bg-emerald-pro-400/10",
    border: "border-emerald-pro-400/30",
    text: "text-emerald-pro-400",
    gradient: "from-emerald-pro-400 to-emerald-500",
    glow: "shadow-[0_0_60px_rgba(0,255,178,0.3)]",
    iconBg: "mint",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange to-orange-600",
    glow: "shadow-[0_0_60px_rgba(255,107,53,0.3)]",
    iconBg: "orange",
  },
};

export function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const service = getServiceById(serviceId);

  if (!service) {
    return <div>Service not found</div>;
  }

  const colors = colorClasses[service.color];
  const Icon = service.icon;

  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] ${colors.bg} rounded-full blur-[180px] opacity-60 animate-orb-float`} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-500/10 rounded-full blur-[150px] animate-orb-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-pro-600/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tech Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="tech-badge mb-8 inline-flex"
              >
                <Icon className={`w-4 h-4 ${colors.text}`} />
                <span className={`text-sm font-medium ${colors.text}`}>Premium Service</span>
                <Sparkles className={`w-4 h-4 ${colors.text}`} />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                {service.name}
              </h1>

              <p className={`text-xl md:text-2xl ${colors.text} font-medium mb-6`}>
                {service.tagline}
              </p>

              <p className="text-lg text-slate-900/90 dark:text-slate-200/90 mb-10 leading-relaxed">
                {service.longDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/contact">
                  <button className="cta-magnetic group">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-pro-600/30 hover:border-emerald-pro-600/60 text-slate-900 dark:text-white hover:text-emerald-pro-600 bg-emerald-pro-600/5 hover:bg-emerald-pro-600/10 px-8 py-6 text-lg transition-all backdrop-blur-sm"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-5">
                {service.stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="stat-display group"
                  >
                    <p className={`stat-number text-3xl md:text-4xl ${colors.text}`}>
                      {stat.value}
                    </p>
                    <p className="text-slate-900 dark:text-slate-300 text-sm mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Features Section - Enhanced */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              What&apos;s{" "}
              <span className={`headline-underline ${colors.text}`}>Included</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-900/90 dark:text-slate-200/90">
              Everything you get with our {service.name.toLowerCase()} service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="feature-grid-item group"
              >
                {/* Accent line on hover */}
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity ${colors.text.replace('text-', 'bg-')}`} />

                <h3 className={`text-lg font-sora font-semibold text-slate-900 dark:text-white mb-3 group-hover:${colors.text} transition-colors`}>
                  {feature.title}
                </h3>
                <p className="text-slate-900 dark:text-slate-200 text-sm leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Process Section - Enhanced */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              How It{" "}
              <span className={`headline-underline ${colors.text}`}>Works</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-900/90 dark:text-slate-200/90">
              Our proven process for delivering results.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Enhanced Connection Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b ${colors.gradient} hidden md:block opacity-30`} />
            <div className={`absolute left-8 top-0 w-px h-20 bg-gradient-to-b ${colors.gradient} hidden md:block animate-pulse`} />

            <div className="space-y-10">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex gap-6 md:gap-10 group"
                >
                  {/* Step Number - Enhanced */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`icon-container-animated ${colors.iconBg} !w-16 !h-16 !rounded-2xl`}>
                      <span className={`text-2xl font-sora font-bold ${colors.text}`}>
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8 pt-2">
                    <h3 className={`text-xl md:text-2xl font-sora font-semibold text-slate-900 dark:text-white mb-3 group-hover:${colors.text} transition-colors`}>
                      {step.title}
                    </h3>
                    <p className="text-slate-900 dark:text-slate-200 leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Benefits Section - Enhanced */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
                Why Choose{" "}
                <span className={`headline-underline ${colors.text}`}>XGrowthOS</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-900/90 dark:text-slate-200/90 mb-10">
                The benefits of working with us for {service.name.toLowerCase()}.
              </p>

              <ul className="space-y-5">
                {service.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <CheckCircle className={`h-5 w-5 ${colors.text}`} />
                    </div>
                    <span className="text-slate-900 dark:text-slate-200 text-lg leading-relaxed group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="holographic-card p-10 lg:p-12"
            >
              <div className={`icon-container-animated ${colors.iconBg} mb-8`}>
                <Icon className={`h-8 w-8 ${colors.text}`} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-sora font-bold text-slate-900 dark:text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-slate-900 dark:text-slate-200 text-lg mb-8">
                Book a call with our team to discuss how {service.name.toLowerCase()} can help grow your business.
              </p>
              <Link href="/contact">
                <button className="cta-magnetic w-full">
                  Book a Strategy Call
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* FAQ Section - Enhanced */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 dark:text-white mb-6">
              Frequently Asked{" "}
              <span className={`headline-underline ${colors.text}`}>Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion.Root type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Accordion.Item
                    value={`item-${index}`}
                    className={`group feature-grid-item !p-0 overflow-hidden data-[state=open]:!border-${colors.text.replace('text-', '')}/30`}
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-6 text-left hover:bg-emerald-pro-600/5 transition-colors">
                        <span className="text-slate-900 dark:text-white font-medium pr-4 text-lg">{faq.question}</span>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-all`}>
                          <ChevronDown className={`h-4 w-4 ${colors.text} transition-transform duration-300 group-data-[state=open]:rotate-180`} />
                        </div>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-6 pb-6 text-slate-900 dark:text-slate-200 leading-relaxed border-t border-border-default dark:border-graphite/30 pt-4">
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
        title={`Ready for ${service.name}?`}
        description="Book a strategy call to discuss how we can help grow your pipeline."
      />
    </>
  );
}
