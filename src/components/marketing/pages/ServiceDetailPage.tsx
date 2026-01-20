"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
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
  "electric-cyan": {
    bg: "bg-electric-cyan/10",
    border: "border-electric-cyan/30",
    text: "text-electric-cyan",
    gradient: "from-electric-cyan to-cyan-dark",
    glow: "shadow-[0_0_60px_rgba(0,212,255,0.3)]",
  },
  "quantum-violet": {
    bg: "bg-quantum-violet/10",
    border: "border-quantum-violet/30",
    text: "text-quantum-violet",
    gradient: "from-quantum-violet to-purple-600",
    glow: "shadow-[0_0_60px_rgba(123,97,255,0.3)]",
  },
  "neon-mint": {
    bg: "bg-neon-mint/10",
    border: "border-neon-mint/30",
    text: "text-neon-mint",
    gradient: "from-neon-mint to-emerald-500",
    glow: "shadow-[0_0_60px_rgba(0,255,178,0.3)]",
  },
  "energy-orange": {
    bg: "bg-energy-orange/10",
    border: "border-energy-orange/30",
    text: "text-energy-orange",
    gradient: "from-energy-orange to-orange-600",
    glow: "shadow-[0_0_60px_rgba(255,107,53,0.3)]",
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
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] ${colors.bg} rounded-full blur-[150px] opacity-50`} />

        <Container className="relative z-10">
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
                {service.name}
              </h1>

              <p className={`text-xl ${colors.text} font-medium mb-4`}>
                {service.tagline}
              </p>

              <p className="text-lg text-silver mb-8 leading-relaxed">
                {service.longDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold px-8`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-electric-cyan/30 hover:border-electric-cyan/60 text-white hover:bg-electric-cyan/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {service.stats.map((stat) => (
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

      {/* Features Section */}
      <SectionWrapper variant="default">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              What&apos;s{" "}
              <span className={colors.text}>Included</span>
            </h2>
            <p className="text-lg text-silver">
              Everything you get with our {service.name.toLowerCase()} service.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl border ${colors.border} bg-gradient-to-br from-midnight-blue/50 to-deep-space/50 hover:border-opacity-60 transition-all`}
              >
                <h3 className="text-lg font-sora font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Process Section */}
      <SectionWrapper variant="dark">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              How It{" "}
              <span className={colors.text}>Works</span>
            </h2>
            <p className="text-lg text-silver">
              Our proven process for delivering results.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className={`absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b ${colors.gradient} hidden md:block`} />

            <div className="space-y-8">
              {service.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Step Number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                      <span className={`text-2xl font-sora font-bold ${colors.text}`}>
                        {step.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl md:text-2xl font-sora font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-silver">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Benefits Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
                Why Choose{" "}
                <span className={colors.text}>Quantum Insights</span>
              </h2>
              <p className="text-lg text-silver mb-8">
                The benefits of working with us for {service.name.toLowerCase()}.
              </p>

              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className={`h-6 w-6 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className="text-silver text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-8 rounded-3xl border ${colors.border} bg-gradient-to-br from-midnight-blue/80 to-deep-space/90`}
            >
              <Icon className={`h-12 w-12 ${colors.text} mb-6`} />
              <h3 className="text-2xl font-sora font-bold text-white mb-4">
                Ready to get started?
              </h3>
              <p className="text-silver mb-6">
                Book a call with our team to discuss how {service.name.toLowerCase()} can help grow your business.
              </p>
              <Link href="/contact">
                <Button className={`bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white font-semibold w-full`}>
                  Book a Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-white mb-6">
              Frequently Asked{" "}
              <span className={colors.text}>Questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion.Root type="single" collapsible className="space-y-4">
              {service.faqs.map((faq, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className={`group rounded-xl border ${colors.border} bg-gradient-to-br from-midnight-blue/50 to-deep-space/50 overflow-hidden data-[state=open]:border-opacity-60 transition-colors`}
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-6 py-5 text-left">
                      <span className="text-white font-medium pr-4">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 ${colors.text} shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180`} />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                    <div className="px-6 pb-5 text-silver leading-relaxed">
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
        title={`Ready for ${service.name}?`}
        description="Book a strategy call to discuss how we can help grow your pipeline."
      />
    </>
  );
}
