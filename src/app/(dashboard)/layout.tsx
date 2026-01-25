import { Sidebar } from "@/components/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg dashboard-bg">
      <Sidebar variant="client" />

      {/* Ambient gradient orbs - fixed position for smooth scrolling */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full blur-[120px] gradient-orb-cyan-lg"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] gradient-orb-violet-lg"
          style={{ animationDelay: '3s' }}
        />
      </div>

      <main className="pl-64 min-h-screen relative z-10">
        {children}
      </main>
    </div>
  );
}
