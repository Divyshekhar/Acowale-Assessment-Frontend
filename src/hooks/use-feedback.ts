"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiMessage } from "@/lib/api-client";
import { feedbackService, type CreateFeedbackPayload } from "@/services/feedback.service";
import type { FeedbackListParams, FeedbackStatus } from "@/types/api";

export const feedbackKeys = {
  all: ["feedback"] as const,
  list: (params: FeedbackListParams) => ["feedback", "list", params] as const,
};

export function useCreateFeedback() {
  return useMutation({
    mutationFn: (payload: CreateFeedbackPayload) => feedbackService.create(payload),
    onSuccess: () => toast.success("Feedback submitted"),
    onError: (error) => toast.error(getApiMessage(error, "Unable to submit feedback")),
  });
}

export function useFeedbackList(params: FeedbackListParams) {
  return useQuery({
    queryKey: feedbackKeys.list(params),
    queryFn: () => feedbackService.list(params),
  });
}

export function useUpdateFeedbackStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: FeedbackStatus }) =>
      feedbackService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("Status updated");
    },
    onError: (error) => toast.error(getApiMessage(error, "Unable to update status")),
  });
}

export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => feedbackService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: feedbackKeys.all });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("Feedback deleted");
    },
    onError: (error) => toast.error(getApiMessage(error, "Unable to delete feedback")),
  });
}
