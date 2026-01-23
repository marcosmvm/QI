import { ServiceDetailPage } from "@/components/marketing/pages/ServiceDetailPage";

export const metadata = {
  title: "Appointment Setting Services | XGrowthOS",
  description: "Fill your calendar with qualified meetings. We book appointments with decision-makers who are ready to buy.",
};

export default function AppointmentSettingPage() {
  return <ServiceDetailPage serviceId="appointment-setting" />;
}
