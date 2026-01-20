"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";

const testimonials = [
  {
    id: 1,
    quote: "Quantum Insights transformed our outbound. We went from 2-3 meetings a month to 15-20 qualified opportunities. The AI engines are genuinely impressive.",
    author: "Sarah Chen",
    title: "VP of Sales",
    company: "TechScale SaaS",
    image: "/testimonials/placeholder.jpg",
    rating: 5,
    metric: { value: "8x", label: "More Meetings" },
  },
  {
    id: 2,
    quote: "Finally, a lead gen partner that actually delivers. Their deliverability rates are the best we've ever seen, and the transparency is refreshing.",
    author: "Michael Torres",
    title: "CEO",
    company: "DataFlow Analytics",
    image: "/testimonials/placeholder.jpg",
    rating: 5,
    metric: { value: "96%", label: "Deliverability" },
  },
  {
    id: 3,
    quote: "The ROI was obvious within the first month. Quantum Insights pays for itself many times over with the quality of meetings they book.",
    author: "Jennifer Park",
    title: "Head of Growth",
    company: "CloudNine Solutions",
    image: "/testimonials/placeholder.jpg",
    rating: 5,
    metric: { value: "340%", label: "ROI" },
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <SectionWrapper variant="dark">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-slate-900 mb-6">
            Trusted by{" "}
            <span className="text-electric-cyan">
              Growth Leaders
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            See what our clients say about working with Quantum Insights.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative p-8 md:p-12 rounded-3xl border border-slate-200 bg-white shadow-sm">
                {/* Quote Icon */}
                <div className="absolute -top-6 left-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Quote className="h-6 w-6 text-electric-cyan" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 mt-4">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-electric-cyan text-electric-cyan" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-slate-900 font-medium leading-relaxed mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                      <span className="text-lg font-semibold text-slate-700">
                        {testimonials[current].author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonials[current].author}</p>
                      <p className="text-slate-500 text-sm">
                        {testimonials[current].title}, {testimonials[current].company}
                      </p>
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="hidden sm:block text-right">
                    <p className="text-3xl font-sora font-bold text-electric-cyan">
                      {testimonials[current].metric.value}
                    </p>
                    <p className="text-slate-500 text-sm">{testimonials[current].metric.label}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-slate-200 hover:border-electric-cyan hover:bg-slate-50 text-slate-500 hover:text-electric-cyan transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === current
                      ? "bg-electric-cyan w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-slate-200 hover:border-electric-cyan hover:bg-slate-50 text-slate-500 hover:text-electric-cyan transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
