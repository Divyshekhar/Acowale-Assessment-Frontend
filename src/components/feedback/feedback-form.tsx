"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categoryLabels, feedbackCategories } from "@/constants/feedback";
import { useCreateFeedback } from "@/hooks/use-feedback";
import { feedbackSchema, type FeedbackFormValues } from "@/schemas/feedback";
import { FieldError } from "@/components/shared/field-error";

export function FeedbackForm() {
  const createFeedback = useCreateFeedback();
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: "PRODUCT",
      comment: "",
      email: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    createFeedback.mutate(
      {
        category: values.category,
        comment: values.comment,
        email: values.email || undefined,
      },
      {
        onSuccess: () => reset({ category: "PRODUCT", comment: "", email: "" }),
      },
    );
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label>Category</Label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {feedbackCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {categoryLabels[category]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError message={errors.category?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea id="comment" placeholder="Tell us what happened or what you would like improved." {...register("comment")} />
        <FieldError message={errors.comment?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <Button type="submit" disabled={createFeedback.isPending} className="w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {createFeedback.isPending ? "Submitting..." : "Submit feedback"}
      </Button>
    </form>
  );
}
