import { MarketingNavbar } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/navigation";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg dark:bg-slate-900 relative overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Primary Emerald Orb - Top Left */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full blur-[150px] bg-[radial-gradient(circle,rgba(5,150,105,0.12)_0%,rgba(5,150,105,0)_70%)] dark:bg-[radial-gradient(circle,rgba(34,197,94,0.15)_0%,rgba(34,197,94,0)_70%)]" />

        {/* Sky Blue Orb - Right Side */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full blur-[130px] bg-[radial-gradient(circle,rgba(14,165,233,0.10)_0%,rgba(14,165,233,0)_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,rgba(56,189,248,0)_70%)]" />

        {/* Emerald Orb - Bottom */}
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,rgba(16,185,129,0)_70%)] dark:bg-[radial-gradient(circle,rgba(52,211,153,0.10)_0%,rgba(52,211,153,0)_70%)]" />

        {/* Secondary Blue Orb - Center Right */}
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(14,165,233,0.06)_0%,rgba(14,165,233,0)_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,rgba(56,189,248,0)_70%)]" />
      </div>

      <MarketingNavbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
