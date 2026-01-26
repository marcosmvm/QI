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
    <div className="min-h-screen bg-bg dark:bg-deep-space flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-slate-900 dark:to-slate-800">
        {/* Background effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 dark:bg-green-500/10 opacity-50 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/20 dark:bg-sky-500/10 opacity-40 blur-3xl rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/30">
              <Zap className="h-6 w-6 text-emerald-600 dark:text-green-400" />
            </div>
            <span className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
              XGrowthOS
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-sora font-bold text-slate-900 dark:text-white leading-tight">
            Ready to scale
            <br />
            <span className="text-gradient">your outreach?</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md">
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
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-green-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-slate-500 dark:text-slate-300">
          &copy; {new Date().getFullYear()} XGrowthOS. All rights reserved.
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-bg">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/30">
              <Zap className="h-6 w-6 text-emerald-600 dark:text-green-400" />
            </div>
            <span className="text-xl font-sora font-semibold text-slate-900 dark:text-white">
              XGrowthOS
            </span>
          </div>

          <div className="p-8 rounded-2xl card-base">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-green-500/10 border border-emerald-200 dark:border-green-500/30">
                    <CheckCircle className="h-8 w-8 text-emerald-500 dark:text-green-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-2">
                  Request Submitted!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
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
                  <h2 className="text-2xl font-sora font-bold text-slate-900 dark:text-white mb-2">
                    Request Access
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    Fill out the form to get started with XGrowthOS
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2"
                    >
                      Full name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="w-full h-11 rounded-lg input-base pl-10 pr-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2"
                    >
                      Work email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className="w-full h-11 rounded-lg input-base pl-10 pr-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2"
                    >
                      Company name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        required
                        className="w-full h-11 rounded-lg input-base pl-10 pr-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-900 dark:text-slate-300 mb-2"
                    >
                      Create password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-500" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min. 8 characters"
                        required
                        minLength={8}
                        className="w-full h-11 rounded-lg input-base pl-10 pr-4"
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

                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                    By requesting access, you agree to our{" "}
                    <Link href="/terms" className="text-emerald-600 dark:text-green-400 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-600 dark:text-green-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-slate-400 dark:text-slate-500 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-emerald-600 dark:text-green-400 hover:underline font-medium"
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
