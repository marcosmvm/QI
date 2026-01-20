import { Sidebar } from "@/components/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-deep-space">
      <Sidebar />
      <main className="pl-64">
        {children}
      </main>
    </div>
  );
}
