export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown[];
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  pagination: PaginationMeta;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type FeedbackCategory = "PRODUCT" | "BUG" | "FEATURE_REQUEST" | "SUPPORT" | "OTHER";

export type FeedbackStatus = "PENDING" | "IN_REVIEW" | "RESOLVED" | "REJECTED";

export type Feedback = {
  id: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
  comment: string;
  email: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FeedbackListParams = {
  page: number;
  limit: number;
  search?: string;
  category?: FeedbackCategory;
  status?: FeedbackStatus;
  sortBy?: "createdAt" | "updatedAt" | "category" | "status";
  sortOrder?: "asc" | "desc";
};

export type Analytics = {
  totalFeedback: number;
  categoryDistribution: Array<{ category: FeedbackCategory; count: number }>;
  statusDistribution: Array<{ status: FeedbackStatus; count: number }>;
  recentFeedback: Feedback[];
  feedbackSubmittedLastSevenDays: Array<{ date: string; count: number }>;
  pendingFeedback: number;
  resolvedFeedback: number;
};
