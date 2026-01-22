import { MarketingNavbar } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/navigation";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-deep-space relative overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[150px] bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,rgba(0,212,255,0)_70%)] animate-orb-float" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(123,97,255,0.1)_0%,rgba(123,97,255,0)_70%)] animate-orb-float-reverse" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(0,255,178,0.08)_0%,rgba(0,255,178,0)_70%)] animate-orb-pulse" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <MarketingNavbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
