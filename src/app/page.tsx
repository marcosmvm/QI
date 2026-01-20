import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-quantum flex flex-col items-center justify-center p-8">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-cyan opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-violet opacity-20 blur-3xl pointer-events-none" />

      <main className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-midnight-blue border border-electric-cyan/30 shadow-glow-md mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-electric-cyan"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
          </div>
          <h1 className="text-5xl font-sora font-bold text-white mb-4 glow-text">
            Quantum Insights
          </h1>
          <p className="text-xl text-silver">
            B2B Cold Email Automation Platform
          </p>
        </div>

        {/* Description */}
        <p className="text-steel text-lg mb-12 max-w-2xl mx-auto">
          Manage your campaigns, monitor deliverability, and access real-time
          analytics through our intelligent automation platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-4 bg-electric-cyan text-deep-space font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Sign In to Portal
          </Link>
          <Link
            href="/register"
            className="px-8 py-4 bg-transparent border border-electric-cyan/50 text-electric-cyan font-semibold rounded-lg hover:bg-electric-cyan/10 hover:border-electric-cyan transition-all duration-300"
          >
            Request Access
          </Link>
        </div>

        {/* Features preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Campaign Analytics",
              description: "Real-time metrics and performance tracking",
              icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
            },
            {
              title: "Compliance Monitor",
              description: "Domain health and deliverability status",
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
            },
            {
              title: "AI Campaign Builder",
              description: "Intelligent campaign creation and optimization",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 text-left animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-electric-cyan/10 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-electric-cyan"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-sora font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-steel text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 text-steel text-sm">
        &copy; {new Date().getFullYear()} Quantum Insights. All rights reserved.
      </footer>
    </div>
  );
}
