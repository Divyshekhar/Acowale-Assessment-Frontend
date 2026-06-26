import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3030",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApiMessage = (error: unknown, fallback = "Something went wrong") => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message ?? fallback;
  }

  return fallback;
};
