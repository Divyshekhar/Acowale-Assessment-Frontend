import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  Feedback,
  FeedbackCategory,
  FeedbackListParams,
  FeedbackStatus,
  PaginatedApiResponse,
} from "@/types/api";

export type CreateFeedbackPayload = {
  category: FeedbackCategory;
  comment: string;
  email?: string;
};

export const feedbackService = {
  async create(payload: CreateFeedbackPayload) {
    const { data } = await apiClient.post<ApiResponse<Feedback>>("/api/v1/feedback", payload);
    return data.data;
  },

  async list(params: FeedbackListParams) {
    const { data } = await apiClient.get<PaginatedApiResponse<Feedback[]>>("/api/v1/feedback", {
      params,
    });
    return data;
  },

  async updateStatus(id: string, status: FeedbackStatus) {
    const { data } = await apiClient.patch<ApiResponse<Feedback>>(`/api/v1/feedback/${id}/status`, {
      status,
    });
    return data.data;
  },

  async delete(id: string) {
    await apiClient.delete<ApiResponse<null>>(`/api/v1/feedback/${id}`);
  },
};
