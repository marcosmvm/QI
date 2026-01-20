import { Sidebar } from "@/components/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Sidebar />
      <main className="pl-72">
        {children}
      </main>
    </div>
  );
}
