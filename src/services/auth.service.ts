import { apiClient } from "@/lib/api-client";
import type { ApiResponse, User } from "@/types/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<ApiResponse<User>>("/api/v1/auth/login", payload);
    return data.data;
  },

  async me() {
    const { data } = await apiClient.get<ApiResponse<User>>("/api/v1/auth/me");
    return data.data;
  },

  async logout() {
    await apiClient.post<ApiResponse<null>>("/api/v1/auth/logout");
  },
};
