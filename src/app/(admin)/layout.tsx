import { Sidebar } from "@/components/navigation/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg dashboard-bg">
      <Sidebar variant="admin" />
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(123,97,255,0.15)_0%,rgba(123,97,255,0)_70%)] animate-orb-float" />
        <div className="absolute bottom-0 -right-40 w-[400px] h-[400px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(0,212,255,0.1)_0%,rgba(0,212,255,0)_70%)] animate-orb-float-reverse" />
      </div>
      <main className="pl-64 min-h-screen relative z-10">
        {children}
      </main>
    </div>
  );
}
