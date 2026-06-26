"use client";

import { Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/status-badge";
import { categoryLabels, feedbackCategories, feedbackStatuses, statusLabels, statusTransitions } from "@/constants/feedback";
import { useDeleteFeedback, useFeedbackList, useUpdateFeedbackStatus } from "@/hooks/use-feedback";
import type { FeedbackCategory, FeedbackStatus } from "@/types/api";

const allValue = "ALL";

export function FeedbackTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<typeof allValue | FeedbackCategory>(allValue);
  const [status, setStatus] = useState<typeof allValue | FeedbackStatus>(allValue);

  const params = useMemo(
    () => ({
      page,
      limit: 10,
      search: search.trim() || undefined,
      category: category === allValue ? undefined : category,
      status: status === allValue ? undefined : status,
      sortBy: "createdAt" as const,
      sortOrder: "desc" as const,
    }),
    [category, page, search, status],
  );

  const { data, isLoading } = useFeedbackList(params);
  const updateStatus = useUpdateFeedbackStatus();
  const deleteFeedback = useDeleteFeedback();

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-3 border-b border-[var(--border)] p-4 lg:grid-cols-[1fr_190px_190px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input
            className="pl-9"
            placeholder="Search comment or email"
            value={search}
            onChange={(event) => {
              setPage(1);
              setSearch(event.target.value);
            }}
          />
        </div>
        <Select
          value={category}
          onValueChange={(value) => {
            setPage(1);
            setCategory(value as typeof allValue | FeedbackCategory);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={allValue}>All categories</SelectItem>
            {feedbackCategories.map((item) => (
              <SelectItem key={item} value={item}>
                {categoryLabels[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(value) => {
            setPage(1);
            setStatus(value as typeof allValue | FeedbackStatus);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={allValue}>All statuses</SelectItem>
            {feedbackStatuses.map((item) => (
              <SelectItem key={item} value={item}>
                {statusLabels[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
            <tr>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-8 text-center text-neutral-500" colSpan={5}>
                  Loading feedback
                </td>
              </tr>
            ) : data?.data.length ? (
              data.data.map((item) => (
                <tr key={item.id} className="border-t border-[var(--border)] align-top">
                  <td className="max-w-xl px-4 py-4">
                    <p className="font-medium leading-6 text-neutral-900">{item.comment}</p>
                    <p className="mt-2 text-xs text-neutral-500">{item.email ?? "No email provided"}</p>
                  </td>
                  <td className="px-4 py-4">{categoryLabels[item.category]}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4 text-neutral-600">
                    {new Date(item.createdAt).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      {statusTransitions[item.status].map((nextStatus) => (
                        <Button
                          key={nextStatus}
                          size="sm"
                          variant="secondary"
                          onClick={() => updateStatus.mutate({ id: item.id, status: nextStatus })}
                          disabled={updateStatus.isPending}
                        >
                          {statusLabels[nextStatus]}
                        </Button>
                      ))}
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label="Delete feedback"
                        onClick={() => deleteFeedback.mutate(item.id)}
                        disabled={deleteFeedback.isPending}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-neutral-500" colSpan={5}>
                  No feedback found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] p-4 text-sm">
        <span className="text-neutral-600">
          Page {data?.pagination.page ?? page} of {data?.pagination.totalPages || 1}
        </span>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={!data || page >= data.pagination.totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
