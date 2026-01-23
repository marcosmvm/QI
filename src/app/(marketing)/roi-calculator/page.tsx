"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Mail,
  Users,
  Calendar,
  CheckCircle,
  Loader2,
  Download,
} from "lucide-react";
import { Container } from "@/components/marketing/layout/Container";
import { SectionWrapper } from "@/components/marketing/layout/SectionWrapper";
import { Button } from "@/components/ui/button";

// ROI calculation based on documented performance thresholds
function calculateROI(inputs: {
  monthlyVolume: number;
  currentReplyRate: number;
  avgDealSize: number;
  salesCycleWeeks: number;
}) {
  const { monthlyVolume, currentReplyRate, avgDealSize, salesCycleWeeks } = inputs;

  // Quantum Insights performance targets
  const quantumReplyRate = 3.5; // Target 3%+ reply rate
  const quantumMeetingRate = 30; // 30% of replies become meetings
  const quantumCloseRate = 20; // 20% of meetings close

  // Current performance (with their reply rate)
  const currentReplies = Math.round(monthlyVolume * (currentReplyRate / 100));
  const currentMeetings = Math.round(currentReplies * 0.2); // Assume 20% meeting rate
  const currentDeals = Math.round(currentMeetings * 0.15); // Assume 15% close rate
  const currentRevenue = currentDeals * avgDealSize;

  // Projected performance with Quantum
  const projectedReplies = Math.round(monthlyVolume * (quantumReplyRate / 100));
  const projectedMeetings = Math.round(projectedReplies * (quantumMeetingRate / 100));
  const projectedDeals = Math.round(projectedMeetings * (quantumCloseRate / 100));
  const projectedRevenue = projectedDeals * avgDealSize;

  // Calculate monthly and annual impact
  const additionalMonthlyRevenue = projectedRevenue - currentRevenue;
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

  // Assume $2,497/month investment (Growth plan)
  const monthlyInvestment = 2497;
  const annualInvestment = monthlyInvestment * 12;
  const roi = ((additionalAnnualRevenue - annualInvestment) / annualInvestment) * 100;

  // Time to value (in sales cycles)
  const monthsToFirstDeal = Math.ceil(salesCycleWeeks / 4) + 1;

  return {
    current: {
      replies: currentReplies,
      meetings: currentMeetings,
      deals: currentDeals,
      revenue: currentRevenue,
    },
    projected: {
      replies: projectedReplies,
      meetings: projectedMeetings,
      deals: projectedDeals,
      revenue: projectedRevenue,
    },
    impact: {
      additionalMonthlyRevenue,
      additionalAnnualRevenue,
      roi: Math.round(roi),
      monthsToFirstDeal,
    },
  };
}

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState({
    monthlyVolume: 5000,
    currentReplyRate: 1,
    avgDealSize: 10000,
    salesCycleWeeks: 8,
  });
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const results = calculateROI(inputs);

  const handleInputChange = (name: string, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Replace with actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert("Report sent to " + email);
    setShowLeadCapture(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-deep-space">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-space to-midnight-blue" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-mint/10 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-quantum-violet/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric-cyan/5 rounded-full blur-[180px]" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="tech-badge mb-8 inline-flex">
              <Calculator className="w-4 h-4 text-neon-mint" />
              <span className="text-sm font-medium text-neon-mint">
                Free ROI Calculator
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-sora font-bold text-white mb-6">
              Calculate Your{" "}
              <span className="headline-underline gradient-text-cyan-violet">
                ROI Potential
              </span>
            </h1>

            <p className="text-xl text-steel">
              See how much additional revenue you could generate with AI-powered
              cold outreach.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Section Divider */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* Calculator Section */}
      <SectionWrapper variant="default">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-8 rounded-3xl border border-graphite bg-midnight-blue/50">
                <h2 className="text-xl font-sora font-bold text-white mb-6">
                  Your Current Numbers
                </h2>

                <div className="space-y-8">
                  {/* Monthly Volume */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-silver flex items-center gap-2">
                        <Mail className="h-4 w-4 text-electric-cyan" />
                        Monthly Email Volume
                      </label>
                      <span className="text-sm font-medium text-electric-cyan">
                        {inputs.monthlyVolume.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={inputs.monthlyVolume}
                      onChange={(e) =>
                        handleInputChange("monthlyVolume", Number(e.target.value))
                      }
                      className="w-full h-2 bg-graphite rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-steel mt-1">
                      <span>1K</span>
                      <span>100K</span>
                    </div>
                  </div>

                  {/* Current Reply Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-silver flex items-center gap-2">
                        <Users className="h-4 w-4 text-quantum-violet" />
                        Current Reply Rate
                      </label>
                      <span className="text-sm font-medium text-quantum-violet">
                        {inputs.currentReplyRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={inputs.currentReplyRate}
                      onChange={(e) =>
                        handleInputChange("currentReplyRate", Number(e.target.value))
                      }
                      className="w-full h-2 bg-graphite rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-steel mt-1">
                      <span>0%</span>
                      <span>5%</span>
                    </div>
                  </div>

                  {/* Average Deal Size */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-silver flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-neon-mint" />
                        Average Deal Size
                      </label>
                      <span className="text-sm font-medium text-neon-mint">
                        ${inputs.avgDealSize.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={inputs.avgDealSize}
                      onChange={(e) =>
                        handleInputChange("avgDealSize", Number(e.target.value))
                      }
                      className="w-full h-2 bg-graphite rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-steel mt-1">
                      <span>$1K</span>
                      <span>$100K</span>
                    </div>
                  </div>

                  {/* Sales Cycle */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium text-silver flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-energy-orange" />
                        Sales Cycle Length
                      </label>
                      <span className="text-sm font-medium text-energy-orange">
                        {inputs.salesCycleWeeks} weeks
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      step="2"
                      value={inputs.salesCycleWeeks}
                      onChange={(e) =>
                        handleInputChange("salesCycleWeeks", Number(e.target.value))
                      }
                      className="w-full h-2 bg-graphite rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-steel mt-1">
                      <span>2 weeks</span>
                      <span>24 weeks</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* ROI Card */}
              <div className="p-8 rounded-3xl border border-electric-cyan/30 bg-gradient-to-br from-electric-cyan/10 to-quantum-violet/10">
                <h2 className="text-xl font-sora font-bold text-white mb-6">
                  Your Projected ROI
                </h2>

                <div className="text-center mb-6">
                  <p className="text-6xl font-sora font-bold text-electric-cyan mb-2">
                    {results.impact.roi > 0 ? "+" : ""}
                    {results.impact.roi}%
                  </p>
                  <p className="text-steel">Annual Return on Investment</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-deep-space/50 rounded-xl text-center">
                    <p className="text-2xl font-sora font-bold text-neon-mint">
                      ${results.impact.additionalMonthlyRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-steel">Additional Monthly Revenue</p>
                  </div>
                  <div className="p-4 bg-deep-space/50 rounded-xl text-center">
                    <p className="text-2xl font-sora font-bold text-neon-mint">
                      ${results.impact.additionalAnnualRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-steel">Additional Annual Revenue</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-deep-space/50 rounded-xl">
                  <span className="text-sm text-steel">Time to first new deal</span>
                  <span className="text-sm font-medium text-white">
                    ~{results.impact.monthsToFirstDeal} month
                    {results.impact.monthsToFirstDeal !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Comparison */}
              <div className="p-6 rounded-2xl border border-graphite bg-midnight-blue/50">
                <h3 className="text-sm font-medium text-steel mb-4">
                  Performance Comparison
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-silver">Replies/Month</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-steel">
                        {results.current.replies}
                      </span>
                      <ArrowRight className="h-4 w-4 text-electric-cyan" />
                      <span className="text-sm font-medium text-neon-mint">
                        {results.projected.replies}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-silver">Meetings/Month</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-steel">
                        {results.current.meetings}
                      </span>
                      <ArrowRight className="h-4 w-4 text-electric-cyan" />
                      <span className="text-sm font-medium text-neon-mint">
                        {results.projected.meetings}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-silver">Deals/Month</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-steel">
                        {results.current.deals}
                      </span>
                      <ArrowRight className="h-4 w-4 text-electric-cyan" />
                      <span className="text-sm font-medium text-neon-mint">
                        {results.projected.deals}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLeadCapture(true)}
                  className="cta-magnetic flex-1"
                >
                  <Download className="h-4 w-4" />
                  Get Detailed Report
                </button>
                <Link href="/book-demo" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-electric-cyan/30 hover:border-electric-cyan/60 text-white hover:text-electric-cyan bg-electric-cyan/5 hover:bg-electric-cyan/10 px-8 py-6 text-lg transition-all backdrop-blur-sm"
                  >
                    Book a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </SectionWrapper>

      {/* Methodology */}
      <SectionWrapper variant="dark">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-sora font-bold text-white mb-4">
              How We <span className="headline-underline gradient-text-cyan-violet">Calculate</span> This
            </h2>
            <p className="text-steel">
              Based on our documented performance across 100+ client campaigns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Target Reply Rate", value: "3.5%+", icon: Mail },
              { label: "Reply-to-Meeting", value: "30%", icon: Users },
              { label: "Meeting-to-Close", value: "20%", icon: TrendingUp },
              { label: "Deliverability", value: "92%+", icon: CheckCircle },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center p-4 rounded-xl border border-graphite bg-midnight-blue/50"
              >
                <metric.icon className="h-6 w-6 text-electric-cyan mx-auto mb-2" />
                <p className="text-2xl font-sora font-bold text-white mb-1">
                  {metric.value}
                </p>
                <p className="text-xs text-steel">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Lead Capture Modal */}
      {showLeadCapture && (
        <div className="fixed inset-0 bg-deep-space/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md p-8 rounded-3xl border border-graphite bg-midnight-blue"
          >
            <h3 className="text-xl font-sora font-bold text-white mb-2">
              Get Your Detailed ROI Report
            </h3>
            <p className="text-steel mb-6">
              We&apos;ll send you a customized report with your projections and
              recommendations.
            </p>

            <form onSubmit={handleGetReport} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="w-full h-11 rounded-lg border border-graphite bg-deep-space px-4 text-white placeholder:text-steel focus:border-electric-cyan/50 focus:outline-none focus:ring-1 focus:ring-electric-cyan/50"
              />

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLeadCapture(false)}
                  className="flex-1 border-graphite hover:border-electric-cyan/50 hover:text-electric-cyan"
                >
                  Cancel
                </Button>
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="cta-magnetic flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Send Report"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #00d4ff;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #00d4ff;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}
