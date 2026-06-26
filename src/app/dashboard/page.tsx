import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProtectedDashboard } from "@/components/dashboard/protected-dashboard";

export default function DashboardPage() {
  return (
    <ProtectedDashboard>
      <DashboardShell>
        <DashboardContent />
      </DashboardShell>
    </ProtectedDashboard>
  );
}
