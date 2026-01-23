import { EngineDetailPage } from "@/components/marketing/pages/EngineDetailPage";

export const metadata = {
  title: "The Guardian Engine | Compliance & Domain Health | XGrowthOS",
  description: "24/7 monitoring ensures maximum deliverability. The Guardian Engine protects your sender reputation with intelligent domain rotation and health scoring.",
};

export default function GuardianPage() {
  return <EngineDetailPage engineId="guardian" />;
}
