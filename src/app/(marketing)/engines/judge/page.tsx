import { EngineDetailPage } from "@/components/marketing/pages/EngineDetailPage";

export const metadata = {
  title: "The Judge Engine | Issue Detection & Auto-Fix | XGrowthOS",
  description: "Proactive monitoring every 4 hours with automatic issue detection and self-healing capabilities. The Judge Engine keeps your campaigns running smoothly.",
};

export default function JudgePage() {
  return <EngineDetailPage engineId="judge" />;
}
