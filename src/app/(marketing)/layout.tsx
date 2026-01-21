import { MarketingNavbar } from "@/components/marketing/navigation";
import { Footer } from "@/components/marketing/navigation";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
