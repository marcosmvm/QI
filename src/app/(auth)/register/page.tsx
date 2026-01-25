"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, User, Building, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual registration API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-quantum flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-cyan opacity-30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-violet opacity-20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30">
              <Zap className="h-6 w-6 text-emerald-pro-600" />
            </div>
            <span className="text-xl font-sora font-semibold text-light-text dark:text-white">
              XGrowthOS
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-sora font-bold text-light-text dark:text-white leading-tight">
            Ready to scale
            <br />
            <span className="text-emerald-pro-600">your outreach?</span>
          </h1>
          <p className="text-lg text-light-text-secondary dark:text-silver max-w-md">
            Join leading B2B companies using XGrowthOS to automate their
            cold email campaigns with AI-powered precision.
          </p>

          <div className="space-y-4 pt-4">
            {[
              "AI-powered campaign creation",
              "95%+ deliverability guarantee",
              "Real-time compliance monitoring",
              "Automated lead expansion",
              "Dedicated success manager",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-pro-400/20">
                  <CheckCircle className="h-4 w-4 text-emerald-pro-400" />
                </div>
                <span className="text-light-text-secondary dark:text-silver">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-light-text-muted dark:text-steel">
          &copy; {new Date().getFullYear()} XGrowthOS. All rights reserved.
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-pro-600/10 border border-emerald-pro-600/30">
              <Zap className="h-6 w-6 text-emerald-pro-600" />
            </div>
            <span className="text-xl font-sora font-semibold text-light-text dark:text-white">
              XGrowthOS
            </span>
          </div>

          <div className="glass-card p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-pro-400/20 border border-emerald-pro-400/30">
                    <CheckCircle className="h-8 w-8 text-emerald-pro-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-2">
                  Request Submitted!
                </h2>
                <p className="text-light-text-muted dark:text-steel mb-6">
                  Thank you for your interest in XGrowthOS. Our team will
                  review your request and reach out within 24-48 hours.
                </p>
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Back to login
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-2">
                    Request Access
                  </h2>
                  <p className="text-light-text-muted dark:text-steel">
                    Fill out the form to get started with XGrowthOS
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2"
                    >
                      Full name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-steel" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="w-full h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2"
                    >
                      Work email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-steel" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className="w-full h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2"
                    >
                      Company name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-steel" />
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        required
                        className="w-full h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2"
                    >
                      Create password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-steel" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min. 8 characters"
                        required
                        minLength={8}
                        className="w-full h-11 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-10 pr-4 text-slate-900 dark:text-slate-50 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting request...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Request access
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-light-text-muted dark:text-steel text-center">
                    By requesting access, you agree to our{" "}
                    <Link href="/terms" className="text-emerald-pro-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-pro-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-light-text-muted dark:text-steel text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-emerald-pro-600 hover:underline font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
