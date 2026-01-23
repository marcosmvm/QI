import { MarketingNavbar } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/navigation";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-deep-space relative overflow-hidden">
      {/* Noise Texture for Premium Feel */}
      <div className="noise-texture" />

      {/* Cyber Grid Background */}
      <div className="cyber-grid" />

      {/* Animated Scanline Effect */}
      <div className="scanline" />

      {/* Enhanced Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Primary Cyan Orb - Top Left */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[150px] bg-[radial-gradient(circle,rgba(0,212,255,0.18)_0%,rgba(0,212,255,0)_70%)] animate-orb-float" />

        {/* Violet Orb - Right Side */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(123,97,255,0.15)_0%,rgba(123,97,255,0)_70%)] animate-orb-float-reverse" />

        {/* Mint Orb - Bottom */}
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(0,255,178,0.1)_0%,rgba(0,255,178,0)_70%)] animate-orb-pulse" />

        {/* Secondary Cyan Orb - Center Right */}
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,rgba(0,212,255,0)_70%)] animate-orb-float" style={{ animationDelay: '-10s' }} />

        {/* Small Accent Orb - Top Right */}
        <div className="absolute top-20 right-20 w-[200px] h-[200px] rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(123,97,255,0.12)_0%,rgba(123,97,255,0)_70%)] animate-orb-pulse" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Data Stream Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="data-stream" style={{ left: '10%', animationDelay: '0s' }} />
        <div className="data-stream" style={{ left: '25%', animationDelay: '-1s' }} />
        <div className="data-stream" style={{ left: '50%', animationDelay: '-2s' }} />
        <div className="data-stream" style={{ left: '75%', animationDelay: '-3s' }} />
        <div className="data-stream" style={{ left: '90%', animationDelay: '-1.5s' }} />
      </div>

      {/* Floating Data Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="data-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      {/* Orbit Rings Decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
        <div className="orbit-ring" style={{ width: '600px', height: '600px', animationDuration: '40s' }} />
        <div className="orbit-ring" style={{ width: '800px', height: '800px', animationDuration: '60s', animationDirection: 'reverse' }} />
      </div>

      <MarketingNavbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
