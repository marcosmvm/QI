import { EngineDetailPage } from "@/components/marketing/pages/EngineDetailPage";

export const metadata = {
  title: "The Informant Engine | Automated Reporting | XGrowthOS",
  description: "AI-powered weekly reports delivered automatically every Sunday at 8 PM PT. The Informant Engine generates executive summaries, trend analysis, and actionable insights.",
};

export default function InformantPage() {
  return <EngineDetailPage engineId="informant" />;
}
