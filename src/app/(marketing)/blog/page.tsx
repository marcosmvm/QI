"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight-blue/30 to-deep-space" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric-cyan/20 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 mb-6">
              <BookOpen className="w-4 h-4 text-electric-cyan" />
              <span className="text-sm font-medium text-electric-cyan">Insights & Resources</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-6">
              The Quantum Insights{" "}
              <span className="gradient-text-cyan-violet">
                Blog
              </span>
            </h1>
            <p className="text-xl text-silver max-w-2xl mx-auto">
              Expert insights on B2B lead generation, deliverability, AI, and sales development.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Blog Grid */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/contact" className="block group h-full">
                  <div className="h-full p-6 rounded-2xl border border-electric-cyan/20 bg-gradient-to-br from-midnight-blue/80 to-deep-space/90 hover:border-electric-cyan/40 transition-all">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 rounded-full bg-electric-cyan/10 text-electric-cyan text-xs font-medium mb-4">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-sora font-semibold text-white mb-3 group-hover:text-electric-cyan transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-silver text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-steel text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-electric-cyan text-sm font-medium mt-4 group-hover:gap-3 transition-all">
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
