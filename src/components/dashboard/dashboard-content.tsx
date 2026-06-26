"use client";

import { Loader2 } from "lucide-react";
import { DashboardCharts } from "@/components/charts/dashboard-charts";
import { AnalyticsCards } from "@/components/dashboard/analytics-cards";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { useAnalytics } from "@/hooks/use-analytics";

export function DashboardContent() {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading || !analytics) {
    return (
      <div className="flex min-h-[320px] items-center justify-center gap-3 text-sm font-semibold text-neutral-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading analytics
      </div>
    );
  }

  const inReview =
    analytics.statusDistribution.find((item) => item.status === "IN_REVIEW")?.count ?? 0;

  return (
    <div className="space-y-6">
      <AnalyticsCards
        total={analytics.totalFeedback}
        pending={analytics.pendingFeedback}
        inReview={inReview}
        resolved={analytics.resolvedFeedback}
      />
      <DashboardCharts analytics={analytics} />
      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-bold">Feedback</h2>
          <p className="mt-1 text-sm text-neutral-600">Search, filter, update status, and delete submissions.</p>
        </div>
        <FeedbackTable />
      </section>
    </div>
  );
}
