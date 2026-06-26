import { z } from "zod";

export const feedbackSchema = z.object({
  category: z.enum(["PRODUCT", "BUG", "FEATURE_REQUEST", "SUPPORT", "OTHER"]),
  comment: z.string().trim().min(1, "Comment is required").max(5000, "Comment is too long"),
  email: z.union([z.email("Enter a valid email address"), z.literal("")]).optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
