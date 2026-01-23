"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Check user role to redirect appropriately
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const userRole = (profile as { role: string } | null)?.role;
        if (userRole === 'admin' || userRole === 'team_member') {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
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
            Automate your outreach.
            <br />
            <span className="text-emerald-pro-600">Amplify your results.</span>
          </h1>
          <p className="text-lg text-light-text-secondary dark:text-silver max-w-md">
            Access your campaign dashboard, monitor performance, and track
            your results in real-time.
          </p>
          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className="text-3xl font-sora font-bold text-light-text dark:text-white">95%+</p>
              <p className="text-sm text-light-text-muted dark:text-steel">Deliverability Rate</p>
            </div>
            <div>
              <p className="text-3xl font-sora font-bold text-light-text dark:text-white">3x</p>
              <p className="text-sm text-light-text-muted dark:text-steel">Reply Rate Increase</p>
            </div>
            <div>
              <p className="text-3xl font-sora font-bold text-light-text dark:text-white">24/7</p>
              <p className="text-sm text-light-text-muted dark:text-steel">Support Available</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-light-text-muted dark:text-steel">
          &copy; {new Date().getFullYear()} XGrowthOS. All rights reserved.
        </div>
      </div>

      {/* Right side - Login Form */}
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
            <div className="text-center mb-8">
              <h2 className="text-2xl font-sora font-bold text-light-text dark:text-white mb-2">
                Welcome back
              </h2>
              <p className="text-light-text-muted dark:text-steel">Sign in to access your dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-energy-orange/10 border border-energy-orange/30 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-energy-orange flex-shrink-0 mt-0.5" />
                <p className="text-sm text-energy-orange">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-light-text-secondary dark:text-silver mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-steel" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space pl-10 pr-4 text-light-text dark:text-white placeholder:text-light-text-muted dark:text-steel focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-light-text-secondary dark:text-silver"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-pro-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-light-text-muted dark:text-steel" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full h-11 rounded-lg border border-border-default dark:border-graphite bg-white dark:bg-deep-space pl-10 pr-4 text-light-text dark:text-white placeholder:text-light-text-muted dark:text-steel focus:border-emerald-pro-600/50 focus:outline-none focus:ring-1 focus:ring-emerald-pro-600/50 transition-colors"
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
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign in
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-light-text-muted dark:text-steel text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-emerald-pro-600 hover:underline font-medium"
                >
                  Request access
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
