"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiMessage } from "@/lib/api-client";
import { authService, type LoginPayload } from "@/services/auth.service";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authService.me,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me, user);
      toast.success("Welcome back");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(getApiMessage(error, "Unable to log in"));
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: authKeys.me });
      router.push("/login");
    },
  });
}
