import type { FeedbackCategory, FeedbackStatus } from "@/types/api";

export const feedbackCategories: FeedbackCategory[] = [
  "PRODUCT",
  "BUG",
  "FEATURE_REQUEST",
  "SUPPORT",
  "OTHER",
];

export const feedbackStatuses: FeedbackStatus[] = ["PENDING", "IN_REVIEW", "RESOLVED", "REJECTED"];

export const categoryLabels: Record<FeedbackCategory, string> = {
  PRODUCT: "Product",
  BUG: "Bug",
  FEATURE_REQUEST: "Feature request",
  SUPPORT: "Support",
  OTHER: "Other",
};

export const statusLabels: Record<FeedbackStatus, string> = {
  PENDING: "Pending",
  IN_REVIEW: "In review",
  RESOLVED: "Resolved",
  REJECTED: "Rejected",
};

export const statusTransitions: Record<FeedbackStatus, FeedbackStatus[]> = {
  PENDING: ["IN_REVIEW"],
  IN_REVIEW: ["RESOLVED", "REJECTED"],
  RESOLVED: [],
  REJECTED: [],
};
