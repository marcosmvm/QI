import { Sidebar } from "@/components/navigation/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-deep-space">
      <Sidebar variant="admin" />
      <main className="pl-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
