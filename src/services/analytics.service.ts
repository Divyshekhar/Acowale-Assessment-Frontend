import { apiClient } from "@/lib/api-client";
import type { Analytics, ApiResponse } from "@/types/api";

export const analyticsService = {
  async getDashboardAnalytics() {
    const { data } = await apiClient.get<ApiResponse<Analytics>>("/api/v1/analytics");
    return data.data;
  },
};
