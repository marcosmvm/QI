"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Zap } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { CTABanner } from "@/components/marketing/sections/CTABanner";

const posts = [
  {
    title: "The Complete Guide to Cold Email Deliverability in 2024",
    excerpt: "Everything you need to know about landing in the inbox, from authentication to sending patterns.",
    category: "Deliverability",
    date: "Jan 15, 2024",
    readTime: "12 min read",
  },
  {
    title: "How AI is Transforming B2B Lead Generation",
    excerpt: "Explore the AI technologies reshaping outbound sales and how to leverage them for your business.",
    category: "AI & Technology",
    date: "Jan 10, 2024",
    readTime: "8 min read",
  },
  {
    title: "Building an ICP That Actually Works",
    excerpt: "Stop wasting time on the wrong prospects. Learn how to define an Ideal Customer Profile that converts.",
    category: "Strategy",
    date: "Jan 5, 2024",
    readTime: "10 min read",
  },
  {
    title: "Cold Email Subject Lines That Get 40%+ Open Rates",
    excerpt: "Data-driven insights on what makes prospects open your emails, plus templates you can use today.",
    category: "Copywriting",
    date: "Dec 28, 2023",
    readTime: "7 min read",
  },
  {
    title: "The Multi-Channel Outreach Playbook",
    excerpt: "How to orchestrate email, LinkedIn, and phone for maximum impact without annoying your prospects.",
    category: "Strategy",
    date: "Dec 20, 2023",
    readTime: "15 min read",
  },
  {
    title: "Why Your SPF, DKIM, and DMARC Records Matter",
    excerpt: "A technical deep-dive into email authentication and why it's the foundation of deliverability.",
    category: "Deliverability",
    date: "Dec 15, 2023",
    readTime: "11 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-midnight-blue/30" />

        {/* Enhanced ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-pro-600/15 rounded-full blur-[150px] animate-orb-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-pro-500/12 rounded-full blur-[130px] animate-orb-float-reverse" />
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
              <BookOpen className="w-4 h-4 text-emerald-pro-600" />
              <span className="text-sm font-medium text-emerald-pro-600">Insights & Resources</span>
              <Zap className="w-4 h-4 text-emerald-pro-600" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold text-slate-900 dark:text-white mb-8">
              The XGrowthOS{" "}
              <span className="headline-underline text-gradient block mt-2">
                Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700/90 dark:text-slate-200/90 max-w-3xl mx-auto leading-relaxed">
              Expert insights on <span className="text-emerald-pro-600 font-semibold">B2B lead generation</span>, deliverability, AI, and <span className="text-emerald-pro-500 font-semibold">sales development</span>.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Blog Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href="/contact" className="block group h-full">
                  <div className="feature-grid-item h-full">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-pro-600/10 text-emerald-pro-600 text-xs font-medium mb-4">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-sora font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-gradient transition-all">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-slate-700 dark:text-slate-200 text-sm mb-4 line-clamp-2 group-hover:text-slate-900 dark:group-hover:text-white/80 transition-colors">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-emerald-pro-600 text-sm font-medium mt-4 group-hover:gap-3 transition-all">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <CTABanner
        title="Want More Insights?"
        description="Subscribe to our newsletter for weekly tips on B2B lead generation and sales development."
        primaryCTA={{ text: "Subscribe Now", href: "/contact" }}
      />
    </>
  );
}
