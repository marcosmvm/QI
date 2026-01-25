import { EngineDetailPage } from "@/components/marketing/pages/EngineDetailPage";

export const metadata = {
  title: "The Monitor Engine | Churn Risk Detection | XGrowthOS",
  description: "AI-powered client health scoring with proactive churn risk detection. The Monitor Engine identifies at-risk accounts before they become problems.",
};

export default function MonitorPage() {
  return <EngineDetailPage engineId="monitor" />;
}
